import React from 'react';
import styles from '/Bookstore/src/components/footer/Footer.module.css';

const Footer: React.FC = () => {
  return (
  
      <div className={styles.FooterLogo}>
            <p>©2022 Bookstore</p>
            <p>All rights reserved</p>
          </div>
  )
}

export default Footer;
