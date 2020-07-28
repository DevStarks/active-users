import React from 'react';
import logo from './logo.svg';
import './App.css';
import { withFirebase } from './services/Firebase';
import generateUid from './services/uid'

class App extends React.Component {

  componentDidMount() {
    const firebase = this.props.firebase;
    const uid = generateUid()

    var userStatusDatabaseRef = firebase.database.ref('/online/' + uid);
    debugger

    firebase.database.ref('.info/connected').on('value', (snapshot) => {
      // If we're not currently connected, don't do anything.
      if (snapshot.val() === false) return;

      userStatusDatabaseRef.onDisconnect()
                           .set(null) //delete record once disconnected
                           .then(() => userStatusDatabaseRef.set(true));
    });
  }

  render() {
    return (
      <div className="App">
        <div className="App-container">
          <p></p>
        </div>
      </div>
    );
  }
}

export default withFirebase(App);
