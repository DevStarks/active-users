import React from 'react';
import PropTypes from 'prop-types'
import './styles/App.css';
import { withFirebase } from './services/Firebase';
import generateUid from './utils/uid'
import Cookies from 'js-cookie'
import {
  updateActiveUserCount,
  subscribeToActiveUserCount
} from './actions/AppActions'

class App extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      loading: true,
      activeUserCount: null,
      uid: null
    };
  }

  async componentDidMount() {
    await this.setCookie();

    updateActiveUserCount(this.state.uid, this.props.firebase.database);
    subscribeToActiveUserCount(this.onUserCountUpdated.bind(this));
  }

  setCookie() {
    if(!Cookies.get('uid')){
      Cookies.set('uid', generateUid());
    }
    this.setState({ uid: Cookies.get('uid') });
  }

  onUserCountUpdated(snapshot) {
    this.setState({
      activeUserCount: snapshot.numChildren(),
      loading: false
    });
  }

  renderUserCount() {
    return (
      <div className="App-content">
        <h1>Welcome!</h1>
        <h3>Including yours, this many browsers are currently accessing this app:</h3>
        <span className="App-userCount">{this.state.activeUserCount}</span>
      </div>
    );
  }

  renderLoading() {
    return (
      <p>Loading...</p>
    );
  }

  render() {
    return (
      <div className="App">
        <div className="App-container">
          {this.state.loading ? this.renderLoading() : this.renderUserCount()}
        </div>
      </div>
    );
  }
}

App.propTypes = {
  firebase: PropTypes.object.isRequired
};

export default withFirebase(App);
