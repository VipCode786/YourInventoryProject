import React from 'react'
import './pagination.scss'
const Pagination = ({ employeesPerPage, totalEmployees, paginate, totalEmpThisPage, currentPage }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalEmployees / employeesPerPage); i++) {
    pageNumbers.push(i);
  }

  const prevPage = () => paginate(currentPage === 1 ? 1 : currentPage - 1);
  const nextPage = () => paginate(currentPage === pageNumbers.length ? pageNumbers.length : currentPage + 1);
  
  return (
    <div className="clearfix">
      <div className="hint-text">Showing <b>{totalEmpThisPage}</b> out of <b>{totalEmployees}</b> entries</div>
      <ul className="pagination">
        <li className="page-item"><a onClick={() => prevPage()} href="!#">Previous</a></li>
        {pageNumbers.map(number => (
          <li className={number === currentPage ? 'page-item active' : 'page-item'} key={number}><a onClick={() => paginate(number)} href="#" className="page-link">{number}</a></li>
        ))}        
        <li className="page-item"><a onClick={() => nextPage()} href="!#" className="page-link">Next</a></li>
      </ul>
    </div>
  )
}

export default Pagination;
