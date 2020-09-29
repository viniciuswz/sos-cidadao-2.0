import styled from 'styled-components';
import { shade } from 'polished';

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
`;

const ImageContent = styled.div`
  width: 100%;
  height: 100%;
  max-width: 50%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  background: ${props => props.theme.colors.primary};
  color: ${props => props.theme.colors.textBackground};
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
      img {
        width: 100%;
        position: relative;
        top: 6px;
      }
    }
  }
`;

const FormContent = styled.div`
  max-width: 602px;
  width: 100%;
  height: 100%;
`;

export { Container, Background, ImageContent, FormContent };
