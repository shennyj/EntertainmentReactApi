import React,{useState,useEffect} from 'react'
import axios from 'axios'
import Genre from './Genre'

export default function Genres(props) {
    

    const{
        type,
        genres,
        setGenres,
        selectedGenres,
        setSelectedGenres,
    } = props
   
  
    
    useEffect(()=>{
        let cancel
        axios.get(
            `https://api.themoviedb.org/3/genre/${type}/list?api_key=16d41bd6f4b1ba5b5290a927552cb29d&language=en-US`
            ,{
                cancelToken:new axios.CancelToken(c=>cancel=c)
            }).then(res=>{
                setGenres(res.data.genres)
            })

        return () => cancel()
        
    },[genres])

    function handleAddGenre(genre){
        if(selectedGenres.some(gen=>gen.name==genre.name)){
            return
        }
        setSelectedGenres([...selectedGenres,genre])
        //setGenres(genres.filter(g=>g.id!==genre.id))
        
    }
    function handleRemoveGenre(genre){
        setSelectedGenres(
            selectedGenres.filter(gen=>gen.id!==genre.id)
        )
        // setGenres([...genres,genre])
    }

    return (
        <div className="genreDiv">
        
           {genres&&genres.map(genre=>{
               return(<Genre 
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
