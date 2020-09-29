import React from 'react';

import loginImageContent from '../../assets/images/login-image-content.svg';

import { Container, Background, ImageContent, FormContent } from './styles';
import Input from '../../components/Input';

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
          <FormContent>
            <form>
              <h1>Login</h1>
              <Input />
            </form>
          </FormContent>
        </Container>
      </Background>
    </>
  );
};

export default Login;
