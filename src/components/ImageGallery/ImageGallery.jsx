
import PropTypes from "prop-types"
import { ImageGalleryItem } from "components/ImageGalleryItem/ImageGalleryItem"
import css from './ImageGallery.module.css';

export const ImageGallery = ({images, controlModal}) => { 

    return (
    
<ul className={css.gallery}>
        {images.map(item => (
          <ImageGalleryItem item={item} key={item.id} 
            controlModal={controlModal}
          onClick={(evt) =>
            { controlModal (item.largeImageURL, item.tags); }}/>
        ))}
     
      </ul>

  
)
}
ImageGallery.propTypes = {
  images: PropTypes.shape({
    webformatURL: PropTypes.string.isRequired,
    largeImageURL: PropTypes.string.isRequired,
    tags: PropTypes.string.isRequired,
  }).isRequired,
    controlModal: PropTypes.func.isRequired,
}