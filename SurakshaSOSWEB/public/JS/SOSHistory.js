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
  var db = firebase.firestore();
  db.settings({ timestampsInSnapshots: true }); 
  const list_div11 = document.querySelector('#list-div6');
  var currentCase="";
//    var db = firebase.firestore();
 
// console.log("hello user");
  db.collection("SOSAlerts").where("Solved",'==','Yes').get().then(function(querySnapshot){
      querySnapshot.forEach(function(doc){
        
          list_div11.innerHTML+="<div class='list-item item'><br><br><b><h4>SOS Generated  On:</b> "+doc.data().DATE_TIME_STAMP+"</h4><b><h4>User ID of User By Whom SOS Was Generated: </b>"+doc.data().UserID +"<b><h4>SOS Was Generated From(Location): </b>"+doc.data().LastLocation +"<br><br></div>";
      });
  }).catch(function(error){
      console.log("ERROR GETTING DOCS",error);
  });