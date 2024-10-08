import { Counter } from '../models/counter.model';
import { authInstance } from './index.service';

const PREFIX = 'counter';

class CounterService {
  async getCount() {
    try {
      return (await authInstance.get<Counter>(`${PREFIX}`)).data;
    } catch (error) {
      throw new Error('Failed to fetch property listings');
    }
  }
  async incrementCount() {
    try {
      return (await authInstance.put<Counter>(`${PREFIX}/add`)).data;
    } catch (error) {
      throw new Error('Failed to fetch property listings');
    }
  }
}

export const counterService = new CounterService();
