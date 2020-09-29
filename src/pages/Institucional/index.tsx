import React from 'react';
import { Link } from 'react-router-dom';

import { Content } from './styles';

const Institucional: React.FC = () => {
  return (
    <Content>
      <h1>Institucional</h1>
      <Link to="/login">Login</Link>
    </Content>
  );
};

export default Institucional;
