import React from 'react';

import Button from '../../components/Button';
import { Container } from './styles';

const Success: React.FC = () => {
  return (
    <Container>
      <div>
        <h1>Tudo Certo!</h1>
        <p>Agora com seu cadastro você poderá interagir com nossa comunidade</p>
        <Button>continuar</Button>
      </div>
    </Container>
  );
};

export default Success;
