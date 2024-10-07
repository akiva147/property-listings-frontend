import { useNavigate } from 'react-router';
import classes from './signup-page.module.scss';
import { User, UserSchema } from '../../models/user.model';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { authService } from '../../services/auth.service';

export interface SignupPageProps {}

export const SignupPage = (props: SignupPageProps) => {
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
      await authService.signup(data.email, data.password);
      navigate('/login'); // Redirect to login after successful signup
    } catch (error) {
      console.error('Signup failed', error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h2>Sign Up</h2>
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
      <button type="submit">Sign Up</button>
    </form>
  );
};
