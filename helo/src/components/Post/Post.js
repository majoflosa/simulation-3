import React, { Component } from 'react';

import { connect } from 'react-redux';
import { setCurrentLocation } from '../../ducks/reducer';

class Post extends Component {
  componentDidMount() {
    this.props.setCurrentLocation( this.props.location.pathname );
  }

  render() {
    return (
      <div className="main-content">
        Post
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    currentLocation: state.currentLocation
  };
};

const mapDispatchToProps = {
  setCurrentLocation
};

export default connect( mapStateToProps, mapDispatchToProps )(Post);