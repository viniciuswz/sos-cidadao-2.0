import { useField } from '@unform/core';
import React, { useRef, InputHTMLAttributes, useEffect } from 'react';

import { Container, Error } from './styles';

interface checkboxProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  labelName: string;
}

const Checkbox: React.FC<checkboxProps> = ({
  name,
  labelName,
  children,
  ...props
}) => {
  const inputRef = useRef(null);
  const { fieldName, error, registerField, defaultValue } = useField(name);

  useEffect(() => {
    registerField({ name: fieldName, ref: inputRef.current, path: 'checked' });
    console.log('jaca', inputRef);
  }, [registerField, fieldName]);
  return (
    <Container isError={!!error}>
      <div>
        <input type="checkbox" name={name} id={name} ref={inputRef} />
        <label htmlFor={name}>{labelName}</label>
        {children}
      </div>
      {error && (
        <Error>
          <p>{error}</p>
        </Error>
      )}
    </Container>
  );
};

export default Checkbox;
