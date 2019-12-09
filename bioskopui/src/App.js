import React, { Component } from 'react';
import Header from './components/header'
import Home from './pages/Home'
import './App.css';
import {Switch,Route} from 'react-router-dom'
import ManageAdmin from './pages/manageadmin'
import Login from './pages/login'
import {connect} from 'react-redux'
import {LoginSuccessAction} from './redux/actions'
import Axios from 'axios';
import { APIURL } from './support/ApiUrl';


class App extends Component{
  state={
    loading:true
  }

  componentDidMount(){
    var id=localStorage.getItem('dino')
    Axios.get(`${APIURL}users/${id}`)
    .then((res)=>{
      this.props.LoginSuccessAction(res.data)
      this.setState({loading:false})
    }).catch((err)=>{
      console.log(err)
    })
  }


  render(){
    if(this.state.loading){
      return <div>loading</div>
    }
    return (
      <div>
        <Header/>
        <Switch>
          <Route path={'/'} exact>
            <Home/>
          </Route>
          <Route path={'/manageadmin'} exact>
            <ManageAdmin/>
          </Route>
          <Route path={'/login'} exact component={Login}/>
        </Switch>
      </div>
    );
  }
}

const MapstateToprops=(state)=>{
  return{
      AuthLog:state.Auth.login
  }
}

export default connect(MapstateToprops,{LoginSuccessAction})(App);
