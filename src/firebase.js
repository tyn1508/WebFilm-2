import { initializeApp } from "firebase/app";
import { addDoc, collection, getFirestore } from "firebase/firestore";
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDeVzswjEWwUA49GgQ4tjYI0EipBsJU-sU",
  authDomain: "filmlag-86f1e.firebaseapp.com",
  projectId: "filmlag-86f1e",
  storageBucket: "filmlag-86f1e.firebasestorage.app",
  messagingSenderId: "282820710796",
  appId: "1:282820710796:web:f0d689a4f2b349067406a9"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// Hàm đăng ký
const signup = async (name, email, password) => {
    try {
         // Kiểm tra xem tên có được nhập hay không
        if (!name) {
            throw new Error("Tên không được để trống."); 
            // lỗi nếu tên thiếu
        }
        const res = await createUserWithEmailAndPassword(auth, email, password);
        const user = res.user;
        await addDoc(collection(db, "user"), {
            uid: user.uid,
            name,
            authProvider: "local",
            email,
        });
    } catch (error) {
        console.log(error);
        alert(error.message); // Chỉ hiển thị thông báo lỗi
    }
};

// Hàm đăng nhập
const login = async (email, password) => { // Thêm tham số email và password
    try {
        await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
        console.log(error);
        alert("Kiểm tra lại thông tin đăng nhập.");
         // Chỉ hiển thị thông báo lỗi
    }
};

// Hàm đăng xuất
const logout = async () => { // Thêm async để xử lý promise
    try {
        await signOut(auth);
    } catch (error) {
        console.log(error);
        alert(error.message); // Chỉ hiển thị thông báo lỗi
    }
};

// Xuất các hàm và biến
export { auth, db, login, signup, logout };