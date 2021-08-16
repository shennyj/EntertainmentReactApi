import React from 'react'

export default function Header() {
    return (
        <div className="header">
            <h1 
                onClick={()=>window.scroll(0,0)}
                style={{cursor:'pointer'}}
                className="headerTitle">
                John's Entertainment
            </h1>
           
        </div>
    )
}
