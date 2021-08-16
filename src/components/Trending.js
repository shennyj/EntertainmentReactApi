import React,{useState,useEffect} from 'react'
import axios from 'axios'
import ShowContent from './ShowContent'
import PaginationURL from './PaginationURL'


export default function Trending() {
    const [content,setContent] = useState([])
    const [page,setPage] = useState(1)
    const [pageUrl,setPageUrl]=useState(`https://api.themoviedb.org/3/trending/all/week?api_key=16d41bd6f4b1ba5b5290a927552cb29d&page=${page}`)
    const [nextPage,setNextPage]=useState()
    const [prevPage,setPrevPage]=useState()
    const [loading,setLoading]=useState(true)
    

    let next; let prev;
    let cancel;
   
   
    useEffect(()=>{
        setLoading(true)
        axios.get(`
            ${pageUrl}`
            ,{
                cancelToken:new axios.CancelToken(c=>cancel=c)
            }).then(res=>{
                setLoading(false)
                next=parseInt(page)+parseInt(1)
                prev = parseInt(page)-parseInt(1)
                setNextPage(`https://api.themoviedb.org/3/trending/all/week?api_key=16d41bd6f4b1ba5b5290a927552cb29d&page=${next}`)
                setPrevPage(`https://api.themoviedb.org/3/trending/all/week?api_key=16d41bd6f4b1ba5b5290a927552cb29d&page=${prev}`)
                setContent(res.data.results)
            })
        

        return () => cancel()
    },[page])

    function goToNextPage(){
        setPageUrl(nextPage)
        setPage(parseInt(page)+parseInt(1))
      
        
    }
    function goToPrevPage(){
        setPageUrl(prevPage)
        setPage(parseInt(page)-parseInt(1))
    }

    return (

        <div>
            <span className="pageTitle">Trending</span>
           
            <div className="trending">
                {content&&content.map(item=>{
                    return(<ShowContent
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
            <PaginationURL
                goToNextPage={page>=1000?null:goToNextPage}
                goToPrevPage={page<=1?null:goToPrevPage}
            />
        </div>
    )
}
