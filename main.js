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

module.exports={
    isBarcodeValid,
    statisticsCountByBarcodes
}