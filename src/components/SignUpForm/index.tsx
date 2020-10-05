import React, { useCallback, useRef } from 'react';
import { FaLock, FaIdCard, FaFacebook } from 'react-icons/fa';
import { MdEmail } from 'react-icons/md';
import * as Yup from 'yup';

import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import getValidateErrors from '../../utils/getValidateErrors';

import Button from '../Button';
import Input from '../Input';

import { Container, OrContent } from './styles';

interface SignUpProps {
  signUpfunction: () => boolean;
}
const SignUpForm: React.FC<SignUpProps> = ({ signUpfunction }) => {
  const formRef = useRef<FormHandles>(null);
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
  async function handlerOnSubmit(data: any): Promise<any> {
    try {
      formRef.current?.setErrors({});
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
    } catch (error) {
      const errors = getValidateErrors(error);
      formRef.current?.setErrors(errors);
      // console.log(error);
    }
  }
  return (
    <Container>
      <Form onSubmit={handlerOnSubmit} ref={formRef}>
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
      </Form>
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
    </Container>
  );
};

export default SignUpForm;
