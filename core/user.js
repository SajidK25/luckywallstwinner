const Core = require("./core");

class User {
    DATA_array = [];
    SYMBOLS = [];
    constructor() {
        let core = new Core();
        this.DATA_array = []
        this.SYMBOLS = Object.keys(core.DATA);
        this.SYMBOLS.forEach(s => {
            let stock = core.DATA[s];
            stock["s"] = s;
            this.DATA_array.push(stock);
        });
    }
    filter() {
        this.DATA_array = this.DATA_array.filter((stock) => {
            return (parseFloat(stock["bidSize"]) > 0 || parseFloat(stock["askSize"]) > 0) && parseFloat(stock["p"]) > 5;
        });
    }

    filterBy(prop,lowwerLimit, upperLimit) {
        this.DATA_array = this.DATA_array.filter((stock) => {
            return lowwerLimit < parseFloat(stock[prop]) && parseFloat(stock[prop]) < upperLimit;
        });
    }

    rankBy(prop, oder) {
        this.DATA_array = this.DATA_array.sort(GetSortOrder(prop, oder));
    }

    getSymbolsFromArray(DATA){
        let SYMBOLS = [];
        DATA.forEach(stock => {
            SYMBOLS.push(stock["s"]);
        });
        return SYMBOLS;
    }

}


//Comparer Function    
function GetSortOrder(prop, oder = 1) {
    return function (a, b) {
        if (parseFloat(a[prop]) <= parseFloat(b[prop])) {
            return 1 * oder;
        } else if (parseFloat(a[prop]) > parseFloat(b[prop])) {
            return -1 * oder;
        }
        //return 0;    
    }
}

function GetSortOrderCustom(prop, p = 0) {
    return function (a, b) {
        if (Math.abs(parseFloat(a[prop]) - p) < Math.abs(parseFloat(b[prop]) - p)) {
            return -1;
        } else if (Math.abs(parseFloat(a[prop]) - p) > Math.abs(parseFloat(b[prop]) - p)) {
            return 1;
        }
        return 0;
    }
}

module.exports = User;