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
    const list_div = document.querySelector('#list-div13');
    var userIDD = document.getElementById("list-div13").getAttribute("name");
   console.log(userIDD);
  
  db.collection("VisualEvidenceReports").where("ImageReference", "==", userIDD)
    .get()
    .then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
            console.log(doc.id, " => ", doc.data());
            
            // Build doc ref from doc.id
            db.collection("VisualEvidenceReports").doc(doc.id).update({AuthenticationOfReport: "Authenticated"});
        });
   });
   
    
  