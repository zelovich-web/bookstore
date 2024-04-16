import React, {useState, useEffect} from 'react'
import { BookData } from '../../../types/BookData';
import styles from './BookBasket.module.css'
import { Link } from 'react-router-dom';
import useRandomColor from '../../../Helpers/randomColorHook';
interface Props {
  addToBasket: (bookData: BookData) => any;
}

const BookBasket: React.FC<Props> = () => {
  const [basket, setBasket] = useState<BookData[]>(JSON.parse(localStorage.getItem('basket') || '[]'));
  const randomColor = useRandomColor();
  const [total, setTotal] = useState(0);
  const [vat, setVat] = useState(0);
  const [totalWithoutVat, setTotalWithoutVat] = useState(0)
  const [counters, setCounters] = useState<{ [isbn13: string]: number }>({});
  
  const incr = (isbn13:string) => {
    setCounters((prevCounters) => ({
        ...prevCounters,  
        [isbn13]: (prevCounters[isbn13] || 1) + 1
    }));

    const allPrices:BookData = JSON.parse(localStorage.getItem('basket') || '[]'); 
    const pricesMap: { [isbn13: string]: number } = {};


      allPrices.forEach((price:string) => {
        pricesMap[price.isbn13] = parseFloat(price.price.replace(/\$/, '')); 
      });

    const currentOldPrice = pricesMap[isbn13]; 

    const updatedBasket = basket.map((b) => {
        if (b.isbn13 === isbn13) {
            const currentPrice = parseFloat(b.price.replace(/\$/, ''));
            if (!isNaN(currentPrice)) {
                const newPrice = (currentPrice + currentOldPrice).toFixed(2);
                return {
                    ...b,
                    price: "$" + newPrice
                };
            }
        }
        return b;
    });

    setBasket(updatedBasket);
}
    
 

const decr = (isbn13: string) => {
  setCounters((prevCounters) => ({
    ...prevCounters,
    [isbn13]: Math.max((prevCounters[isbn13] || 0) - 1, 0) 
  }));
  
  if (counters[isbn13] > 1) { 
    const allPrices = JSON.parse(localStorage.getItem('basket') || '[]'); 
    const pricesMap = {}; 

    allPrices.forEach((price) => {
      pricesMap[price.isbn13] = parseFloat(price.price.replace(/\$/, '')); 
    });

    const currentOldPrice = pricesMap[isbn13]; 
  
    const updatedBasket = basket.map((b) => {
      if (b.isbn13 === isbn13) {
        const currentPrice = parseFloat(b.price.replace(/\$/, ''));
        if (!isNaN(currentPrice)) {
          const newPrice = (currentPrice - currentOldPrice).toFixed(2); 
          return {
            ...b,
            price: "$" + newPrice
          };
        }
      }
      return b;
    });

    setBasket(updatedBasket);
  }
}



  
  const removeBookFromBasket = (isbn13: string) => {
    const storedBasket = localStorage.getItem('basket');
    if (storedBasket) {
      let basketItems = JSON.parse(storedBasket) as BookData[];
      basketItems = basketItems.filter((item) => item.isbn13 !== isbn13);
  
      localStorage.setItem('basket', JSON.stringify(basketItems));
      setBasket(basketItems);
    }
  }

useEffect(() => {
  const updatedBasket = basket.map(item => {
    let price = item.price.toString();
    if (typeof price === 'string' && price.includes('$')) {
      price = parseFloat(price.replace('$', ''));
    } else {
      price = parseFloat(price);
    }
    return {
      ...item,
      price: price
    };
  });
  const totalWithoutVat = updatedBasket.reduce((total, item) => total + item.price, 0);
  const vatRate = 0.20;
  const vat = totalWithoutVat * vatRate;
  const totalWithVat = totalWithoutVat + vat;
  setTotal(totalWithVat);
  setVat(vat);
  setTotalWithoutVat(totalWithoutVat)
}, [basket]);

 

  return (
    <>
     <Link to="/">
        <svg className={styles.Arrow} width="42" height="14" viewBox="0 0 42 14" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path fillRule="evenodd" clipRule="evenodd" d="M8.00116 0.998965C8.00116 1.25897 7.90116 1.50897 7.71116 1.70897L3.41116 5.99897L41.0012 5.99897C41.5512 5.99897 42.0012 6.44896 42.0012 6.99896C42.0012 7.54896 41.5512 7.99896 41.0012 7.99896L3.41116 7.99896L7.71116 12.289C8.10116 12.679 8.10116 13.319 7.71116 13.709C7.32116 14.099 6.68116 14.099 6.29116 13.709L0.291162 7.70896C0.201162 7.61896 0.131162 7.50896 0.0811621 7.38896C0.0611621 7.33896 0.0411621 7.29896 0.0411621 7.24896C-0.00883789 7.08896 -0.00883789 6.90896 0.0411621 6.74896C0.0411621 6.69896 0.0611621 6.65897 0.0811621 6.60896C0.131162 6.48897 0.201162 6.37896 0.291162 6.28896L6.29116 0.288965C6.68116 -0.101035 7.32116 -0.101035 7.71116 0.288965C7.90116 0.488965 8.00116 0.738965 8.00116 0.998965Z" fill="#313037"/>
        </svg>
      </Link>
      <h2 className={styles.BasketTitle}>Your cart</h2>
    {basket.map((basketBook) => (
      <div key={basketBook.isbn13} className={styles.BasketWrapp}>
        
          <Link to={`/books/${basketBook.isbn13}`}>
          <div style={{backgroundColor: randomColor}} className={styles.ImgBg}> <img className={styles.Img} src={basketBook.image} alt="" /> </div>
          </Link>
          <div className={styles.BasketInfo}>
            <h3 className={styles.BasketInfoTitle}>{basketBook.title}</h3>
            <span className={styles.BasketInfoSubTitle}>by {basketBook.authors.split(',')[0]}, {basketBook.publisher}</span>
            <div className={styles.Counter}>
             <div onClick={() => decr(basketBook.isbn13)} >
             <svg width="24" height="2" viewBox="0 0 12 2" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect width="12" height="12" rx="1" fill="#313037"/>
              </svg>
             </div>
                <span>{counters[basketBook.isbn13] || 1}</span>
              <div style={{marginTop:'5px'}} onClick={() => incr(basketBook.isbn13)}>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path  fillRule="evenodd" clipRule="evenodd" d="M15 7H9V1C9 0.448 8.552 0 8 0C7.448 0 7 0.448 7 1V7H1C0.448 7 0 7.448 0 8C0 8.552 0.448 9 1 9H7V15C7 15.553 7.448 16 8 16C8.552 16 9 15.553 9 15V9H15C15.553 9 16 8.552 16 8C16 7.448 15.553 7 15 7Z" fill="#313037"/>
              </svg>

              </div>
            </div>
          </div>
          <p className={styles.BasketPrice}>{basketBook.price}</p>
         <svg  onClick={() => removeBookFromBasket(basketBook.isbn13)} className={styles.Cancel} width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
           <path fillRule="evenodd" clipRule="evenodd" d="M11.6569 10.2429L7.41421 6.00023L11.6569 1.75759C12.0472 1.36727 12.0472 0.733701 11.6569 0.343378C11.2665 -0.0469454 10.633 -0.0469453 10.2426 0.343378L6 4.58602L1.75736 0.343378C1.36704 -0.0469453 0.733469 -0.0469454 0.343146 0.343378C-0.0471771 0.733701 -0.0471771 1.36727 0.343146 1.75759L4.58579 6.00023L0.343146 10.2429C-0.0478838 10.6339 -0.0471771 11.2668 0.343146 11.6571C0.733469 12.0474 1.36633 12.0481 1.75736 11.6571L6 7.41445L10.2426 11.6571C10.6337 12.0481 11.2665 12.0474 11.6569 11.6571C12.0472 11.2668 12.0479 10.6339 11.6569 10.2429Z" fill="#313037"/>
          </svg>
          
      </div>
      
    ))}
    <div className={styles.Total}>
                <div>Sum total <p className={styles.TotalSum}>${totalWithoutVat.toFixed(2)}</p></div>
                <div>VAT <p className={styles.TotalVat}>${vat.toFixed(2)}</p></div>
                <div className={styles.TotalPrice}>Total:  <p>${total.toFixed(2)}</p></div>
                <button className={styles.TotalBtn}>check out</button>
            </div>
    </>
  )
}

export default BookBasket;
