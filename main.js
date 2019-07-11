var isBarcodeValid = (items, shoppingList)=>{
    let itemsBarcodes = items.map((item)=>item['barcode']);
    return shoppingList.filter((item)=> !itemsBarcodes.includes(item));
};

var statisticsCountByBarcodes = (shoppingList)=> {
    let result =  shoppingList.reduce((initValue, cur) => {
        if(cur in initValue)
            initValue[cur]++;
        else
            initValue[cur] = 1;
        return initValue;
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
                    price: item['price'],
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
var createReceipt = (promotion,transformResult) => {
    let totalMoney = 0.0;
    let promoteTotal = 0.0;
    let receipt = '';
    let oneTotal = 0.0;
    let promoteMoney = 0.0;
    receipt += '***<没钱赚商店>收据***\n'
    transformResult.forEach((item) => {
        oneTotal = item.price * item.count;
        totalMoney += oneTotal;
        if(promotion['barcodes'].includes(item['barcode']) && item['count'] > 2){
            promoteMoney = item.count / 2 * item.price;
            promoteTotal += promoteMoney;
            oneTotal -= promoteMoney;
        }           
        receipt += `名称：雪碧，数量：${item.count}瓶，单价：${item.price.tofixed(2)}(元)，小计：${oneTotal}(元)\n`;  
    });
    receipt += `----------------------\n
                总计：${totalMoney}(元)\n
                节省：${promoteTotal}(元)\n
                **********************`;
    return receipt;
}

// function printReceipt is consist of isBarcodeValid, transformShoppingListToObjArrWithMoreInfo, calculateFare and transformToString
var printReceipt = (promotion, transformResult, ) => {
    

}




module.exports={
    isBarcodeValid,
    statisticsCountByBarcodes,
    transformWithMoreInfo,
    transformShoppingListToObjArrWithMoreInfo,
    createReceipt
    
}