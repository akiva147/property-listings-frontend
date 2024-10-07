import { useForm } from 'react-hook-form';
import classes from './login-page.module.scss';
import { zodResolver } from '@hookform/resolvers/zod';
import { User, UserSchema } from '../../models/user.model';
import { useNavigate } from 'react-router';
import axios from 'axios';
import { authService } from '../../services/auth.service';

export interface LoginPageProps {}

export const LoginPage = (props: LoginPageProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<User>({
    resolver: zodResolver(UserSchema),
  });
  const navigate = useNavigate();

  const onSubmit = async (data: User) => {
    try {
      const response = await authService.login(data.email, data.password);
      console.log('onSubmit  response:', response);
      localStorage.setItem('token', response.token); // Store token in local storage
      navigate('/property-listings');
    } catch (error) {
      console.error('Login failed', error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h2>Login</h2>
      <div>
        <input
          type="email"
          placeholder="Email"
          {...register('email', { required: 'Email is required' })}
        />
        {errors.email && <span>{errors.email.message}</span>}
      </div>
      <div>
        <input
          type="password"
          placeholder="Password"
          {...register('password', { required: 'Password is required' })}
        />
        {errors.password && <span>{errors.password.message}</span>}
      </div>
      <button type="submit">Login</button>
    </form>
  );
};
