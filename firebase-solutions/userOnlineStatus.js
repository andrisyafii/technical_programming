// Solution 2: Maintaining user's online/offline status and 'recentlyActive' field

// Method 1: Using Firebase Presence System
/**
 * Track user online status with Firebase Realtime Database
 * @param {string} userId - The user's ID
 */
function trackUserPresence(userId) {
    const db = admin.firestore();
    const rtdb = admin.database();
    
    // Create a reference to this user's specific status node
    const userStatusRef = rtdb.ref(`/status/${userId}`);
    
    // Create a reference to the Firestore document
    const userRef = db.collection('USERS').doc(userId);
    
    // Set up the Realtime Database connection state
    rtdb.ref('.info/connected').on('value', async (snapshot) => {
      // If we're not connected, don't do anything
      if (snapshot.val() === false) {
        return;
      }
      
      // If we are connected, then update the status in the Realtime Database
      // When this device disconnects, automatically set the status to offline
      // and update the lastActive timestamp
      await userStatusRef.onDisconnect().update({
        state: 'offline',
        lastChanged: admin.database.ServerValue.TIMESTAMP,
      });
      
      // Set the status to online
      await userStatusRef.update({
        state: 'online',
        lastChanged: admin.database.ServerValue.TIMESTAMP,
      });
      
      // Update Firestore with current status and timestamp
      await userRef.update({
        online: true,
        recentlyActive: Math.floor(Date.now() / 1000) // Current time in epoch seconds
      });
    });
    
    // Listen for changes in the Realtime Database and update Firestore
    userStatusRef.on('value', async (snapshot) => {
      const status = snapshot.val();
      if (status.state === 'offline') {
        // User is offline, update the Firestore document
        await userRef.update({
          online: false,
          recentlyActive: Math.floor(status.lastChanged / 1000) // Convert to epoch seconds
        });
      }
    });
  }
  
  // Method 2: Periodic updates from client devices
  /**
   * Update user's active status periodically while app is open
   * @param {string} userId - The user's ID
   * @param {number} intervalMinutes - How often to update status (in minutes)
   */
  function setupPeriodicActivityUpdates(userId, intervalMinutes = 5) {
    const db = admin.firestore();
    const userRef = db.collection('USERS').doc(userId);
    
    // Update the recentlyActive timestamp immediately
    userRef.update({
      recentlyActive: Math.floor(Date.now() / 1000)
    });
    
    // Set up a periodic update while the client is using the app
    const intervalId = setInterval(() => {
      userRef.update({
        recentlyActive: Math.floor(Date.now() / 1000)
      });
    }, intervalMinutes * 60 * 1000); // Convert minutes to milliseconds
    
    // Return the interval ID so it can be cleared when the user logs out
    return intervalId;
  }
  
  // Method 3: When using Firebase Authentication
  /**
   * Update recentlyActive timestamp on Authentication state change
   */
  function setupAuthListeners() {
    const db = admin.firestore();
    const auth = admin.auth();
    
    // Listen for authentication state changes
    auth.onAuthStateChanged(user => {
      if (user) {
        // User is signed in, update their timestamp
        const userRef = db.collection('USERS').doc(user.uid);
        userRef.update({
          recentlyActive: Math.floor(Date.now() / 1000)
        });
      }
    });
  }