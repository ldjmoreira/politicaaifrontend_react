import React from 'react'
import Main from '../template/Main'

import { useContext } from 'react';
import AuthContext from '../../store/auth-context2';


export default props => {
    const authCtx = useContext(AuthContext)

    return (
        <Main icon="home" title="Início"
            subtitle="Segundo Projeto do capítulo de React.">
            <div className='display-4'>Bem Vindo {authCtx.name} !</div>
            <hr />
            <p className="mb-0">Sistema para exemplificar a construção
                de um cadastro desenvolvido em React!</p>
        </Main>
    )
}
