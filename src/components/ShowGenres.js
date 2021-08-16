import React,{useState,useEffect} from 'react'
import axios from 'axios'
import ShowGenre from './ShowGenre'

export default function Genres(props) {
    

    const{
        type,
        showGenres,
        setShowGenres,
        selectedShowGenres,
        setSelectedShowGenres,
    } = props
   
  
    
    useEffect(()=>{
        let cancel
        axios.get(
            `https://api.themoviedb.org/3/genre/${type}/list?api_key=16d41bd6f4b1ba5b5290a927552cb29d&language=en-US`
            ,{
                cancelToken:new axios.CancelToken(c=>cancel=c)
            }).then(res=>{
                setShowGenres(res.data.genres)
            })

        return () => cancel()
        
    },[showGenres])

    function handleAddGenre(genre){
        if(selectedShowGenres.some(gen=>gen.name==genre.name)){
            return
        }
        setSelectedShowGenres([...selectedShowGenres,genre])
        //setGenres(genres.filter(g=>g.id!==genre.id))
        
    }
    function handleRemoveGenre(genre){
        setSelectedShowGenres(
            selectedShowGenres.filter(gen=>gen.id!==genre.id)
        )
        // setGenres([...genres,genre])
    }

    return (
        <div className="genreDiv">
        
           {showGenres&&showGenres.map(genre=>{
               return(<ShowGenre
                   key={genre.id}
                   genre={genre}
                   name={genre.name}
                   handleAddGenre={handleAddGenre}
                   handleRemoveGenre={handleRemoveGenre}
               />
               )
           })}
           
        </div>
    )
}
