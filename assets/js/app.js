$(document).ready(function () {

 
    //Variables place holders for current prices.
    var bitcoinPrice;
    var ethereumPrice;
    var litecoinPrice;
    var ripplePrice;

    //User profile
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
  
    //Pulls from API and saves prices. Calls reAvaluate function to start off
    jQuery.getJSON("https://min-api.cryptocompare.com/data/pricemultifull?fsyms=BTC,ETH,XRP,LTC&tsyms=USD", function (data) {
      bitcoinPrice = data.RAW.BTC.USD.PRICE;
      ethereumPrice = data.RAW.ETH.USD.PRICE;
      ripplePrice = data.RAW.XRP.USD.PRICE;
      litecoinPrice = data.RAW.LTC.USD.PRICE;
      reAvaluate();
    });

    //buyCrypto function
    //1. Checks if input is a valid number and not a letter
    //2. Calculates Total Amount
    //3. Checks if the customer has the cash to spend
    //4. Updates customers account
    //5. call Reavaluate 
  
    function buyCrypto(amount, crypto, objCrypto) {
      if (!amount || typeof amount === 'Number') {
        alert("Invalid Input");
        return;
      };
      var totalAmount = amount / crypto;
      var cryptoType = objCrypto;
      if (amount > person.USD) {
        alert("You dont have enough");
      } else {
        person.USD -= amount;
        person[objCrypto] += totalAmount;
      }
      reAvaluate();
      console.log(person);
      console.log(amount);
      console.log(crypto);
      console.log(objCrypto);

      tradeHistoryDb(crypto, amount, totalAmount, "Buy", objCrypto);
      writeUserData()
      
    }
  
    //Sell Crypto function
    //1. Checks if input is valid
    //2. Calculates total amount
    //3. Checks if user has amount to sell
    //4. Reavaluates amount
    function sellCrypto(amount, crypto, objCrypto) {
      console.log("sell button clicked");
      if (!amount || typeof amount === 'Number') {
        alert("Invalid Input");
        return;
      };
      var totalAmount = amount * crypto;
      if (amount > person[objCrypto]) {
        alert('you dont have enough');
      } else {
        person.USD += totalAmount;
        person[objCrypto] -= amount;
      };
      reAvaluate();
      tradeHistoryDb(crypto, totalAmount, amount, "Sell", objCrypto);
      writeUserData()
    };

    //Reavaluate
    //1. Calculates USD value of current holdings
    //2. Updates user profile with USD value and holdings
    //3. Updates current price for coins
    function reAvaluate() {
      person.BTCVal = person.BTC * bitcoinPrice;
      person.LTCVal = person.LTC * litecoinPrice;
      person.ETHVal = person.ETH * ethereumPrice;
      person.XRPVal = person.XRP * ripplePrice;
      person.totalNet = person.BTCVal + person.ETHVal + person.USD + person.LTCVal + person.XRPVal;

      $("#jqueryUSD").text(person.USD.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2}));
      $("#jqueryNet").text(person.totalNet.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2}));
      $("#personBTC").text(person.BTC.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2}));
      $("#BTCVal").text(person.BTCVal.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2}));
      $("#personLTC").text(person.LTC.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2}));
      $("#LTCVal").text(person.LTCVal.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2}));
      $("#personEther").text(person.ETH.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2}));
      $("#ETHVal").text(person.ETHVal.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2}));
      $("#personRipple").text(person.XRP.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2}));
      $("#XRPVal").text(person.XRPVal.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2}));

      $("#jqueryBTC").text(Math.floor(bitcoinPrice).toLocaleString('en'));
      $("#jqueryLTC").text(litecoinPrice.toLocaleString('en'));
      $("#jqueryEther").text(ethereumPrice.toLocaleString('en'));
      $("#jqueryXRP").text(ripplePrice.toLocaleString('en'));
    };
  
    $("#buybtc").on('click', function () {
      event.preventDefault();
      var amount = parseInt($("#amount-btc").val().trim());
      buyCrypto(amount, bitcoinPrice, "BTC");
      $("#amount-btc").val("");
    });
  
    $("#sellbtc").on('click', function () {
      event.preventDefault();
      var amount = parseInt($('#amount-btc2').val().trim());
      sellCrypto(amount, bitcoinPrice, "BTC");
      $('#amount-btc2').val("");
    });

    $("#buyLTC").on('click', function () {
      event.preventDefault();
      var amount = parseInt($('#amount-ltc').val().trim());
      buyCrypto(amount, litecoinPrice, "LTC");
      $('#amount-ltc').val("");
    });

    $("#sellLTC").on('click', function () {
      event.preventDefault();
      var amount = parseInt($('#amount-ltc2').val().trim());
      sellCrypto(amount, litecoinPrice, "LTC");
      $('#amount-ltc2').val("");
    });

    $("#buyEther").on('click', function () {
      event.preventDefault();
      var amount = parseInt($('#amount-eth').val().trim());
      buyCrypto(amount, ethereumPrice, "ETH");
      $('#amount-eth').val("");
    });

    $("#sellEther").on('click', function () {
      event.preventDefault();
      var amount = parseInt($('#amount-eth2').val().trim());
      sellCrypto(amount, ethereumPrice, "ETH");
      $('#amount-eth2').val("");
    });

    $("#buyXRP").on('click', function () {
      event.preventDefault();
      var amount = parseInt($('#amount-xrp').val().trim());
      buyCrypto(amount, ripplePrice, "XRP");
      $('#amount-xrp').val("");
    });

    $("#sellXRP").on('click', function () {
      event.preventDefault();
      var amount = parseInt($('#amount-xrp2').val().trim());
      sellCrypto(amount, ripplePrice, "XRP");
      $('#amount-xrp2').val("");
    });

    //create an account
$("#indexRegister").on("click", function(event){
  event.preventDefault();
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
  window.location.href='index.html';
});

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

//login to existing account
$("#indexLogin").on("click", function(event){
  event.preventDefault();
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
  window.location.href='index.html';
});

//sending person variable of current user to firebase
function writeUserData() {
  var user = firebase.auth().currentUser;
  var userID = user.uid;  
  console.log(userID)
  firebase.database().ref('users/' + userID).set({
  person
  });
};

  });