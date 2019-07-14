
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
  const promotions = [{
    type: 'BUY_TWO_GET_ONE_FREE',
    barcodes: [
      'ITEM000000',
      'ITEM000001',
      'ITEM000005'
    ]
  }];

// test cases for function transformByRegExp
it('should return [ITEM000005] when call transformByRegExp given "ITEM000005"',() =>{
  expect(obj.transformByRegExp('ITEM000005')).toEqual(['ITEM000005']);
});

it('should return [ITEM000005,5] when call transformByRegExp given "ITEM000005-5"',() =>{
  expect(obj.transformByRegExp('ITEM000005-5')).toEqual(['ITEM000005','5']);
});

it('should return [ITEM000002,5.5] when call transformByRegExp given "ITEM000002-5.5"',() =>{
  expect(obj.transformByRegExp('ITEM000002-5.5')).toEqual(['ITEM000002','5.5']);
});


// test cases for function isBarcodeValid
it('should return [] when call isBarcodeValid given ["ITEM000005","ITEM000001"]',() =>{
    expect(obj.isBarcodeValid(items,['ITEM000005','ITEM000001'])).toEqual([]);
});

it('should return ["ITEM000006"] when call isBarcodeValid given ["ITEM000005","ITEM000006"]',() =>{
    expect(obj.isBarcodeValid(items,['ITEM000005','ITEM000006'])).toEqual(['ITEM000006']);
});

it('should return ["ITEM000006"] when call isBarcodeValid given ["ITEM000005-9","ITEM000006"]',() =>{
  expect(obj.isBarcodeValid(items,['ITEM000005-9','ITEM000006'])).toEqual(['ITEM000006']);
});

it('should return ["ITEM000006"] when call isBarcodeValid given ["ITEM000005-9.9","ITEM000006"]',() =>{
  expect(obj.isBarcodeValid(items,['ITEM000005-9.9','ITEM000006'])).toEqual(['ITEM000006']);
});


// test cases for function statisticsCountByBarcodes
it('should return [{barcode:"ITEM000005",count:1},{barcode: "ITEM000001",count:2}] when call statisticsCountByBarcodes given ["ITEM000005","ITEM000001","ITEM000001"]',() =>{
    expect(obj.statisticsCountByBarcodes(['ITEM000005','ITEM000001','ITEM000001'])).toEqual([{barcode:'ITEM000005',count:1},{barcode: 'ITEM000001',count:2}]);
});

it('should return [{barcode:"ITEM000005",count:5},{barcode: "ITEM000001",count:2}] when call statisticsCountByBarcodes given ["ITEM000005-5","ITEM000001","ITEM000001"]',() =>{
  expect(obj.statisticsCountByBarcodes(['ITEM000005-5','ITEM000001','ITEM000001'])).toEqual([{barcode:'ITEM000005',count:5},{barcode: 'ITEM000001',count:2}]);
});

it('should return [{barcode:"ITEM000005",count:5.5},{barcode: "ITEM000001",count:2}] when call statisticsCountByBarcodes given ["ITEM000005-5.5","ITEM000001","ITEM000001"]',() =>{
  expect(obj.statisticsCountByBarcodes(['ITEM000005-5.5','ITEM000001','ITEM000001'])).toEqual([{barcode:'ITEM000005',count:5.5},{barcode: 'ITEM000001',count:2}]);
});


// test cases for function transformWithMoreInfo
it('should return [{barcode:ITEM000005,name:方便面,unit:袋,price:4.50,count:1},{barcode:ITEM000001,name:雪碧,unit:瓶,price:3.00,count:2}] when call transformWithMoreInfo given items,[{barcode:ITEM000005,count:1},{barcode: ITEM000001,count:2}]',() =>{
    expect(obj.transformWithMoreInfo(items,[{barcode:'ITEM000005',count:1},{barcode: 'ITEM000001',count:2}]))
        .toEqual([{barcode:'ITEM000005',name:'方便面',unit:'袋',price:Number(4.50).toFixed(2),count:1},
        {barcode:'ITEM000001',name:'雪碧',unit:'瓶',price:Number(3.00).toFixed(2),count:2}]);
});

it('shoule return [{barcode:ITEM000001,name:雪碧,unit:瓶,price:3.00,count:3},{barcode:ITEM000002,name:苹果,unit:斤,price:2.50,count:6.8},{barcode:ITEM000004,name:电池,unit:个,price:2.00,count:3}] when call transformWithMoreInfo given items,[{barcode:ITEM000001,count:3},{barcode: ITEM000002,count:6.8},{barcode:ITEM000004,count:3}]',() =>{
  expect(obj.transformWithMoreInfo(items,[{barcode:'ITEM000001',count:3},{barcode: 'ITEM000002',count:6.8},{barcode:'ITEM000004',count:3}]))
      .toEqual([
      {barcode:'ITEM000001',name:'雪碧',unit:'瓶',price:3.00.toFixed(2),count:3},
      {barcode:'ITEM000002',name:'苹果',unit:'斤',price:5.50.toFixed(2),count:6.8},
      {barcode:'ITEM000004',name:'电池',unit:'个',price:2.00.toFixed(2),count:3}]);
});

// test cases for function transformShoppingListToObjArrWithMoreInfo
it('should return [{barcode: "ITEM000005",name:"方便面",unit:"袋",price:4.50,count:1},{barcode:"ITEM000001",name:"雪碧",unit:"瓶",price:3.00,count:2}] when call transformShoppingListToObjArrWithMoreInfo given [],["ITEM000005","ITEM000001","ITEM000001"],items',() =>{
    expect(obj.transformShoppingListToObjArrWithMoreInfo([],['ITEM000005','ITEM000001','ITEM000001'],items))
        .toEqual([{barcode:'ITEM000005',name:'方便面',unit:'袋',price:4.50.toFixed(2),count:1},
        {barcode:'ITEM000001',name:'雪碧',unit:'瓶',price:3.00.toFixed(2),count:2}]);
});
it('',() =>{
  expect(obj.transformShoppingListToObjArrWithMoreInfo([],['ITEM000001-3','ITEM000002-6.8','ITEM000004','ITEM000004','ITEM000004'],items))
      .toEqual([{barcode:'ITEM000001',name:'雪碧',unit:'瓶',price:Number(3.00).toFixed(2),count:3},
      {barcode:'ITEM000002',name:'苹果',unit:'斤',price:Number(5.50).toFixed(2),count:6.8},
      {barcode:'ITEM000004',name:'电池',unit:'个',price:Number(2.00).toFixed(2),count:3}]);
});


it('the final test',() =>{
  expect(obj.transformShoppingListToObjArrWithMoreInfo([],['ITEM000001-3','ITEM000002-6.8','ITEM000004','ITEM000004','ITEM000004'],items))
      .toEqual([{barcode:'ITEM000001',name:'雪碧',unit:'瓶',price:Number(3.00).toFixed(2),count:3},
      {barcode:'ITEM000002',name:'苹果',unit:'斤',price:Number(5.50).toFixed(2),count:6.8},
      {barcode:'ITEM000004',name:'电池',unit:'个',price:Number(2.00).toFixed(2),count:3}]);
});
it('',()=> {
  expect(obj.createReceipt(promotions,[{barcode: 'ITEM000001',
  name: '雪碧',
  unit: '瓶',
  price: 3.00.toFixed(2),
  count:1}])).toEqual(`***<没钱赚商店>收据***
名称：雪碧，数量：1瓶，单价：3.00(元)，小计：3.00(元)
----------------------
总计：3.00(元)
节省：0.00(元)
**********************`)
});


it('',()=> {
  expect(obj.printReceipt(promotions,items, ['ITEM000001-3'])).toEqual(`***<没钱赚商店>收据***
名称：雪碧，数量：3瓶，单价：3.00(元)，小计：6.00(元)
----------------------
总计：6.00(元)
节省：3.00(元)
**********************`)
});

it('',()=> {
  expect(obj.printReceipt(promotions,items, ['ITEM000001-3','ITEM000002-6.8','ITEM000004','ITEM000004','ITEM000004'])).toEqual(`***<没钱赚商店>收据***
名称：雪碧，数量：3瓶，单价：3.00(元)，小计：6.00(元)
名称：苹果，数量：6.8斤，单价：5.50(元)，小计：37.40(元)
名称：电池，数量：3个，单价：2.00(元)，小计：6.00(元)
----------------------
总计：49.40(元)
节省：3.00(元)
**********************`)
});

it('',()=> {
  expect(obj.printReceipt(promotions,items, ['ITEM000001',
  'ITEM000001',
  'ITEM000001',
  'ITEM000001',
  'ITEM000001',
  'ITEM000003-2.5',
  'ITEM000005',
  'ITEM000005-2'])).toEqual(`***<没钱赚商店>收据***
名称：雪碧，数量：5瓶，单价：3.00(元)，小计：12.00(元)
名称：荔枝，数量：2.5斤，单价：15.00(元)，小计：37.50(元)
名称：方便面，数量：3袋，单价：4.50(元)，小计：9.00(元)
----------------------
总计：58.50(元)
节省：7.50(元)
**********************`)
});

it('',() =>{
  expect(obj.transformShoppingListToObjArrWithMoreInfo([],['ITEM000001',
  'ITEM000001',
  'ITEM000001',
  'ITEM000001',
  'ITEM000001',
  'ITEM000003-2.5',
  'ITEM000005',
  'ITEM000005-2'],items))
      .toEqual([{barcode:'ITEM000001',name:'雪碧',unit:'瓶',price:3.00.toFixed(2),count:5},
      {barcode:'ITEM000003',name:'荔枝',unit:'斤',price:15.00.toFixed(2),count:2.5},
      {barcode:'ITEM000005',name:'方便面',unit:'袋',price:4.50.toFixed(2),count:3}
      ]);
});

