var firebaseConfig = {
  //YOUR CONFIG
    apiKey: "KEY-HERE",
    authDomain: "XXXX",
    databaseURL: "XXXX",
    projectId: "XXXX",
    storageBucket: "XXXX",
    messagingSenderId: "XXXXX",
    appId: "XXXXX",
    measurementId: "X-XXXX"
  };
  
  
  firebase.initializeApp(firebaseConfig);
//   var db = firebase.firestore();
  const db = firebase.firestore();
  db.settings({ timestampsInSnapshots: true }); 
  const list_div = document.querySelector('#list-div9');
  
//   var aadhar = document.getElementById(great).name;
  var user = document.getElementById("layoutSidenav_content").getAttribute("name");
 
  
                
console.log(user);

  db.collection("SOSAlerts").where("DATE_TIME_STAMP","==",user).get().then(function(querySnapshot){
      querySnapshot.forEach(function(doc){
        // console.log(doc.data().firstName);
    
          list_div.innerHTML+="<div class='list-item item1'><h4><b>Last Location Of User Was:</b> "+doc.data().LastLocation+"</h4><br><h4><b>User ID of the User:</b> "+ doc.data().UserID+"</h4><br><a class='ui inverted green button' href='/SOSServed/"+ doc.data().UserID+"'>SERVE THE SOS REQUEST</a></div>";
        
      });
  }).catch(function(error){
      console.log("ERROR GETTING DOCS",error);
  });