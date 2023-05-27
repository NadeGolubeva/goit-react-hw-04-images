import { useState, useEffect } from 'react';
import {findPic} from '../services/api'
import '../index.css';
import {Searchbar} from './Searchbar/Searchbar';
import {ImageGallery} from './ImageGallery/ImageGallery';
import {Button} from './Button/Button';
import {Modal} from './Modal/Modal';
import {Loader} from './Loader/Loader';

export const App = () => {
  const [searchValue, setSearchValue] = useState('');
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(0);
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [total, setTotal] = useState(0);
  const [error, setError] = useState(null);
  const [modal, setModal] = useState({
    showModal: false,
    largeImageURL: '',
  });
  const [noResults, setNoResults] = useState(false);

  const onChange = event => {
    setSearchValue(event.target.value);
  };

  const onSubmit = e => {
    e.preventDefault(); 

    if (searchValue === '') {
      alert('Please enter your query'); 
      return;
    }

    if (query === searchValue) return; 
    setImages([]);
    setQuery(searchValue);
    setPage(1);
  };

  const loadingMore = () => { 
    setPage(prevState => prevState + 1);
  };

  const controlModal = () => {
    setModal(prevState => ({ ...prevState, showModal: !prevState.showModal })); 
  };

  const openModal = largeImageURL => {
    setModal(prevState => ({ ...prevState, largeImageURL }));
    controlModal();
  };

  useEffect(() => {
    if (page === 0) return;

    const fetchImagesByQuery = async searchQuery => {
      setIsLoading(true); 
      setError(null); 
      setNoResults(false);

      try {
        const response = await findPic(searchQuery, page);
        setImages(prevState => [...prevState, ...response.hits]);
        setTotal(Math.ceil(response.totalHits / 12));
        response.totalHits === 0 && setNoResults(true); 

      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false); 
      }
    };

    fetchImagesByQuery(query);
  }, [page, query]);

  return (
    <div className="App">
      <Searchbar
        onSubmit={onSubmit}
        onChange={onChange}
        searchValue={searchValue}
      />
      <div>
        {error && <p className="notification">Something happend: {error.message}</p>}

        {noResults && <p className="notification">Sorry, we didn't find such query </p>}

        {isLoading && <Loader />}
        <ImageGallery images={images} openModal={openModal} />
      </div>
      {page < total && !isLoading ? (
        <Button loadingMore={loadingMore} />
      ) : (
        <div></div>
      )}
      {modal.showModal && <Modal controlModal={controlModal} largeImageURL={modal.largeImageURL} />}
    </div>
  );
};


