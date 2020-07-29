import app from 'firebase/app';
import 'firebase/database';

const config = {
  apiKey:      process.env[process.env.NODE_ENV === 'test' ? 'REACT_APP_TEST_API_KEY' : 'REACT_APP_API_KEY'],
  databaseURL: process.env[process.env.NODE_ENV === 'test' ? 'REACT_APP_TEST_DATABASE_URL' : 'REACT_APP_DATABASE_URL']
};

class Firebase {
  constructor() {
    app.initializeApp(config);

    this.database = app.database()
  }
}

export default Firebase;
