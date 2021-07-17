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
  const card_div1 = document.querySelector('#card-div111');
  
//   var aadhar = document.getElementById(great).name;
  var aadhar = document.getElementById("layoutSidenav_content").getAttribute("name");
  
                
console.log(aadhar);

  db.collection("users").where("AadharNumber","==",aadhar).get().then(function(querySnapshot){
      querySnapshot.forEach(function(doc){
          // card_div.innerHTML+="<div class='card'><h4>Aadhar Number: "+doc.data().AadharNumber+"</h4><br><h4>Name: "+ doc.data().firstName+" "+doc.data().lastName+"</h4><br><h4>E-mail: "+doc.data().EmailID+"</h4><br><h4>DOB: "+doc.data().DateOfBirth+"</h4></div>";
          card_div1.innerHTML+="<div class='page-wrapper'><ul class='box'> <li class='box-item'><div class='box-item-content'><span class='category'>Aadhar number of User</span><h4 class='header'>"+doc.data().AadharNumber +"</h4> <p class='info-text'></p></div></li><li class='box-item'><div class='box-item-content'><span class='category'>Name of User</span><h4 class='header'>"+ doc.data().firstName+" "+doc.data().lastName+"</h4><p class='info-text'></p></div></li><li class='box-item'><div class='box-item-content'><span class='category'>E-Mail of User</span><h4 class='header'>"+ doc.data().EmailID+"</h4><p class='info-text'></p></div></li><li class='box-item'><div class='box-item-content'><span class='category'>User's DOB</span><h4 class='header'>"+ doc.data().DateOfBirth+"</h4><p class='info-text'></p></div></li></ul></div>";
         console.log(doc.data().firstName);
      });
  }).catch(function(error){
      console.log("ERROR GETTING DOCS",error);
  });