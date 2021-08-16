import React,{useState,useEffect} from 'react'
import ReactDom from 'react-dom'
import CloseIcon from '@material-ui/icons/Close';

const MODAL_STYLES={
    position:'fixed',
    top:'50%',
    left:'50%',
    transform:'translate(-50%,-50%)',
    backgroundColor:"#282828",
    border:"1px solid #282c34",
    borderRadius:10,
    color:"white",
    padding:'20px',
    zIndex:999,
    width:"30%",
    height:"10%",
    cursor:'default',
    justifyContent:'center',
    display:'flex',
    alignItems:'center'

}
const OVERLAY_STYLES={
    position:'fixed',
    left:0,
    right:0,
    top:0,
    bottom:0,
    backgroundColor:'rgba(0,0,0,0.7)',
    zindex:999,
   
}
export default function WatchListModal(props) {
   
    const{
        children,open,onClose
    }=props

    

   

      if (!open) return null

    return ReactDom.createPortal(
        
        <>  
            <div style={OVERLAY_STYLES}/>
             <div style={MODAL_STYLES}>
                {children}

                <button 
                className="closeModal"
                onClick={()=>onClose()}><CloseIcon className="closeModalIcon"/>
                </button>
            </div>
        </>,
        document.getElementById('portal')
       
    )
}
