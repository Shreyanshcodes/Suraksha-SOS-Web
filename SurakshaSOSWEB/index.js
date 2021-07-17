var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var firebase = require("firebase");
var storage = require("firebase/storage");
global.XMLHttpRequest = require('xhr2');

// var storage = require('firebase/storage');
var cors = require('cors');
var path = require('path');
 // Your web app's Firebase configuration
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
    





  // Initialize Firebase
firebase.initializeApp(firebaseConfig);
var db = firebase.firestore();
var storage = firebase.storage();
var storageRef = storage.ref();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(express.static(path.join(__dirname,"public")));
app.set('views',path.join(__dirname,'views'));
app.set('view engine','ejs');


var currentUser;

app.get('/login', function (req, resp) {


    resp.render('index');

    
});

app.post('/login', function (req, resp) {

    var userID = req.body.username;
    var password = req.body.password;
   
    firebase.auth().signInWithEmailAndPassword(userID, password).then(function(){

       
        resp.render('HomePage');
    }).catch(function(error) {

        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(errorMessage);
        
        // ...
      });

});


app.get('/Test1', function (req, resp) {


    resp.render('ShowUserDetails');

    
});




app.get('/register', function (req, resp) {

    resp.render('register');
  
});

app.post('/register',function(req,resp){
    var userid = req.body.username;
    var password = req.body.password;
    var designation = req.body.designation;
    var fullname = req.body.fullname;
    firebase.auth().createUserWithEmailAndPassword(userid, password).then(function(){

        db.collection("PoliceUsers").doc(userid).set({
                UID:userid,Designation:designation,Name:fullname

        }).then(function(){
                resp.render('HomePage');

        }).catch(function(error){
                console.error("error writing doc");
        });

    }).catch(function(error) {


      
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(errorMessage);
        // ...
      });
});
app.get('/ShowUsers', function (req, resp) {


    

    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
            var uid = user.uid;
            var name = user.Name;
            resp.render('ShowUsers',
              {Userid:uid});
       
        } else {
          // No user is signed in.
        }
      });

  
   

    
});


app.get('/login/:AadharNumber',function(req,resp){

    resp.render('ShowUserDetails',{NAME:req.params.AadharNumber});



});

app.get('/VisualReports', function (req, resp) {


    resp.render('ViewVisualReports');

    
});

app.get('/SOS/:DATE_TIME_STAMP', function (req, resp) {

var Lat1,Long1;
console.log(req.params.DATE_TIME_STAMP+"HEllo")

    db.collection("SOSAlerts").where("DATE_TIME_STAMP","==",req.params.DATE_TIME_STAMP).get().then(function(querySnapshot){
        querySnapshot.forEach(function(doc){
            Lat1 = doc.data().Lat;
            Long1 = doc.data().Long;
            console.log(Lat1+"heloo")
            console.log(Long1+"ohnice")
            resp.render('SOSDetailAndMap',{User:req.params.DATE_TIME_STAMP,Lat:Lat1,Long:Long1});
        
          
        });
    }).catch(function(error){
        console.log("ERROR GETTING DOCS",error);
    });

   


    
});
app.get('/VisualReportAuthenticated/:ImageReference',function(req,resp){

 


    resp.render('AuthenticatedVisualReports',{USERSID:req.params.ImageReference});

});
app.get('/AuthenticatedVisualReportHistory',function(req,resp){



    resp.render('AuthenticatedVisualReportsHistory');

});

app.get('/SOSServed/:UserID', function (req, resp) {
  

    resp.render('ServedSOSAlertHistory',{USERSID:req.params.UserID});

});
app.get('/SOSServed/:UserID', function (req, resp) {
  

    resp.render('ServedSOSAlertHistory',{USERSID:req.params.UserID});

});
app.get('/SOSHistory', function (req, resp) {
  

    resp.render('SOSHistory');

});

app.get('/Home', function (req, resp) {


    resp.render('HomePage');

    
});
app.get('/AudioReports', function (req, resp) {


    resp.render('ViewAudioReports');

    
});
app.get('/SOSAlerts', function (req, resp) {


    resp.render('ViewSOSAlerts');

    
});
app.get('/VisualReportDetail/:ImageReference',function(req,resp){
    
    var imageurl;

    db.collection("VisualEvidenceReports").where("ImageReference","==",req.params.ImageReference).get().then(function(querySnapshot){
        querySnapshot.forEach(function(doc){
            imageurl = doc.data().ImageReference;
            console.log(imageurl);

            storageRef.child('pictures/'+imageurl).getDownloadURL().then(function(url2){
                var xhr = new XMLHttpRequest();
                xhr.responseType = 'blob';
                xhr.onload = function(event){
                var blob = xhr.response;
                };
                xhr.open('GET',url2);
                xhr.send();
                console.log(url2);
                resp.render('VisualReportDetails',{Userid:req.params.ImageReference,URLFORIMAGE:url2});

            }).catch(function(error){

            }) ;    
     
        
          
        });
    }).catch(function(error){
        console.log("ERROR GETTING DOCS",error);
    });
   

});


app.get('/AudioReportDetail/:FileReference',function(req,resp){
    console.log(req.params.FileReference);

    
    var Audiourl;

    db.collection("AudioEvidenceReports").where("FileReference","==",req.params.FileReference).get().then(function(querySnapshot){
        querySnapshot.forEach(function(doc){
            Audiourl = doc.data().FileReference;
            console.log(Audiourl);

            storageRef.child('Audio Files Uploaded By Users/'+Audiourl).getDownloadURL().then(function(url2){
                var xhr = new XMLHttpRequest();
                xhr.responseType = 'blob';
                xhr.onload = function(event){
                var blob = xhr.response;
                };
                xhr.open('GET',url2);
                xhr.send();
                console.log(url2);
                resp.render('ViewAudioReportDetails',{Userid:req.params.FileReference,URLFORAUDIO:url2});

            }).catch(function(error){

            }) ;    
     
          
        });
    }).catch(function(error){
        console.log("ERROR GETTING DOCS",error);
    });

});

app.listen(1337, function () {
    console.log("i am listening to 1337")
});

