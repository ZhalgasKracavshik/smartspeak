import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "../lib/firebase";
import { UserProgress } from "../data/userProgress";

export async function getUserProgressFromDB(userId: string): Promise<UserProgress | null> {
    try {
        const docRef = doc(db, "users", userId);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            return docSnap.data() as UserProgress;
        } else {
            return null;
        }
    } catch (error) {
        console.error("Error getting user progress from DB:", error);
        return null;
    }
}

export async function saveUserProgressToDB(userId: string, progress: UserProgress): Promise<void> {
    try {
        const docRef = doc(db, "users", userId);
        await setDoc(docRef, progress, { merge: true });
    } catch (error) {
        console.error("Error saving user progress to DB:", error);
    }
}
