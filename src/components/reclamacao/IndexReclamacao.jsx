import React, { useEffect } from 'react'
import  { useState } from 'react'
import Main from '../template/Main'
import Pagination from 'react-bootstrap/Pagination'
import { Link, useHistory } from 'react-router-dom'
import axios from 'axios'


const baseUrl = 'http://localhost:4005'
const initialState = {
    user: { name: '', email: '' },
    list: [],
    count: 0,
    limit:0,
    page: 1
}

const  IndexPolitico = (props) => {
    const history = useHistory();
    //state = { ...initialState }
    const [state, setState] = useState(initialState)
    const[flaginit,setFlaginit] = useState(false)

    const renderTable = () => {
        return (
            <table className="table table-striped mt-4">
                <thead>
                    <tr>
                        <th>Código</th>
                        <th>Título</th>
                        <th>Àrea</th>
                        <th>Político</th>
                        <th>Publicado em:</th>
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
                    <td>{user.titulo}</td>
                    <td>{user.area}</td>
                    <td>{user.name}</td>
                    <td>        
                    {(new Date(user.datap)).toLocaleDateString(['pt-BR'], {month: 'long', day: '2-digit', year: 'numeric'}) }
                    </td>
                    
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
        axios(`${baseUrl}/reclamacao/index?page=${state.page}`).then(resp => {
            setState((prevState) => {
                console.log('aqui')
                return {...prevState,
                     list: resp.data.data,
                     count: resp.data.count,
                     limit: resp.data.limit
                    }
            })
        })
        
      },[]);
/*
      useEffect(()=>{
        console.log('formatedDate')
        if (state ) {
                const formatedDate =  state.list.map(user => {
                      return (
                        user.id,
                        user.titulo,
                        user.area,
                        user.name,
                       (new Date(user.datap)).toLocaleDateString(['pt-BR'], {month: 'long', day: '2-digit', year: 'numeric'})  //if you want, you can change locale date string
                      )
                  })
                  console.log(formatedDate)

                  setState((prevState) => {
                    console.log('aqui2')
                    return {...prevState,
                         list: formatedDate,

                        }
                })

        }

        }, [flaginit]); 
*/
    const load = (user) => {
        
        history.push(`/politico/${user.id}/edit`);
        
    }

    const loadUser = (event) => {
        const page = event.target.outerText
        console.log(event.target.outerText)
        
        axios(`${baseUrl}/reclamacao/index?page=${page}`).then(resp => {
            setState((prevState) => {
                return {...prevState,
                     list: resp.data.data,
                     count: resp.data.count,
                     limit: resp.data.limit,
                     page: page
                    }
            })
        })
        
           
    }

    const remove = (user) => {
    
        axios.delete(`${baseUrl}/reclamacao/delete/${user.id}`).then(resp => {
            const list = getUpdatedList(user, false)
            setState((prevState) => {
                return {...prevState, list: list }
            })
            
        })
    }


    const getUpdatedList = (user, add = true) => {

        const list = state.list.filter(u => u.id !== user.id)
        if(add) list.unshift(user)
        return list
    }


    let active = state.page;
    console.log(active)
    let items = [];
    let times = Math.ceil(state.count/state.limit)
    for (let number = 1; number <= times; number++) {
        items.push(

          <Pagination.Item key={number} active={number == active} onClick={e => loadUser(e)} >
            {number}
          </Pagination.Item>,

        );
      }

      const paginationBasic = (
        <div>
          <Pagination>
          <Pagination.First />
          <Pagination.Prev />
            {items}
          <Pagination.Next />
          <Pagination.Last />
          </Pagination>
        </div>
      );
    return (
        <Main >
            <div className='display-4'>Reclamações</div>
            <Link className="btn btn-primary mb-3" to="/reclamacao/adicionar">
                Nova reclamação
            </Link>
            <hr />
            {renderTable()} 
            {paginationBasic}
        </Main>
    )
}

export default IndexPolitico