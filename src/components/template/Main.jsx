import './Main.css'
import React from 'react'
import Header from './Header'
import { useContext } from 'react';
import AuthContext from '../../store/auth-context2';
import Footer from '../template/Footer'

export default props => {
const authCtx = useContext(AuthContext)
let background;
    if(!authCtx.isLoggedIn) {
    background =  <>
                <div className="login bg " ></div>
                <div className="login bg bg2 "></div>
                <div className="login bg bg3 "></div> 
                </>
    }else {
        background = <div></div>
    }

    

    return (
        <React.Fragment>
            {background}
            {authCtx.isLoggedIn ?<Header  />:''}
            
            <main className="content">
                    {props.children}
            </main>
            {authCtx.isLoggedIn ?<Footer />:''}
            
        </React.Fragment>
    )
}