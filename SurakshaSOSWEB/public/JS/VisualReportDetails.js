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
//   var storage = firebase.storage();
//   var storageRef = storage.ref();
  db.settings({ timestampsInSnapshots: true }); 
  const card_div = document.querySelector('#list-div13');
  
//   var aadhar = document.getElementById(great).name;
  var useriddd = document.getElementById("layoutSidenav_content").getAttribute("name");
  console.log(useriddd);
                

  db.collection("VisualEvidenceReports").where("ImageReference","==",useriddd).get().then(function(querySnapshot){
      querySnapshot.forEach(function(doc){ 
          card_div.innerHTML+="<div class='list-item item1'><h4><b>Submitted By User(User Id):</b> "+doc.data().UserID+"</h4><br><h4><b>Report Submitted On :</b> "+ doc.data().SubmittedOn.toString()+"</h4><br><h4><b>Report Description:</b> "+doc.data().ReportDetail +"</h4><br><a class='ui inverted red button' href='/VisualReportAuthenticated/"+ doc.data().ImageReference+"'>Authenticate This Report !</a></div>";
         console.log(doc.data().firstName);
      });
  }).catch(function(error){
      console.log("ERROR GETTING DOCS",error);
  });