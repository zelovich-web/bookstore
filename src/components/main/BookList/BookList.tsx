import React from 'react';
import { BookCardProps } from '/Bookstore/src/types/BookCardProps';
import BookCard from '../BookCard/BookCard';
import { BookListProps } from '../../../types/BookListProps';
import styles from '../Main.module.css'
const BookList: React.FC<BookListProps> = ({ books }) => {

  return (
    <div className={styles.Wrapper}>
      {books.map((book: BookCardProps) => (
        <BookCard
          key={book.isbn13}
          image={book.image}
          title={book.title}
          price={book.price}
          isbn13={book.isbn13}
        />
      ))}
    </div>
  );
};
export default BookList;