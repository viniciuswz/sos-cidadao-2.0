import styled, { css } from 'styled-components';
import { shade } from 'polished';

interface ImageContentProps {
  isSignUp: boolean;
}

interface FormContentProps {
  isSignUp: boolean;
}

const Background = styled.div`
  background: ${props => props.theme.colors.secondary};
  background: linear-gradient(
    180deg,
    ${props => props.theme.colors.secondary} 0%,
    shade(0.4, ${props => props.theme.colors.primary}) 48%,
    ${props => props.theme.colors.primary} 100%
  );
  height: 100vh;

  display: flex;
  align-items: center;
  justify-content: center;
`;

const Container = styled.div`
  background-color: ${props => props.theme.colors.backgroundPrimary};
  border-radius: 24px;
  max-height: 608px;
  max-width: 1206px;
  height: 100%;
  width: 100%;
  overflow: hidden;
  display: flex;
  position: relative;
`;

const ImageContent = styled.div<ImageContentProps>`
  width: 100%;
  height: 100%;
  max-width: 50%;
  display: flex;
  justify-content: space-between;
  background: ${props => props.theme.colors.primary};
  color: ${props => props.theme.colors.textBackground};
  z-index: 2;
  position: relative;
  overflow: hidden;
  left: 0%;
  transition: left 0.5s;
  ${props =>
    props.isSignUp &&
    css`
      left: 50%;
    `}

  .overflow-effect {
    position: relative;
    right: 0%;
    transition: right 0.5s;
    width: 100%;
    ${props =>
      props.isSignUp &&
      css`
        right: 100%;
      `}
  }
`;

const ImageContentSignIn = styled.div<ImageContentProps>`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  background: ${props => props.theme.colors.primary};
  color: ${props => props.theme.colors.textBackground};
  z-index: 2;
  position: absolute;
  right: 0%;
  transition: right 0.5s;
  ${props =>
    props.isSignUp &&
    css`
      /* right: 100%; */
    `}

  h2 {
    text-align: center;
    max-width: 320px;
    font-weight: bold;
    font-size: 3.6rem;
    line-height: 5.4rem;
    margin-top: 48px;
  }
  p {
    text-align: center;
    max-width: 420px;
    font-weight: 400;
    font-size: 1.6rem;
    line-height: 2.4rem;
  }
  div {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    & + div {
      svg {
        width: 100%;
        position: relative;
        top: 6px;
      }
    }
  }
`;

const ImageContentSignUp = styled.div<ImageContentProps>`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  background: ${props => props.theme.colors.primary};
  color: ${props => props.theme.colors.textBackground};
  z-index: 2;
  position: absolute;
  left: 100%;
  transition: left 0.5s;
  ${props =>
    props.isSignUp &&
    css`
      /*left: 100%;*/
    `}

  h2 {
    text-align: center;
    max-width: 320px;
    font-weight: bold;
    font-size: 3.6rem;
    line-height: 5.4rem;
    margin-top: 48px;
  }
  p {
    text-align: center;
    max-width: 420px;
    font-weight: 400;
    font-size: 1.6rem;
    line-height: 2.4rem;
  }
  div {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    & + div {
      svg {
        width: 100%;
        position: relative;
        top: 6px;
      }
    }
  }
`;

const FormContent = styled.div<FormContentProps>`
  width: 100%;
  height: 100%;
  overflow: hidden;
  position: absolute;
  right: 0;
  .overflow-effect {
    width: 100%;
    height: 100%;
    display: flex;

    position: relative;
    right: 0%;
    transition: right 0.5s;
    & > div {
      background: ${props => props.theme.colors.backgroundPrimary};
      /* position: absolute; */
      width: 100%;
      height: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      z-index: 1;
      form {
        max-width: 290px;
        width: 100%;
      }

      &:first-of-type {
        position: relative;

        left: 50%;
        transition: left 0.5s;
        ${props =>
          props.isSignUp &&
          css`
            left: 0%;
          `}
      }
      &:last-of-type {
        position: relative;
        z-index: 2;
        transition: 0.5s;
        right: 0%;
        width: 100%;
        overflow: hidden;
        ${props =>
          props.isSignUp &&
          css`
            width: 90%;
            right: 10%;
          `}
      }
    }
  }
`;

const LoginContent = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1;
`;

const OrContent = styled.div`
  div {
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    span {
      color: ${props => props.theme.colors.inputIcon};
      font-size: 1.4rem;
      line-height: 2.1rem;
      padding: 10px 20px;
      background: ${props => props.theme.colors.backgroundPrimary};
      position: relative;
      z-index: 1;
    }
    &::before {
      content: '';
      height: 1px;
      width: 100%;
      border-top: 1px solid ${props => props.theme.colors.inputIcon};

      position: absolute;
      left: 0;
      top: 50%;
      transform: translateY(-50%);
    }
  }
  p {
    font-size: 1.2rem;
    line-height: 1.65rem;
    margin-top: 24px;
    text-align: center;
    color: ${props => shade(0.3, props.theme.colors.inputIcon)};
    a {
      color: ${props => shade(0.3, props.theme.colors.inputIcon)};
    }

    & + p {
      margin-top: 70px;
      span {
        text-decoration: underline;
        cursor: pointer;
      }
    }
  }
`;

export {
  Container,
  Background,
  ImageContent,
  ImageContentSignUp,
  ImageContentSignIn,
  FormContent,
  OrContent,
  LoginContent,
};
