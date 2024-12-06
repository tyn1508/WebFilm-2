import { initializeApp } from "firebase/app";
import { addDoc, collection, getFirestore, doc, updateDoc } from "firebase/firestore";
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signOut, sendPasswordResetEmail } from "firebase/auth";

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

// Hàm cập nhật thông tin người dùng
const updateUser  = async (uid, updatedData) => {
    try {
        const userDoc = doc(db, "user", uid); // Lấy tài liệu người dùng theo uid
        await updateDoc(userDoc, updatedData); // Cập nhật tài liệu
        console.log("Cập nhật thông tin thành công");
    } catch (error) {
        console.log(error);
        alert("Cập nhật thông tin không thành công: " + error.message);
    }
};
// Hàm gửi mã xác thực qua email
const resetPassword = async (email) => {
    try {
        await sendPasswordResetEmail(auth, email);
        console.log("Mã xác thực đã được gửi đến email của bạn.");
    } catch (error) {
        console.log(error);
        alert("Có lỗi xảy ra: " + error.message);
    }
};


// Xuất các hàm và biến
export { auth, db, login, signup, logout, updateUser , resetPassword };