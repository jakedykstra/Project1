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
var counter = 0;
var buy = false;
var sell = false;


//=======================================================================
// History 
//=======================================================================

$('.submit').on('click', '.crypto', function (event) {
    event.preventDefault();
    console.log(this);
    counter++;

    // setting variables from inputs
    var coinAmount = $('.coin-amount').val().trim();
    var usdAmount = $('.dollar-amount').val().trim();
    var cryptoType = $(this);
    var user = firebase.auth().currentUser.providerData[0].uid;
    var tradeType = $(this.data);
    var transactionCounter = counter;

    if (tradeType === "buy") {
        buy = true;
    } else {
        sell = true;
    }

    // object to be pushed to database for 
    var tradeTransaction = {
        transactionCounter: transactionCounter,
        user: user,
        tradeType: tradeType,
        cryptoType: cryptoType,
        coinAmount: coinAmount,
        usdAmount: usdAmount
    }

    var userID = {
        userId: user,
        totalNet: 10000,
        USD: 10000,
        BTC: 0,
        BTCVal: 0,
        ETH: 0,
        ETHVal: 0,
        XRP: 0,
        XRPVal: 0,
        LTC: 0,
        LTCVal: 0
    }

    database.ref('transactionTracker/').push(tradeTransaction);
    database.ref('user/' + user).push(user);

    console.log(tradeTransaction);
    console.log(tradeTransaction.transactionCounter);
    console.log(tradeTransaction.tradeType);
    console.log(tradeTransaction.coinAmount);
    console.log(tradeTransaction.usdAmount);
    console.log(tradeTransaction.cryptoType);
    console.log(user);
    console.log(user.userId);

    console.log('Purchase History Added!');

    // Clears all of the text-boxes - when coin amount changes we call the usd amount 
    $('.coin-amount').val('');
    usdCalc();
    // TODO: will need to change the name of all these
});


// Create Firebase event for adding transactions to the database and a row in the html when a user makes a trade
database.ref('transactionTracker/').on('value', function (childSnapshot) {
        console.log(childSnapshot.val())

        // Store everything into a variable.
        var cryptoType = childSnapshot.val().cryptoType;
        var coinAmount = childSnapshot.val().coinAmount;
        var usdAmount = childSnapshot.val().usdAmount;
        var transactionCounter = childSnapshot.val().transactionCounter;
        var user = childSnapshot.val().user;
        var tradeType = childSnapshot.val().tradeType;

        // Testing info
        console.log(cryptoType);
        console.log(coinAmount);
        console.log(usdAmount);
        console.log(transactionCounter);
        console.log(user);
        console.log(tradeType);

        // Create the new row
        var newRow = $('<tr>').append(
            $('<td>').text(transactionCounter),
            $('<td>').text(UserName),
            $('<td>').text(cryptoType),
            $('<td>').text(coinAmount),
            $('<td>').text(usdAmount),
            $('<td>').text(tradeType));

        // Append the new row to the table
        $('.transaction-history table tbody').append(newRow)
    },

    function (errorObject) {
        console.log("Errors handled: " + errorObject.code);
    });


    
// =======================================================================================================
// Saving Transactions to the user
// =======================================================================================================
var userPortfolio = firebase.database().ref('users/' + user);
userPortfolio.on('value', function (snapshot) {
    console.log(snapshot.val());
    // Store everything into a variable.
    var userId = snapshot.val().userId; 
    var bought = snapshot.val().bought; 
    var sold = snapshot.val().sold;
    var own = snapshot.val().own;

    // Testing info
    console.log(userId);
    console.log(bought);
    console.log(sold);
    console.log(own);

    // Create the new row
    var newRow = $('<tr>').append(
        $('<td>').text(own),
        $('<td>').text(sold),
        $('<td>').text(bought));

    // Append the new row to the table
    $('.user.port table tbody').append(newRow)
},

function (errorObject) {
    console.log("Errors handled: " + errorObject.code);
});


// Login Page
//=============================================================
// User database
// var auth = firebase.auth() // returns all methods we need to 
// auth.signInWithEmailAndPassword(email,pass); // takes in email and password
// auth.createUserWithEmailAndPassword(email,pass);

// auth.onAuthStateChanged(firebaseUser => { }); // dont think we will need this for run 1. Simply monitors if they are logged in

//grab elements
var txtEmail = document.getElementById('textEmail');
var txtPassword = document.getElementById('textPassword');
var btnLogin = document.getElementById('btnLogin');
var btnSignUp = document.getElementById('btnSignUp');

// event listener
btnLogin.addEventListener('click', e => {
    const email = textEmail.value;
    const pass = textPassword.value;
    const auth = firebase.auth();
    //Sign in
    const promise = auth.signInWithEmailAndPassword(email, pass);
    promise.catch(e => console.log(e.message));
    // firebase.auth().onAuthStateChanged(firebaseUser => {
    // if(firebaseUser) {
    //     location.replace('../index.html');
    // }});
    check();
});

//signup event
btnSignUp.addEventListener('click', e => {
    // TODO: check for real email
    const email = textEmail.value;
    const pass = textPassword.value;
    const auth = firebase.auth();
    //create user
    const promise = auth.createUserWithEmailAndPassword(email, pass);
    promise.then(user => {
        console.log(user);
        console.log(user.ka);
        console.log(user.ka.uid);
        console.log(user.uid);
        check();
    }).catch(e => console.log(e.message));
})

//this will let us know everytime the state changes. Real time authentication state change
firebase.auth().onAuthStateChanged(firebaseUser => {
    if (firebaseUser) {
        console.log(firebaseUser);
    } else {
        console.log('not logged in');
    }
});

function check() {
    var user = firebase.auth().currentUser;
    console.log(user);
    if (user != null) {
        name = user.displayName;
        email = user.email;
        photoUrl = user.photoURL;
        emailVerified = user.emailVerified;
        uid = user.uid; // The user's ID, unique to the Firebase project. Do NOT use
        // this value to authenticate with your backend server, if
        // you have one. Use User.getToken() instead.
    }