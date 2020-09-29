import React from 'react';

import { Content } from './styles';

const Input: React.FC = () => {
  return (
    <Content>
      <input type="text" placeholder="email" />
    </Content>
  );
};

export default Input;
