import React,{useContext} from 'react'
import ShowWatchList from './ShowWatchList'
import{WatchContext} from './App'



export default function WatchList() {

    const{handleWatchList,watchList,setWatchList} = useContext(WatchContext)
    
   

    return (
        

            <div className="watchList">
                <span className="pageTitle">Your Watch List</span>
                <div className="trending">

                    {watchList.map(item=>{
                        return(<ShowWatchList
                            key={item.id}
                            id={item.id}
                            poster={item.poster_path}
                            title={item.title||item.name}
                            date={item.release_date||item.first_air_date}
                            media_type={item.media_type}
                            vote_average={item.vote_average}
                            overview={item.overview}
                            item={item}
                          
                          
                    />)
                    })}

                   
                </div>
            </div>

    )
}
