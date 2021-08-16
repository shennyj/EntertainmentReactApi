import React,{useState,useEffect} from 'react'
import Header from './Header'
import MainNav from './MainNav'
import {Container} from "@material-ui/core"
import {
  BrowserRouter as Router,
  Switch,
  Route,
  
} from "react-router-dom";
import Trending from './Trending'
import Movies from './Movies'
import WatchList from './WatchList'

const LOCAL_STORAGE_KEY='watchList.content'

export const WatchContext = React.createContext()


export default function App() {
    
    const [watchList,setWatchList] = useState([])

    useEffect(()=>{
        const watchJSON = localStorage.getItem(LOCAL_STORAGE_KEY)
        if(watchJSON!=null) setWatchList(JSON.parse(watchJSON))
   },[])
   useEffect(()=>{
        localStorage.setItem(LOCAL_STORAGE_KEY,JSON.stringify(watchList))
   },[watchList])


    

    function handleWatchList(item){
        let newWatch=[...watchList,item]
        const uniqueValeusSet=new Set()
        const filteredWatch=newWatch.filter(obj=>{
            const isPresentInSet=uniqueValeusSet.has(obj.id)
            uniqueValeusSet.add(obj.id)
            return !isPresentInSet
        })
        setWatchList(filteredWatch)
        
    }
    function handleDeleteWatch(item){
        let newWatch=watchList.filter(content=>{
            return content!==item
        })
        setWatchList(newWatch)
    }

    const watchContextValue={
        handleWatchList,
        setWatchList,
        watchList,
        handleDeleteWatch
      }
    return (
        <WatchContext.Provider value={watchContextValue}>

        <Router>
            <Header/>
            <div className="app">
                <Container>
                    <Switch>
                        <Route exact path='/'>
                            <Trending/>
                        </Route>
                        <Route path='/movies'>
                            <Movies/>
                        </Route>
                        <Route path='/watchlist'>
                            <WatchList/>
                        </Route>
                    </Switch>
                </Container>
            </div>

            <MainNav/>
        </Router>
        </WatchContext.Provider>
    )
}
