import { ref as vref } from 'vue'
import { ref } from "firebase/storage";
import { getStorage, uploadBytes, getDownloadURL } from "firebase/storage";
import getUser from '@/composables/getUser.js'
import { projectStorage } from '../firebase/config'

// TODO
// Get the url back from the request

const useStorage = () => {
    const error = vref(null)
    const url = vref(null)
    const firebaseFilePath = vref(null)
    const { user } = getUser()

    const uploadImage = async(file) => {

        firebaseFilePath.value = `covers/${user.value.uid}/${file.name}`;
        console.log('firebaseFilePath.value: ', firebaseFilePath.value);

        const projectStorage = getStorage();
        const storageRef = ref(projectStorage, firebaseFilePath.value);

        try {
            // const res = await storageRef.put(file)
            const res = await uploadBytes(storageRef, file).then((snapshot) => {
                console.log('Uploaded a blob or file!');
            });

            // url.value = await res.ref.getDownloadURL()

            url.value = await getDownloadURL(ref(projectStorage, firebaseFilePath.value))
                .then((url) => {
                    console.log('fuck yeah! -> ', url);
                    return url
                })


            if (!res) {
                throw new Error('Could not login')
            }

            console.log('file uploaded');
            error.value = null
            return res
        } catch (err) {
            console.log('some shit went south');
            console.log(err.message);
            error.value = err.message
        }
    }
    error.value = null

    return { url, firebaseFilePath, error, uploadImage }
}

export default useStorage