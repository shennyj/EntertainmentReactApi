import React,{useState,useContext} from 'react'
import {img_300,unavailable,img_500} from './config'
import Badge from '@material-ui/core/Badge';
import WatchListModal from './WatchListModal'
import WatchLaterIcon from '@material-ui/icons/WatchLater';
import { Button } from '@material-ui/core';
import {WatchContext} from './App'

export default function ShowWatchList(props) {
    const [isOpen,setIsOpen] = useState(false)
    const{handleDeleteWatch}=useContext(WatchContext)
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
        handleDeleteWatch(item) 
}
    function handleModal(){
        setIsOpen(!isOpen)
    }

    return (
        <div className="media"
            onClick={handleModal}
            >

            <Badge className="badge"
                badgeContent={vote_average}
                color={vote_average>6?'primary':'error'}
            />
            <img className='poster' src={poster ? `${img_300}/${poster}` : unavailable} alt={title} />
            <strong className="title">{title}</strong>
            <span className="mediaType mediaData">
                {media_type==='tv'?'TV Series' : 'Movie'}
            
                <span className="date">{date}</span>
                
            </span>
            <div className="movie-over">
                <p>{overview}</p>
            </div>
            <WatchListModal
            open={isOpen}
            onClose={handleModal}
            >

                    <Button 
                        className="deleteWatchButton"
                        color="secondary"
                        variant="contained"
                        startIcon={<WatchLaterIcon/>}
                        onClick={()=>handleClick(item)}
                        >                     
                              Remove from WatchList
                        </Button>           
            </WatchListModal>
        </div>
    )
}
