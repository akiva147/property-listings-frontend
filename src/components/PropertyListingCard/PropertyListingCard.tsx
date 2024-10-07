import { useState } from 'react';
import { PropertyListing } from '../../models/propertyListing.model';
import classes from './property-listing-card.module.scss';
import * as heartFillComponent from '../../assets/heart-fill.svg';
import * as heartStrokeComponent from '../../assets/heart-stroke.svg';

export interface PropertyListingCardProps {
  property: PropertyListing;
}

export const PropertyListingCard = ({ property }: PropertyListingCardProps) => {
  const localStorageKey = 'favoritesProperties';

  const [isFavorite, setIsFavorite] = useState(() => {
    const favoritesProperties = localStorage.getItem(localStorageKey);

    if (!favoritesProperties) return false;

    const favoritesPropertiesArray: number[] = JSON.parse(favoritesProperties);

    return favoritesPropertiesArray.includes(property.mlsId);
  });

  const { ReactComponent: HeartFill } = heartFillComponent;
  const { ReactComponent: HeartStroke } = heartStrokeComponent;

  const baths = property.property.bathsFull + property.property.bathsHalf * 2;

  const toggleFavorite = () => {
    const favoritesProperties = localStorage.getItem(localStorageKey);
    let updatedFavorites: number[] = [];

    if (favoritesProperties) {
      const favoritesPropertiesArray: number[] =
        JSON.parse(favoritesProperties);

      if (isFavorite) {
        updatedFavorites = favoritesPropertiesArray.filter(
          (id) => id !== property.mlsId,
        );
      } else {
        updatedFavorites = [...favoritesPropertiesArray, property.mlsId];
      }
    } else if (!isFavorite) {
      updatedFavorites = [property.mlsId];
    }

    localStorage.setItem(localStorageKey, JSON.stringify(updatedFavorites));
    setIsFavorite(!isFavorite);
  };

  return (
    <div className={classes.container}>
      <section className={classes.images}>
        <img src={property.photos[0]} alt={property.address.full} />
        <span className={classes.favoriteButton} onClick={toggleFavorite}>
          {isFavorite ? <HeartFill /> : <HeartStroke />}
        </span>
      </section>
      <section className={classes.details}>
        <p>
          {property.property.bedrooms} BR | {baths} Bath |{' '}
          {property.property.area} Sq Ft
        </p>
        <strong style={{ fontSize: '1.4rem', paddingBlock: '1rem' }}>
          ${property.listPrice}
        </strong>
        <p style={{ fontSize: '.9rem' }}>{property.address.full}</p>
        <p style={{ fontSize: '.9rem', color: '#979797' }}>
          Listed: {new Date(property.listDate).toLocaleDateString('en')}
        </p>
      </section>
    </div>
  );
};
