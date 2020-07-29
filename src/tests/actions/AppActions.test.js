import React from 'react';
import App from '../../App';
import Firebase from '../../services/Firebase'
import {
  updateActiveUserCount, subscribeToActiveUserCount
} from '../../actions/AppActions'

const db = new Firebase().database;

describe('updateActiveUserCount', () => {
  it('increases the active user count by 1', async () => {
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

describe('subscribeToActiveUserCount', () => {
  it('should invoke callback when count changes', async () => {
    const cb = jest.fn();

    // subscribe then update count
    await subscribeToActiveUserCount(db, cb);
    await updateActiveUserCount(db, Date.now());

    db.ref('/status').once('value').then(() => {
      // ensures expectation is asserted after firebase post-update callback
      expect(cb.mock.calls.length).toBe(1);
    });
  })
});
