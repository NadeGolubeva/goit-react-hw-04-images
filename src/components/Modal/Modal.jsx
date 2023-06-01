import { useEffect } from 'react';
import css from './Modal.module.css';
import PropTypes from 'prop-types';

export const Modal = ({ controlModal, largeImageURL }) => {
  useEffect(() => {
    const handleKeyPress = e => {
      if (e.code === 'Escape') {
        controlModal();
        console.log("key");
      }
    };

    window.addEventListener('keydown', handleKeyPress); 
    return () => {
      window.removeEventListener('keydown', handleKeyPress); 
    };
  }, [controlModal]);
  
 const handleBackdrop = event => {
   if (event.target === event.currentTarget)
     controlModal();
  };
  return (
    <div className={css.overlay} onClick={handleBackdrop}>
      <div className={css.modal}
      >
        <img src={largeImageURL} alt="" />
      </div>
    </div>
  );
};

Modal.propTypes = {
  largeImageURL: PropTypes.string.isRequired,
  controlModal: PropTypes.func.isRequired,
};

