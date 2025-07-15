// firebase-config.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getStorage, ref, uploadBytes, getDownloadURL } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-storage.js";
import { getFirestore, addDoc, collection } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyBZ6drRWnTC88fgdK6DfKntGyDx9qk3_LA",
  authDomain: "musical-rahl.firebaseapp.com",
  projectId: "musical-rahl",
  storageBucket: "musical-rahl.appspot.com",
  messagingSenderId: "438048078383",
  appId: "1:438048078383:web:41916937d866366ce324da",
  measurementId: "G-XMX3ZGCD4J"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);

// Upload form logic
const form = document.getElementById('uploadForm');
const status = document.getElementById('status');

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const title = document.getElementById("title").value.trim();
  const artist = document.getElementById("artist").value.trim();
  const coverFile = document.getElementById("cover").files[0];
  const audioFile = document.getElementById("audio").files[0];

  if (!title || !artist || !coverFile || !audioFile) {
    return status.innerText = "Please fill in all fields.";
  }

  status.innerText = "Uploading to Rahl Library...";

  try {
    // Upload files
    const coverRef = ref(storage, `covers/${Date.now()}-${coverFile.name}`);
    const audioRef = ref(storage, `audios/${Date.now()}-${audioFile.name}`);

    await uploadBytes(coverRef, coverFile);
    await uploadBytes(audioRef, audioFile);

    const coverURL = await getDownloadURL(coverRef);
    const audioURL = await getDownloadURL(audioRef);

    // Save song metadata to Firestore
    await addDoc(collection(db, "songs"), {
      title,
      artist,
      cover: coverURL,
      audio: audioURL
    });

    status.innerText = "✅ Song uploaded successfully 👑";
    form.reset();
  } catch (error) {
    console.error("Upload error:", error);
    status.innerText = "❌ Upload failed. Try again.";
  }
});
