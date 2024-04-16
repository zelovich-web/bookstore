import React, { useState, useEffect } from 'react';
import styles from './Input.module.css';
import axios from 'axios';
import { Link, useNavigate  } from 'react-router-dom';
const Input: React.FC = () => {
  const [books, setBooks] = useState<any[]>(['']);
  const [query, setQuery] = useState<string>('');
    
  const navigate = useNavigate();
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
  };

  

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter' && query.length >= 1 && query.trim() !== '') {
      navigate(`/search/${query}`);
    }
  }

  const handleAllResultsClick = () => {
    navigate(`/search/${query}`);
    setQuery('');
  }

  const handleBookClick = () => {
    setQuery('');
  }

  useEffect(() => {
    const fetchData = async (searchQuery: string) => {
      try {
        const response = await axios.get(`https://api.itbook.store/1.0/search/${searchQuery}`);
        setBooks(response.data.books);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    if (query) {
      fetchData(query);
    }
  }, [query]);
    
    
   
  return (
    <>
       <div>
          <input
              value={query}
              onChange={handleInputChange}
              placeholder="Search"
              className={styles.Input}
              type="text"
              onKeyDown={handleKeyDown}
       />
      </div>
      {query && books.length > 0 ?(
        <div  className={styles.QueryWrapp}>
        {books.slice(0, 5).map((query, index) => (
          <Link key={index} onClick={handleBookClick} style={{ textDecoration: 'none', color:'#313037', fontFamily:'Helios' }} to={`/books/${query.isbn13}`}>
              <div className={styles.QueryItems}>
                  <div className={styles.ImgBg}>
                      <img className={styles.QueryImg} src={query.image} alt="" />
                  </div>
                  <p className={styles.QueryTitle}>{query.title}</p>
              </div>
          </Link>
))}
        <div onClick={handleAllResultsClick} className={styles.QueryAllResults}>all results </div>
        </div>
      ):(
        <div></div>  
      )}
    </>
  );
};

export default Input;