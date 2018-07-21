// Trade history database 
//NOTE: tradeHistory will need to be called after a onclick event occurs for buying or selling crypto
// =============================================================================

// this will all go to the top of the JS
var config = {
    apiKey: "AIzaSyCUa3OmzBQAV9MHxQg6Pgl2s5533V5qjEI",
    authDomain: "bit-trader-project.firebaseapp.com",
    databaseURL: "https://bit-trader-project.firebaseio.com",
    storageBucket: "bit-trader-project.appspot.com"
};
//initializing the firebase application
firebase.initializeApp(config);
// Create a variable to reference the database
var database = firebase.database();

// User object with currentCurrency, Buy's(make a further collection for this?), 

// submit handler
$('.submit').on('click', '.crypto', function (event) {
    event.preventDefault();

    // function grabs train inputs
    var coinAmount = $('.coin-amount').val().trim();
    var usdAmount = $('.dollar-amount').val().trim();
    var cryptoType = $('.crypto').val().trim();


    // params from the variables updated when onclick buy/sell event occurs

    var tradeTransaction = {
        transactionCounter: transactionCounter,
        crypto: cryptoType,
        coinAmount: coinAmount,
        usdAmount: usdAmount
    }

    database.ref().push(tradeTransaction);

    console.log(tradeTransaction);
    console.log(tradeTransaction.transactionCounter);
    console.log(tradeTransaction.coinAmount);
    console.log(tradeTransaction.usdAmount);
    console.log(tradeTransaction.cryptoType);

    alert('Purchase History Added!')

    // Clears all of the text-boxes
    $('.coin-amount').val('')
    $('.dollar-amount').val('')

    // need to have database for all the firebase transactions
    // Initialize Firebase
});


// 3. Create Firebase event for adding trains to the database and a row in the html when a user adds an entry
database.ref().on('child_added', function (childSnapshot) {
        console.log(childSnapshot.val())

        // Store everything into a variable.
        var cryptoType = childSnapshot.val().cryptoType;
        var coinAmount = childSnapshot.val().coinAmount;
        var usdAmount = childSnapshot.val().usdAmount;

        // Employee Info
        console.log(cryptoType);
        console.log(coinAmount);
        console.log(usdAmount);
        var transaction = 0;
        var transactionCounter = 'user' + transaction++;

        // Create the new row
        var newRow = $('<tr>').append(
            $('<td>').text(transactionCounter),
            $('<td>').text(cryptoType),
            $('<td>').text(coinAmount),
            $('<td>').text(usdAmount));

        // Append the new row to the table
        $('.transaction-history table tbody').append(newRow)
    },

    function (errorObject) {
        console.log("Errors handled: " + errorObject.code);
    });


// Splash page unless session storage
// =================================================================================

function checkUser() {
    // check for session storage
    if (localStorage.getItem()) {
        // newUser === false;
        // if modal - $('.modal').style('display', 'name')
        location.replace('./index.html')
    }



    // D3 implementation for handling graphs
    // ======================================================================================