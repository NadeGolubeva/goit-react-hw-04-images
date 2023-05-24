import PropTypes from 'prop-types'; 
import css from './Searchbar.module.css';
import { useState } from 'react';
import { toast } from 'react-hot-toast';
import { GrSearch } from "react-icons/gr";




export const Searchbar = ({handleSubmit}) => {
  const [search, setSearch] = useState('');

   return (
       <header
         className={css.searchbar}>
         <form
           className={css.searchForm}
           onSubmit={e => {
             e.preventDefault();
             if (!search.trim()) {
               return toast.error('Enter text to find pictures');
             }
             handleSubmit(search);
             const value = search;
             return value;
   
           }} >
           <button
             type="submit"
             className={css.searchFormButton}>
             <GrSearch size='25' />
           </button>

           <input
           value={search}
           onChange={e => setSearch(e.target.value)}
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
}

Searchbar.propTypes = {
   handleSubmit: PropTypes.func.isRequired
 }