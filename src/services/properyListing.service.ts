import axios from 'axios';
import { PropertyListingSchema } from '../models/propertyListing.model';

class ProperyListingService {
  async getAll() {
    try {
      const response = await (
        await axios.get('https://api.simplyrets.com/properties', {
          auth: { password: 'simplyrets', username: 'simplyrets' },
        })
      ).data;

      const data = PropertyListingSchema.array().parse(response);

      return data;
    } catch (error) {
      console.log('Error', error);
      throw new Error('Failed to fetch property listings');
    }
  }
}

export const propertyListingsService = new ProperyListingService();
