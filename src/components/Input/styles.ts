import styled, { css } from 'styled-components';

import { shade, lighten } from 'polished';

interface ContainerProps {
  isFocused: boolean;
  isFilled: boolean;
  isErrored: boolean;
}

const ContainerInput = styled.div<ContainerProps>`
  background: ${props => props.theme.colors.inputBackground};
  display: flex;
  align-items: center;
  border-radius: 8px;
  border: 2px solid ${props => props.theme.colors.inputBackground};
  input {
    background: transparent;
    height: 40px;
    border: 0;
    outline: 0;
    padding: 8px;
    color: ${props => shade(0.5, props.theme.colors.backgroundPrimary)};
    width: calc(100% - 40px);
    font-size: 1.4rem;
    line-height: 2.1rem;
    &::placeholder {
      color: ${props => props.theme.colors.inputIcon};
    }
  }
  svg {
    margin: 0 12px;
    color: ${props => props.theme.colors.inputIcon};
  }

  & + div {
    margin-top: 8px;
  }
  ${props =>
    props.isErrored &&
    css`
     border: 2px solid ${props.theme.colors.error}};
     svg{
       color: ${props.theme.colors.error}}
     }
  `}

  ${props =>
    props.isFilled &&
    css`
      border: 2px solid  ${props.theme.colors.inputBackground};
      svg{
          color: ${shade(0.3, props.theme.colors.inputIcon)}}
      }
      & + p{
        display: none;
      }

      input{
        & + svg{
          display: none;
        }
      }

  `}

  ${props =>
    props.isFocused &&
    css`
      border: 2px solid ${shade(0.3, props.theme.colors.inputIcon)}};
      svg{
        color: ${shade(0.3, props.theme.colors.inputIcon)}}
      }
    `}
`;

const Container = styled.div`
  width: 100%;
  p {
    color: ${props => props.theme.colors.error};
    font-size: 1.4rem;
    line-height: 2.1rem;
  }

  & + div {
    margin-top: 8px;
  }
`;

export { ContainerInput, Container };
