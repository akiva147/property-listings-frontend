import { useFormContext } from 'react-hook-form';
import classes from './custom-input.module.scss';
import { Input, InputProps } from 'antd';

export interface CustomInputProps extends InputProps {
  fieldName: string;
}

export const CustomInput = ({ fieldName, ...props }: CustomInputProps) => {
  const { register, formState, getFieldState } = useFormContext();

  const { error } = getFieldState(fieldName, formState);
  // console.log('CustomInput  error:', error);

  return (
    <div className={classes.container}>
      <main>
        <Input variant="borderless" {...register(fieldName)} {...props} />
      </main>
      {error && <footer>{error.message}</footer>}
    </div>
  );
};
