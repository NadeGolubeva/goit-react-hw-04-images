import { useEffect } from 'react';
import css from './Modal.module.css';
import PropTypes from 'prop-types';

export const Modal = ({ controlModal, largeImageURL }) => {
  useEffect(() => {
    const handleKeyPress = e => {
      if (e.code === 'Escape') {
        controlModal();
      }
    };

    window.addEventListener('keydown', handleKeyPress); 
    return () => {
      window.removeEventListener('keydown', handleKeyPress); 
    };
  }, [controlModal]);

  return (
    <div className={css.overlay} onClick={controlModal}>
      <div className={css.modal}
      >
        <img src={largeImageURL} alt="" />
      </div>
    </div>
  );
};

Modal.propTypes = {
  largeImageURL: PropTypes.string,
  controlModal: PropTypes.func,
};

