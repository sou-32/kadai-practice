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
//---------------------------------------------------------
var today = new Date();
const hour = today.getHours();
//設定する時間の保存場所作成
var Hour = hour;
var minutes;
document.getElementById("Hour").innerHTML = hour;

//handleClick関数に引数として、ボタン自身のプロパティ情報を渡している
function handleClick(buttonNum){
    const value = buttonNum.value;
    //変数 = プロパティと値を引き出す関数()

    if(value==1){
        Hour -= 1;
        if(Hour > 24 || Hour < 0){
            Hour = 12;
        }
        document.getElementById("nowpush").innerHTML = Hour;
    }
    if(value==2){
        Hour += 1;
        if(Hour > 24 || Hour < 0){
            Hour = 12;
        }
        document.getElementById("nowpush").innerHTML = Hour;
    }
    if(value==3){
        
        buttonNum.style.backgroundColor = "black";
        document.querySelector('button[value="4"]').style.backgroundColor="black";
    }
    if(value==4){
    
        buttonNum.style.backgroundColor = "black";
        document.querySelector('button[value="3"]').style.backgroundColor="black";
    }

    //Chose_bgColor3に、現在の3ボタン目の色情報を格納、Chose_bgColor4も同様に格納
    var Chose_bgColor3 = getComputedStyle(document.querySelector('button[value="3"]')).backgroundColor;
    var Chose_bgColor4 = getComputedStyle(document.querySelector('button[value="4"]')).backgroundColor;
    if(Chose_bgColor3 == "rgb(0, 0, 0)" && Chose_bgColor4 =="rgb(0, 0, 0)"){
        if(value == 3){
            buttonNum.style.backgroundColor = "black";
            document.querySelector('button[value="4"]').style.backgroundColor="white";
            minutes = "00";
        }
        if(value == 4){
            buttonNum.style.backgroundColor = "black";
            document.querySelector('button[value="3"]').style.backgroundColor="white";
            minutes = "30";
        }
    }
    if(value==100){
        const time = Hour + "時" + minutes + "分";
        document.getElementById('result_time').innerHTML = time;
    }
}
//---------------------------------------------------------
