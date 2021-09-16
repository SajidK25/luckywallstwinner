array = require("./symbols.json")
// uniq = [...new Set(array)];
// console.log(array.length,uniq.length);

uniq = array.filter(function(item, pos) {
    return array.indexOf(item) == pos;
})

console.log(array.length,uniq.length);