// this is used to set up a real time listener to a collection

import { ref } from "@vue/reactivity";
import { projectFirestore } from '../firebase/config'
import { watchEffect } from "vue";


const getCollection = (collection) => {
    const documents = ref(null)
    const error = ref(null)

    // await projectFirestore.collection(collection).get(doc)
    let collectionRef = projectFirestore.collection(collection)
        .orderBy('createdAt')

    const unsub = collectionRef.onSnapshot(snap => {
            console.log('snapshot ');
            let results = [] //we're going to have more than 1 result,
                // so we're creating an empty array

            // now we want to cycle through the 'snap' and
            //add each result to the newly created array
            snap.docs.forEach((doc) => {
                // this returns all the results of the document + the id for the document

                doc.data().createdAt && results.push({...doc.data(), id: doc.id })
            })
            documents.value = results
            error.value = null

        }, (err) => {
            console.log(err.message);
            documents.value = null
            error.value = 'could not fetch the data'
        }) //this is how you set up a real time listener


    watchEffect(onInvalidate => {
        // This invalidation callback is called when:
        // - the effect is about to re - run
        // - the watcher is stopped(i.e.when the component is unmounted if watchEffect is used inside setup()
        //   or lifecycle hooks)
        onInvalidate(() => {
            // this function will run when the component unmounts
            // in this case, we want to unsubscribe from the real-time listener
            unsub()
                //now we will only get 2 snapshots: 1 local & 1 from the server

        })

    })

    return { error, documents }
}

export default getCollection