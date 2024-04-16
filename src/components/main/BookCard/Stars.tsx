import React from 'react'
import styles from './BookCard.module.css'
import { StarsProps } from '../../../types/StarsProps'
const Stars:React.FC<StarsProps> = ({rating}) => {
  
  const filledStars = parseInt(rating);

  const stars = Array(5).fill('').map((_, index) => {
    let color = index < filledStars ? '#4C4B5E' : '#E7E7E7';

    return (
      <svg className={styles.Star} key={index} width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="16" height="16" fill="white"/>
          <path fillRule="evenodd" clipRule="evenodd" d="M11.9324 14.5003C11.8312 14.5003 11.7294 14.4767 11.6358 14.429L8.00032 12.5664L4.36353 14.429C4.14971 14.5393 3.88944 14.5207 3.69281 14.3819C3.49745 14.243 3.39945 14.0081 3.44017 13.7757L4.13444 9.83302L1.19256 7.04198C1.01883 6.87711 0.956467 6.63104 1.03092 6.40667C1.10601 6.18229 1.30519 6.01866 1.54446 5.98457L5.61143 5.40566L7.4295 1.81753C7.64396 1.39481 8.35604 1.39481 8.5705 1.81753L10.3886 5.40566L14.4555 5.98457C14.6954 6.01866 14.8946 6.18229 14.9691 6.40667C15.0435 6.63104 14.9812 6.87711 14.8074 7.04198L11.8656 9.83302L12.5598 13.7757C12.6006 14.0081 12.5026 14.243 12.3066 14.3819C12.1952 14.4606 12.0641 14.5003 11.9324 14.5003Z" fill={color}/>
      </svg>

    );
  });

  return (
    <div>
      {stars}
    </div>
  );
};


export default Stars
