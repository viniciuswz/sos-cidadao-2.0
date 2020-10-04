import styled from 'styled-components';
import { shade } from 'polished';

const Container = styled.div`
  form {
    h1 {
      font-size: 3.6rem;
      line-height: 5.4rem;
      & + p {
        font-size: 1.4rem;
        line-height: 2.1rem;
        color: ${props => shade(0.25, props.theme.colors.inputBackground)};
        margin-bottom: 16px;
      }
    }
    button {
      margin-top: 8px;
    }
  }
`;

const OrContent = styled.div`
  max-width: 290px;
  width: 100%;
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
    span {
      text-decoration: underline;
      cursor: pointer;
    }
  }
`;

export { Container, OrContent };
