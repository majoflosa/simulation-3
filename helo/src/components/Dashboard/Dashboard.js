import React, { Component } from 'react';

import { connect } from 'react-redux';
import { setCurrentLocation, getLoginUser, getSessionUser } from '../../ducks/reducer';

import video from '../../assets/rabbit-and-butterfly.mp4';
import audio from '../../assets/horse.mp3';

class Dashboard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: null
    };

    this.setUser = this.setUser.bind(this);
  }

  componentDidMount() {
    this.props.setCurrentLocation( this.props.location.pathname );
    console.log('this.props.authedUser: ', this.props.authedUser);
    // console.log('this.props: ', this.props)
    this.setUser();
  }

  setUser() {
    if (!this.props.authedUser) {
      console.log( 'got session' );
      this.props.getSessionUser().then( () => {
        console.log('user in session: ', this.props.sessionUser);
        this.setState({ user: this.props.sessionUser})
      } );
    } else {
      this.setState({ user: this.props.authedUser });
    }
  }

  render() {
    return (
      <div className="main-content">
        Dashboard
        <p>Logged In User: {this.state.user ? this.state.user.username : null}</p>
        
        <div>
          <h2>HTML5 Video</h2>
          <video>
            <source src={video} type="video/mp4" />
            Your browser does not support HTML5 videos.
          </video>
        </div>

        <div>
          <h2>HTML5 Audio</h2>
          <audio controls>
            <source src={audio} type="audio/mp4" />
            Your browser does not support HTML5 audios.
          </audio>
        </div>

      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    currentLocation: state.currentLocation,
    authedUser: state.authedUser.authedUser,
    sessionUser: state.sessionUser.sessionUser
  };
};

const mapDispatchToProps = {
  setCurrentLocation,
  getSessionUser
};

export default connect( mapStateToProps, mapDispatchToProps )(Dashboard);