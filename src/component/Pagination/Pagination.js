import React from 'react';
import {Link} from 'react-router-dom';
import './Pagination.scss';

const Pagination = ({ postsPerPage, totalPosts, paginate, href, currentPage }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <nav>
      <ul className='pagination'>
        {pageNumbers.map(number => (
          <li key={number} className='page-item'>
            <Link 
              onClick={() => paginate(number)} 
              to={href} 
              className={number === currentPage ? 'pagination__link ' + 'pagination__disabled' : 'pagination__link'}
            >
              {number}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Pagination;
