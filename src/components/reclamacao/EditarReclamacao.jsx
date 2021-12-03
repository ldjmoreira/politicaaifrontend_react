import React from 'react'
import Main from '../template/Main'
import {useParams} from 'react-router-dom'
import  { useState,useEffect  } from 'react'
import axios from 'axios'
import {  useHistory } from 'react-router-dom'

const baseUrl = 'http://localhost:4005'

export default props => {
    const [state, setState] = useState({id: '',name:'', partido: ''})
    const {id} = useParams()
    const history = useHistory();

    useEffect(() => {
        let url = id
        axios(`${baseUrl}/politico/${id}/edit`)
        .then(resp => {
            setState((prevState) => {
                return {...prevState,  ...resp.data }
            })
        })
      },[]);


    const updateField = (event) => {
        const user = { ...state }
        user[event.target.name] = event.target.value

        setState((prevState) => {
            return {...prevState, ...user }
        })
    }

    const reset =() =>{
        setState({id: '',name:'', partido: ''})
    }



    const save = (event) => {
        const user = { ...state }
        const id = user.id
        const method =  'put' 
        const url = `${baseUrl}/politico/update/${user.id}` 
        axios[method](url, user)
        .then(resp => {
            reset()
            history.push(`/politico/index`);
        })
    }





    return(
    <Main>
        <h1>Editar Políticos</h1>
        <input type="hidden"  name="id"  value={state.id}
                onChange={e => updateField(e)}
                placeholder="Digite o nome..." />
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

