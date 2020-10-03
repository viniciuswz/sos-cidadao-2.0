import React, { useCallback, useRef, useState } from 'react';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import * as Yup from 'yup';
import { MdEmail } from 'react-icons/md';
import { FaLock, FaFacebook } from 'react-icons/fa';

import { Link } from 'react-router-dom';

import getValidateErrors from '../../utils/getValidateErrors';

import SignInImageContent from '../../assets/images/signin-image-content.png';
import SignUpImageContent from '../../assets/images/signup-image-content.png';

import SignInForm from '../../components/SignInForm';
import SignUpForm from '../../components/SignUpForm';

import {
  Container,
  Background,
  ImageContent,
  FormContent,
  OrContent,
  LoginContent,
  ImageContentSignIn,
  ImageContentSignUp,
} from './styles';

const Login: React.FC = () => {
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

  const handlerSignUp = useCallback(() => {
    const newvalue = !isSignUp;
    console.log(newvalue);
    setIsSignUp(newvalue);
    console.log('jaca', isSignUp);
    return isSignUp;
  }, [isSignUp]);
  return (
    <>
      <Background>
        <button type="button" onClick={handlerSignUp}>
          Teste
        </button>
        <Container>
          <ImageContent isSignUp={isSignUp}>
            <div className="overflow-effect">
              <ImageContentSignIn isSignUp={isSignUp}>
                <div>
                  <h2>Bem vindo de volt</h2>
                  <p>
                    Mussum Ipsum, cacilds vidis litro abertis. Admodum accumsan
                    disputationi eu sit. Vide electram sadipscing et per.
                    Praesent vel viverra nisi.
                  </p>
                </div>
                <div>
                  <img src={SignInImageContent} alt="asdasd" />
                </div>
              </ImageContentSignIn>
              <ImageContentSignUp isSignUp={isSignUp}>
                <div>
                  <h2>cadastra ai meo</h2>
                  <p>
                    Mussum Ipsum, cacilds vidis litro abertis. Admodum accumsan
                    disputationi eu sit. Vide electram sadipscing et per.
                    Praesent vel viverra nisi.
                  </p>
                </div>
                <div>
                  <img src={SignUpImageContent} alt="asdasd" />
                </div>
              </ImageContentSignUp>
            </div>
          </ImageContent>
          <LoginContent>
            <FormContent isSignUp={isSignUp}>
              <div className="overflow-effect">
                <SignUpForm signUpfunction={handlerSignUp} />
                <SignInForm signInfunction={handlerSignUp} />
              </div>
            </FormContent>
          </LoginContent>
        </Container>
      </Background>
    </>
  );
};

export default Login;
