import React from 'react';
import './App.css';
import { withFirebase } from './services/Firebase';
import generateUid from './utils/uid'
import Cookies from 'js-cookie'

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

    this.updateActiveUserCount();
    this.subscribeToActiveUserCount();
  }

  setCookie() {
    if(!Cookies.get('uid')){
      Cookies.set('uid', generateUid());
    }
    this.setState({ uid: Cookies.get('uid') });
  }

  updateActiveUserCount() {
    const firebase = this.props.firebase;
    const userStatusDatabaseRef = firebase.database.ref('/online/' + this.state.uid);
    const dbRef = firebase.database.ref('.info/connected');

    dbRef.on('value', (snapshot) => {
      // If we're not currently connected, don't do anything.
      if (snapshot.val() === false) return;

      userStatusDatabaseRef.onDisconnect()
                           .set(false)
                           .then(() => userStatusDatabaseRef.set(true));
    });
  }

  subscribeToActiveUserCount() {
    const firebase = this.props.firebase;
    const onlineUsersRef = firebase.database.ref('/online');

    onlineUsersRef.orderByValue().startAt(true).on('value', (snapshot) => {
      this.setState({
        activeUserCount: snapshot.numChildren(),
        loading: false
      })
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

export default withFirebase(App);
