import React, { useState, useEffect } from 'react';
import styles from './Main.module.css';
import BookList from './BookList/BookList'
import Pagination from './Pagination/Pagination';
import axios from 'axios';
import { BookCardProps } from '../../types/BookCardProps';
import FooterSubscribe from '../footer/FooterSubscribe';
const Main: React.FC = () => {
  const [books, setBooks] = useState<BookCardProps[]>([]);
  const [pageNumber, setPageNumber] = useState(1);
  const booksPerPage = 12;
  const startIndex = (pageNumber - 1) * booksPerPage;
  const endIndex = Math.min(startIndex + booksPerPage, books.length);
  const visibleBooks = books.slice(startIndex, endIndex);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://api.itbook.store/1.0/new');
        setBooks(response.data.books);
      } catch (error) {
        console.error('Error:', error);
      }
    };
    fetchData();
  }, []);

  const pageCount = Math.ceil(books.length / booksPerPage);

  const handlePageChange = (selected: number) => {
    setPageNumber(selected);
  };

  return (
    <>
      <h1 className={styles.Title}>New Releases Books</h1>
      <div className={styles.Wrapper}>
      <BookList books={visibleBooks} /> 
      </div>
      <Pagination pageCount={pageCount} onPageChange={handlePageChange} />
      <FooterSubscribe/>
      
    </>
  );
};

export default Main;