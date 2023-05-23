import {Toaster, toast} from 'react-hot-toast';

import { Button } from "./Button/Button";
import { ImageGallery } from "./ImageGallery/ImageGallery";
import { Loader } from "./Loader/Loader";
import { Modal } from "./Modal/Modal";
import { Searchbar } from "./Searchbar/Searchbar";
import { useState, useEffect } from 'react';
import { findPic } from '../api/findPic'


export class App extends Component {
  state = {
    search: '',
    images: [],
    page: 1,
    total: 1,
    isLoading: false, 
    error: null,
    showModal: false,
    empty: false,
}
  
  componentDidUpdate(prevProps, prevState) {
const {search, page} = this.state
    if (
      prevState.search !== search ||
      prevState.page !== page
    ) {
      this.getData(search, page);
    }
  }
      
     getData = (titlePic, page) => {
       this.setState({ isLoading: true });
       
     findPic(titlePic, page)
      .then(response => response.json())
      .then(data => {

          if (data.hits.length === 0) {
          this.setState({ empty: true });
        }
       this.setState(prevState => ({
         images: [...prevState.images, ...data.hits], 
         total: data.total,
         page: prevState.page,
        }));
      })
       .catch(error => {
         this.setState({ error: error.message });
       }) 
      .finally(() => {
        this.setState({ isLoading: false }); 
      });
  };

   loadingMore = () => {
    this.setState(prevState => ({
      page: prevState.page + 1, 
    }));
  };

   openModal = (largeImageURL, alt) => {
    this.setState(({ showModal }) => {
      return { showModal: !showModal, largeImageURL, alt };
    });
  };

  closeModal = () => {
    this.setState(({ showModal }) => {
      
      return { showModal: !showModal };
    });
  };
  handleSubmit = (value) => {
    if (value === this.state.search) {
      toast.error('It is the same query');
      return;
}
    this.setState({
      search: value,
    images: [],
    page: 1,
    total: 1,
    isLoading: false, 
    error: null,
    empty: false,
    });
}

  render() {
    
    const { error, isLoading, images, total, page } = this.state;
 
    return (
      <div>
        <Toaster
          position="top-center"
          toastOptions={{
            duration: 3000,
     
            style: {
              fontSize: '28px',
              // color: '#fff',
            }
          }}
        />
        <Searchbar handleSubmit={this.handleSubmit} />
        {error && (
          <h3>Something happed ({error}), please try again </h3>
        )}


        <ImageGallery controlModal={this.openModal} images={images} />
        
        {isLoading && <Loader  />}

        {this.state.empty && (
          <h3 style={{color: '#FF35ff', textAlign: 'center', fontSize: '36px'}}>We don't have such images</h3>
        )}

      
       {total / 12 > page && <Button loadingMore={this.loadingMore} />}
      
        {this.state.showModal && (
          <Modal closeModal={this.closeModal}>
            <img src={this.state.largeImageURL} alt={this.state.alt} />
          </Modal>
        )}
        
      </div>
    );
  }
};

export const App = () => {
  const [search, setSearch] = useState('');
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(1);
  const [isloading, setIsloading] = useState(false);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [empty, setEmpty] = useState(false);

const loadingMore = () => {
    setPage(prevState => ({
       prevState + 1, 
    }));
};
  
// const openModal = (largeImageURL, alt) => {
//     this.setState(({ showModal }) => {
//       return { showModal: !showModal, largeImageURL, alt };
//     });
//   };

 const closeModal = () => {
    setShowModal(({ showModal }) => {
      
      return { showModal: !showModal };
    });
  };

   return (
      <div>
        <Toaster
          position="top-center"
          toastOptions={{
            duration: 3000,
     
            style: {
              fontSize: '28px',
              // color: '#fff',
            }
          }}
        />
        <Searchbar handleSubmit={this.handleSubmit} />
        {error && (
          <h3>Something happed ({error}), please try again </h3>
        )}


        <ImageGallery controlModal={this.openModal} images={images} />
        
        {isLoading && <Loader  />}

        {this.state.empty && (
          <h3 style={{color: '#FF35ff', textAlign: 'center', fontSize: '36px'}}>We don't have such images</h3>
        )}

      
       {total / 12 > page && <Button loadingMore={loadingMore} />}
      
        {this.state.showModal && (
          <Modal closeModal={this.closeModal}>
            <img src={this.state.largeImageURL} alt={this.state.alt} />
          </Modal>
        )}
        
      </div>
    );
}