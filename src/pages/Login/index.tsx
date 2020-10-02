import React, { useRef } from 'react';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import * as Yup from 'yup';
import { MdEmail } from 'react-icons/md';
import { FaLock, FaFacebook } from 'react-icons/fa';

import { Link } from 'react-router-dom';

import getValidateErrors from '../../utils/getValidateErrors';

import loginImageContent from '../../assets/images/login-image-content.svg';

import Input from '../../components/Input';
import Button from '../../components/Button';

import {
  Container,
  Background,
  ImageContent,
  FormContent,
  OrContent,
  LoginContent,
} from './styles';

const Login: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  async function handlerSubmit(data: any): Promise<any> {
    try {
      formRef.current?.setErrors({});
      const schema = Yup.object().shape({
        email: Yup.string()
          .email('você precisa inserir um e-mail válido')
          .required('O e-mail é obrigatório'),
        password: Yup.string().min(
          6,
          'A senha precisa ter no minímo 6 caracteres',
        ),
      });

      await schema.validate(data, {
        abortEarly: false,
      });

      console.log('tudo valido', data);
    } catch (error) {
      const errors = getValidateErrors(error);
      formRef.current?.setErrors(errors);
    }
  }
  return (
    <>
      <Background>
        <Container>
          <ImageContent>
            <div>
              <h2>Bem vindo de volta</h2>
              <p>
                Mussum Ipsum, cacilds vidis litro abertis. Admodum accumsan
                disputationi eu sit. Vide electram sadipscing et per. Praesent
                vel viverra nisi.
              </p>
            </div>
            <div>
              <img src={loginImageContent} alt="jaca" />
            </div>
          </ImageContent>
          <LoginContent>
            <FormContent>
              <Form ref={formRef} onSubmit={handlerSubmit}>
                <h1>Login</h1>
                <Input
                  name="email"
                  icon={MdEmail}
                  placeholder="E-mail"
                  size={21}
                  type="text"
                />
                <Input
                  name="password"
                  icon={FaLock}
                  placeholder="Senha"
                  size={18}
                  type="password"
                />
                <p className="forget-paragraph">Esqueceu a senha ?</p>
                <Button type="submit">Entrar</Button>
              </Form>
              <OrContent>
                <div>
                  <span>ou</span>
                </div>
                <Button className="facebook">
                  <FaFacebook />
                  Login com o Facebook
                </Button>
                <p>
                  Ao continuar você concorda com os&nbsp;
                  <Link to="termos-de-servico">termos de serviço</Link>
                  &nbsp;e&nbsp;a&nbsp;
                  <Link to="politica-de-privadidade">
                    politica de privacidade
                  </Link>
                </p>
                <p>
                  Não é um membro ?&nbsp;
                  <span>Cadastre-se</span>
                </p>
              </OrContent>
            </FormContent>
          </LoginContent>
        </Container>
      </Background>
    </>
  );
};

export default Login;
