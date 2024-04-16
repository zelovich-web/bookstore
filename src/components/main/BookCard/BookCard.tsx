import React, {useState, useEffect} from 'react'
import styles from './BookCard.module.css';
import Stars from './Stars';
import {BookCardProps} from '/Bookstore/src/types/BookCardProps'
import fetchData from '../../../Helpers/fetchData'
import { Link } from 'react-router-dom'
import useRandomColor from '../../../Helpers/randomColorHook';
const BookCard: React.FC<BookCardProps> = (props) => {
  
  const [bookInfo, setBookInfo] = useState<any>([]);
    const randomColor = useRandomColor();
  useEffect(() => {
    const fetchBookInfo = async () => {
      const apiData = await fetchData(`https://api.itbook.store/1.0/books/${props.isbn13}`);
      setBookInfo(apiData);
    };


    fetchBookInfo();
  }, [props.isbn13]);
  
  
  return (
    <div className={styles.Wrapper}>
      <Link to={`/books/${props.isbn13}`}>
        <div className={styles.ImageBackground } style={{ backgroundColor: randomColor }}>
         <img  className={styles.Image} src={props.image} alt="" />
       </div>
      </Link>
      <h3 className={styles.Title}>{props.title}</h3>
            {bookInfo && bookInfo.authors && (
        <span className={styles.Authors}>by {bookInfo.authors.split(',')[0]}, {bookInfo.publisher} {bookInfo.year}</span>
      )}
      <div className={styles.PriceRating}>
        <p  className={styles.Price}>{props.price}</p>
        <Stars rating={bookInfo.rating}/>
      </div>
    </div>
    
  )
}

export default BookCard
