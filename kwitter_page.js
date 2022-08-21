//YOUR FIREBASE LINKS
const firebaseConfig = {
      apiKey: "AIzaSyDKSAER78T4BiVy3dro3jwKsSKtUHs3gvw",
      authDomain: "kwitter-70d76.firebaseapp.com",
      databaseURL: "https://kwitter-70d76-default-rtdb.firebaseio.com",
      projectId: "kwitter-70d76",
      storageBucket: "kwitter-70d76.appspot.com",
      messagingSenderId: "482849514517",
      appId: "1:482849514517:web:f149be7be8ba7dfef71a1c"
    };
     firebase.initializeApp(firebaseConfig);
     user_name=localStorage.getItem("user_name");
     room_name=localStorage.getItem("room_name");
     function send(){
      msg=document.getElementById("msg").value;
      firebase.database().ref(room_name).push({
            name:user_name,
            message:msg,
            like:0
      });
      document.getElementById("msg").value="";
     }

function getData() { firebase.database().ref("/"+room_name).on('value', function(snapshot) { document.getElementById("output").innerHTML = ""; snapshot.forEach(function(childSnapshot) { childKey  = childSnapshot.key; childData = childSnapshot.val(); if(childKey != "purpose") {
         firebase_message_id = childKey;
         message_data = childData;
//Start code
console.log(firebase_message_id);
console.log(message_data);
name=message_data['name'];
message=message_data['message'];
like=message_data['like'];
name_with_tag="<h4>"+name+"<img class='user_tick' src='tick.png'></h4>";
message_with_tag="<h4 class='message_h4'>"+message+"</h4>";
like_button="<button class='btn btn-warning' id="+firebase_message_id+"value="+ like+"onclick='update_like(this.id)'>";
span_with_tag="<span class='glyphicon glyphicon-thumbs-up'>like: "+like+"</span></button><hr>";
row=name_with_tag+message_with_tag+like_button+span_with_tag;
document.getElementById("output").innerHTML+=row;
//End code
      } });  }); }
getData();
function update_like(firebase_message_id){
console.log("CLICKED ON LIKE BUTTON"+firebase_message_id);
button_id=firebase_message_id;
likes=document.getElementById(button_id).value;
updated_likes=Number(likes)+1;
console.log(updated_likes);
firebase.database().ref(room_name).child(firebase_message_id).update({
      like:updated_likes
});
}
function logout(){
      localStorage.removeItem("user_name");
      localStorage.removeItem("room_name");
      window.location.replace("index.html");
}
