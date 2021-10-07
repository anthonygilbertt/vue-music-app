import { ref } from 'vue'
import { projectAuth } from '../firebase/config'

const error = ref(null)
const isPending = ref(false)

// This is the func we will use to sign ppl up
const signup = async(email, password, displayName) => {
    // we passed in the following arguments, because when we run the function
    // we need to pass in the values of these aruments.  

    //here we are re-setting the error value incase if they tried to interact with
    // the form previously and got an error
    error.value = null
    isPending.value = true


    try {
        const res = await projectAuth.createUserWithEmailAndPassword(email, password)
        if (!res) {
            throw new Error('Could not complete signup')
        }
        await res.user.updateProfile({ displayName })
        error.value = null
        isPending.value = false

        console.table(res.user);
        return res

    } catch (err) {
        console.log(err.message);
        error.value = err.message
        isPending.value = false

    }

}

const useSignup = () => {
    return { error, signup, isPending }
}


export default useSignup