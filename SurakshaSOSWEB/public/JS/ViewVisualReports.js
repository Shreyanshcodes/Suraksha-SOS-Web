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
  const list_div = document.querySelector('#list-div1');
  var currentCase="";
  db.collection("VisualEvidenceReports").where("AuthenticationOfReport","==","PendingForAuthentication").get().then(function(querySnapshot){
      querySnapshot.forEach(function(doc){
          list_div.innerHTML+="<div class='list-item item'><h4>Report Submitted On: "+doc.data().SubmittedOn+"</h4> <a class='ui secondary button' href='/VisualReportDetail/"+ doc.data().ImageReference+"'>SHOW DETAILS</a></div>";
      });
  }).catch(function(error){
      console.log("ERROR GETTING DOCS",error);
  })