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
  db.collection("VisualEvidenceReports").where("AuthenticationOfReport",'==','Authenticated').get().then(function(querySnapshot){
      querySnapshot.forEach(function(doc){
        
          list_div11.innerHTML+="<div class='list-item item'><br><br><b><h4>Report ID :</b> "+doc.data().ReportID+"</h4><b><h4>Report Detail: </b>"+doc.data().ReportDetail +"<br><br></div>";
      });
  }).catch(function(error){
      console.log("ERROR GETTING DOCS",error);
  });