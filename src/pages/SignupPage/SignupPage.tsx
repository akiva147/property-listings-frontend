import { useNavigate } from 'react-router';
import { Form } from '../../components/Form';
import { User } from '../../models/user.model';
import { authService } from '../../services/auth.service';

export interface SignupPageProps {}

export const SignupPage = (props: SignupPageProps) => {
  const navigate = useNavigate();

  const onSubmit = async (data: User) => {
    try {
      await authService.signup(data.email, data.password);
      navigate('/login');
    } catch (error) {
      console.error('Signup failed', error);
    }
  };

  return <Form onSubmit={onSubmit} variant="signup" />;
};
