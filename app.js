// Firebaseの設定（あなたの情報）
const firebaseConfig = {
    apiKey: "AIzaSyDsD5uVHdUBjEwW9538pnfJKmcqxpX5nXk",
    authDomain: "kadai-698fe.firebaseapp.com",
    projectId: "kadai-698fe",
    storageBucket: "kadai-698fe.firebasestorage.app",
    messagingSenderId: "567535947359",
    appId: "1:567535947359:web:d1e1088c3e4a96ae6c95ea",
    measurementId: "G-Z05XF4LX2F"
  };
  //初期化
  firebase.initializeApp(firebaseConfig);
  const db = firebase.firestore();