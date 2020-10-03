import styled, { css } from 'styled-components';
import { shade } from 'polished';

interface ImageContentProps {
  isSignUp: boolean;
}

const Container = styled.div`
  form {
    h1 {
      margin-bottom: 30px;
    }
    p.forget-paragraph {
      font-size: 1.3rem;
      color: ${props => props.theme.colors.inputIcon};
      margin: 4px 0;
    }
  }
`;

const OrContent = styled.div`
  max-width: 290px;
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

export { OrContent, Container };
