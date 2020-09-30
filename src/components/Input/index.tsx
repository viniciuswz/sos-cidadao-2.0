import React, {
  InputHTMLAttributes,
  useState,
  useCallback,
  useRef,
} from 'react';
import { IconBaseProps } from 'react-icons';

import { Container } from './styles';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  size: number;
  icon: React.ComponentType<IconBaseProps>;
}

const Input: React.FC<InputProps> = ({ icon: Icon, name, size, ...rest }) => {
  const [onFocused, setOnFocused] = useState(false);
  const [isFilled, setIsFilled] = useState(false);

  const handlerInputFocus = useCallback(() => {
    return setOnFocused(true);
  }, []);
  const handlerInputBlur = useCallback(() => {
    return setOnFocused(false);
  }, []);

  return (
    <Container isFocused={onFocused}>
      {Icon && <Icon size={size} />}
      <input {...rest} onFocus={handlerInputFocus} onBlur={handlerInputBlur} />
    </Container>
  );
};

export default Input;
