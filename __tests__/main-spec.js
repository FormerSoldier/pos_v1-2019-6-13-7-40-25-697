
const obj = require('../main');
const items = [
    {
      barcode: 'ITEM000000',
      name: '可口可乐',
      unit: '瓶',
      price: 3.00
    },
    {
      barcode: 'ITEM000001',
      name: '雪碧',
      unit: '瓶',
      price: 3.00
    },
    {
      barcode: 'ITEM000002',
      name: '苹果',
      unit: '斤',
      price: 5.50
    },
    {
      barcode: 'ITEM000003',
      name: '荔枝',
      unit: '斤',
      price: 15.00
    },
    {
      barcode: 'ITEM000004',
      name: '电池',
      unit: '个',
      price: 2.00
    },
    {
      barcode: 'ITEM000005',
      name: '方便面',
      unit: '袋',
      price: 4.50
    }
  ];;
  const promotion = {
    type: 'BUY_TWO_GET_ONE_FREE',
    barcodes: [
      'ITEM000000',
      'ITEM000001',
      'ITEM000005'
    ]
  };

// test cases for function isBarcodeValid
it('should return [] when call isBarcodeValid given ["ITEM000005","ITEM000001"]',() =>{
    expect(obj.isBarcodeValid(items,['ITEM000005','ITEM000001'])).toEqual([]);
});

it('should return ["ITEM000006"] when call isBarcodeValid given ["ITEM000005","ITEM000006"]',() =>{
    expect(obj.isBarcodeValid(items,['ITEM000005','ITEM000006'])).toEqual(['ITEM000006']);
});

// test cases for function statisticsCountByBarcodes
it('should return [{barcode:"ITEM000005",count:1},{barcode: "ITEM000001",count:2}] when call statisticsCountByBarcodes given ["ITEM000005","ITEM000001","ITEM000001"]',() =>{
    expect(obj.statisticsCountByBarcodes(['ITEM000005','ITEM000001','ITEM000001'])).toEqual([{barcode:'ITEM000005',count:1},{barcode: 'ITEM000001',count:2}]);
});

// test cases for function transformWithMoreInfo
it('should return [{barcode:"ITEM000005",count:1},{barcode: "ITEM000001",count:2}] when call transformWithMoreInfo given ["ITEM000005","ITEM000001","ITEM000001"]',() =>{
    expect(obj.transformWithMoreInfo(items,[{barcode:'ITEM000005',count:1},{barcode: 'ITEM000001',count:2}]))
        .toEqual([{barcode:'ITEM000005',name:'方便面',unit:'袋',price:4.50,count:1},
        {barcode:'ITEM000001',name:'雪碧',unit:'瓶',price:3.00,count:2}]);
});

// test cases for function transformShoppingListToObjArrWithMoreInfo
it('should return [{barcode: "ITEM000005",name:"方便面",unit:"袋",price:4.50,count:1},{barcode:"ITEM000001",name:"雪碧",unit:"瓶",price:3.00,count:2}] when call transformShoppingListToObjArrWithMoreInfo given [],["ITEM000005","ITEM000001","ITEM000001"],items',() =>{
    expect(obj.transformShoppingListToObjArrWithMoreInfo([],['ITEM000005','ITEM000001','ITEM000001'],items))
        .toEqual([{barcode:'ITEM000005',name:'方便面',unit:'袋',price:4.50,count:1},
        {barcode:'ITEM000001',name:'雪碧',unit:'瓶',price:3.00,count:2}]);
});
/*
// test cases for function calculateOriginFare
it('should return 10.5 when call calculateOriginFare given [{barcode: "ITEM000005",name:"方便面",unit:"袋",price:4.50,count:1},{barcode:"ITEM000001",name:"雪碧",unit:"瓶",price:3.00,count:2}]',() =>{
  expect(obj.calculateOriginFare([{barcode: "ITEM000005",name:"方便面",unit:"袋",price:4.50,count:1},{barcode:"ITEM000001",name:"雪碧",unit:"瓶",price:3.00,count:2}])).toEqual(10.5);
});*/

it('',()=> {
  expect(obj.createReceipt(promotion,[{barcode: 'ITEM000001',
  name: '雪碧',
  unit: '瓶',
  price: 3.00,
  count:1}])).toEqual(`***<没钱赚商店>收据***\n
名称：雪碧，数量：1瓶，单价：3.00(元)，小计：3.00(元)\n
----------------------\n
总计：3.00(元)\n
节省：0.00(元)\n
**********************`)
});