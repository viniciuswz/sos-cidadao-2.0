import styled from 'styled-components';
import { shade } from 'polished';

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  form {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    position: absolute;
    left: 0;
    width: 100%;
    height: 100%;
    background: white;
    left: 50%;
    transform: translateX(-50%);
    transition: 0.5s;
    height: auto;
    h1 {
      font-size: 3.6rem;
      line-height: 5.4rem;
      text-align: center;

      & + p {
        font-size: 1.4rem;
        line-height: 2.1rem;
        color: ${props => shade(0.25, props.theme.colors.inputBackground)};
        margin-bottom: 16px;
        text-align: center;
      }
    }
    button {
      margin-top: 8px;
    }
    &.formStepTwo {
      left: 100%;
      transform: translateX(-0%);
      opacity: 0;
    }
  }

  &.is--active {
    form {
      &.formStepOne {
        left: -100%;
        transform: translateX(-100%);
      }
      &.formStepTwo {
        left: 50%;
        transform: translateX(-50%);
        opacity: 1;
      }
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

const StepContent = styled.div`
  display: none;
  justify-content: center;
  align-items: center;

  div {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 40px;
    height: 40px;
    font-size: 2.4rem;
    font-weight: 500;
    line-height: 3.6rem;
    background: ${props => props.theme.colors.inputBackground};
    border-radius: 50%;
    color: ${props => props.theme.colors.inputIcon};
    border: 2px solid ${props => shade(0.1, props.theme.colors.inputBackground)};
    margin-right: 50px;
    span {
      position: relative;
      &:after {
        position: absolute;
        content: '';
        display: block;
        width: 50px;
        height: 2px;
        background: ${props => shade(0.1, props.theme.colors.inputBackground)};
        top: 50%;
        left: 50px;
        transform: translateX(-50%);
      }
    }
    &:last-child {
      margin-right: 0;
      span {
        &:after {
          content: none;
        }
      }
    }

    &.is--completed {
      background: ${props => props.theme.colors.primary};
      color: ${props => props.theme.colors.textBackground};
      border: 2px solid ${props => shade(0.1, props.theme.colors.primary)};
      span {
        &:after {
          background: ${props => shade(0.1, props.theme.colors.primary)};
        }
      }
    }
  }
`;

export { Container, OrContent, StepContent };
