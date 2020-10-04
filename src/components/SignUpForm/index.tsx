import React, { useCallback, useRef } from 'react';
import { FaLock, FaIdCard, FaFacebook } from 'react-icons/fa';
import { MdEmail } from 'react-icons/md';

import { Form } from '@unform/web';

import Button from '../Button';
import Input from '../Input';

import { Container, OrContent } from './styles';

interface SignUpProps {
  signUpfunction: () => boolean;
}
const SignUpForm: React.FC<SignUpProps> = ({ signUpfunction }) => {
  const formRef = useRef(null);
  const handlerOnSubmit = useCallback(data => {
    console.log(data);
  }, []);
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
        <Button className="facebook">
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
