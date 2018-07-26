import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

import { connect } from 'react-redux';
import { setCurrentLocation, registerUser, getLoginUser } from '../../ducks/reducer';

import logo from '../../assets/helo_logo.png';

class Auth extends Component {
  constructor(props) {
    super(props);

    this.state = {
      userNameValue: '',
      passwordValue: ''
    };

    this.updateUserNameValue = this.updateUserNameValue.bind( this );
    this.updatePasswordValue = this.updatePasswordValue.bind( this );
    this.handleRegister = this.handleRegister.bind( this );
    this.handleLogin = this.handleLogin.bind( this );
  }

  componentDidMount() {
    this.props.setCurrentLocation( this.props.location.pathname );
  }

  // componentDidUpdate( prevProps ) {
  //   if ( prevProps.authedUser !== this.props.authedUser ) {
  //     console.log('this.props.authedUser: ', this.props.authedUser);
  //   }
  // }

  updateUserNameValue( value ) {
    this.setState({ userNameValue: value });
  }

  updatePasswordValue( value ) {
    this.setState({ passwordValue: value });
  }

  handleLogin( username, password ) {
    if ( !this.state.userNameValue || !this.state.passwordValue ) return false;
    
    this.props.getLoginUser( this.state.userNameValue, this.state.passwordValue )
      .then( response => {
        console.log( 'response: ', response );
        this.props.history.push('/dashboard');
      })
    // axios.get( `http://localhost:4000/login/${username}/${password}` )
    
  }
  
  handleRegister() {
    if ( !this.state.userNameValue.trim() || !this.state.passwordValue.trim() ) return false;

    let reqBody = {
      username: this.state.userNameValue,
      password: this.state.passwordValue
    };

    this.props.registerUser( reqBody );
    this.setState({ userNameValue: '', passwordValue: '' });
  }

  render() {
    return (
      <div className="auth-wrapper">
        
        <div className="inner-content">

          <header className="login-header">
            <img src={logo} alt="Helo Logo" className="logo"/>
            <h1 className="main-title">Helo</h1>
          </header>

          <div className="form-wrap">
            <div className="field-group">
              <label htmlFor="">Username: </label>
              <input 
                type="text"
                onChange={(e) => this.updateUserNameValue(e.target.value)}
                value={this.state.userNameValue}
              />
            </div>
            <div className="field-group">
              <label htmlFor="">Password: </label>
              <input 
                type="text"
                onChange={(e) => this.updatePasswordValue(e.target.value)}
                value={this.state.passwordValue}
              />
            </div>
          </div>

          <div className="login-buttons">
            {/* <Link to="/dashboard"> */}
            {/* <a href={`http://localhost:4000/login/${this.state.userNameValue}/${this.state.passwordValue}`}> */}
              <button 
                onClick={() => this.handleLogin( this.state.userNameValue, this.state.passwordValue )}
                className="btn"
                id="login"
              >Login</button>
            {/* </a> */}
            {/* </Link> */}

            <Link to="/dashboard">
              <button
                onClick={() => this.handleRegister()} 
                className="btn"
                id="register"
              >Register</button>
            </Link>
          </div>

        </div>

      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    currentLocation: state.currentLocation,
    authedUser: state.authedUser,
    loadingAuthedUser: state.loadingAuthedUser
  };
}

const mapDispatchToProps = {
  setCurrentLocation,
  registerUser,
  getLoginUser
}

export default connect( mapStateToProps, mapDispatchToProps )(Auth);