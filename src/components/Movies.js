import React,{useState,useEffect} from 'react'
import axios from 'axios'
import ShowContent from './ShowContent'
import PaginationURL from './PaginationURL'
import Genres from './Genres'
import useGenre from './useGenre'

export default function Movies({isOpen,setIsOpen,handleModal}) {
    const [type,setType] = useState(0)
    const [content,setContent] = useState([])
    const [page,setPage] = useState(1)
    const [nextPage,setNextPage]=useState()
    const [prevPage,setPrevPage]=useState()
    const [loading,setLoading]=useState(true)
    const [selectedGenres,setSelectedGenres]=useState([])
    const [genres,setGenres]=useState([])
    const genreforURL = useGenre(selectedGenres)
    const [pageUrl,setPageUrl]=useState(`https://api.themoviedb.org/3/discover/movie?api_key=16d41bd6f4b1ba5b5290a927552cb29d&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${page}&with_genres=${genreforURL}`)
    const [searchText,setSearchText] = useState('')
    const [clickMovieTab,setClickMovieTab]=useState(true)
    const [clickShowTab,setClickShowTab]=useState(false)
    

    let next; let prev;
    let cancel;

    async function fetchSearch(){
        setLoading(true)
        const data = await axios.get(`https://api.themoviedb.org/3/discover/${type?"tv":"movie"}?api_key=16d41bd6f4b1ba5b5290a927552cb29d&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${page}&with_genres=${genreforURL}`
            ,{
                cancelToken:new axios.CancelToken(c=>cancel=c)
            }).then(res=>res.data)

            setLoading(false)
            next=parseInt(page)+parseInt(1)
            prev = parseInt(page)-parseInt(1)
            setNextPage(`https://api.themoviedb.org/3/discover/${type?"tv":"movie"}?api_key=16d41bd6f4b1ba5b5290a927552cb29d&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${next}&with_genres=${genreforURL}`)
            setPrevPage(`https://api.themoviedb.org/3/discover/${type?"tv":"movie"}?api_key=16d41bd6f4b1ba5b5290a927552cb29d&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${prev}&with_genres=${genreforURL}`)
        const newArr=[]
        if(searchText.length>0){
           data.results.forEach(item=>{
               if(!type){
                    if(item.original_title.toLowerCase().includes(searchText.toLowerCase())){
                        newArr.push(item)

                    }
               }else if(type){
                if(item.original_name.toLowerCase().includes(searchText.toLowerCase())){
                    newArr.push(item)

                }
               }
               
           })
           setContent(newArr)

        }else{
            setContent(data.results)
        }
    }


    useEffect(()=>{
        
        
        fetchSearch()
        return () => cancel()
    },[page,genreforURL,searchText,type])

    function goToNextPage(){
        setPageUrl(nextPage)
        setPage(parseInt(page)+parseInt(1))
      
        
    }
    function goToPrevPage(){
        setPageUrl(prevPage)
        setPage(parseInt(page)-parseInt(1))
    }
   

    function handleInput(e){
        setSearchText(e.target.value)
        fetchSearch()
    }
   
    function handleMovieTab(){
        setType(0)
        setClickMovieTab(!clickMovieTab)
        clickShowTab&&setClickShowTab(!clickShowTab)
    }
    function handleShowTab(){
        setType(1)
        setClickShowTab(!clickShowTab)
        clickMovieTab&&setClickMovieTab(!clickMovieTab)
    }

    return (
        <div>
            <span className="pageTitle">ENTERTAINMENT</span>
            <Genres
                type={type?"tv":"movie"}
                selectedGenres={selectedGenres}
                setSelectedGenres={setSelectedGenres}
                genres={genres}
                setGenres={setGenres}
            />
            <div className="tabsDiv">
                <span 
                    style={{borderBottom:clickMovieTab?'1px solid white':'none'}}
                    onClick={handleMovieTab}
                    className="movieTab">SEARCH MOVIES</span>
                <span 
                    style={{borderBottom:clickShowTab?'1px solid white':'none'}}
                    onClick={handleShowTab}
                    className="tvTab">SEARCH TV SERIES</span>
            </div>
             <div className="formDiv">
                <input 
                    class="searchInput"
                    type="text"
                    placeHolder="Search..."
                    onChange={handleInput}
                    />
 
             </div>
            <div className="trending">
                {content&&content.map(item=>{
                    
                    return(<ShowContent
                            key={item.id}
                            id={item.id}
                            poster={item.poster_path}
                            title={item.original_title||item.original_name}
                            date={item.release_date||item.first_air_date}
                            media_type={type?"tv":"movie"}
                            vote_average={item.vote_average}
                            overview={item.overview}

                            item={item}
                        
                    />)
                })} 
                
            </div>
            {content.length>0&&
            <PaginationURL
                goToNextPage={page>=1000?null:goToNextPage}
                goToPrevPage={page<=1?null:goToPrevPage}
            />}
        </div>
    )
}
