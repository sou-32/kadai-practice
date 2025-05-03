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
const ref = db.collection('TimeList').doc('time');
//---------------------------------------------------------
const className = [
    "月1:デジタルコンテンツ基礎:L-cam",
    "月2:キャリア意識形成:Moodle",
    "火2:サウンドメディア論:Moodle",
    "火3,4:画像処理:",
    "水1:カラーデザイン:Moodle",
    "水2:TOEIC:Moodle",
    "水3,4:webデザイン:Moodle",
    "木2:メディア産業論:Moodle",
    "木3:特別講義1:Moodle",
    "木4:ユーザーインタフェース:Moodle",
    "金2:コンピュータネットワーク:Moodle",
    "金3,4:CGプログラミング:Moodle"
  ];

var today = new Date();
const month = today.getMonth()+1;
const date = today.getDate()+7;
const hour = today.getHours();
//設定する時間の保存場所作成
var classNum = 0;
var Hour = hour;
var Month = month;
var dates = date;
var minutes;
document.getElementById("Month").innerHTML = month;
document.getElementById("Dates").innerHTML = date;
document.getElementById("Hour").innerHTML = hour;

//handleClick関数に引数として、ボタン自身のプロパティ情報を渡している
function handleClick(buttonNum){
    const value = buttonNum.value;
    //変数 = プロパティと値を引き出す関数()
    if(4<value){
        for(let i = 5; i<17; i++)
            if(getComputedStyle(document.querySelector('button[value="'+ i + '"]')).backgroundColor == "rgb(255, 200, 200)"){
                document.querySelector('button[value="' + i + '"]').style.backgroundColor="white";
                document.querySelector('button[value="'+ value +'"]').style.backgroundColor="rgb(255, 200, 200)";
            }
            else{
                document.querySelector('button[value="'+ value +'"]').style.backgroundColor="rgb(255, 200, 200)";
            }
    }
    if(value==-4){
        Month-= 1;
        document.getElementById("Month").innerHTML = Month;
    }
    if(value==-3){
        Month += 1;
        document.getElementById("Month").innerHTML = Month;
    }
    if(value==-2){
        dates -= 1;
        document.getElementById("Dates").innerHTML = dates;
    }
    if(value==-1){
        dates += 1;
        document.getElementById("Dates").innerHTML = dates;
    }
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
    for(let x = 5; x < 17; x++){
        if(value==x){
            classNum = x;
        }
    }
    //Chose_bgColor3に、現在の3ボタン目の色情報を格納、Chose_bgColor4も同様に格納
    var Chose_bgColor3 = getComputedStyle(document.querySelector('button[value="3"]')).backgroundColor;
    var Chose_bgColor4 = getComputedStyle(document.querySelector('button[value="4"]')).backgroundColor;
    //もしボックスのどちらとも黒色だったら
    if(Chose_bgColor3 == "rgb(0, 0, 0)" && Chose_bgColor4 =="rgb(0, 0, 0)"){
        if(value == 3){
            buttonNum.style.backgroundColor = "black";
            //もう片方のボックスの背景を白色に
            document.querySelector('button[value="4"]').style.backgroundColor="white";
            minutes = "00";
            document.getElementById('Minutes').innerHTML = "00";
        }
        if(value == 4){
            buttonNum.style.backgroundColor = "black";
            document.querySelector('button[value="3"]').style.backgroundColor="white";
            minutes = "30";
            document.getElementById('Minutes').innerHTML = "30";
        }
    }
    if(value==0){

        const time = Month + "月" + dates + "日" + Hour + "時" + minutes + "分";
        document.getElementById('result_class_time').innerHTML = className[classNum-5]+time;
        const data = {
            myString: time,
            myNumber: classNum
          };
          
          ref.set(data).then(() => {
            console.log("データが保存されました");
          }).catch((error) => {
            console.error("データ保存エラー:", error);
          });
          
    }
}
//firestore表示--------------------------------------
