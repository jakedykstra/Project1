$(document).ready(function () {
  console.log("Ready");
  var bitcoinPrice;
  var ethereumPrice;
  var person = {
    USD: 10000,
    BTC: 0,
    BTCVal: null,
    ETH: 0,
    ETHVal: null,
  };

  jQuery.getJSON("https://min-api.cryptocompare.com/data/pricemultifull?fsyms=BTC,ETH&tsyms=USD", function (data) {
    bitcoinPrice = data.RAW.BTC.USD.PRICE;
    ethereumPrice = data.RAW.ETH.USD.PRICE;
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
    console.log("Updated Portfolio");
    console.log("Ethereum value" + person.ETHVal);
  }

  $("#submit").on('click', function () {
    event.preventDefault();
    var amount = parseInt($("#amount-eth").val().trim());
    buyCrypto(amount, ethereumPrice);
    $("#amount-eth").val("");
  });

  $("#submit2").on('click', function () {
    event.preventDefault();
    var amount = parseInt($('#amount-eth2').val().trim());
    sellCrypto(amount, ethereumPrice);
    $('#amount-eth2').val("");

  })

})