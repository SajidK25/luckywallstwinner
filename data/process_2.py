# Reading an excel file using Python
import xlrd
import json
 
# Give the location of the file
loc = ("./data_2.xlsx")

 
# To open Workbook
wb = xlrd.open_workbook(loc)
sheet = wb.sheet_by_index(0)
 

symbols = open("symbols.json","r")
symbols = json.load(symbols)




for i in range(sheet.nrows):
    # print(sheet.cell_value(i, 4))
    if(sheet.cell_value(i, 4)=="USA"):
        if(not str(sheet.cell_value(i, 0)) in symbols):
            #print(sheet.cell_value(i, 0))
            symbols.append(sheet.cell_value(i, 0))

print(len(symbols))
# for i in range(len(symbols)):
#     if(not symbols[i] in symbols_usa):
#         print(symbols[i])

with open('symbols.json', 'w') as json_file:
    json.dump(symbols, json_file)