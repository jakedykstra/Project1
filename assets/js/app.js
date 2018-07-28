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
      // alert("Invalid Input");
      return;
    } else {
      var totalAmount = amount / crypto;
      if (amount > person.USD) {
        // alert("You dont have enough");
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
    };
  }

  //Sell Crypto function
  //1. Checks if input is valid
  //2. Calculates total amount
  //3. Checks if user has amount to sell
  //4. Reavaluates amount
  function sellCrypto(amount, crypto, objCrypto) {
    console.log("sell button clicked");
    if (!amount || typeof amount === 'Number') {
      // alert("Invalid Input");
      return;
    } else {
      var totalAmount = amount * crypto;
      if (amount > person[objCrypto]) {
        // alert('you dont have enough');
      } else {
        person.USD += totalAmount;
        person[objCrypto] -= amount;

        reAvaluate();
        tradeHistoryDb(crypto, totalAmount, amount, "Sell", objCrypto);
      }
    }
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

    $("#jqueryUSD").text(person.USD.toLocaleString(undefined, {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }));
    $("#jqueryNet").text(person.totalNet.toLocaleString(undefined, {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }));
    $("#personBTC").text(person.BTC.toLocaleString(undefined, {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }));
    $("#BTCVal").text(person.BTCVal.toLocaleString(undefined, {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }));
    $("#personLTC").text(person.LTC.toLocaleString(undefined, {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }));
    $("#LTCVal").text(person.LTCVal.toLocaleString(undefined, {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }));
    $("#personEther").text(person.ETH.toLocaleString(undefined, {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }));
    $("#ETHVal").text(person.ETHVal.toLocaleString(undefined, {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }));
    $("#personRipple").text(person.XRP.toLocaleString(undefined, {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }));
    $("#XRPVal").text(person.XRPVal.toLocaleString(undefined, {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }));

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


$('#graphButtonContainer button').on('click', function() {
  $(".svg-container svg").remove()
  console.log(this);
  console.log(this.value);
    var coin = this.value;
    if (coin==="ETH"){
        var graphColor = "#393e46"
    } else if (coin==="LTC"){
        var graphColor = "#bebebe";
    } else if (coin==="BTC"){
        var graphColor = "#f1c506";
    } else if (coin==="XRP"){
        var graphColor = "#009dd6";
        var lineColor = "black"
    };
    $('#graphContainer').css("background", graphColor);
    $('#graphButtonContainer').css("background", "#393e46");
    var api = 'https://min-api.cryptocompare.com/data/histoday?fsym=' + coin + '&tsym=USD&limit=90';
    loadGraph();
    function loadGraph() {
    fetch(api)
        .then(function (response) {
            return response.json();
            console.log(response.json());
        })
        .then(function (data) {
            var parsedData = parseData(data)
            console.log(parseData);
            console.log(data);
            drawChart(parsedData);
        })
};

function parseData(data) {
    var arr = [];
    for (var i of data.Data) {
        arr.push({
            date: new Date(i.time * 1000), //date
            value: i.close //convert string to number
        });
    }
    return arr;

}

function drawChart(data) {
    console.log(data);
    var svgWidth = 600,
        svgHeight = 400;
    var margin = {
        top: 20,
        right: 20,
        bottom: 30,
        left: 50
    };
    var width = svgWidth - margin.left - margin.right;
    var height = svgHeight - margin.top - margin.bottom;
    var svg = d3.select('div#container')
        .append("svg")
        .attr("preserveAspectRatio", "xMinYMin meet")
        .attr("viewBox", "0 0 600 400")
        .classed("svg-content", true);
    //.attr("width", svgWidth)
       // .attr("height", svgHeight);

    var g = svg.append("g")
        .attr("transform",
            "translate(" + margin.left + "," + margin.top + ")"
        );

    var x = d3.scaleTime().rangeRound([0, width]);
    var y = d3.scaleLinear().rangeRound([height, 0]);

    var line = d3.line()
        .x(function (d) {
            return x(d.date)
        })
        .y(function (d) {
            return y(d.value)
        })
    x.domain(d3.extent(data, function (d) {
        return d.date
    }));
    y.domain(d3.extent(data, function (d) {
        return d.value
    }));
    
    g.append("g")
        .attr("transform", "translate(0," + height + ")")
        .attr("stroke", "#000")
        .attr("stroke-width", 1)
        .call(d3.axisBottom(x))
        .select(".domain")
        .remove();

    g.append("g")
        .call(d3.axisLeft(y))
        .append("text")
        .attr("fill", "#000")
        .attr("stroke-width", 1)
        .attr("transform", "rotate(-90)")
        .attr("y", 6)
        .attr("dy", "0.71em")
        .attr("text-anchor", "end")
        .text("Price ($)");
        if (coin==="XRP"){

        g.append("path")
        .datum(data)
        .attr("fill", "none")
        .attr("stroke", "black")
        .attr("stroke-linejoin", "round")
        .attr("stroke-linecap", "round")
        .attr("stroke-width", 1.5)
        .attr("d", line);
        } else {
          g.append("path")
        .datum(data)
        .attr("fill", "none")
        .attr("stroke", "#009dd6")
        .attr("stroke-linejoin", "round")
        .attr("stroke-linecap", "round")
        .attr("stroke-width", 1.5)
        .attr("d", line);
        }

  

}
})

});