import { z } from 'zod';

const customValidations = {
  positiveNumber: z.number().positive().max(999999999),
  text: z.string().min(1).max(255),
  numberString: z.coerce.number().positive().max(99999),
  photo: z.string().startsWith('https://d2bd5h5te3s67r.cloudfront.net'),
};

export const PropertySchema = z.object({
  bathsFull: customValidations.positiveNumber,
  bathsHalf: customValidations.positiveNumber,
  bedrooms: customValidations.positiveNumber,
  area: customValidations.positiveNumber,
});

export const AddressSchema = z.object({
  crossStreet: customValidations.text,
  state: customValidations.text,
  country: customValidations.text,
  postalCode: customValidations.numberString,
  streetName: customValidations.text,
  streetNumberText: customValidations.numberString,
  city: customValidations.text,
  streetNumber: customValidations.positiveNumber,
  full: customValidations.text,
  unit: customValidations.text,
});

export const PropertyListingSchema = z.object({
  property: PropertySchema,
  address: AddressSchema,
  listDate: customValidations.text,
  photos: customValidations.photo.array(),
  listPrice: z.number().min(0).max(999999999999),
  mlsId: customValidations.positiveNumber,
});

export type PropertyListing = z.infer<typeof PropertyListingSchema>;
