const obj = require('../main');
const items = loadAllItems();

// test cases for function isBarcodeValid
it('should return [] when call isBarcodeValid given ["ITEM000005","ITEM000001"]',() =>{
    expect(obj.isBarcodeValid(items,['ITEM000005','ITEM000001'])).toEqual([]);
});

it('should return ["ITEM000006"] when call isBarcodeValid given ["ITEM000005","ITEM000006"]',() =>{
    expect(obj.isBarcodeValid(items,['ITEM000005','ITEM000006'])).toEqual(['ITEM000006']);
});
