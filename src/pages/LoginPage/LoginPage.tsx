import { User } from '../../models/user.model';
import { useNavigate } from 'react-router';
import { authService } from '../../services/auth.service';
import { Form } from '../../components/Form';
import { message } from 'antd';

export interface LoginPageProps {}

export const LoginPage = (props: LoginPageProps) => {
  const navigate = useNavigate();

  const onSubmit = async (data: User) => {
    try {
      const response = await authService.login(data.email, data.password);

      localStorage.setItem('token', response.token);
      navigate('/property-listings');
    } catch (error) {
      message.error({
        content: 'Login failed. Please check your credentials.',
      });
      console.error('Login failed', error);
    }
  };

  return <Form onSubmit={onSubmit} variant="login" />;
};
