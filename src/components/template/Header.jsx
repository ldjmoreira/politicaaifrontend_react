import './Header.css'
import React, {  useContext  } from 'react'
import Navbar from 'react-bootstrap/Navbar'
import NavDropdown from 'react-bootstrap/NavDropdown'
import Nav from 'react-bootstrap/Nav'
import Form from 'react-bootstrap/Form'
import FormControl from 'react-bootstrap/FormControl'
import Button from 'react-bootstrap/Button'
import imagep from '../../assets/imgs/politico.png'
import AuthContext from '../../store/auth-context2';
import { useHistory } from 'react-router-dom';
import { Link } from 'react-router-dom'
export default props => {

  const authCtx = useContext(AuthContext)
  const history = useHistory();

  const handlechange2 = (event) => {
    authCtx.logout()
    history.replace('/auth');
 }

  return (
      
<header className="header d-none d-sm-flex flex-column">      
<Navbar collapseOnSelect expand="lg" bg="primary" variant="dark">
      <Link  to="/">
      <img
        src={imagep}
        width="30"
        height="40"
        className="d-inline-block align-top logo-top"
        alt="React Bootstrap logo"
      />
      </Link>

      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="mr-auto">
          {authCtx.admin &&
            <Nav.Link href="/politico/index">Politicos</Nav.Link>   
          }
        <Nav.Link href="/reclamacao/index">Reclamações</Nav.Link>
        <Nav.Link href="#pricing">Sobre</Nav.Link>

        </Nav>
        <Nav className="mr-5" >
        <Form inline>
          <FormControl type="text" placeholder="Search" className="mr-sm-2" />
          <Button variant="outline-light">Search</Button>
        </Form>
          <NavDropdown title="User" id="collasible-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">Profile</NavDropdown.Item>

              <NavDropdown.Item onClick={handlechange2} >Sign Out</NavDropdown.Item>
          </NavDropdown>

        </Nav>
      </Navbar.Collapse>
    </Navbar>
    </header>
    )
  }