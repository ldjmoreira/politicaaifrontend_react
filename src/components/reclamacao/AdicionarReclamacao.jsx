import React from 'react'
import Main from '../template/Main'
import {useParams} from 'react-router-dom'
import  { useState,useEffect  } from 'react'
import axios from 'axios'
import {  useHistory } from 'react-router-dom'
import Select from 'react-select'
import { toast} from 'react-toastify'
const baseUrl = 'http://localhost:4005'

export default props => {
    const [state, setState] = useState({
        titulo: '',
        area: '',
        politico_id: 0,
        descricao: '',
        thumblink: '',
        texto: ''
    })
    const [list, setList] = useState({
        list: []
    })

    const {id} = useParams()
    const history = useHistory();




    const updateField = (event) => {
        const user = { ...state }
        user[event.target.name] = event.target.value

        setState((prevState) => {
            return {...prevState, ...user }
        })
    }

    const updateFieldText = (event) => {
        const user = { ...state }
        user['texto'] = event.target.value

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
       // console.log(user)
         
        const method =  'post' 
        const url = `${baseUrl}/reclamacao/create` 
       
        axios[method](url, user)
        .then(resp => {
            reset()
          //  history.push(`/reclamacao/index`);
          toast.success('reclamacao created!',{autoClose: false})
          toast.error('reclamacao created!',{autoClose: false})
        })
        
    }

    useEffect(() => {
        axios(`${baseUrl}/reclamacao/adicionar`).then(resp => {
            
            setList((prevState) => {
                return {...prevState, list: resp.data }
            })
        })
      },[]);



    let optionItems = list.list.map(politico => ({
        "value": politico.id,
        "label": politico.name
    })      
    )
/*
   const handleChange = (e) => {
    setState((prevState) => {
        return {...prevState, id: e.value,name2:e.label }
    })
       }
*/
       const handleChange = (e) => {
        setState((prevState) => {
            return {...prevState, politico_id: e.value }
        })
           }
           

    return(
    <Main>
        <h1>Nova Reclamação</h1>

        <form>
            <div class="form-row">
                <div class="form-group col-md-4">
                    <label for="name">Título da Reclamação</label>
                    <input type="text" class="form-control" id="titulo"
                    onChange={e => updateField(e)}
                    name="titulo"
                    value={state.titulo}
                    placeholder="Informe o Nome do Político..." required="true"/>
                </div>
                <div class="form-group col-md-4">
                    <label for="partido">Àrea</label>
                    <input type="text" class="form-control" id="area"
                    onChange={e => updateField(e)}
                    name="area"
                    value={state.area}
                    placeholder="Informe o Nome do Político..." required="true"/>
                </div>
                <div class="form-group col-md-4">
                    <label htmlFor="politico_id">Politico</label>
                    <Select id="politico_id"
                     name="politico_id"
                    options={optionItems}
                    onChange={handleChange}
                       />
                </div>
            </div>
            <div class="form-row">
                <div class="form-group col-md-12">
                    <label for="descricao">Descrição rápida</label>
                    <input type="text" class="form-control" id="descricao"
                    onChange={e => updateField(e)}
                    name="descricao"
                    value={state.descricao}
                    placeholder="Informe o Nome do Político..." required="true"/>
                </div>

            </div>
            <div class="form-row">
                <div class="form-group col-md-12">
                    <label for="thumblink">Link da noticia</label>
                    <input type="text" class="form-control" id="thumblink"
                    onChange={e => updateField(e)}
                    name="thumblink"
                    value={state.thumblink}
                    placeholder="Informe o Nome do Político..." required="true"/>
                </div>

            </div>       
            <div class="form-row">
                <div class="form-group col-md-12">
                    <label for="thumblink">Reclamação sobre o candidato</label>
                    <textarea class="form-control"
                    placeholder="Informe o Nome do Político..."
                     value={state.texto} onChange={e => updateFieldText(e)} />
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