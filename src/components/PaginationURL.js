import React from 'react'

export default function PaginationURL({goToPrevPage,goToNextPage}) {
    function nextPage(){
        goToNextPage()
        window.scroll(0,0)
    }
    function prevPage(){
        goToPrevPage()
        window.scroll(0,0)
    }
    return (
        <div className="paginationURL">
            {goToPrevPage&&<button className="prevButton" onClick={prevPage}>Previous</button>}
            {goToNextPage&&<button className="nextButton" onClick={nextPage}>Next</button>}
        </div>
    )
}
