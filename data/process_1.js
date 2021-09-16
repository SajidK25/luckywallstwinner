fs = require('fs');
symbols =require("./symbols.json");
data = fs.readFileSync("data.txt", 'utf8');

lines = data.split("\n")
lines = lines.slice(1, lines.length-1)
lines.forEach(line => {
    line_arr = line.split("|")
    if(line_arr[0]=="Y"){
        if(!symbols.includes(line_arr[1])){
            symbols.push(line_arr[1]);
            console.log("New", line_arr[1]);
        }
        
    }
});

fs.writeFile("./symbols.json", JSON.stringify(symbols), () => {
    console.log("done");
})

console.log(symbols);