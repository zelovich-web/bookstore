import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styles from './FavoriteBook.module.css';
import { BookData } from '../../../types/BookData';
import Stars from '../BookCard/Stars';
import useRandomColor from '../../../Helpers/randomColorHook';
import PopularBooks from './PopularBooks/PopularBooks';

const FavoriteBook:React.FC = () => {
  const [favorites, setFavorites] = useState<BookData[]>(JSON.parse(localStorage.getItem('favorites') || '[]'));
  const randomColor = useRandomColor();
  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    setFavorites(storedFavorites);
  }, []);

  const removeFromFavorites = (isbn: string| undefined) => {
    const updatedFavorites = favorites.filter((book) => book.isbn13 !== isbn);
    localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
    setFavorites(updatedFavorites);
  };

  return (
    <>
      <Link to="/">
        <svg className={styles.Arrow} width="42" height="14" viewBox="0 0 42 14" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path fillRule="evenodd" clipRule="evenodd" d="M8.00116 0.998965C8.00116 1.25897 7.90116 1.50897 7.71116 1.70897L3.41116 5.99897L41.0012 5.99897C41.5512 5.99897 42.0012 6.44896 42.0012 6.99896C42.0012 7.54896 41.5512 7.99896 41.0012 7.99896L3.41116 7.99896L7.71116 12.289C8.10116 12.679 8.10116 13.319 7.71116 13.709C7.32116 14.099 6.68116 14.099 6.29116 13.709L0.291162 7.70896C0.201162 7.61896 0.131162 7.50896 0.0811621 7.38896C0.0611621 7.33896 0.0411621 7.29896 0.0411621 7.24896C-0.00883789 7.08896 -0.00883789 6.90896 0.0411621 6.74896C0.0411621 6.69896 0.0611621 6.65897 0.0811621 6.60896C0.131162 6.48897 0.201162 6.37896 0.291162 6.28896L6.29116 0.288965C6.68116 -0.101035 7.32116 -0.101035 7.71116 0.288965C7.90116 0.488965 8.00116 0.738965 8.00116 0.998965Z" fill="#313037"/>
        </svg>
      </Link>
      <h2 className={styles.FavoriteBookTitle}>Favorites</h2>
      <div>
          {favorites.length > 0 ? (  
            favorites.map((book: BookData) => (
              <div className={styles.FavoriteCard} key={book.isbn13}>
                <Link to={`/books/${book.isbn13}`}>
                <div style={{backgroundColor: randomColor}}  className={styles.ImgBg}>
                    <img className={styles.Img} src={book.image} alt="" />
                </div>
                </Link>
                <div className={styles.FavoriteCardInfo}>
                    <h3 className={styles.FavoriteCardInfoTitle}>
                    {book.title}
                  </h3>
                  <span className={styles.FavoriteCardInfoSubTitle}>
                     by {book.authors?.split(',')[0]}, {book.publisher} {book.year}
                  </span>
                  <div className={styles.FavoriteCardRating}>
                    <p className={styles.FavoriteBookPrice}>{book.price}</p>
                    <Stars rating={book.rating} />
                  </div>
                </div>
                <div className={styles.FavoriteBookLike}>
                  <svg onClick={() => removeFromFavorites(book.isbn13)} width="18" height="16" viewBox="0 0 18 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M16.612 1.41452C16.1722 0.966073 15.65 0.610337 15.0752 0.367629C14.5005 0.124922 13.8844 0 13.2623 0C12.6401 0 12.0241 0.124922 11.4493 0.367629C10.8746 0.610337 10.3524 0.966073 9.91255 1.41452L8.99977 2.34476L8.08699 1.41452C7.19858 0.509117 5.99364 0.0004693 4.73725 0.000469309C3.48085 0.000469319 2.27591 0.509117 1.38751 1.41452C0.499101 2.31992 9.36088e-09 3.5479 0 4.82833C-9.36088e-09 6.10875 0.499101 7.33674 1.38751 8.24214L2.30029 9.17238L8.99977 16L15.6992 9.17238L16.612 8.24214C17.0521 7.79391 17.4011 7.26171 17.6393 6.67596C17.8774 6.0902 18 5.46237 18 4.82833C18 4.19428 17.8774 3.56645 17.6393 2.9807C17.4011 2.39494 17.0521 1.86275 16.612 1.41452Z" fill="#FC857F"/>
                  </svg>
                </div>
              </div>
            ))) : (
            <p>Книг нет</p>
          )}      
      </div>
      <PopularBooks/>
    </>
  )
};

export default FavoriteBook;