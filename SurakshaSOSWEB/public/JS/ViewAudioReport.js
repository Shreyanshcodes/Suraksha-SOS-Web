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
  const list_div = document.querySelector('#list-div2');
  var currentCase="";

  db.collection("AudioEvidenceReports").get().then(function(querySnapshot){
      querySnapshot.forEach(function(doc){
        //   console.log("hello test:"+doc.data().SubmittedOn);
          list_div.innerHTML+="<div class='list-item item'><h4>Report Submitted On: "+doc.data().SubmittedOn+"</h4> <a class='ui secondary button' href='/AudioReportDetail/"+ doc.data().FileReference+"'>SHOW DETAILS</a></div>";
      });
  }).catch(function(error){
      console.log("ERROR GETTING DOCS",error);
  });