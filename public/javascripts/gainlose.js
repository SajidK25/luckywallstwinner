symbols = "";
stocks = [];
state = "g"
watchlist = []
status_ = {
    g: {
        h: 9999999,
        l: 0
    },
    l: {
        l: -9999999,
        h: 0
    }
}



$(document).ready(function () {

    load(0, 10000000)

    $.ajax({
        type: "GET",
        url: '/watchlist',
        dataType: 'json',
        success: function (data) {
            watchlist = data;
        }
    })

    setInterval(() => {
        //console.log(status_);
        load(status_[state].l, status_[state].h);
    }, 60 * 1000);

    setInterval(() => {
        //https://chami-cors.herokuapp.com/
        //https://aldrin-cors.herokuapp.com/
        console.log(symbols);
        $.get("/fetch_data?s=" + symbols, function (data, status) {
            //stocks_ = JSON.parse(data);
            stocks_ = data;
            stocks = []
            stocks_.quoteResponse.result.forEach(stock => {
                s = {
                    "symbol": stock.symbol || 0,
                    "price": stock.regularMarketPrice || 0,
                    "change": stock.regularMarketChange || 0,
                    "percentage": stock.regularMarketChangePercent || 0,
                    "volume": stock.regularMarketVolume || 0
                }
                if (s.symbol.length > 4)
                    return;
                stocks.push(s);
            });
            updateTable();
        });
    }, 1000)

});

function changeState(s) {
    state = s;
}


function load(l, h) {
    $.get("/core?l=" + l + "&h=" + h + "&s=50", function (data, status) {
        symbols = data.join(",")
        ht = ""
        data.forEach(s => {

            ht = ht +
                "<tr>" +
                "<td id=" + s + "_symbol class='zui-sticky-col'></td>" +
                "<td id=" + s + "_price ></td>" +
                "<td id=" + s + "_change ></td>" +
                "<td id=" + s + "_volume></td>" +
                "</tr>"
        });
        $("#tb").html(ht);
    });
}


function sort(prop) {
    if ($(this).attr("status")) {
        $(this).attr("status", $(this).attr("status") * -1)
    } else {
        $(this).attr("status", 1);
    }
    stocks = stocks.sort(GetSortOrder(prop, $(this).attr("status")));
    htm = "";
    stocks.forEach(stock => {
        s = stock.symbol;
        htm = htm +
            "<tr>" +
            "<td id=" + s + "_symbol class='zui-sticky-col'>< /td>" +
            "<td id=" + s + "_price ></td>" +
            "<td id=" + s + "_change ></td>" +
            "<td id=" + s + "_volume></td>" +
            "</tr>"
    });
    $("#tb").html(htm);
    updateTable();

}

//Comparer Function    
function GetSortOrder(prop, t) {

    return function (a, b) {
        if (a[prop] < b[prop]) {
            return 1 * t;
        } else if (a[prop] > b[prop]) {
            return -1 * t;
        }
        return 0;
    }
}

function updateTable() {


    sorted = stocks.slice().sort(GetSortOrder("change", 1));

    var ranks = stocks.map(function (v) { return sorted.indexOf(v) + 1 });

    rank_i = 0

    stocks.forEach(stock => {

        $("#" + stock.symbol + "_symbol").html("<font size=0.7>" + ranks[rank_i] + ".</font> " + "<a href='https://finance.yahoo.com/chart/" +
            stock.symbol + "' target = '_blank'" + (watchlist.indexOf(stock.symbol) >= 0 ? "class = 'watchlist'" : "") + " >" +
            stock.symbol + "</a>");
        $("#" + stock.symbol + "_price").html(stock.price.toFixed(3));
        $("#" + stock.symbol + "_change").html(stock.change.toFixed(3));
        $("#" + stock.symbol + "_volume").html(stock.volume);
        rank_i += 1;
    });
}


function setWatchList() {
    WL = $("#watchListTextArea").val();
    console.log(WL);
    WL_list = JSON.stringify(WL.split(","))
    setCookie("watchlist", WL_list, 10000);
}

function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    var expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}
function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}