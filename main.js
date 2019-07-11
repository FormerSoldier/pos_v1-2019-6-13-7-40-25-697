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






module.exports={
    isBarcodeValid,
    statisticsCountByBarcodes,
    transformWithMoreInfo,
    transformShoppingListToObjArrWithMoreInfo
}