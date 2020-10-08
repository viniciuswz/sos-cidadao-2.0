import React, { useCallback, useRef, useState } from 'react';
import { FaLock, FaIdCard, FaFacebook } from 'react-icons/fa';
import { MdEmail } from 'react-icons/md';
import * as Yup from 'yup';

import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import { StyleSheetManager } from 'styled-components';
import { Link } from 'react-router-dom';
import getValidateErrors from '../../utils/getValidateErrors';

import Button from '../Button';
import Input from '../Input';
import Checkbox from '../Checkbox';

import { Container, OrContent, StepContent } from './styles';

interface SignUpProps {
  signUpfunction: () => boolean;
}
const SignUpForm: React.FC<SignUpProps> = ({ signUpfunction }) => {
  const formRefOne = useRef<FormHandles>(null);
  const formRefTwo = useRef<FormHandles>(null);

  const [formStepOne, setFormStepOne] = useState(false);
  const [formStepTwo, setFormStepTwo] = useState(false);
  function handlerFacebookSignup(): void {
    console.log('jaca');
    FB.login(
      function (response) {
        console.log(response);
        if (response.status === 'connected') {
          // Logged into your webpage and Facebook.
        } else {
          // The person is not logged into your webpage or we are unable to tell.
        }
      },
      { scope: 'public_profile,email,user_birthday,user_location' },
    );
  }
  async function handlerOnSubmitFormOne(data: any): Promise<any> {
    try {
      formRefOne.current?.setErrors({});
      const schema = Yup.object().shape({
        email: Yup.string()
          .email('O e-mail precisa ser válido')
          .required('O e-mail é obrigatório'),
        name: Yup.string().required('O nome é obrigatório'),
        lastname: Yup.string().required('O sobrenome é obrigatório'),
      });

      await schema.validate(data, {
        abortEarly: false,
      });

      console.log('deu certo', data);
      setFormStepOne(true);
    } catch (error) {
      setFormStepOne(false);
      const errors = getValidateErrors(error);
      formRefOne.current?.setErrors(errors);
      // console.log(error);
    }
  }

  async function handlerOnSubmitFormTwo(data: any): Promise<void> {
    try {
      const schema = Yup.object().shape({
        password: Yup.string().min(
          6,
          'A senha precisa ter no minimo 6 caracteres',
        ),
        confirmPassword: Yup.string()
          .oneOf([Yup.ref('password')], 'As senhas não são iguais')
          .required('Você precisa confirmar a senha'),
        termsCondition: Yup.boolean().oneOf(
          [true],
          'Você precisa aceitar os termos ',
        ),
      });

      await schema.validate(data, {
        abortEarly: false,
      });
    } catch (error) {
      console.log(error);
      const errors = getValidateErrors(error);
      formRefTwo.current?.setErrors(errors);
      console.log('error');
    }
  }
  return (
    <Container className={`${formStepOne ? 'is--active' : ''}`}>
      {formStepOne && (
        <StepContent>
          <div className="is--completed">
            <span>1</span>
          </div>
          <div className="is--completed">
            <span>2</span>
          </div>
        </StepContent>
      )}
      <Form
        onSubmit={handlerOnSubmitFormOne}
        ref={formRefOne}
        className="formStepOne"
      >
        {formStepOne && (
          <StepContent>
            <div className="is--completed">
              <span>1</span>
            </div>
            <div className={formStepTwo ? 'is--completed' : ''}>
              <span>2</span>
            </div>
          </StepContent>
        )}

        <h1>cadastre-se</h1>
        <p>São poucos passos, é rápido, fácil e seguro</p>
        <Input
          name="email"
          icon={MdEmail}
          placeholder="E-mail"
          size={21}
          type="text"
        />
        <Input
          name="name"
          icon={FaIdCard}
          placeholder="Nome"
          size={20}
          type="text"
        />
        <Input
          name="lastname"
          icon={FaIdCard}
          placeholder="Sobrenome"
          size={20}
          type="text"
        />
        <Button type="submit">Cadastrar</Button>

        <OrContent>
          <div>
            <span>ou</span>
          </div>
          <Button onClick={handlerFacebookSignup} className="facebook">
            <FaFacebook />
            Cadastre-se com o Facebook
          </Button>
          <p>
            já é um membro?&nbsp;
            <span onClick={signUpfunction} aria-hidden="true">
              Faça Login
            </span>
          </p>
        </OrContent>
      </Form>
      <Form
        onSubmit={handlerOnSubmitFormTwo}
        ref={formRefTwo}
        className="formStepTwo"
      >
        <h1>Falta Pouco</h1>
        <p>Só mais algumas informações</p>
        <Input
          name="password"
          icon={FaLock}
          placeholder="Senha"
          size={21}
          type="text"
        />
        <Input
          name="confirmPassword"
          icon={FaLock}
          placeholder="Confirmar senha"
          size={20}
          type="text"
        />
        <Checkbox
          name="termsCondition"
          type="checkbox"
          labelName="termos e condições de uso"
        >
          <p>
            Ao continuar você concorda com os&nbsp;
            <Link to="termos-de-servico">termos de serviço</Link>
            &nbsp;e&nbsp;a&nbsp;
            <Link to="politica-de-privadidade">politica de privacidade</Link>
          </p>
        </Checkbox>

        <Button type="submit">Finalizar cadastro</Button>
        <OrContent>
          <p>
            já é um membro?&nbsp;
            <span onClick={signUpfunction} aria-hidden="true">
              Faça Login
            </span>
          </p>
        </OrContent>
      </Form>
    </Container>
  );
};

export default SignUpForm;
