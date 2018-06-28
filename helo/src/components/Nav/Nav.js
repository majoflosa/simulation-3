import React from 'react';
import { connect } from 'react-redux';

const Nav = (props) => {
  console.log('props.currentLocation: ', props.currentLocation);
  return (
    <div
      className={props.currentLocation === '/' ? 'main-nav hidden' : 'main-nav'}
    >
      Nav
    </div>
  );
}


const mapStateToProps = state => {
  return {
    currentLocation: state.currentLocation
  };
}

export default connect( mapStateToProps )(Nav);