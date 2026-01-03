import { db } from "./firebase.js";
import { collection, getDocs, query, where, addDoc, doc, getDoc, updateDoc } from "https://www.gstatic.com/firebasejs/12.6.0/firebase-firestore.js";

export const readEntries = async (userId) => {
    const q = query(collection(db, "entries"), where("userId", "==", userId));
    const querySnapshot = await getDocs(q);

    /*const records = await getDocs(collection(db, "entries"));
    records.forEach((doc) => {
        console.log(`${doc.id} => ${doc.data()}`);
    });*/

    return querySnapshot.docs.map(d => ({ id: d.id, ...d.data() }));
}

export const createNewEntryInFirestore = async (data) => {

    try {
        //Add a new document with a generated id.
        const docRef = await addDoc(collection(db, "entries"), data);
        console.log("Document written with ID: ", docRef.id);
        return docRef.id;
    } catch (error) {
        console.error("Error adding document to Firestore ", error.message);
        throw error;
    }
}

export const readEntry = async (entryId) => {
    const docRef = doc(db, "entries", entryId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
        console.log("Document data:", docSnap.data());
        return docSnap.data();
    } else {
        // docSnap.data() will be undefined in this case
        console.log("No such document!");
        return null;
    }
}

export const updateEntryInFirestore = async (entryId, updatedData) => {
    const docRef = doc(db, "entries", entryId);
    try {
        await updateDoc(docRef, updatedData);
        return true;
    } catch (error) {
        console.error(error.message);
        throw error;
    }
    // Set the "capital" field of the city 'DC'

}