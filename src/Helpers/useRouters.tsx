import { Route, Routes } from 'react-router-dom';
import Login from '../components/loginForm/Login';
import Profile from '../components/Profile/Profile';
import Main from '../components/main/Main';
import PrivateRoute from './PrivateRoute';
import BookInfo from '../components/main/BookInfo/BookInfo';
import FavoriteBook from '../components/main/FavoriteBook/FavoriteBook';
import BookBasket from '../components/main/BookBasket/BookBasket';
import BookSearch from '../components/main/BookSearch/BookSearch';
export const useRoutes = () => {

  return (
    <Routes>
      <Route index element={<Main />} />
      <Route path="/" element={<Main />} />
      <Route path="/login" element={<Login />} />
      <Route path="/books/:isbn13" element={<BookInfo />} />
        <Route path='/favoritebook' element={<FavoriteBook/>} />
        <Route path='/basket' element={<BookBasket/>} />
        <Route path="/search/:query" element={<BookSearch/>}/>
      <Route element={<PrivateRoute />}>
        <Route path='/profile' element={<Profile />} />
      </Route>

    </Routes>
  )
}

export default useRoutes