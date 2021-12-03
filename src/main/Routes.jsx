import React from 'react'
import { useContext } from 'react';
//import { Switch, Route, Redirect } from 'react-router'
import { Switch, Route, Redirect } from 'react-router-dom';
import Home from '../components/home/Home'
import IndexPolitico from '../components/politico/IndexPolitico'
import UserCrud from '../components/user/UserCrud'
import Auth from '../components/auth/Auths'
import axios from 'axios'
import AuthContext from '../store/auth-context2';
import EditarPolitico from '../components/politico/EditarPolitico';
import AdicionarPolitico from '../components/politico/AdicionarPolitico';

import IndexReclamacao from '../components/reclamacao/IndexReclamacao'
import EditarReclamacao from '../components/reclamacao/EditarReclamacao';
import AdicionarReclamacao from '../components/reclamacao/AdicionarReclamacao';
import VerReclamacao from '../components/reclamacao/VerReclamacao';
 
export default props => {
    
    const authCtx = useContext(AuthContext)
    let background;

    if(authCtx.isLoggedIn) axios.defaults.headers.common['authorization'] =`bearer ${authCtx.token}` 

    console.log(authCtx.isLoggedIn)
    console.log(authCtx.token)
    console.log(authCtx.name)

  
    
    return(

 
        <Switch>
          
            <Route path='/' exact>
            {authCtx.isLoggedIn &&   <Home />}
            {!authCtx.isLoggedIn && <Redirect to='/auth' />}
            </Route>

        {!authCtx.isLoggedIn && (
          <Route path='/auth'>
            <Auth />
          </Route>
        )}

        <Route path='/users'>
          {authCtx.isLoggedIn && <UserCrud />}
          {!authCtx.isLoggedIn && <Redirect to='/auth' />}
        </Route>

        <Route path='/politico/index' exact>
          {authCtx.isLoggedIn && authCtx.admin && <IndexPolitico />}
          {!authCtx.isLoggedIn && <Redirect to='/auth' />}
        </Route>

        <Route path='/politico/:id/edit'>
          {authCtx.isLoggedIn && <EditarPolitico />}
          {!authCtx.isLoggedIn && <Redirect to='/auth' />}
        </Route>

        <Route path='/politico/adicionar'>
          {authCtx.isLoggedIn && <AdicionarPolitico />}
          {!authCtx.isLoggedIn && <Redirect to='/auth' />}
        </Route>
          
        <Route path='/reclamacao/index' exact>
          {authCtx.isLoggedIn && <IndexReclamacao />}
          {!authCtx.isLoggedIn && <Redirect to='/auth' />}
        </Route>

        <Route path='/reclamacao/adicionar'>
          {authCtx.isLoggedIn && <AdicionarReclamacao />}
          {!authCtx.isLoggedIn && <Redirect to='/auth' />}
        </Route>

        <Route path='/reclamacao/:id/edit'>
          {authCtx.isLoggedIn && <EditarReclamacao />}
          {!authCtx.isLoggedIn && <Redirect to='/auth' />}
        </Route>

        <Route path='/reclamacao/:id/show'>
          {authCtx.isLoggedIn && <VerReclamacao />}
          {!authCtx.isLoggedIn && <Redirect to='/auth' />}
        </Route>

        <Route path='*'>
          <Redirect to='/' />
        </Route>

       </Switch>

    )
}


