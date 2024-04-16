import React, {useState, useEffect} from 'react'
import Header from './components/header/Header'
import Footer from './components/footer/Footer'
import './App.css'
import useRoutes from './Helpers/useRouters'
function App() {

    const routes = useRoutes();

  return (
    <div className='container'>
        <Header/>
      {routes}
      <Footer/>
    </div>
  )
}

export default App;