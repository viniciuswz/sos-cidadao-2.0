import React, { useCallback, useRef, useState } from 'react';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import * as Yup from 'yup';
import { MdEmail } from 'react-icons/md';
import { FaLock, FaFacebook } from 'react-icons/fa';

import { Link } from 'react-router-dom';
import Input from '../Input';

import getValidateErrors from '../../utils/getValidateErrors';
import Button from '../Button';
import { OrContent, Container } from './styles';

interface InputLoginProps {
  signInfunction: () => boolean;
}

const SignInForm: React.FC<InputLoginProps> = ({ signInfunction }) => {
  const formRef = useRef<FormHandles>(null);
  const [isSignUp, setIsSignUp] = useState(false);

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

  // const handlerSignUp = useCallback(() => {
  //   setIsSignUp(true);
  // }, []);
  return (
    <Container>
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
          <Link to="politica-de-privadidade">politica de privacidade</Link>
        </p>
        <p>
          Não é um membro ?&nbsp;
          <span onClick={signInfunction} aria-hidden="true">
            Cadastre-se
          </span>
        </p>
      </OrContent>
    </Container>
  );
};

export default SignInForm;
