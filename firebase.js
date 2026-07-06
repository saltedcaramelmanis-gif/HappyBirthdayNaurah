// Import Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.10.0/firebase-app.js";
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  query,
  orderBy,
  serverTimestamp
} from "https://www.gstatic.com/firebasejs/11.10.0/firebase-firestore.js";

// Konfigurasi Firebase
const firebaseConfig = {
  apiKey: "AIzaSyBSC1eBN8rmhsFrOsRdK6byEx82L4WMFDE",
  authDomain: "letters-for-naurah.firebaseapp.com",
  projectId: "letters-for-naurah",
  storageBucket: "letters-for-naurah.firebasestorage.app",
  messagingSenderId: "244353817757",
  appId: "1:244353817757:web:fe3a3268a89226d2c88874"
};

// Inisialisasi Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Menyimpan surat
export async function saveLetter(data) {
  try {
    await addDoc(collection(db, "letters"), {
      ...data,
      createdAt: serverTimestamp()
    });

    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
}

// Mengambil semua surat
export async function getLetters() {
  const q = query(
    collection(db, "letters"),
    orderBy("createdAt", "asc")
  );

  const snapshot = await getDocs(q);

  const letters = [];

  snapshot.forEach((doc) => {
    letters.push({
      id: doc.id,
      ...doc.data()
    });
  });

  return letters;
}
