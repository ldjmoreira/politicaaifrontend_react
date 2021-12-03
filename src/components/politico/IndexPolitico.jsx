import React, { useEffect } from 'react'
import  { useState } from 'react'
import Main from '../template/Main'
import Table from 'react-bootstrap/Table'
import { Link, useHistory } from 'react-router-dom'
import axios from 'axios'


const baseUrl = 'http://localhost:4005'
const initialState = {
    user: { name: '', email: '' },
    list: []
}

const  IndexPolitico = (props) => {
    const history = useHistory();
    //state = { ...initialState }
    const [state, setState] = useState(initialState)
       

    const renderTable = () => {
        return (
            <table className="table table-striped mt-4">
                <thead>
                    <tr>
                        <th>Código</th>
                        <th>Nome</th>
                        <th>Partido</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {renderRows()}
                </tbody>
            </table>
        )
    }

    const renderRows = () => {
    
        return state.list.map(user => {
            return (
                <tr key={user.id}>
                    <td>{user.id}</td>
                    <td>{user.name}</td>
                    <td>{user.partido}</td>
                    <td>
                        <button className="btn btn-warning"
                            onClick={() => load(user)}>
                            <i className="fa fa-pencil"></i>
                        </button>
                        <button className="btn btn-danger ml-2"
                            onClick={() => remove(user)}>
                            <i className="fa fa-trash"></i>
                        </button>
                    </td>
                </tr>
            )
        })
    }
    // methods
    useEffect(() => {
        axios(`${baseUrl}/politico/index`).then(resp => {
            setState((prevState) => {
                return {...prevState, list: resp.data }
            })
        })
      },[]);
    


    const load = (user) => {
        
        history.push(`/politico/${user.id}/edit`);
        
    }

    const remove = (user) => {
    
        axios.delete(`${baseUrl}/politico/delete/${user.id}`).then(resp => {
            const list = getUpdatedList(user, false)
            setState((prevState) => {
                return {...prevState, list: list }
            })
            
        })
    }

    const clear = () => {
    
        setState({ user: initialState.user })
    }

    const save = () => {
    
        const user = state.user
        const method = user.id ? 'put' : 'post'
        const url = user.id ? `${baseUrl}/${user.id}` : baseUrl
        axios[method](url, user)
            .then(resp => {
                const list = getUpdatedList(resp.data)
                setState({ user: initialState.user, list })
            })
    }

    const getUpdatedList = (user, add = true) => {

    
        const list = state.list.filter(u => u.id !== user.id)
        if(add) list.unshift(user)
        return list
    }

    const updateField = (event) => {
    
        const user = { ...state.user }
        user[event.target.name] = event.target.value
        setState({ user })
    }

    return (
        <Main >
            <div className='display-4'>Politicos</div>
            <Link className="btn btn-primary mb-3" to="/politico/adicionar">
                novo politico
            </Link>
            <hr />
            {renderTable()} 
        </Main>
    )
}

export default IndexPolitico




