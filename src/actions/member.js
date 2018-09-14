import ErrorMessages from '../constants/errors';
import statusMessage from './status';
import { Firebase } from '../lib/firebase';

/**
  * Set User's Data
  */
export function setUserData(dispatch, user) {
  const UID = Firebase.auth().currentUser.uid;
  return new Promise((resolve) => {
    Firebase.database().ref().child(`users/${UID}`).set({
      ...user,
      signedUp: Firebase.database.ServerValue.TIMESTAMP,
      lastLoggedIn: Firebase.database.ServerValue.TIMESTAMP,
    })
      .then(() => statusMessage(dispatch, 'loading', false).then(resolve));
  });
}

/**
  * Sign Up to Firebase
  */
export function signUp(formData) {
  const {
    email,
    password,
    firstName,
    lastName,
  } = formData;

  return dispatch => new Promise(async (resolve, reject) => {
    // Validation checks
    if (!firstName) return reject({ message: ErrorMessages.missingFirstName });
    if (!lastName) return reject({ message: ErrorMessages.missingLastName });
    if (!email) return reject({ message: ErrorMessages.missingEmail });
    if (!password) return reject({ message: ErrorMessages.missingPassword });

    await statusMessage(dispatch, 'loading', true);

    // Go to Firebase
    return Firebase.auth()
      .createUserWithEmailAndPassword(email, password)
      .then(async (res) => {
        // Send user details to Firebase database
        if (res && res.user && res.user.uid) {
          setUserData(dispatch, {
            firstName,
            lastName,
          }).then(() => statusMessage(dispatch, 'loading', false).then(resolve));
        }
      }).catch(reject);
  }).catch(async (err) => { await statusMessage(dispatch, 'error', err.message); throw err.message; });
}

/**
  * Get this User's Details
  */
function getUserData(dispatch) {
  const UID = (
    Firebase
    && Firebase.database().ref()
    && Firebase.auth()
    && Firebase.auth().currentUser
    && Firebase.auth().currentUser.uid
  ) ? Firebase.auth().currentUser.uid : null;

  if (!UID) return false;

  const ref = Firebase.database().ref().child(`users/${UID}`);

  return ref.on('value', (snapshot) => {
    const userData = snapshot.val() || [];

    return dispatch({
      type: 'USER_DETAILS_UPDATE',
      data: userData,
    });
  });
}

/**
  * Update User's Data
  */
function updateUserData(dispatch, user) {
  if (user.uid) {
    // Update last logged in data
    Firebase.database().ref().child(`users/${user.uid}`).update({
      lastLoggedIn: Firebase.database.ServerValue.TIMESTAMP,
    });

    // Send verification Email when email hasn't been verified
    if (user.emailVerified === false) {
      Firebase.auth().currentUser
        .sendEmailVerification()
        .catch(() => console.log('Verification email failed to send'));
    }

    // Get User Data
    getUserData(dispatch);
  }
}

export function getMemberData() {
  // Ensure token is up to date
  return dispatch => new Promise((resolve) => {
    Firebase.auth().onAuthStateChanged((loggedIn) => {
      if (loggedIn) {
        return resolve(getUserData(dispatch));
      }

      return () => new Promise(() => resolve());
    });
  });
}

/**
  * Login to Firebase with Email/Password
  */
export function login(formData) {
  const {
    email,
    password,
  } = formData;

  return dispatch => new Promise(async (resolve, reject) => {
    await statusMessage(dispatch, 'loading', true);

    // Validation checks
    if (!email) return reject({ message: ErrorMessages.missingEmail });
    if (!password) return reject({ message: ErrorMessages.missingPassword });

    // Go to Firebase
    return Firebase.auth()
      .signInWithEmailAndPassword(email, password)
      .then(async (res) => {
        const user = res && res.user ? res.user : null;
        updateUserData(dispatch, user);
        await statusMessage(dispatch, 'loading', false);
        return resolve(dispatch({
          type: 'USER_LOGIN',
          data: user,
        }));
      }).catch(reject);
  }).catch(async (err) => { await statusMessage(dispatch, 'error', err.message); throw err.message; });
}

/**
  * Login to Firebase with Auth Provider
  */
export function loginWithAuthProvider(data) {
  const {
    credential,
    providerId,
  } = data;

  return dispatch => new Promise(async (resolve, reject) => {
    await statusMessage(dispatch, 'loading', true);

    let currentUser;

    try {
      let token;
      if (providerId === 'facebook.com') {
        token = Firebase.auth.FacebookAuthProvider.credential(credential.token);
      }
      currentUser = await Firebase.auth().signInAndRetrieveDataWithCredential(token);
    } catch (error) {
      if (error.code === 'auth/account-exists-with-different-credential') {
        try {
          const methods = await Firebase.auth().fetchSignInMethodsForEmail(error.email);
          // const pendingCred = error.credential;
          if (methods[0] === 'password') {
            return reject({ message: ErrorMessages.memberExistsWithMethodPassword });
          }
        } catch (e) {
          console.log('e', e);
        }
      }
    }
    updateUserData(dispatch, currentUser.user);

    const { profile } = currentUser.additionalUserInfo;

    try {
      await setUserData(dispatch, {
        firstName: profile.first_name,
        lastName: profile.last_name,
        picture: profile.picture.data.url,
      });
    } catch (e) {
      console.log(e);
    }

    await statusMessage(dispatch, 'loading', false);

    // Send Login data to Redux
    return resolve(dispatch({
      type: 'USER_LOGIN',
      data: currentUser.user,
    }));
  }).catch(async (err) => { await statusMessage(dispatch, 'error', err.message); throw err.message; });
}

/**
  * Reset Password
  */
export function resetPassword(formData) {
  const { email } = formData;

  return dispatch => new Promise(async (resolve, reject) => {
    // Validation checks
    if (!email) return reject({ message: ErrorMessages.missingEmail });

    await statusMessage(dispatch, 'loading', true);

    // Go to Firebase
    return Firebase.auth()
      .sendPasswordResetEmail(email)
      .then(() => statusMessage(dispatch, 'loading', false).then(resolve(dispatch({ type: 'USER_RESET' }))))
      .catch(reject);
  }).catch(async (err) => { await statusMessage(dispatch, 'error', err.message); throw err.message; });
}

/**
  * Update Profile
  */
export function updateProfile(formData) {
  const {
    email,
    password,
    firstName,
    lastName,
    about,
    changeEmail,
    changePassword,
  } = formData;

  return dispatch => new Promise(async (resolve, reject) => {
    // Are they a user?
    const UID = Firebase.auth().currentUser.uid;
    if (!UID) return reject({ message: ErrorMessages.missingFirstName });

    // Validation checks
    if (!firstName) return reject({ message: ErrorMessages.missingFirstName });
    if (!lastName) return reject({ message: ErrorMessages.missingLastName });
    if (!about) return reject({ message: ErrorMessages.missingAbout });
    if (changeEmail) {
      if (!email) return reject({ message: ErrorMessages.missingEmail });
    }
    if (changePassword) {
      if (!password) return reject({ message: ErrorMessages.missingPassword });
    }

    await statusMessage(dispatch, 'loading', true);

    // Go to Firebase
    return Firebase.database().ref().child(`users/${UID}`).update({ firstName, lastName, about })
      .then(async () => {
        // Update Email address
        if (changeEmail) {
          await Firebase.auth().currentUser.updateEmail(email).catch(reject);
        }

        // Change the password
        if (changePassword) {
          await Firebase.auth().currentUser.updatePassword(password).catch(reject);
        }

        // Update Redux
        await getUserData(dispatch);
        await statusMessage(dispatch, 'success', 'Profile Updated');
        resolve();
      })
      .catch(reject);
  }).catch(async (err) => { await statusMessage(dispatch, 'error', err.message); throw err.message; });
}

/**
  * Logout
  */
export function logout() {
  return dispatch => new Promise(async (resolve, reject) => {
    await statusMessage(dispatch, 'loading', true);
    Firebase.auth().signOut()
      .then(async () => {
        dispatch({ type: 'USER_RESET' });
        setTimeout(async () => {
          await statusMessage(dispatch, 'loading', false);
          resolve();
        }, 1000); // Resolve after 1s so that user sees a message
      }).catch(reject);
  }).catch(async (err) => { await statusMessage(dispatch, 'error', err.message); throw err.message; });
}
