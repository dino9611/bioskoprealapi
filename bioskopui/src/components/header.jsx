import React, { useState,useEffect } from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from 'reactstrap';
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {FaCartArrowDown} from 'react-icons/fa'
dsaasds
const Header = (props) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  return (
    <div>
      <Navbar color="light" light expand="md">
        <NavbarBrand href="/">reactstrap</NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="ml-auto" navbar>
          { 
              props.Auth.role==='user'?
                null
              :
              props.Auth.username===''?
                null
              : 
              <NavItem className='mr-2 pt-1'>
                <Link to={'/manageadmin'}><button className='btn btn-outline-primary'>Manage admin</button></Link>
              </NavItem>
            }
            
            { props.Auth.role==='user'?
              <NavItem className='mr-2 pt-1'>
                <Link to={'/history'}><button className='btn btn-outline-primary'>History</button></Link>
              </NavItem>
              :
              null
            }
          {
            props.Auth.role==='user'?
            <NavItem className='mr-2 pt-2'>
              <Link to={'/cart'}><FaCartArrowDown style={{color:'pink', fontSize:28}}/></Link>
            </NavItem>
            :
            null
          }
            {props.namauser===''?
              <NavItem className='mr-2 pt-1'>
                <Link to={'/login'}><button className='btn btn-outline-primary'>Login</button></Link>
              </NavItem>
              :
              null
            }
           
           {
                props.namauser===''?
                null
                :
                <UncontrolledDropdown nav inNavbar>
                  <DropdownToggle nav caret>
                    {props.namauser}
                  </DropdownToggle>
                  <DropdownMenu right>
                    <DropdownItem>
                      Option 1
                    </DropdownItem>
                    <DropdownItem>
                      Option 2
                    </DropdownItem>
                    <DropdownItem divider />
                    <DropdownItem>
                      Reset
                    </DropdownItem>
                  </DropdownMenu>
                </UncontrolledDropdown>

              }
          </Nav>
        </Collapse>
      </Navbar>
    </div>
  );
}

const MapstateToprops=(state)=>{
  return{
    namauser:state.Auth.username,
    Auth:state.Auth
  }
}
export default connect(MapstateToprops) (Header);