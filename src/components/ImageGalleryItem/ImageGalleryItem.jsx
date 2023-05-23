import css from './ImageGalleryItem.module.css'
import PropTypes from 'prop-types'; 

export const ImageGalleryItem = ({controlModal, item}) => {
    return (
        <>
            <li
                onClick={(evt) =>
            { controlModal (item.largeImageURL, item.tags); }}
                className={css.galleryItem}>
          <img
            loading="lazy"
            className = { css.imageGalleryItemImage } 
            src={item.webformatURL}
            alt={item.tags}
          />
            </li>
        
        </>
)
}

ImageGalleryItem.propTypes = {
  item: PropTypes.shape({
    webformatURL: PropTypes.string.isRequired,
    largeImageURL: PropTypes.string.isRequired,
    tags: PropTypes.string.isRequired,
  }).isRequired,
    controlModal: PropTypes.func.isRequired,
};