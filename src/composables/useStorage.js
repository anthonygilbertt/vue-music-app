import { ref } from 'vue'
import { projectStorage } from '../firebase/config'
import getUser from '@/src/composables/getUser.js'


const useStorage = () => {
    const error = ref(null)
    const url = ref(null)
    const filePath = ref(null)
    const { user } = getUser()

    const uploadImage = async(file) => {
        filePath.value = `covers/${user.value.uid}/${file.name}`
            // Create a storage reference from our storage service
        const storageRef = projectStorage.ref(filePath.value);

        try {
            const res = await storageRef.put(file)
            url.value = res.ref.getDownloadURL()

            if (!res) {
                throw new Error('Could not login')
            }
            error.value = null
            return res
        } catch (err) {
            console.log(err.message);
            error.value = err.message
        }
    }
    error.value = null


    return { url, filePath, error, uploadImage }
}


export default useStorage