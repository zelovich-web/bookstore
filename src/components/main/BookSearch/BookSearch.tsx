import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';
import BookList from '../BookList/BookList'
import axios from 'axios'
import Pagination from '../Pagination/Pagination';
import styles from '../Main.module.css'

const BookSearch = () => {
  const [books, setBooks] = useState([]);
  const { query } = useParams();
  const [pageNumber, setPageNumber] = useState(1);
  const booksPerPage = 6;
  const [totalBooks, setTotalBooks] = useState(0);
  

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`https://api.itbook.store/1.0/search/${query}?page=${pageNumber}`);
        setBooks(response.data.books);
        console.log(books);
        
        
        
        
        setTotalBooks(response.data.total);
      } catch (error) {
        console.error('Error:', error);
      }
    };
    fetchData();
  }, [query, pageNumber]);

  const handlePageChange = async (selected: number) => {
    setPageNumber(selected);
    
    try {
      const response = await axios.get(`https://api.itbook.store/1.0/search/${query}?page=${pageNumber}`);
      setBooks(response.data.books); 
      setTotalBooks(response.data.total); 
    } catch (error) {
      console.error('Error:', error);
    }
  };
  
  
  const pageCount = Math.ceil(totalBooks / booksPerPage);

  return (
   <>
          <h1 className={styles.Title}>‘{query}’ Search results</h1>
          <span className={styles.FoundBooks}>Found {totalBooks} books</span>
          <div className={styles.Wrapper}>
          <BookList books={books} />
          </div>
          <Pagination pageCount={pageCount} onPageChange={handlePageChange} />
   </>
  );
}

export default BookSearch;