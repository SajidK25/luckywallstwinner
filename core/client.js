module.exports.start = function () {
    symbols = require("../data/symbols.json")
    console.log("inside client");
    const fetch = require('node-fetch');
    count = 0;
    // symbols = symbols.slice(0,10000);
    iterifyArr(symbols);

    var Core = require("./core")
    let core = new Core();

    count = 0;
    var query = setInterval(() => {
        s = symbols.nextN(1000);
        if (s[s.length - 1] == false) {
            count = 0;
            // clearInterval(query);
        }
        s = s.slice(0, s.length - 1).join(",")
        fetch("http://query1.finance.yahoo.com/v7/finance/quote?symbols=" + s)
            .then(res => res.json())
            .then(stock => {
                try {
                    stock.quoteResponse.result.forEach(stock => {
                        if (stock.regularMarketPrice) {
                            symbol = stock.symbol;
                            open_ = stock.regularMarketOpen || 0;
                            marketPrice = stock.regularMarketPrice || 0;
                            change = stock.regularMarketChange || 0;
                            changePrecentage = stock.regularMarketChangePercent || 0;
                            bidSize = stock.bidSize || 0;
                            askSize = stock.askSize || 0;

                            d = {
                                "o": open_,
                                "p": marketPrice,
                                "c": change,
                                "cp": changePrecentage,
                                "bidSize": bidSize,
                                "askSize": askSize
                            }

                            core.DATA[symbol] = d
                            count++;
                            if (count % 1000 == 0) {
                                console.log(count);
                            }
                            //console.log(symbol)
                        }
                    });


                } catch {
                    //console.log(s);
                }

            })
            .catch((e) => {
                console.log(e);
            })

    }, 1000)
}

var iterifyArr = function (arr) {
    var cur = 0;
    arr.next = function () {
        if (++cur >= this.length) {
            cur = 0
            return false;
        }
        return this[cur];
    }
    arr.current = function () { return this[cur] };
    arr.nextN = function (n) {
        start = cur;
        end = Math.min(cur + n, this.length);
        cur = cur + n;
        S = this.slice(start, end)
        if (cur >= this.length) {
            cur = 0;
            S.push(false);
        }
        return S;
    }
    return arr;
};