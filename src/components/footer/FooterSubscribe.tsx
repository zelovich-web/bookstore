import React from 'react'
import styles from './Footer.module.css'
const FooterSubscribe:React.FC = () => {
  return (
      <div className={styles.FooterWrapp}>
      <div className={styles.FooterItems}>
        <h2 className={styles.FooterTitle}>Subscribe to Newsletter</h2>
        <p className={styles.FooterDescription}>Be the first to know about new IT books, upcoming releases, exclusive offers and more.</p>
        <div className={styles.FooterSubscr}>
          <div className={styles.Form}>
            <input required placeholder='Your email' type="email" className={styles.FooterInput} />
            <button className={styles.FooterBtn}>Subscribe</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default FooterSubscribe
