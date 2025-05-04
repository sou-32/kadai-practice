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
//timesリスト作成
const ref = db.collection("TimeList").doc("times");
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
var minutes = 0;
var minutes_numstring = "00";
//設定する時間の保存場所作成
var classNum = 0;
var Hour = hour;
var Month = month;
var dates = date;

document.getElementById("Month").innerHTML = month;
document.getElementById("Dates").innerHTML = date;
document.getElementById("Hour").innerHTML = hour;

ref.get().then((docSnapshot) => {
    if (docSnapshot.exists) {
        const data = docSnapshot.data();
        const classNames = data.myString || [];
        const classNums = data.myNumber || [];

        const tableBody = document.getElementById("data_table_body");
        tableBody.innerHTML = ""; // 既存行をクリア

        for (let i = 0; i < classNames.length; i++) {
            const tr = document.createElement("tr");

            const classCell = document.createElement("td");
            classCell.textContent = className[classNums[i] - 5]; // 教科名

            const timeCell = document.createElement("td");
            timeCell.textContent = classNames[i]; // 提出期限（日時）

            tr.appendChild(classCell);
            tr.appendChild(timeCell);
            tableBody.appendChild(tr);
        }
    }
});

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
        if( Hour < 0){
            Hour = 23;
        }
        document.getElementById("nowpush").innerHTML = Hour;
    }
    if(value==2){
        Hour += 1;
        if(Hour >= 24){
            Hour = 0;
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
            minutes_numstring = 0;
            document.getElementById('Minutes').innerHTML = "00";
        }
        if(value == 4){
            buttonNum.style.backgroundColor = "black";
            document.querySelector('button[value="3"]').style.backgroundColor="white";
            minutes = "30";
            //firestoreに、indexの数値として保存するため
            minutes_numstring = 30;
            document.getElementById('Minutes').innerHTML = "30";
        }
    }
    if(value==0){
        //設定した時間を取得・表示
        const time = Month + "月" + dates + "日" + Hour + "時" + minutes_numstring + "分";
        document.getElementById('result_class_time').innerHTML = className[classNum-5]+time;
        //times作成
        const time_tag = Month*1000000+dates*10000+Hour*100+minutes;

        ref.get().then((docSnapshot)=>{
            if(docSnapshot.exists){
                //ドキュメント内を監視し、データを取得。data変数に入れる
                const data = docSnapshot.data();
                //ドキュメントの中身を取り出し、同じ名前の変数を作成し、コピー.
                //  || [] ←これをつけるのは、空の配列を取得した時、プッシュできないからだそう
                const myTag = data.myTag || [];
                const myString = data.myString || [];
                const myNumber = data.myNumber || [];

                //三つのローカルに存在する変数に、ユーザが入力した情報を追加
                myTag.push(time_tag);
                myString.push(time);
                myNumber.push(classNum);

                //新しくなった配列を並び替え
                const Length = myTag.length; //始め、data.myTag.lengthになっていた。これでドキュメントが空の時エラーはになる。
                for(let i = 0; i < Length; i++){
                    for(let x = i+1; x < Length; x++){
                        if(myTag[i]>myTag[x]){
                            let temp_tag = myTag[i];
                            myTag[i] = myTag[x];
                            myTag[x] = temp_tag;
                            
                            let temp_string = myString[i];
                            myString[i] = myString[x];
                            myString[x] = temp_string;

                            let temp_number = myNumber[i];
                            myNumber[i] = myNumber[x];
                            myNumber[x] = temp_number;
                        }
                    }
                }
                console.log("myTag:", myTag);
                console.log("myString:", myString);
                console.log("myNumber:", myNumber);
                //ユーザが入力した情報を加え、並び替えた配列をアップデート
                ref.update({
                    myTag: myTag,
                    myString: myString, 
                    myNumber: myNumber 
                }).catch(()=>{
                    console.log("保存できたよ！");
                });
                
            }
            else{
                const myTag = [],myString = [],myNumber = [];
                myTag.push(time_tag);
                myString.push(time);
                myNumber.push(classNum);

                ref.set({
                    myTag: myTag,
                    myString: myString, 
                    myNumber: myNumber 
                });
            }
        });
        //
  

    }

}
//firestore表示--------------------------------------

/**/

