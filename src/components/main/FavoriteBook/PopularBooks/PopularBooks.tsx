import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import BookCard from '../../BookCard/BookCard';
import { Book } from '../../../../types/Book';
import styles from './PopularBooks.module.css'
type PopularBooks = {
  bookTitle?: string;
};

const PopularBooks: React.FC<PopularBooks> = () => {
  const [PopularBooks, setPopularBooks] = useState<Book[]>([]);
  const sliderRef = useRef<HTMLDivElement>(null);
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`https://api.itbook.store/1.0/new`);
        if (response.status === 200) {
          const data = response.data;
          setPopularBooks(data.books);
        }
      } catch (error) {
        console.error('Ошибка при получении данных:', error);
      }
    };
    fetchData();
  });

  const handleNextClick = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollLeft += 384; 
    }
  };

  const handlePrevClick = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollLeft -= 384;
    }
  };

  return (
    <div className={styles.SliderContainer}>
      <div className={styles.SlliderItems}>
        <h2 className={styles.SliderTitle}>Popular Books</h2>
            <div className={styles.SliderSvg}>
                    <svg onClick={handlePrevClick} width="18" height="14" viewBox="0 0 18 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" clipRule="evenodd" d="M7.7075 13.7125C7.8975 13.5125 7.9975 13.2625 7.9975 13.0025C7.9975 12.7425 7.8975 12.4925 7.7075 12.2925L3.4075 8.0025L16.9975 8.0025C17.5475 8.0025 17.9975 7.5525 17.9975 7.0025C17.9975 6.4525 17.5475 6.0025 16.9975 6.0025L3.4075 6.0025L7.7075 1.7125C8.0975 1.3225 8.0975 0.6825 7.7075 0.2925C7.3175 -0.0975003 6.6775 -0.0975003 6.2875 0.2925L0.2875 6.2925C0.1975 6.3825 0.1275 6.4925 0.0775003 6.6125C0.0575003 6.6625 0.0375003 6.7025 0.0375003 6.7525C-0.0124997 6.9125 -0.0124997 7.0925 0.0375003 7.2525C0.0375003 7.3025 0.0575003 7.3425 0.0775003 7.3925C0.1275 7.5125 0.1975 7.6225 0.2875 7.7125L6.2875 13.7125C6.6775 14.1025 7.3175 14.1025 7.7075 13.7125Z" fill="#313037"/>
                    </svg>
                    <svg onClick={handleNextClick} width="18" height="14" viewBox="0 0 18 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" clipRule="evenodd" d="M10.2925 13.7125C10.1025 13.5125 10.0025 13.2625 10.0025 13.0025C10.0025 12.7425 10.1025 12.4925 10.2925 12.2925L14.5925 8.0025L1.0025 8.0025C0.452501 8.0025 0.0025002 7.5525 0.00250023 7.0025C0.00250025 6.4525 0.452501 6.0025 1.0025 6.0025L14.5925 6.0025L10.2925 1.7125C9.9025 1.3225 9.9025 0.6825 10.2925 0.2925C10.6825 -0.0975003 11.3225 -0.0975003 11.7125 0.2925L17.7125 6.2925C17.8025 6.3825 17.8725 6.4925 17.9225 6.6125C17.9425 6.6625 17.9625 6.7025 17.9625 6.7525C18.0125 6.9125 18.0125 7.0925 17.9625 7.2525C17.9625 7.3025 17.9425 7.3425 17.9225 7.3925C17.8725 7.5125 17.8025 7.6225 17.7125 7.7125L11.7125 13.7125C11.3225 14.1025 10.6825 14.1025 10.2925 13.7125Z" fill="#313037"/>
                </svg>
            </div>

      </div>
      <div ref={sliderRef} className={styles.Slider}>
        {PopularBooks.map((book) => (
          <div onClick={scrollToTop} key={book.isbn13} className={styles.BookCard}>
            <BookCard  price={book.price} image={book.image} isbn13={book.isbn13} title={book.title} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default PopularBooks;