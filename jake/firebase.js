var config = {
    apiKey: "AIzaSyDf-CkSTVGIUHH7egsA7gDy68T3_oxEeYU",
    authDomain: "bit-trader-project.firebaseapp.com",
    databaseURL: "https://bit-trader-project.firebaseio.com",
    projectId: "bit-trader-project",
    storageBucket: "bit-trader-project.appspot.com",
    messagingSenderId: "715412835909"
};
firebase.initializeApp(config);
// Create a variable to reference the database
var database = firebase.database();
var initialCount = 0;
var tCounter = initialCount;
console.log(initialCount);



//=======================================================================
// History - This will be called upon buy or sell
//=======================================================================
//amount - usd, crpto - bitcoinPrice, obj - 
function tradeHistoryDb(coinPrice, usdAmount, coinAmount, tradeType, cryptoType) {
    console.log(this);
    // setting variables from inputs
    tCounter++;
    database.ref('/count').set({
        tCount: tCounter
      });

    console.log(tCounter);

    var usdAmount = Math.round(usdAmount * 100) / 100;
    var coinAmount = Math.round(coinAmount * 100) / 100;

    
    // object to be pushed to database for 
    var tradeTransaction = {
        transactionCounter: tCounter,
        coinPrice: coinPrice,
        cryptoType: cryptoType,
        coinAmount: coinAmount,
        usdAmount: usdAmount,
        tradeType: tradeType
    }
    

    database.ref('/history').push(tradeTransaction);
    // console.log(tradeTransaction);
    // console.log(tradeTransaction.transactionCounter);
    // console.log(tradeTransaction.tradeType);
    // console.log(tradeTransaction.coinAmount);
    // console.log(tradeTransaction.usdAmount);
    // console.log(tradeTransaction.cryptoType);


    console.log('Purchase History Added!');


    // -----------------------------
    

        //     var newRow = $('<tr>');
        //     newRow.append(
        //     $('<td>').text(transactionCounter),
        //     $('<td>').text(cryptoType),
        //     $('<td>').text(coinPrice),
        //     $('<td>').text(coinAmount),
        //     $('<td>').text(usdAmount),
        //     $('<td>').text(tradeType));

        // // Append the new row to the table
        // $('.body').prepend(newRow)
    

    // Clears all of the text-boxes - when coin amount changes we call the usd amount 
    // $('.coin-amount').val('');
    // usdCalc();
}



// Create Firebase event for adding transactions to the database and a row in the html when a user makes a trade
database.ref('history/').on('child_added', function (childSnapshot) {
        // console.log(childSnapshot.val())

        // Store everything into a variable.
        var cryptoType = childSnapshot.val().cryptoType;
        var coinPrice = childSnapshot.val().coinPrice;
        var coinAmount = childSnapshot.val().coinAmount;
        var usdAmount = childSnapshot.val().usdAmount;
        var transactionCounter = childSnapshot.val().transactionCounter;
        var tradeType = childSnapshot.val().tradeType;

        // Testing info
        // console.log(cryptoType);
        // console.log(coinAmount);
        // console.log(usdAmount);
        // console.log(transactionCounter);
        // console.log(tradeType);

        // Create the new row
        var newRow = $('<tr>').append(
            $('<td>').text(transactionCounter),
            $('<td>').text(cryptoType),
            $('<td>').text('$'+coinPrice),
            $('<td>').text(coinAmount),
            $('<td>').text('$'+usdAmount),
            $('<td>').text(tradeType));

        // Append the new row to the table
        $('.body').prepend(newRow)

    },

    function (errorObject) {
        console.log("Errors handled: " + errorObject.code);
    });

    database.ref('/count').on("value", function(snapshot) {
        console.log(snapshot.val());
        console.log(snapshot.val().tCount);
        tCounter = snapshot.val().tCount;
        console.log(tCounter);
    });
    
// =======================================================================================================
// SUser Function to DB
// =======================================================================================================
// function dbUser() {


//     var user = {
//         userId: user,
//         totalNet: 10000,
//         USD: 10000,
//         BTC: 0,
//         BTCVal: 0,
//         ETH: 0,
//         ETHVal: 0,
//         XRP: 0,
//         XRPVal: 0,
//         LTC: 0,
//         LTCVal: 0
//     }

//     console.log(user);
//     console.log(user.userId);
//     database.ref('user/' + user).push(user);
// }

// var userPortfolio = firebase.database().ref('users/' + user);
// userPortfolio.on('value', function (snapshot) {
//     console.log(snapshot.val());
//     // Store everything into a variable.
//     var userId = snapshot.val().userId; 
//     var totalNet = snapshot.val().totalNet; 
//     var USD = snapshot.val().USD;
//     var BTC = snapshot.val().BTC;
//     var BTCVal = snapshot.val().BTCVal;
//     var ETH = snapshot.val().ETH;
//     var ETHVal = snapshot.val().ETHVal;
//     var XRP = snapshot.val().XRP;
//     var XRPVal = snapshot.val().XRPVal;
//     var LTC = snapshot.val().LTC;
//     var LTCVal = snapshot.val().LTCVal;

//     // Testing info
//     console.log(userId);
//     console.log(totalNet);
//     console.log(USD);
//     console.log(BTC);
//     console.log(BTCVal);

//     // Use $ and grab sections that will need to change to db numbers
// },

// function (errorObject) {
//     console.log("Errors handled: " + errorObject.code);
// });


// // Login Page
// //=============================================================
// // User database
// // var auth = firebase.auth() // returns all methods we need to 
// // auth.signInWithEmailAndPassword(email,pass); // takes in email and password
// // auth.createUserWithEmailAndPassword(email,pass);

// // auth.onAuthStateChanged(firebaseUser => { }); // dont think we will need this for run 1. Simply monitors if they are logged in

// //grab elements
// var txtEmail = document.getElementById('textEmail');
// var txtPassword = document.getElementById('textPassword');
// var btnLogin = document.getElementById('btnLogin');
// var btnSignUp = document.getElementById('btnSignUp');

// // event listener
// btnLogin.addEventListener('click', e => {
//     const email = textEmail.value;
//     const pass = textPassword.value;
//     const auth = firebase.auth();
//     //Sign in
//     const promise = auth.signInWithEmailAndPassword(email, pass);
//     promise.catch(e => console.log(e.message));
//     // firebase.auth().onAuthStateChanged(firebaseUser => {
//     // if(firebaseUser) {
//     //     location.replace('../index.html');
//     // }});
//     check();
// });

// //signup event
// btnSignUp.addEventListener('click', e => {
//     // TODO: check for real email
//     const email = textEmail.value;
//     const pass = textPassword.value;
//     const auth = firebase.auth();
//     //create user
//     const promise = auth.createUserWithEmailAndPassword(email, pass);
//     promise.then(user => {
//         console.log(user);
//         console.log(user.ka);
//         console.log(user.ka.uid);
//         console.log(user.uid);
//         check();
//     }).catch(e => console.log(e.message));
// })

// //this will let us know everytime the state changes. Real time authentication state change
// firebase.auth().onAuthStateChanged(firebaseUser => {
//     if (firebaseUser) {
//         console.log(firebaseUser);
//     } else {
//         console.log('not logged in');
//     }
// });

// function check() {
//     var user = firebase.auth().currentUser;
//     console.log(user);
//     if (user != null) {
//         name = user.displayName;
//         email = user.email;
//         photoUrl = user.photoURL;
//         emailVerified = user.emailVerified;
//         uid = user.uid; // The user's ID, unique to the Firebase project. Do NOT use
//         // this value to authenticate with your backend server, if
//         // you have one. Use User.getToken() instead.
//     }
// }


// var graphButtons = document.getElementsByClassName("graphButton");
// graphButtons.addEventListener("click", function(){
    


//TODO: make it override - overflow hidden
//TODO: make tabs work
//TODO: change y line color - maybe not
//TODO: get database working so they populate on load - fix counter!!!
//TODO: Coin price and cryptoType updated
//TODO: Even on error it logs