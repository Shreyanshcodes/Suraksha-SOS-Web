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
  const list_div = document.querySelector('#list-div');
  var currentCase="";
   var db = firebase.firestore();
 

  db.collection("users").get().then(function(querySnapshot){
      querySnapshot.forEach(function(doc){
          list_div.innerHTML+="<div class='list-item item'><h4>User : "+doc.data().firstName+"</h4> <a class='ui inverted blue button' href='/login/"+ doc.data().AadharNumber+"'>SHOW DETAILS</a></div>";
      });
  }).catch(function(error){
      console.log("ERROR GETTING DOCS",error);
  })