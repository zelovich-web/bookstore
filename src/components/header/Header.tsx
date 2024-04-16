import React, { useState, useEffect } from 'react';
import styles from './Header.module.css'
import Bookstore from './header assets/Bookstore.svg'
import Heart from './header assets/heart 1.svg'
import Shopping from './header assets/shopping-bag 1.svg'
import User from './header assets/user.svg'
import Input from './Input/Input'
import ShoppingFull from './header assets/shopingFull.svg'
import HeartFull from './header assets/heartFull.svg'
import { Link} from 'react-router-dom'
import useAuth from '../../Helpers/useAuth';




const Header:React.FC = () => {

  const { isAuthenticated } = useAuth()
  const [basket, setBasket] = useState<any[]>([]);
  const [favorites, setfavorites] = useState<any[]>([]);
  const updateBasketFromStorage = () => {
    const storedBasket = JSON.parse(localStorage.getItem('basket') || '[]');
    setBasket(storedBasket);
  };

  useEffect(() => {
    updateBasketFromStorage();
  }, []);

  const updateFavoritesFromStorage = () => {
    const storedFavorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    setfavorites(storedFavorites);
  };

  useEffect(() => {
    updateFavoritesFromStorage();
  }, []);

  return (
    <div className={styles.Wrapper}>
      <Link to='/'>
        <img src={Bookstore} alt="" className={styles.Logo} />
      </Link>
      <Input></Input>
      <ul className={styles.Nav}>
        {favorites.length > 0 ? <Link className={styles.Favorite} to='/favoritebook'><li><img src={HeartFull} alt="" /></li></Link> : <Link to='/favoritebook'><li><img src={Heart} alt="" /></li></Link>}
        {basket.length > 0 ? <Link to='/basket'><li><img src={ShoppingFull} alt="" /></li></Link> : <Link to='/basket'><li><img src={Shopping} alt="" /></li></Link>}
        {isAuthenticated ? <Link className={styles.Profile} to="/profile"><img src={User} alt="" /></Link> : <Link to="/login"><img src={User} alt="" /></Link>}
      </ul>
    </div>
    
  )
}

export default Header
