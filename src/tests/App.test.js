import React from 'react';
import App from '../App';
import renderer from 'react-test-renderer';
import Firebase, { FirebaseContext } from '../services/Firebase'

it('renders', () => {
  const tree = renderer
    .create(
      <FirebaseContext.Provider value={new Firebase()}>
        <App />
      </FirebaseContext.Provider>
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
