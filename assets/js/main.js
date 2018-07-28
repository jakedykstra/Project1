$(document).ready(function () {
    console.log("Ready");
    var bitcoinPrice;
    var ethereumPrice;
    var litecoinPrice;
    var ripplePrice;
    var email;
    var password;
    var person = {
      totalNet: 100000,
      USD: 100000,
      BTC: 0,
      BTCVal: null,
      ETH: 0,
      ETHVal: null,
      XRP: 0,
      XRPVal: null,
      LTC: 0,
      LTCVal: null,
    };
    //configuring and initializing firebase
// Initialize Firebase
var config = {
    apiKey: "AIzaSyD1cb0ZxNXTfELB_fdp_K51XO0V30l25aU",
    authDomain: "project1-9578f.firebaseapp.com",
    databaseURL: "https://project1-9578f.firebaseio.com",
    projectId: "project1-9578f",
    storageBucket: "project1-9578f.appspot.com",
    messagingSenderId: "131057147635"
  };
  
  
firebase.initializeApp(config);

var database = firebase.database();

//create an account
$("#create-account").on("click", function(event){
    event.preventDefault;
    email = $("input[name='uname']").val();
    console.log(email)
    password = $("input[name='psw']").val();
    var userID = firebase.auth().currentUser.uid;
    firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(errorCode);
        console.log(errorMessage);
    
    }).then(
        writeUserData()
    );

});

//login to existing account
$("#login").on("click", function(event){

    event.preventDefault;
    email = $("input[name='uname']").val();
    password = $("input[name='psw']").val();
    
    console.log(email);
    console.log(password);
    firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(errorCode);
        console.log(errorMessage);
    
    }).then(
        writeUserData()
    )
});

//getting profile info (user ID)



//updating trade history and account balance to profile
function writeUserData() {
    var user = firebase.auth().currentUser;
    var userID = user.uid;  
    console.log(userID)
    firebase.database().ref('users/' + userID).set({
    person
    });
};



jQuery.getJSON("https://min-api.cryptocompare.com/data/pricemultifull?fsyms=BTC,ETH,XRP,LTC&tsyms=USD", function (data) {
      bitcoinPrice = data.RAW.BTC.USD.PRICE;
      ethereumPrice = data.RAW.ETH.USD.PRICE;
      ripplePrice = data.RAW.LTC.USD.PRICE;
      litecoinPrice = data.RAW.XRP.PRICE;
      console.log(data)
      console.log(bitcoinPrice);
      console.log(ethereumPrice);
      reAvaluate();
    });
    //1. Estimate total purchase amount
    //2. Check if user has sufficient balance//IF not deny transaction
    //3. Subtract usd for amount of purchase
    //4. Credit Crypto amount 
    //5. Calls Revaulate function
  
    function buyCrypto(amount, crypto) {
      if (!amount || typeof amount === 'Number') {
        console.log('Invalid input');
        return;
      };
      var totalAmount = amount / crypto;
      console.log(totalAmount);
  
      if (amount > person.USD) {
        console.log("you dont have enough")
      } else {
        console.log("you have enough");
        person.USD -= amount;
        person.ETH += totalAmount;
      }
      console.log("total amount USD: " + amount);
      console.log("total amount ETH: " + totalAmount);
      console.log("Updated person USD: " + person.USD);
      console.log("updated person ETH: " + person.ETH);
      reAvaluate();
    }
  
  
  
    //Figures out current Balance of sell crypto
    function sellCrypto(amount, crypto) {
      console.log("sell button clicked");
      if (!amount || typeof amount === 'Number') {
        console.log('Invalid input');
        return;
      };
      var totalAmount = amount * crypto;
      console.log("total amount of USD being sold in crypto" + totalAmount);
      if (amount > person.ETH) {
        console.log('you dont have enough');
      } else {
        console.log("you have enough");
        person.USD += totalAmount;
        person.ETH -= amount;
        console.log("total amount USD: " + totalAmount);
        console.log("total amount ETH: " + amount);
        console.log("Updated person USD: " + person.USD);
        console.log("updated person ETH: " + person.ETH);
      };
      reAvaluate();
    }
  
    //Reavulates crypto holdings to USD
    function reAvaluate() {
      console.log(person.ETHVal);
      person.BTCVal = person.BTC * bitcoinPrice;
      person.ETHVal = person.ETH * ethereumPrice;
      person.totalNet = person.BTCVal + person.ETHVal + person.USD;
      $("#jqueryUSD").text(person.USD.toLocaleString('en'));
      $("#jqueryNet").text(person.totalNet.toLocaleString('en'));
      $("#personBTC").text(person.BTC.toLocaleString('en'));
      $("#BTCVal").text(person.BTCVal.toLocaleString('en'));
      // $("#personLTC").text(person.LTC.toLocaleString('en'));
      // $("LTCVal").text(person.LTCVal.toLocaleString('en'));
      $("#personEther").text(person.ETH.toLocaleString('en'));
      $("#ETHVal").text(person.ETHVal.toLocaleString('en'));
      // $("#personRipple").text(person.XRP.toLocaleString('en'));
      // $("#XRPVal").text(person.XRPVal.toLocaleString('en'));

      console.log("Updated Portfolio");
      console.log("Ethereum value" + person.ETHVal);
    }
  
    $("#buyEther").on('click', function () {
      event.preventDefault();
      var amount = parseInt($("#amount-eth").val().trim());
      buyCrypto(amount, ethereumPrice);
      $("#amount-eth").val("");
    });
  
    $("#sellEther").on('click', function () {
      event.preventDefault();
      var amount = parseInt($('#amount-eth2').val().trim());
      sellCrypto(amount, ethereumPrice);
      $('#amount-eth2').val("");
  
    });
});