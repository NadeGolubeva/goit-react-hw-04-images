import PropTypes from 'prop-types'; 
import css from './Searchbar.module.css';
import { Component } from 'react';
import { toast } from 'react-hot-toast';
import { GrSearch } from "react-icons/gr";

export class Searchbar extends Component {
  state = {
    search: '',
  }
  onChangeInput = (e) => {
    const { name, value } = e.currentTarget; 
    this.setState({ [name]: value });
    // console.log(name, value);
  }

  // resetForm = () => {
  //   this.setState({ search: '' });
  // }
  
  render() {
     return (
       <header
         className={css.searchbar}>
         <form
           className={css.searchForm}
           onSubmit={e => {
             e.preventDefault();
             if (!this.state.search.trim()) {
               return toast.error('Enter text to find pictures');
             }
             this.props.handleSubmit(this.state.search);
             const value = this.state.search;
             return value;
   
             //  this.resetForm();
           }} >
           <button
             type="submit"
             className={css.searchFormButton}>
             <GrSearch size='25' />
           </button>

           <input
           value={this.state.search}
           onChange={this.onChangeInput}
           className={css.searchFormInput}
           name="search"
           type="text"
           autoComplete="off"
           autoFocus
           placeholder="Search images and photos"
           />
  </form>
</header>
    )
  };
 }

Searchbar.propTypes = {
   handleSubmit: PropTypes.func.isRequired
 }