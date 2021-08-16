
import React from 'react'

export default function useGenre(selectedGenres) {
    if(selectedGenres.length<1) return ""
    const GenreIds=selectedGenres.map(genre=>{
        return genre.id
    })
    return GenreIds.reduce((accumulator,currentValue)=>{
        return accumulator+","+currentValue
    })
}
