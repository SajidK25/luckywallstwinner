$(document).ready(function () {
    $.ajax
        ({
            type: "GET",
            url: '/watchlist',
            dataType: 'json',           
            success: function (data) {
                console.log(data);
                $('#watchListTextArea').html(data.join(","))
            }
        })

   
});

function setWatchList() {
    WL = $("#watchListTextArea").val();
    WL_list = WL.split(",")
    
    console.log(WL_list)
    $.ajax
        ({
            type: "POST",
            url: '/watchlist/add',
            dataType: 'json',
            async: false,
            data: {
                wl: WL_list
            },
            success: function () {
                console.log("watchlist updated");
            }
        })
}