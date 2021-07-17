
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

  const db = firebase.firestore();

  db.settings({ timestampsInSnapshots: true }); 
  const card_div = document.querySelector('#list-div19');
  

  var useriddd = document.getElementById("layoutSidenav_content").getAttribute("name");

  console.log(useriddd);
                

  db.collection("AudioEvidenceReports").where("FileReference","==",useriddd).get().then(function(querySnapshot){
      querySnapshot.forEach(function(doc){
    
          card_div.innerHTML+="<div class='list-item item2'><h4><b>Submitted By User(User Id):</b> "+doc.data().UserID+"</h4><br><h4><b>Report Submitted On (DD:MM:YYYY Hrs:Mins:Seconds)IST :</b> "+ doc.data().SubmittedOn.toString()+"</h4><br><h4><b>Report Description(This description is provided By User In reference to the Audio File He Submitted):</b> "+doc.data().ReportDetail +"</h4> </div>";
         
      });
  }).catch(function(error){
      console.log("ERROR GETTING DOCS",error);
  });