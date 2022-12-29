symbols = "";
stocks = [];
categories = {
}
$(document).ready(function () {
    load();
    setInterval(() => {
        //https://chami-cors.herokuapp.com/
        //https://aldrin-cors.herokuapp.com/
        console.log(symbols);
        $.get("https://luckywallstwinner.herokuapp.com/https://query1.finance.yahoo.com/v7/finance/quote?symbols=" + symbols, function (data, status) {
            stocks_ = data;
            //stocks_ = data;
            stocks = []
            stocks_.quoteResponse.result.forEach(stock => {
                s = {
                    "symbol": stock.symbol || 0,
                    "price": stock.regularMarketPrice || 0,
                    "change": stock.regularMarketChange || 0,
                    "percentage": stock.regularMarketChangePercent || 0
                }
                if (s.symbol.length > 4)
                    return;
                stocks.push(s);
            });
            updateTable();
        });
    }, 1000)
});


function load() {
    LOAD = [["n8", -100, -8], ["n6", -8, -6], ["n4", -6, -4], ["n2", -4, -2]
        , ["2", 2, 4], ["4", 4, 6], ["6", 6, 8], ["8", 8, 100], ["l", -1000000, 0], ["g", 0, 10000000]];

    LOADGL = [["l", -1000000, 0], ["g", 0, 10000000]];
    symbols = "";
    s = 10;
    LOAD.forEach(category => {
        $.get("/core?l=" + category[1] + "&h=" + category[2] + "&s=" + s, function (data, status) {
            categories[category[0]] = data;
            symbols += data.join(",") + ",";
            console.log(symbols);
            ht = ""
            data.forEach(s => {
                ht = ht
                    + "<tr>"
                    + "<td class='" + s + "_symbol zui-sticky-col'></td>"
                    + "<td class=" + s + "_price ></td>"
                    + "<td class=" + s + "_change ></td>"
                    + "<td class=" + s + "_percentage></td>"
                    + "</tr>"
            });
            $("#tb_" + category[0]).html(ht);
        });
    });

    // LOADGL.forEach(category => {
    //     $.get("/core/gainorLoss?l=" + category[1] + "&h=" + category[2] + "&s=" + s, function (data, status) {
    //         categories[category[0]] = data;
    //         symbols += data.join(",") + ",";
    //         console.log(symbols);
    //         ht = ""
    //         data.forEach(s => {
    //             ht = ht
    //                 + "<tr>"
    //                 + "<td class='" + s + "_symbol zui-sticky-col'></td>"
    //                 + "<td class=" + s + "_price ></td>"
    //                 + "<td class=" + s + "_change ></td>"
    //                 + "<td class=" + s + "_percentage></td>"
    //                 + "</tr>"
    //         });
    //         $("#tb_" + category[0]).html(ht);
    //     });
    // });



}

function updateTable() {
    stocks.forEach(stock => {
        $("." + stock.symbol + "_symbol").html(stock.symbol);
        $("." + stock.symbol + "_price").html(stock.price.toFixed(3));
        $("." + stock.symbol + "_change").html(stock.change.toFixed(3));
        $("." + stock.symbol + "_percentage").html(stock.percentage.toFixed(2) + "%");
        if (stock.percentage < 0) {
            $("." + stock.symbol + "_percentage").css('color', 'red');
        } else {
            $("." + stock.symbol + "_percentage").css('color', 'green');
        }
    });
}