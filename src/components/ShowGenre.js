import React,{useState} from 'react'

export default function Genre({name,genre,handleAddGenre,handleRemoveGenre}) {
    const [showGenreClicked,setShowGenreClicked] = useState(false)
    function handleSelectGenre(){
        handleAddGenre(genre)
        if(showGenreClicked){
            handleRemoveGenre(genre)
        }
        setShowGenreClicked(!showGenreClicked)
        
    }
  
    return (
        <div className="genre" style={{backgroundColor:showGenreClicked&&"lightpurple"}}>
            <span className="genreSpan"
                onClick={handleSelectGenre}
                style={{backgroundColor:showGenreClicked&&"lightpurple"}}
                className="genreName">{name}
            </span>
     
        </div>
    )
}
