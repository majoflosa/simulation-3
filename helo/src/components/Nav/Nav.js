import React from 'react';
import { connect } from 'react-redux';

import { Link } from 'react-router-dom';

import homeIcon from '../../assets/home_logo.png';
import newIcon from '../../assets/new_logo.png';
import logoutIcon from '../../assets/shut_down.png';

const Nav = (props) => {
  console.log('props.currentLocation: ', props.currentLocation);
  if (props.currentLocation !== '/') {
    return (
      <div className="main-nav">
        
        <img src="" alt="" className="main-avatar"/>

        <div className="nav-links">
          <Link to="/dashboard">
            <img src={homeIcon} alt="Home" className="nav-link"/>
          </Link>
          <Link to="/new">
            <img src={newIcon} alt="New" className="nav-link"/>
          </Link>
        </div>

        <div className="logout-wrap">
          {/* <Link to="/"> */}
          <a href="http://localhost:4000/logout">
            <img src={logoutIcon} alt="Log out" className="log-out"/>
          </a>
          {/* </Link> */}
        </div>

      </div>
    );
  } else {
    return null;
  }
}


const mapStateToProps = state => {
  return {
    currentLocation: state.currentLocation
  };
}

export default connect( mapStateToProps )(Nav);