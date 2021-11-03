import { ref as vref } from 'vue'
import { ref } from "firebase/storage";
import { getStorage, uploadBytes } from "firebase/storage";
import getUser from '@/composables/getUser.js'
import { projectStorage } from '../firebase/config'


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
            const res = uploadBytes(storageRef, file).then((snapshot) => {
                console.log('Uploaded a blob or file!');
            });

            url.value = res.ref.getDownloadURL()

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