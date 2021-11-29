import { getAuth, onAuthStateChanged } from "firebase/auth";

const getUser = () => {
    const auth = getAuth();
    const user = auth.currentUser

    onAuthStateChanged(auth, (user) => {
        if (user) {
            // User is signed in, see docs for a list of available properties
            // https://firebase.google.com/docs/reference/js/firebase.User
            const uid = user.uid;
            console.log('uid: ', uid);
            return uid
        } else {
            // User is signed out
            // ...
        }
    });

    return { user }
}


// auth changes
// projectAuth.onAuthStateChanged(_user => {
//     console.log('User state change. Current user is:', _user)
//     return user.value = _user
// });


export default getUser