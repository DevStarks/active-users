import app from 'firebase/app';
import 'firebase/database';

const config = {
  apiKey: process.env.REACT_APP_API_KEY,
  databaseURL: process.env.REACT_APP_DATABASE_URL,
};

class Firebase {
  constructor() {
    app.initializeApp(config);

    this.database = app.database()
  }
}

export default Firebase;
