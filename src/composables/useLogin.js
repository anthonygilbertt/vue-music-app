import { ref } from 'vue'
import { projectAuth } from '../firebase/config'

const error = ref(null)
const isPending = ref(false)

// This is the func we will use to sign ppl up
const login = async(email, password) => {
    // we passed in the following arguments, because when we run the function
    // we need to pass in the values of these aruments.  
    isPending.value = true

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
        isPending.value = false
        return res

    } catch (err) {
        console.log(err.message);
        error.value = "Incorrect login credentials"
        isPending.value = true
    }

}

const useLogin = () => {
    return { error, login, isPending }
}


export default useLogin