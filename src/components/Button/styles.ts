import styled from 'styled-components';

const Container = styled.button`
  border: 0;
  outline: none;
  background: ${props => props.theme.colors.complementPrimary};
  color: ${props => props.theme.colors.textBackground};
  width: 100%;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.4rem;
  line-height: 2.1rem;
  font-weight: 500;
  border-radius: 8px;
  cursor: pointer;
  &.facebook {
    background: #1877f2;
    color: #fff;
    svg {
      width: 28px;
      height: 28px;
    }
  }
  svg {
    margin-right: 8px;
  }
`;

export { Container };
