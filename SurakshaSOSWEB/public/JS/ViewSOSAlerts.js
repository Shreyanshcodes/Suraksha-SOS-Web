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
  const list_div1 = document.querySelector('#list-div3');
  var currentCase="";
//    var db = firebase.firestore();
 
  db.collection("SOSAlerts").where("Solved",'==','No').get().then(function(querySnapshot){
      querySnapshot.forEach(function(doc){
          console.log("hello test:"+doc.data().DATE_TIME_STAMP);
        
          list_div1.innerHTML+="<div class='list-item item'><h4><b>SOS Generated On (DD:MM:YYYY - HRS:MINS:SECONDS):</b> "+doc.data().DATE_TIME_STAMP+"</h4><h4><b>Last Known Location of User: </b>"+doc.data().LastLocation+"</h4> <a class='ui inverted red button' href='/SOS/"+ doc.data().DATE_TIME_STAMP+"'>SERVE THE SOS REQUEST AND LOCATE ON MAP</a></div><br>";
      });
  }).catch(function(error){
      console.log("ERROR GETTING DOCS",error);
  })