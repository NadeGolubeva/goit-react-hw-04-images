import css from './ImageGallery.module.css';
import PropTypes from 'prop-types';
import {ImageGalleryItem} from '../ImageGalleryItem/ImageGalleryItem';

export const ImageGallery = ({ images, openModal }) => (
  <ul className={css.gallery}>
    {images.map(({ id, webformatURL, largeImageURL }) => (
      <ImageGalleryItem
        key={id}
        webformatURL={webformatURL}
        largeImageURL={largeImageURL}
        openModal={openModal}
      />
    ))}
  </ul>
);

ImageGallery.propTypes = {
  images: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      webformatURL: PropTypes.string.isRequired,
      largeImageURL: PropTypes.string.isRequired,})
  ),
  openModal: PropTypes.func.isRequired,
};


