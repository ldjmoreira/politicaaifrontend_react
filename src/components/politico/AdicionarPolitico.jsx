import React from 'react'
import Main from '../template/Main'
import {useParams} from 'react-router-dom'
import  { useState,useEffect  } from 'react'
import axios from 'axios'
import {  useHistory } from 'react-router-dom'

const baseUrl = 'http://localhost:4005'

export default props => {
    const [state, setState] = useState({name:'', partido: ''})
    const {id} = useParams()
    const history = useHistory();




    const updateField = (event) => {
        const user = { ...state }
        user[event.target.name] = event.target.value

        setState((prevState) => {
            return {...prevState, ...user }
        })
    }

    const reset =() =>{
        setState({name:'', partido: ''})
    }


    /*
    const upperCase = (event) => {
        setState((prevState) => {
            return {...prevState,  partido: state.partido.toUpperCase()}
        })
        save()

    }
    */
    const save = (event) => {
        const user = { ...state }
        user.partido = user.partido.toUpperCase()
        const method =  'post' 
        const url = `${baseUrl}/politico/create` 
        axios[method](url, user)
        .then(resp => {
            reset()
            history.push(`/politico/index`);
        })
    }





    return(
    <Main>
        <h1>Novo Político</h1>

        <form>


            <div class="form-row">
                <div class="form-group col-md-6">
                    <label for="name">Nome</label>
                    <input type="text" class="form-control" id="name"
                    onChange={e => updateField(e)}
                    name="name"
                    value={state.name}
                    placeholder="Informe o Nome do Político..." required/>
                </div>
                <div class="form-group col-md-6">
                    <label for="partido">Partido</label>
                    <input type="text" class="form-control" id="partido"
                    onChange={e => updateField(e)}
                    name="partido"
                    value={state.partido}
                    placeholder="Informe o Nome do Político..." required/>
                </div>
            </div>
           
            
</form>
<div class="row mt-3">
        <div class="col-md-10">
            <div id="dvAlert">
                <div class="alert alert-info">Preencha corretamente todos os campos</div>
            </div>
        </div>

        <div class="col-md-2 text-right">
            <div class="btn btn-success w-100"
             onClick={e => save(e)} 
                >Salvar
            </div>
        </div>
    </div>
       
    
    </Main>
    )
}