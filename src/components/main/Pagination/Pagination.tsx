import React from 'react';
import ReactPaginate from 'react-paginate';
import { PaginationProps } from '../../../types/PaginationProps';
import styles from './Pagination.module.css'
import prevIcon from './Pagination assets/Icon-Arrow-Left.svg';
import nextIcon from './Pagination assets/Icon-Arrow-Right.svg';
const Pagination: React.FC<PaginationProps> = ({ pageCount, onPageChange }) => {

  const handlePageChange = ({ selected }: { selected: number }) => {
    console.log('Selected page:', selected + 1);
    window.scrollTo({ top: 0, behavior: 'smooth' });
    onPageChange(selected + 1);
  };

  return (
    <ReactPaginate
      className={styles.PaginationWrapper}
      previousLabel={<div className={styles.Prev}>
        <img src={prevIcon} alt="" />
        Prev
      </div>}
      nextLabel={<div className={styles.Next}>
        Next
        <img src={nextIcon} alt="" />
      </div>}
      pageCount={pageCount}
      onPageChange={handlePageChange}
      pageClassName={styles.PageItem}
      pageLinkClassName={styles.PageLink}
      activeClassName={styles.Active}
    />
  );
};


export default Pagination;