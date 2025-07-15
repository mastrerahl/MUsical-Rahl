// firebase-config.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getStorage, ref, uploadBytes, getDownloadURL } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-storage.js";
import { getFirestore, addDoc, collection } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "YOUR-API-KEY",
  authDomain: "YOUR-DOMAIN.firebaseapp.com",
  projectId: "YOUR-PROJECT-ID",
  storageBucket: "YOUR-BUCKET.appspot.com",
  messagingSenderId: "YOUR-SENDER-ID",
  appId: "YOUR-APP-ID"
};

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

  status.innerText = "Uploading...";

  try {
    // Upload files to Firebase Storage
    const coverRef = ref(storage, `covers/${Date.now()}-${coverFile.name}`);
    const audioRef = ref(storage, `audios/${Date.now()}-${audioFile.name}`);

    await uploadBytes(coverRef, coverFile);
    await uploadBytes(audioRef, audioFile);

    const coverURL = await getDownloadURL(coverRef);
    const audioURL = await getDownloadURL(audioRef);

    // Save to Firestore
    await addDoc(collection(db, "songs"), {
      title,
      artist,
      cover: coverURL,
      audio: audioURL
    });

    status.innerText = "Uploaded successfully 👑";
    form.reset();
  } catch (err) {
    console.error(err);
    status.innerText = "Upload failed. Try again.";
  }
});
