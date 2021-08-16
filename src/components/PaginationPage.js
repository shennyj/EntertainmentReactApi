import React from 'react'
import Pagination from '@material-ui/lab/Pagination';

export default function PaginationPage({setPage,numOfPages=10}) {
    const handlePageChange=(page)=>{
        setPage(page)
        window.scroll(0,0)
    }
    return (
        <div className="paginationPage">
                <Pagination
                    variant="outlined"
                    count={numOfPages}
                    onChange={(e)=>handlePageChange(e.target.textContent)}
                />
        </div>
    )
}
