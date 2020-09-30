import React from 'react';
import { MdEmail } from 'react-icons/md';
import { FaLock, FaFacebook } from 'react-icons/fa';
import { Link } from 'react-router-dom';

import loginImageContent from '../../assets/images/login-image-content.svg';

import {
  Container,
  Background,
  ImageContent,
  FormContent,
  OrContent,
  LoginContent,
} from './styles';
import Input from '../../components/Input';
import Button from '../../components/Button';

const Login: React.FC = () => {
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
              <form>
                <h1>Login</h1>
                <Input
                  name="Email"
                  icon={MdEmail}
                  placeholder="E-mail"
                  size={21}
                  type="email"
                />
                <Input
                  name="password"
                  icon={FaLock}
                  placeholder="Senha"
                  size={18}
                  type="password"
                />
                <p>Esqueceu a senha ?</p>
                <Button>Entrar</Button>
              </form>
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
