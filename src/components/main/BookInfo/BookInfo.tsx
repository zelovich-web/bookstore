import React, { useState, useEffect } from 'react';
import { Link, json, useParams } from 'react-router-dom';
import styles from './BookInfo.module.css'
import Stars from '../BookCard/Stars';
import { BookData } from '../../../types/BookData';
import SimilarBook from './SimilarBook/SimilarBook';
import FooterSubscribe from '../../footer/FooterSubscribe';
import useRandomColor from '../../../Helpers/randomColorHook';
const BookInfo: React.FC = () => {
  const [bookData, setBookData] = useState<BookData>();
  const { isbn13 } = useParams<{ isbn13: string }>();
  const [selectedInfo, setSelectedInfo] = useState('description')
  const [isFavorite, setIsFavorite] = useState(localStorage.getItem('favorites') ? JSON.parse(localStorage.getItem('favorites')!).some((item: BookData) => item.isbn13 === isbn13) : false);
  const [isBasket, setIsBasket] = useState(localStorage.getItem('basket') ? JSON.parse(localStorage.getItem('basket')!).some((item: BookData) => item.isbn13 === isbn13) : false)
  const randomColor = useRandomColor()
  const handleAddToFavorites = () => {
    if (bookData) {
      const favorites = localStorage.getItem('favorites');

      if (favorites) {
        const existingFavorites = JSON.parse(favorites);
        const isBookInFavorites = existingFavorites.some((item: BookData) => item.isbn13 === bookData!.isbn13);
        if (isBookInFavorites) {
          const updatedFavorites = existingFavorites.filter((item: BookData) => item.isbn13 !== bookData!.isbn13);
          localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
          setIsFavorite(false);
        } else {
          const updatedFavorites = [...existingFavorites, bookData];
          localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
          setIsFavorite(true);
        }
      } else {
        localStorage.setItem('favorites', JSON.stringify([bookData]));
        setIsFavorite(true);
      }
    }
  };
  const addToBasket = () => {
    const storedBasket = localStorage.getItem('basket');
    let basketItems = [];
    setIsBasket(true)
    if (storedBasket) {
      basketItems = JSON.parse(storedBasket);
    }
  
    
  
    const existingBook:BookData = basketItems.find(item => item.isbn13 === bookData.isbn13);
  
    if (existingBook) {
      existingBook.quantity = (existingBook.quantity || 1) + 1;
      
    } else {
      bookData.quantity = 1;
      basketItems.push(bookData);
    }
  
    localStorage.setItem('basket', JSON.stringify(basketItems));
    console.log(basketItems);
      
  }
  
  


  let content;
  if (!bookData) {
    content = <p>Loading...</p>;
  } else if (selectedInfo === 'description') {
    content = <p>{bookData.desc}</p>;
  } else if (selectedInfo === 'authors') {
    content = <p>{bookData.authors}</p>;
  } else if (selectedInfo === 'reviews') {
    content = <p>Rating of this book: {bookData.rating} </p>; 
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`https://api.itbook.store/1.0/books/${isbn13}`);
        if (response.ok) {
          const data: BookData = await response.json();
          setBookData(data);
        } else {
          console.error('Failed to fetch data');
        }
      } catch (error) {
        console.error('Error fetching data', error);
      }
    };

    fetchData();
  }, [isbn13]);

  
 

  return (
    <div>
      {bookData ? (
        <>
          <Link to='/'><svg className={styles.Arrow} width="42" height="14" viewBox="0 0 42 14" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" clipRule="evenodd" d="M8.00116 0.998965C8.00116 1.25897 7.90116 1.50897 7.71116 1.70897L3.41116 5.99897L41.0012 5.99897C41.5512 5.99897 42.0012 6.44896 42.0012 6.99896C42.0012 7.54896 41.5512 7.99896 41.0012 7.99896L3.41116 7.99896L7.71116 12.289C8.10116 12.679 8.10116 13.319 7.71116 13.709C7.32116 14.099 6.68116 14.099 6.29116 13.709L0.291162 7.70896C0.201162 7.61896 0.131162 7.50896 0.0811621 7.38896C0.0611621 7.33896 0.0411621 7.29896 0.0411621 7.24896C-0.00883789 7.08896 -0.00883789 6.90896 0.0411621 6.74896C0.0411621 6.69896 0.0611621 6.65897 0.0811621 6.60896C0.131162 6.48897 0.201162 6.37896 0.291162 6.28896L6.29116 0.288965C6.68116 -0.101035 7.32116 -0.101035 7.71116 0.288965C7.90116 0.488965 8.00116 0.738965 8.00116 0.998965Z" fill="#313037"/>
            </svg>
          </Link>
        <h1 className={styles.BookInfoTitle}>{bookData.title}</h1>
          <div className={styles.BookInfoWrapp}>
            <div style={{backgroundColor:randomColor}} className={styles.BookInfoImgBg}>
               <img className={styles.BookInfoImg} src={bookData.image} alt={bookData.title} />
                  <div onClick={handleAddToFavorites } className={styles.Favorite}>
                  <svg width="20" height="18" viewBox="0 0 20 18" fill={isFavorite ? '#FC857F' : 'none'} xmlns="http://www.w3.org/2000/svg">
                  <path d="M17.612 2.41452C17.1722 1.96607 16.65 1.61034 16.0752 1.36763C15.5005 1.12492 14.8844 1 14.2623 1C13.6401 1 13.0241 1.12492 12.4493 1.36763C11.8746 1.61034 11.3524 1.96607 10.9126 2.41452L9.99977 3.34476L9.08699 2.41452C8.19858 1.50912 6.99364 1.00047 5.73725 1.00047C4.48085 1.00047 3.27591 1.50912 2.38751 2.41452C1.4991 3.31992 1 4.5479 1 5.82833C1 7.10875 1.4991 8.33674 2.38751 9.24214L3.30029 10.1724L9.99977 17L16.6992 10.1724L17.612 9.24214C18.0521 8.79391 18.4011 8.26171 18.6393 7.67596C18.8774 7.0902 19 6.46237 19 5.82833C19 5.19428 18.8774 4.56645 18.6393 3.9807C18.4011 3.39494 18.0521 2.86275 17.612 2.41452V2.41452Z" stroke={isFavorite ? '#FC857F' : 'white'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>

                  </div>
             
            </div>
            
              <div className={styles.BookInfoBasket}>
                <div className={styles.BookInfoGrade}>
                  <p className={styles.BookInfoPrice}>{bookData.price}</p>
                  <Stars rating={bookData.rating}/>
                </div>
                <div className={styles.UlContainer}>
                  <div className={styles.ListLeft}>
                    <p>Authors</p>
                    <p>Publisher</p>
                    <p>Language</p>
                    <p>Format</p>
                   </div>
                  <div className={styles.ListRight}>
                    <p>{bookData.authors.split(',')[0]}</p>
                    <p>{bookData.publisher}</p>
                    <p>{bookData.language}</p>
                    <p>Paper book / ebook (PDF)</p>
                  </div>
               </div>
              <div className={styles.DropdownWrap}>
                  <p className={styles.Dropdown}>More detailse </p>
                  <svg className={styles.ArrowBtm} width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 6L8 10L4 6" stroke="#313037" strokeWidth="2" strokeLinecap="round"/>
                  </svg>

              </div>
                    <div className={styles.Btns}>
                      <button   disabled={isBasket} onClick={addToBasket} className={styles.BookInfoBtn}>add to cart</button>
                      <Link to='/' className={styles.Preview}>Preview</Link>
                    </div>
              </div>
         </div>
         <div className={styles.BookInfoItems}>
            <div onClick={() => setSelectedInfo('description')} style={{ color: selectedInfo === "description" ? "#313037" : "#A8A8A8" }}><p>Description</p></div>
            <div onClick={() => setSelectedInfo('authors')} style={{ color: selectedInfo === "authors" ? "#313037" : "#A8A8A8" }}><p>Authors</p></div>
            <div onClick={() => setSelectedInfo('reviews')} style={{ color: selectedInfo === "reviews" ? "#313037" : "#A8A8A8" }}><p>Reviews</p></div>
         </div>
            <div className={styles.BookItemsDesc}>
              {content}
            </div>
          <div className={styles.SocialItems}>
              <svg width="13" height="22" viewBox="0 0 13 22" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 1H9C7.67392 1 6.40215 1.52678 5.46447 2.46447C4.52678 3.40215 4 4.67392 4 6V9H1V13H4V21H8V13H11L12 9H8V6C8 5.73478 8.10536 5.48043 8.29289 5.29289C8.48043 5.10536 8.73478 5 9 5H12V1Z" stroke="#313037" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
            <svg width="24" height="20" viewBox="0 0 24 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M23 1.00005C22.0424 1.67552 20.9821 2.19216 19.86 2.53005C19.2577 1.83756 18.4573 1.34674 17.567 1.12397C16.6767 0.901206 15.7395 0.957242 14.8821 1.2845C14.0247 1.61176 13.2884 2.19445 12.773 2.95376C12.2575 3.71308 11.9877 4.61238 12 5.53005V6.53005C10.2426 6.57561 8.50127 6.18586 6.93101 5.39549C5.36074 4.60513 4.01032 3.43868 3 2.00005C3 2.00005 -1 11 8 15C5.94053 16.398 3.48716 17.099 1 17C10 22 21 17 21 5.50005C20.9991 5.2215 20.9723 4.94364 20.92 4.67005C21.9406 3.66354 22.6608 2.39276 23 1.00005V1.00005Z" stroke="#313037" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 13C12.5523 13 13 12.5523 13 12C13 11.4477 12.5523 11 12 11C11.4477 11 11 11.4477 11 12C11 12.5523 11.4477 13 12 13Z" stroke="#313037" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M19 13C19.5523 13 20 12.5523 20 12C20 11.4477 19.5523 11 19 11C18.4477 11 18 11.4477 18 12C18 12.5523 18.4477 13 19 13Z" stroke="#313037" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M5 13C5.55228 13 6 12.5523 6 12C6 11.4477 5.55228 11 5 11C4.44772 11 4 11.4477 4 12C4 12.5523 4.44772 13 5 13Z" stroke="#313037" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>




          </div>
          <FooterSubscribe/>
          <SimilarBook bookTitle={bookData.title}/>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default BookInfo;