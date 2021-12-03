import React, { Component, useContext  } from 'react'
import  { useState } from 'react'
import './Auths.css'
import Main from '../template/Main'
import AuthContext from '../../store/auth-context2';
import { Link } from 'react-router-dom'
import axios from 'axios'
import { useHistory } from 'react-router-dom';
import { baseUrl, userKeyy } from "../../global"

import { toast} from 'react-toastify'
//

const initialState = {
    user: {
    name: '',
    email: '',
    password: '', 
    confirmPassword: '',
    
  
  },
  showSignup: false, 
    list: []
}

/*
let showSignups = '';
*/
const  UserCrud = (props) => {

    const history = useHistory();
    const authCtx = useContext(AuthContext)

    const [state, setState] = useState(
        {user:
            {
            name: '',
            email: '',
            password: '',
            confirmPassword: ''
            },
        showSignup: false,
        list: []
        }
    )

    const load = (user) => {
        setState({ user })
    }

 const remove = (user) => {
        axios.delete(`${baseUrl}/${user.id}`).then(resp => {
            const list = getUpdatedList(user, false)
            setState({ list })
        })
    }


    const clear= ()=> {
        setState({ user: initialState.user })
    }

    const change= (event)=> {
        event.preventDefault()
        setState({ user: state.user, showSignup: !state.showSignup, list: state.list })
    }

    const signin =() => {
        const user = state.user
        const method = 'post'
        const url =  `${baseUrl}/login`
        axios[method](url, {email: user.email, password: user.password})
            .then(data => {
                const expirationTime = new Date(
                    data.data.exp *1000
                  );
                  console.log(data.data)
                  console.log(expirationTime)
                 authCtx.login(data.data,expirationTime.toISOString())
              //   localStorage.removeItem('setUser');
                 history.replace('/'); 
                 //  authCtx.login(data.data.token,expirationTime)

                  
            })
            .catch(

                function (error) {
//                    console.log("typeof(error)")
//                    console.log(error.response)
                    toast.error(error.response.data,{autoClose: false})
                  }
            )
    }
    const signup =() => {
        const user = state.user
        const method = 'post'
        const url =  `${baseUrl}/signup`
        axios[method](url, {name: user.name, 
            email: user.email, 
            password: user.password, 
            confirmPassword: user.confirmPassword})
            .then(data => {
                reset();
                toast.success('Usuário criado!',{autoClose: false})
            })
            .catch(
                
                function (error) {
//                    console.log("typeof(error)")
//                    console.log(error.response)
                toast.error(error.response.data,{autoClose: false})
                }
            )
    }
    const reset =() =>{
        setState(        {user:
            {
            name: '',
            email: '',
            password: '',
            confirmPassword: ''
            },
        showSignup: false,
        list: []
        })
    }

    const getUpdatedList= (user, add = true) => {
        const list = state.list.filter(u => u.id !== user.id)
        if(add) list.unshift(user)
        return list
    }

    const updateField = (event) => {
        const user = { ...state.user }
        user[event.target.name] = event.target.value
        setState((prevState) => {
            return {...prevState, user }
        })
    }
           

     //showSignups = state.showSignup
    
        return (
        <Main>
          <div class="auth-content mt-5">
            <div class="auth-modal">
            <h3>Lembrador Eletrônico</h3>

            <h1>{state.showSignup ? <div class="auth-title">Cadastro</div>: <div class="auth-title">Login</div>}</h1>


            {state.showSignup && (
            <div className="col-12 col-md-12">
            <input type="text" className="form-control"
                name="name"
                value={state.user.name}
                onChange={e => updateField(e)}
                placeholder="Digite o nome..." />

              </div>
            )}
              <div className="col-12 col-md-12">

                    <input type="text" className="form-control"
                        name="email"
                        value={state.user.email}
                        onChange={e => updateField(e)}
                        placeholder="Digite o e-mail..." />

                    </div>
                    <div className="col-12 col-md-12">
                        <input type="password" className="form-control"
                            name="password"
                            value={state.user.password}
                            onChange={e => updateField(e)}
                            placeholder="Digite a senha..." />
                    </div>
                    {state.showSignup && 
                    <div className="col-12 col-md-12">

                        <input type="password" className="form-control"
                            name="confirmPassword"
                            value={state.user.confirmPassword}
                            onChange={e => updateField(e)}
                            placeholder="COnfirme a senha..." />

                    </div>
                    }

                    {!state.showSignup && (
                    <button className="btn btn-primary mb-2 "
                    onClick={e => signin(e)}>
                         Entrar
                    </button>
                    )}
                                        
                    {state.showSignup && (
                    <button className="btn btn-primary  "
                    onClick={e => signup(e)}>
                        Registrar
                    </button>
                    )}
                    <a onClick={e => change(e)}>
                        {!state.showSignup && (
                        <span   >Já tem cadastro? Acesse o Login!</span>
                        )}



                        {state.showSignup && (
                        <span  >Não tem cadastro? Registre-se aqui!</span>
                        )}
                    </a>

            </div>




          </div>
        </Main>
        )
    


    
};

export default UserCrud