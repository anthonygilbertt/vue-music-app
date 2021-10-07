import { ref } from 'vue'
import { projectAuth } from '../firebase/config'

const error = ref(null)

// This is the func we will use to sign ppl up
const login = async(email, password) => {
    // we passed in the following arguments, because when we run the function
    // we need to pass in the values of these aruments.  

    //here we are re-setting the error value incase if they tried to interact with
    // the form previously and got an error
    error.value = null

    try {
        // const res = await projectAuth.createUserWithEmailAndPassword(email, password)
        const res = await projectAuth.signInWithEmailAndPassword(email, password)

        if (!res) {
            throw new Error('Could not login')
        }

        error.value = null

        console.table(res.user);
        return res

    } catch (err) {
        console.log(err.message);
        error.value = "Incorrect login credentials"
    }

}

const useLogin = () => {
    return { error, login }
}


export default useLogin