const { MongoClient } = require('mongodb');
const uri = "mongodb+srv://kundan:Al3YcgIVOTzWskM4@cluster0.92gdy.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

function findOne(query) {
    return new Promise((resolve, reject) => {
        client.connect(err => {
            const collection = client.db("stockdata").collection("watchlist");
            collection.findOne(query, (err, res) => {
                if (err) reject(err)
                else {
                    resolve(res)
                }
                client.close();
            });
        });
    })
}

function updateMany(query, update) {
    return new Promise((resolve, reject) => {
        client.connect(err => {
            const collection = client.db("stockdata").collection("watchlist");
            collection.updateMany(query, update, (err, res) => {
                if (err) reject(err)
                else {
                    resolve(res)
                }
                client.close();
            });
        });
    })
}

async function getWatchlist() {
    var data = await findOne({});
    return data.tickers
}

async function addWatchlist(watchlist) {
    if(!Array.isArray(watchlist)){
        watchlist = [watchlist];
    }
    const updateQuery = {
        $set: { tickers: watchlist }
    }
    await updateMany({},updateQuery)
}

module.exports.getWatchlist = getWatchlist;
module.exports.addWatchlist = addWatchlist;