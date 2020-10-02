import React, {
  InputHTMLAttributes,
  useState,
  useCallback,
  useRef,
  useEffect,
} from 'react';
import { useField } from '@unform/core';

import { IconBaseProps } from 'react-icons';
import { RiErrorWarningLine } from 'react-icons/ri';

import { Container, ContainerInput } from './styles';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  size: number;
  icon: React.ComponentType<IconBaseProps>;
}

const Input: React.FC<InputProps> = ({ icon: Icon, name, size, ...rest }) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const { fieldName, error, defaultValue, registerField } = useField(name);
  const [onFocused, setOnFocused] = useState(false);
  const [isFilled, setIsFilled] = useState(false);

  const handlerInputFocus = useCallback(() => {
    return setOnFocused(true);
  }, []);
  const handlerInputBlur = useCallback(() => {
    setIsFilled(!!inputRef.current?.value);
    return setOnFocused(false);
  }, []);

  useEffect(() => {
    registerField({ name: fieldName, ref: inputRef.current, path: 'value' });
  }, [registerField, fieldName]);

  useEffect(() => {
    if (error) {
      setIsFilled(false);
    }
  }, [error]);

  return (
    <Container>
      <ContainerInput
        isErrored={!!error}
        isFocused={onFocused}
        isFilled={isFilled}
      >
        {Icon && <Icon size={size} />}
        <input
          ref={inputRef}
          {...rest}
          onFocus={handlerInputFocus}
          onBlur={handlerInputBlur}
          defaultValue={defaultValue}
        />
        {error && <RiErrorWarningLine size={20} />}
      </ContainerInput>

      {error && <p>{error}</p>}
    </Container>
  );
};

export default Input;
