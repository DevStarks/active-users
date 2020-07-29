export const updateActiveUserCount = (uid, database) => {
  const userStatusDatabaseRef = database.ref('/status/' + uid);
  const dbRef = database.ref('.info/connected');

  dbRef.on('value', (snapshot) => {
    // If not currently connected, don't do anything.
    if (snapshot.val() === false) return;

    userStatusDatabaseRef.onDisconnect()
                         .set(false)
                         .then(() => userStatusDatabaseRef.set(true));
  });
}

export const subscribeToActiveUserCount = (database, callback) => {
  const onlineUsersRef = database.ref('/status');

  onlineUsersRef.orderByValue().startAt(true).on('value', callback)
}
