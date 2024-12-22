import { initializeApp } from "firebase/app";
import { addDoc, collection, getFirestore, doc, updateDoc, query, where, getDocs, deleteDoc } from "firebase/firestore";
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signOut, sendPasswordResetEmail } from "firebase/auth";

// Cấu hình Firebase
const firebaseConfig = {
    apiKey: "AIzaSyDeVzswjEWwUA49GgQ4tjYI0EipBsJU-sU",
    authDomain: "filmlag-86f1e.firebaseapp.com",
    projectId: "filmlag-86f1e",
    storageBucket: "filmlag-86f1e.firebasestorage.app",
    messagingSenderId: "282820710796",
    appId: "1:282820710796:web:f0d689a4f2b349067406a9"
};

// Khởi tạo Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// Hàm đăng ký
const signup = async (name, email, password) => {
    try {
        const res = await createUserWithEmailAndPassword(auth, email, password);
        const user = res.user;
        await addDoc(collection(db, "users"), { // Sửa tên collection thành "users"
            uid: user.uid,
            name,
            authProvider: "local",
            email,
        });
        console.log("Đăng ký thành công");
    } catch (error) {
        console.error("Lỗi đăng ký:", error);
        alert(error.message);
    }
};

// Hàm đăng nhập
const login = async (email, password) => {
    try {
        await signInWithEmailAndPassword(auth, email, password);
        console.log("Đăng nhập thành công");
    } catch (error) {
        console.error("Lỗi đăng nhập:", error);
        alert("Kiểm tra lại thông tin đăng nhập.");
    }
};

// Hàm đăng xuất
const logout = async () => {
    try {
        await signOut(auth);
        console.log("Đăng xuất thành công");
    } catch (error) {
        console.error("Lỗi đăng xuất:", error);
        alert(error.message);
    }
};

// Hàm cập nhật thông tin người dùng
const updateUser = async (uid, updatedData) => {
    try {
        const userDoc = doc(db, "users", uid); // Sửa tên collection thành "users"
        await updateDoc(userDoc, updatedData);
        console.log("Cập nhật thông tin thành công");
    } catch (error) {
        console.error("Lỗi cập nhật thông tin:", error);
        alert("Cập nhật thông tin không thành công: " + error.message);
    }
};

// Hàm gửi mã xác thực qua email
const resetPassword = async (email) => {
    try {
        await sendPasswordResetEmail(auth, email);
        console.log("Mã xác thực đã được gửi đến email của bạn.");
    } catch (error) {
        console.error("Lỗi gửi mã xác thực:", error);
        alert("Có lỗi xảy ra: " + error.message);
    }
};

// Hàm thêm mục yêu thích
const addFavorite = async (uid, itemId) => {
    if (!uid || !itemId) {
        console.error("UID hoặc ItemID không hợp lệ.");
        alert("UID hoặc ItemID không hợp lệ.");
        return;
    }

    try {
        const docRef = await addDoc(collection(db, "favorites"), {
            uid,
            itemId,
            createdAt: new Date(),
        });
        console.log("Đã thêm vào danh sách yêu thích với ID:", docRef.id);
    } catch (error) {
        console.error("Lỗi thêm yêu thích:", error);
        alert("Có lỗi xảy ra: " + error.message);
    }
};

// Hàm lấy danh sách yêu thích
const getFavorites = async (uid) => {
    if (!uid) {
        console.error("UID không hợp lệ.");
        alert("UID không hợp lệ.");
        return [];
    }

    try {
        const favoritesCollection = collection(db, "favorites");
        const q = query(favoritesCollection, where("uid", "==", uid));
        const querySnapshot = await getDocs(q);

        if (querySnapshot.empty) {
            console.log("Không có danh sách yêu thích nào.");
            return [];
        }

        const favorites = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        console.log("Danh sách yêu thích:", favorites);
        return favorites;
    } catch (error) {
        console.error("Lỗi lấy danh sách yêu thích:", error);
        alert("Có lỗi xảy ra: " + error.message);
    }
};


// Hàm xóa mục yêu thích
const removeFavorite = async (favoriteId) => {
    try {
        const favoriteDoc = doc(db, "favorites", favoriteId);
        await deleteDoc(favoriteDoc);
        console.log("Đã xóa khỏi danh sách yêu thích");
    } catch (error) {
        console.error("Lỗi xóa yêu thích:", error);
        alert("Có lỗi xảy ra: " + error.message);
    }
};

// Cập nhật hàm xóa yêu thích để xóa phim
const removeFavoriteAndMovie = async (favoriteId) => {
    await removeFavorite(favoriteId); // Xóa khỏi danh sách yêu thích
};


// Xuất các hàm và biến
export { auth, db, login, signup, logout, updateUser, resetPassword, addFavorite, getFavorites, removeFavorite, removeFavoriteAndMovie };