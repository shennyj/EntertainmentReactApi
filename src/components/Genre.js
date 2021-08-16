import React,{useState} from 'react'

export default function Genre({name,genre,handleAddGenre,handleRemoveGenre}) {
    const [genreClicked,setGenreClicked] = useState(false)
    function handleSelectGenre(){
        handleAddGenre(genre)
        if(genreClicked){
            handleRemoveGenre(genre)
        }
        setGenreClicked(!genreClicked)
    }
  
    return (
        <div className="genre" style={{backgroundColor:genreClicked&&"lightblue"}}>
            <span className="genreSpan"
                onClick={handleSelectGenre}
                style={{backgroundColor:genreClicked&&"lightblue"}}
                className="genreName">{name}
            </span>
     
        </div>
    )
}
