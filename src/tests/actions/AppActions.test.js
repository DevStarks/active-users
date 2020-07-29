import React from 'react';
import App from '../../App';
import Firebase from '../../services/Firebase'
import {
  updateActiveUserCount, subscribeToActiveUserCount
} from '../../actions/AppActions'

const db = new Firebase().database;

describe('updateActiveUserCount', () => {
  it('increases the active user count by 1', async () => {
    db.goOnline();

    const query = db.ref('/status').orderByValue().startAt(true);

    // record user count
    let count;
    await query.once('value').then((snapshot) => count = snapshot.numChildren());

    // update user count
    await updateActiveUserCount(db, Date.now());

    // test new count
    query.once('value').then((snapshot) => {
      const newCount = snapshot.numChildren()
      expect(newCount).toBe(count + 1);
    });

  });
});

test('subscribeToActiveUserCount', () => {

});
