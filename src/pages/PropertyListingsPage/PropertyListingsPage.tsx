import { useQuery } from '@tanstack/react-query';
import classes from './property-listings-page.module.scss';
import { propertyListingsService } from '../../services/properyListing.service';
import { PropertyListingCard } from '../../components/PropertyListingCard';
import { loader } from '../../constants/general.const';

export interface PropertyListingsPageProps {}

export const PropertyListingsPage = (props: PropertyListingsPageProps) => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ['propertyListings'],
    queryFn: () => propertyListingsService.getAll(),
  });

  if (isError) return <div>Error fetching property listings</div>;
  if (isLoading || !data) return loader;
  return (
    <div className={classes.container}>
      {data.map((property) => (
        <PropertyListingCard property={property} key={property.mlsId} />
      ))}
    </div>
  );
};
