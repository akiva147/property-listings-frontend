import { z } from 'zod';

const regexes = {
  email: /^((?!\.)[\w\-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/gm,
  password: /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?!.* ).{8,16}$/,
};

export const UserSchema = z.object({
  email: z.string().refine(
    (value) => {
      try {
        regexes.email.test(value);
      } catch (error) {
        console.log('error:', error);
      }
    },
    { message: 'Invalid email' },
  ),
  password: z.string().refine(
    (value) => {
      try {
        console.log('value:', value);
        regexes.password.test(value);
      } catch (error) {
        console.log('error:', error);
      }
    },
    {
      message:
        'Password must contain 1 digit, 1 lowercase, 1 uppercase, 1 special character, 8-16 characters long.',
    },
  ),
});

export type User = z.infer<typeof UserSchema>;
