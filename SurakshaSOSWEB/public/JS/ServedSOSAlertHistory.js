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
  const list_div = document.querySelector('#list-div12');
  var userIDD = document.getElementById("list-div12").getAttribute("name");


db.collection("SOSAlerts").where("UserID", "==", userIDD)
  .get()
  .then(function(querySnapshot) {
      querySnapshot.forEach(function(doc) {
          console.log(doc.id, " => ", doc.data());
          
          // Build doc ref from doc.id
          db.collection("SOSAlerts").doc(doc.id).update({Solved: "Yes"});
      });
 });
 