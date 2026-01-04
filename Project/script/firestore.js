// import { app } from "./firebase.js";
import { getFirestore, collection, getDocs, query, where, addDoc, doc, getDoc, updateDoc, deleteDoc } from "https://www.gstatic.com/firebasejs/12.6.0/firebase-firestore.js";

// const app = getApp()
const db = getFirestore();

export const readMeals = async (userId) => {
    const q = query(collection(db, "meals"), where("userId", "==", userId));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(d => ({ id: d.id, ...d.data() }));
}

export const createNewMealInFirestore = async (data) => {

    try {
        //Add a new document with a generated id.
        const docRef = await addDoc(collection(db, "meals"), data);
        console.log("Document written with ID: ", docRef.id);
        return docRef.id;
    } catch (error) {
        console.error("Error adding document to Firestore ", error.message);
        throw error;
    }
}

export const readMeal = async (mealId) => {
    const docRef = doc(db, "meals", mealId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
        return docSnap.data();
    } else {
        // docSnap.data() will be undefined in this case
        console.log("No such document!");
        return null;
    }
}

export const updateMealInFirestore = async (mealId, updatedData) => {
    const docRef = doc(db, "meals", mealId);
    try {
        await updateDoc(docRef, updatedData);
        return true;
    } catch (error) {
        console.error(error.message);
        throw error;
    }
    // Set the "capital" field of the city 'DC'

}

export const deleteMealInFirestore = async (mealId) => {
    await deleteDoc(doc(db, "meals", mealId));
    return true;
}
