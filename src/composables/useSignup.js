import { ref } from 'vue'
import { projectAuth } from '../firebase/config'

const error = ref(null)

// This is the func we will use to sign ppl up
const signup = async(email, password, displayName) => {
    // we passed in the following arguments, because when we run the function
    // we need to pass in the values of these aruments.  

    //here we are re-setting the error value incase if they tried to interact with
    // the form previously and got an error
    error.value = null

    try {
        const res = await projectAuth.createUserWithEmailAndPassword(email, password)
        if (!res) {
            throw new Error('Could not complete signup')
        }
        await res.user.updateProfile({ displayName })
        error.value = null

        console.table(res.user);
        return res

    } catch (err) {
        console.log(err.message);
        error.value = err.message


    }

}

const useSignup = () => {
    return { error, signup }
}


export default useSignup