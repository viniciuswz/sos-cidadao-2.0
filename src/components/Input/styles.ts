import styled, { css } from 'styled-components';

import { shade } from 'polished';

interface ContainerProps {
  isFocused: boolean;
}

const Container = styled.div<ContainerProps>`
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
    width: 100%;
    font-size: 1.4rem;
    line-height: 21.2rem;
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
    props.isFocused &&
    css`
      border: 2px solid ${shade(0.3, props.theme.colors.inputIcon)}};
      svg{
        color: ${shade(0.3, props.theme.colors.inputIcon)}}
      }
    `}
`;

export { Container };
