import React,{useState,useEffect,useContext} from 'react'
import {img_300,unavailable,img_500} from './config'
import axios from 'axios'
import Modal from './Modal'
import YouTubeIcon from '@material-ui/icons/YouTube';
import WatchLaterIcon from '@material-ui/icons/WatchLater';
import { Button } from '@material-ui/core';
import {WatchContext} from './App'


export default function ShowMovie(props) {
    const [isOpen,setIsOpen] = useState(false)
    const [content,setContent] = useState()
    const [trailer,setTrailer] = useState()
    const{handleWatchList}=useContext(WatchContext)
    const{
        id,
        poster,
        title,
        date,
        media_type,
        vote_average,
        overview,
        item,
       
    }=props

    function handleClick(){
        handleWatchList(item)
    }

    

    async function fetchData(){
        const data = await axios.get(
          `https://api.themoviedb.org/3/${media_type}/${id}?api_key=16d41bd6f4b1ba5b5290a927552cb29d&language=en-US`
        )
        
        setContent(data.data)
    }
    async function fetchTrailer(){
        const data = await axios.get(
          `https://api.themoviedb.org/3/${media_type}/${id}/videos?api_key=16d41bd6f4b1ba5b5290a927552cb29d&language=en-US`
        )
          setTrailer(data.data.results[0]?.key)
    }
    function handleModal(){
        setIsOpen(!isOpen)
    }
    useEffect(()=>{
        fetchData()
        fetchTrailer()
      },[]) 

     
    return (
        <div className="media" 
           
            onClick={handleModal}
            > 

           
            <img className='poster' src={poster ? `${img_300}/${poster}` :{unavailable}}
            alt={title} />
            <strong className="title">{title}</strong>
            <span className="mediaType mediaData">
                {media_type==='tv'?'TV Series' : 'Movie'}
            
                <span className="voteAverage"
                style={{color:vote_average>8?'lightgreen':vote_average>6?'lightblue':'red'}}>
                {vote_average}</span>
                
            </span>
            <div className="movie-over">
                <p>{overview}</p>
            </div>
            <Modal className="modal"
            open={isOpen}
            onClose={handleModal}
           
            >
             
                    {content&&(
                <div className="contentModal">

                    <img 
                    className="contentPortrait"
                    src={content.poster_path?`${img_500}/${content.poster_path}`
                    :unavailable} alt={content.name||content.title}/>
                    <img 
                    className="contentLandscape"
                    src={content.backdrop_path?`${img_500}/${content.backdrop_path}`
                    :unavailable} alt={content.name||content.title}/>
                        <div className="contentModalAbout">
                            <span className="contentModalTitle">
                            {content.name||content.title} (
                                {(
                                    content.first_air_date||
                                    content.release_date||
                                    "-----"
                                ).substring(0,4)
                            })
                            </span>
                            {content.tagline&&(
                                <i className="tagline">{content.tagline}</i>
                            )}
                            <span className="contentModalDescription">
                                {content.overview}
                            </span>
                            <div>

                            </div>
                            <Button
                                variant="contained"
                                startIcon={<YouTubeIcon/>}
                                color="secondary"
                                target="_blank"
                                href={`https://www.youtube.com/watch?v=${trailer}`}
                            >
                                Watch the Trailer
                            </Button>
                            <Button 
                              className="watchButton"
                              color="primary"
                              variant="contained"
                              startIcon={<WatchLaterIcon/>}
                              onClick={()=>handleClick()}
                            >                     
                              Add to WatchList
                            </Button>
                        </div>
                

            </div>)}
            </Modal>
           

        </div>
    )
}
