import React from 'react';

const Pagination = ({ launchesPerPage, totalLaunches, paginate }) => {
    const pageNumbers = [];

    for (let i = 1; i <= Math.ceil(totalLaunches / launchesPerPage); i++) {
        pageNumbers.push(i);
    }

    return (
        <nav className="pagination-container">

            <ul className='pagination'>
                {pageNumbers.map(number => (
                    <li key={number} className='page-item'>
                        <button onClick={() => paginate(number)} className='page-button'>
                            {number}
                        </button>
                    </li>
                ))}
            </ul>


        </nav>
    );
};

export default Pagination;