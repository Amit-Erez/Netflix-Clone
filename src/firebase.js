
import { initializeApp } from "firebase/app";
import { 
    createUserWithEmailAndPassword, 
    getAuth, 
    signInWithEmailAndPassword, 
    signOut} from "firebase/auth";
import { addDoc, 
         collection, 
         getFirestore } from "firebase/firestore";
import { toast } from "react-toastify";

const firebaseConfig = {
  apiKey: "AIzaSyB7OTy2huf5Y4WTmAyr65vNY6KZVT0JNmE",
  authDomain: "netflix-clone-455a1.firebaseapp.com",
  projectId: "netflix-clone-455a1",
  storageBucket: "netflix-clone-455a1.firebasestorage.app",
  messagingSenderId: "853522156662",
  appId: "1:853522156662:web:30834eef10a047b4112357"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const signup = async (name, email, password)=>{
    try {
        const res = await createUserWithEmailAndPassword(auth, email, password);
        const user = res.user;
        await addDoc(collection(db, "user"), {
            uid: user.uid,
            name, 
            authProvider: "local",
            email,
        } )
    } catch (error) {
        console.log(error);
        toast.error(error.code.split('/')[1].split('-').join(" "));
    }

}

const login = async (email, password)=>{
    try {
        await signInWithEmailAndPassword(auth, email, password)
    } catch (error) {
        console.log(error);
        toast.error(error.code.split('/')[1].split('-').join(" "));
    }
}

const logout = ()=> {
    signOut(auth);
}

export {auth, db, login, signup, logout};