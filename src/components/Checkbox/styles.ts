import styled from 'styled-components';
import { shade } from 'polished';

interface CheckboxProps {
  isError: boolean;
}

const Container = styled.div<CheckboxProps>`
  div {
    display: flex;
    input {
      display: none;
      &:checked {
        & ~ label {
          &:after {
            display: block;
          }
        }
      }
      /* display: none; */
    }
    label {
      margin-right: 8px;
      position: relative;
      display: inline-block;
      font-size: 0;
      min-width: 17px;
      height: 17px;
      border-radius: 4px;
      background: ${props => props.theme.colors.inputBackground};
      border: 2px solid ${props => props.theme.colors.inputIcon};
      &::before {
        content: '';
        display: block;
        position: absolute;
        width: 17px;
        height: 17px;
        top: 0;
      }
      &::after {
        content: '';
        display: none;
        position: absolute;
        width: 5px;
        height: 7px;
        top: 0;
        border: solid ${props => shade(0.3, props.theme.colors.inputIcon)};
        border-width: 0 3px 3px 0;
        left: 2.5px;
        top: 0.5px;
        transform: rotate(45deg);
      }

      & ~ p {
        a {
          color: ${props => shade(0.3, props.theme.colors.inputIcon)};
        }
      }

      & ~ p {
        font-size: 1.2rem;
        line-height: 1.65rem;
        font-weight: 500;
        & + p {
          span {
            text-decoration: underline;
            cursor: pointer;
          }
        }
      }
    }
  }
`;

const Error = styled.div`
  width: 100%;
  p {
    color: ${props => props.theme.colors.error};
    font-size: 1.4rem;
    line-height: 2.1rem;
  }
`;

export { Container, Error };
