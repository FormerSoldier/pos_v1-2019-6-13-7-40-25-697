'use strict';

//TODO: 请在该文件中实现练习要求并删除此注释
var transformByRegExp = (item) =>{
    let regExp = /(\w+)-(\d+\.\d+|\d+)?/;
    let result = regExp.exec(item);
    if(result == null || result ==undefined)
        return [item];
    else
        return result.slice(1);
}

var isBarcodeValid = (items, shoppingList)=>{
    let itemsBarcodes = items.map((item)=>item['barcode']);
    return shoppingList.filter((item)=> !itemsBarcodes.includes(transformByRegExp(item)[0]));
};

var statisticsCountByBarcodes = (shoppingList)=> {
    let result =  shoppingList.reduce((initValue, cur) => {
        let temp = transformByRegExp(cur);
        if(temp.length == 1){
            if(cur in initValue)
            initValue[cur]++;
            else
                initValue[cur] = 1;
            return initValue;
        }else{
            if(temp[0] in initValue)
            initValue[temp[0]] += Number(temp[1]);
            else
                initValue[temp[0]] = Number(temp[1]);
            return initValue;
        }
        
    },{});
    let keys = Object.keys(result);
    return keys.map((key) => {
        return {
            barcode: key,
            count: result[key] 
        }
    });
};

var transformWithMoreInfo = (items, objList) => {
    let temp = undefined;
    return objList.map((obj) => {
        items.forEach((item) => {
            if(obj['barcode'] == item['barcode']){
                temp = {
                    barcode: obj['barcode'],
                    name: item['name'],
                    unit: item['unit'],
                    price: item['price'].toFixed(2),
                    count: obj['count']
                }
            }           
        });
        return temp;
    });
}
// function transformShoppingListToObjArrWithMoreInfo is consist of statisticsCountByBarcodes and transformWithMoreInfo
var  transformShoppingListToObjArrWithMoreInfo = (invalidBarcode,ShoppingList,items) => {
    if(invalidBarcode.length != 0)
        return "[ERROR]: invalid barcode";
    let objList = statisticsCountByBarcodes(ShoppingList);
    let transformResult = transformWithMoreInfo(items, objList);
    return transformResult;
}

// function calculateFare is consist of calculateOriginFare and calculateFareInPromotion
var createReceipt = (promotions,transformResult) => {
    let totalMoney = 0.0;
    let promoteTotal = 0.0;
    let receipt = '';
    let oneTotal = 0.0;
    let promotion = promotions[0];
    receipt += '***<没钱赚商店>收据***\n'
    transformResult.forEach((item) => {
        oneTotal = item.price * item.count;
        if(promotion['barcodes'].includes(item['barcode']) && item['count'] > 2){
            promoteTotal += item.price;
            oneTotal -= item.price;
        }           
        totalMoney += oneTotal;
        receipt += `名称：${item.name}，数量：${item.count}${item.unit}，单价：${Number(item.price).toFixed(2)}(元)，小计：${oneTotal.toFixed(2)}(元)\n`;  
    });
    receipt += `----------------------
总计：${Number(totalMoney).toFixed(2)}(元)
节省：${Number(promoteTotal).toFixed(2)}(元)
**********************`;
    return receipt;
}

// function printReceipt is consist of isBarcodeValid, transformShoppingListToObjArrWithMoreInfo, calculateFare and transformToString
var printReceipt = (promotions, items, shoppingList) => {
    let invalidBarcode = isBarcodeValid(items,shoppingList);
    let transformResult = transformShoppingListToObjArrWithMoreInfo(invalidBarcode,shoppingList, items);
    let receipt = createReceipt(promotions, transformResult);
    return receipt;
}

module.exports= printReceipt