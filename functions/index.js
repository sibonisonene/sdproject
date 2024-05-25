const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp();

// Existing addAdminRole function
exports.addAdminRole = functions.https.onCall((data, context) => {
  // Check if request is made by an authenticated user
  if (!context.auth) {
    throw new functions.https.HttpsError('failed-precondition', 'The function must be called while authenticated.');
  }

  // Get user and add admin custom claim
  return admin.auth().getUserByEmail(data.email).then(user => {
    return admin.auth().setCustomUserClaims(user.uid, {
      admin: true
    });
  }).then(() => {
    return { message: `Success! ${data.email} has been made an admin.` };
  }).catch(err => {
    throw new functions.https.HttpsError('unknown', err.message, err);
  });
});

// New removeAdminRole function
exports.removeAdminRole = functions.https.onCall((data, context) => {
  // Check if request is made by an authenticated user
  if (!context.auth) {
    throw new functions.https.HttpsError('failed-precondition', 'The function must be called while authenticated.');
  }

  // Get user and remove admin custom claim
  return admin.auth().getUserByEmail(data.email).then(user => {
    return admin.auth().setCustomUserClaims(user.uid, {
      admin: false
    });
  }).then(() => {
    return { message: `Success! ${data.email} is no longer an admin.` };
  }).catch(err => {
    throw new functions.https.HttpsError('unknown', err.message, err);
  });
});

// New deleteUser function
exports.deleteUser = functions.https.onCall((data, context) => {
  // Check if request is made by an authenticated user and the user is an admin
  if (!context.auth || !context.auth.token.admin) {
    throw new functions.https.HttpsError('failed-precondition', 'The function must be called while authenticated and by an admin.');
  }

  // Get user by email and delete the user
  return admin.auth().getUserByEmail(data.email).then(user => {
    return admin.auth().deleteUser(user.uid);
  }).then(() => {
    return { message: `Success! User with email ${data.email} has been deleted.` };
  }).catch(err => {
    throw new functions.https.HttpsError('unknown', err.message, err);
  });
});

// New function to send notifications when a fine is issued
exports.issueFineNotification = functions.firestore
  .document('Fines/{fineId}')
  .onCreate(async (snap, context) => {
    const fine = snap.data();
    const email = fine.email.toLowerCase(); // Ensure email is in lowercase

    console.log('New fine issued:', fine);
    console.log('Looking for user with email:', email);

    const userSnapshot = await admin.firestore().collection('Users').where('email', '==', email).get();
    if (userSnapshot.empty) {
      console.log('No matching user found for email:', email);
      return;
    }

    const user = userSnapshot.docs[0].data();
    const fcmToken = user.fcmToken;

    if (!fcmToken) {
      console.log('No FCM token found for user:', email);
      return;
    }

    console.log('FCM token:', fcmToken);

    const message = {
      notification: {
        title: 'New Fine Issued',
        body: `You have been issued a fine for: ${fine.reason}`
      },
      token: fcmToken
    };

    try {
      const response = await admin.messaging().send(message);
      console.log('Successfully sent message:', response);
    } catch (error) {
      console.error('Error sending message:', error);
    }
  });


