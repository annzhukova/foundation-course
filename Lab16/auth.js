//const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut
  //onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/12.6.0/firebase-auth.js";



export const signup = async (email, password) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password)
    console.log(userCredential);
    return userCredential.user;
  }
  catch (error) {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log(errorCode, errorMessage);
  }
}

export const signin = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password)
    console.log(userCredential);
    return userCredential.user;
  }
  catch (error) {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log(errorCode, errorMessage);
  }
}


export const signout = async () => {
  try {
    const resp = await signOut(auth)
    console.log(resp);
    return resp;
  }
  catch (error) {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log(errorCode, errorMessage);
  }
}

/*export const onAuthChange = (callback) => {
  return onAuthStateChanged(auth, user => {
    callback(user);
  })
}*/