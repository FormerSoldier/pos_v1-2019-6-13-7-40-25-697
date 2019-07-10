const obj = require('../main');
const items = loadAllItems();

// test cases for function isBarcodeValid
it('should return [] when call isBarcodeValid given ["ITEM000005","ITEM000001"]',() =>{
    expect(obj.isBarcodeValid(items,['ITEM000005','ITEM000001'])).toEqual([]);
});

it('should return ["ITEM000006"] when call isBarcodeValid given ["ITEM000005","ITEM000006"]',() =>{
    expect(obj.isBarcodeValid(items,['ITEM000005','ITEM000006'])).toEqual(['ITEM000006']);
});

// test cases for function statisticsCountByBarcodes
it('should return [{barcode:"ITEM000005",count:1},{barcode: "ITEM000001",count:2}] when call statisticsCountByBarcodes given ["ITEM000005","ITEM000001","ITEM000001"]',() =>{
    expect(obj.statisticsCountByBarcodes(['ITEM000005','ITEM000001','ITEM000001'],['ITEM000005','ITEM000006'])).toEqual([{barcode:'ITEM000005',count:1},{barcode: 'ITEM000001',count:2}]);
});

// test cases for function transformWithMoreInfo
it('should return [{barcode:"ITEM000005",count:1},{barcode: "ITEM000001",count:2}] when call transformWithMoreInfo given ["ITEM000005","ITEM000001","ITEM000001"]',() =>{
    expect(obj.transformWithMoreInfo(items,[{barcode:'ITEM000005',count:1},{barcode: 'ITEM000001',count:2}]))
        .toEqual([{barcode:'ITEM000005',name:'方便面',unit:'袋',price:4.50,count:1},
        {barcode:'ITEM000001',name:'雪碧',unit:'瓶',price:3.00,count:2}]);
});