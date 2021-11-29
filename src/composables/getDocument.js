import { ref, watchEffect } from 'vue'
import { projectFirestore } from '../firebase/config'

// TODO
// Finish writing this composable and making it only fetch a single document instead
// of an entire collection

const getDocument = (collection, id) => {

    const document = ref(null)
    const error = ref(null)

    // register the firestore collection reference
    let documentRef = projectFirestore.collection(collection).doc(id)

    // unsbun is returned when a snapshot is taken
    const unsub = documentRef.onSnapshot(snap => {
        if (snap.data()) {
            document.value = {...snap.data(), id: snap.id }
            console.log('document.value: ', document.value);
            error.value = null
        } else {
            error.value = 'That document does not exist.'
        }
    }, err => {
        console.log(err.message)
        error.value = 'could not fetch the data'
    })

    // onInvalidate will run when the component mounts
    watchEffect((onInvalidate) => {
        onInvalidate(() => unsub());
    });

    return { error, document }
}

export default getDocument