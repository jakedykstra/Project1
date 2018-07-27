//configuring and initializing firebase
var config = {
    apiKey: "AIzaSyD1cb0ZxNXTfELB_fdp_K51XO0V30l25aU",
    authDomain: "project1-9578f.firebaseapp.com",
    databaseURL: "https://project1-9578f.firebaseio.com",
    projectId: "project1-9578f",
    storageBucket: "project1-9578f.appspot.com",
    messagingSenderId: "131057147635",
};
  
firebase.initializeApp(config);

var database = firebase.database();

var email = [];
var password = [];

//create an account
$("#create-account").on("click", function(event){
    event.preventDefault;
    email = $("#email-input").val().trim();
    password = $("#password-input").val().trim();
    firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(errorCode);
        console.log(errorMessage);
    
    });

});

//login to existing account
$("#login").on("click", function(event){

    event.preventDefault;
    email = $("#email-input-login").val().trim();
    password = $("#password-input-login").val().trim();
    firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(errorCode);
        console.log(errorMessage);
    
    });
});

//getting profile info (user ID)
var user = firebase.auth().currentUser;
if (user != null) {
    email = user.email;
    userID = user.uid
};

//updating trade history and account balance to profile
function writeUserData(userId) {
      firebase.database().ref('users/' + userId).set({
      accountBalance = balance,
      tradeHistory = history
    });
};

writeUserData();
