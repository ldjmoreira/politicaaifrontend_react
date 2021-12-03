import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css'
import './App.css'
import React  from 'react'
import { BrowserRouter } from 'react-router-dom'

import { useContext } from 'react';
import AuthContext from '../store/auth-context2';

import Routes from './Routes'
import { toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

toast.configure()
export default props => {

  const authCtx = useContext(AuthContext)




            return(
            <BrowserRouter>
                <div className="app">
                  <Routes />  
                </div>
            </BrowserRouter>
        )
    }


