$(document).ready(function () {
    console.log("Ready");
    console.log('decimal number test ' + 1000.00999.toFixed(2));
    var bitcoinPrice;
    var ethereumPrice;
    var litecoinPrice;
    var ripplePrice;
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
  
    jQuery.getJSON("https://min-api.cryptocompare.com/data/pricemultifull?fsyms=BTC,ETH,XRP,LTC&tsyms=USD", function (data) {
      bitcoinPrice = data.RAW.BTC.USD.PRICE;
      ethereumPrice = data.RAW.ETH.USD.PRICE;
      ripplePrice = data.RAW.XRP.USD.PRICE;
      litecoinPrice = data.RAW.LTC.USD.PRICE;
      reAvaluate();
    });
    //1. Estimate total purchase amount
    //2. Check if user has sufficient balance//IF not deny transaction
    //3. Subtract usd for amount of purchase
    //4. Credit Crypto amount 
    //5. Calls Revaulate function
  
    function buyCrypto(amount, crypto, objCrypto) {
      console.log("the function read this as: " + crypto);
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
        person[objCrypto] += totalAmount;
      }
      // console.log("total amount USD: " + amount);
      // console.log("total amount ETH: " + totalAmount);
      // console.log("Updated person USD: " + person.USD);
      // console.log("updated person ETH: " + person.ETH);
      reAvaluate();
      console.log(person);
      console.log(amount);
      console.log(crypto);
      console.log(objCrypto);
      
    }
  
  
  
    //Figures out current Balance of sell crypto
    function sellCrypto(amount, crypto, objCrypto) {
      console.log("sell button clicked");
      if (!amount || typeof amount === 'Number') {
        console.log('Invalid input');
        return;
      };
      var totalAmount = amount * crypto;
      // console.log("total amount of USD being sold in crypto" + totalAmount);
      if (amount > person[objCrypto]) {
        console.log('you dont have enough');
      } else {
        console.log("you have enough");
        person.USD += totalAmount;
        person[objCrypto] -= amount;
        // console.log("total amount USD: " + totalAmount);
        // console.log("total amount ETH: " + amount);
        // console.log("Updated person USD: " + person.USD);
        // console.log("updated person ETH: " + person.ETH);
      };
      reAvaluate();
    }
  
    //Reavulates crypto holdings to USD
    function reAvaluate() {
      // console.log(person.ETHVal);

      //Updates Value on persons coins
      person.BTCVal = person.BTC * bitcoinPrice;
      person.ETHVal = person.ETH * ethereumPrice;
      person.XRPVal = person.XRP * ripplePrice;
      person.LTCVal = person.LTC * litecoinPrice;
      person.totalNet = person.BTCVal + person.ETHVal + person.USD + person.LTCVal + person.XRPVal;

      $("#jqueryUSD").text(person.USD.toLocaleString('en'));
      $("#jqueryNet").text(person.totalNet.toLocaleString('en'));
      $("#personBTC").text(person.BTC.toLocaleString('en'));
      $("#BTCVal").text(person.BTCVal.toLocaleString('en'));
      $("#personLTC").text(person.LTC.toLocaleString('en'));
      $("#LTCVal").text(person.LTCVal).toLocaleString('en');
      $("#personEther").text(person.ETH).toLocaleString('en');
      $("#ETHVal").text(person.ETHVal).toLocaleString('en');
      $("#personRipple").text(person.XRP.toLocaleString('en'));
      $("#XRPVal").text(person.XRPVal.toLocaleString('en'));

      // $("#personLTC").text(person.LTC.toLocaleString('en'));
      // $("LTCVal").text(person.LTCVal.toLocaleString('en'));
      // $("#personEther").text(person.ETH.toLocaleString('en'));
      // $("#ETHVal").text(person.ETHVal.toLocaleString('en'));
      // $("#personRipple").text(person.XRP.toLocaleString('en'));
      // $("#XRPVal").text(person.XRPVal.toLocaleString('en'));

      // console.log("Updated Portfolio");
      // console.log("Ethereum value" + person.ETHVal);

      //Sets All the current prices for trading
      $("#jqueryBTC").text(Math.floor(bitcoinPrice).toLocaleString('en'));
      $("#jqueryLTC").text(litecoinPrice.toLocaleString('en'));
      $("#jqueryEther").text(ethereumPrice.toLocaleString('en'));
      $("#jqueryXRP").text(ripplePrice.toLocaleString('en'));
    }
  
    $("#buybtc").on('click', function () {
      event.preventDefault();
      console.log("clicked");
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
  
  });