(function () {
'use strict'

angular.module('ShoppingListCheckOff', [])
.controller('ToBuyController', ToBuyController)
.controller('AlreadyBoughtController', AlreadyBoughtController);

function ToBuyController() {
	var toBuy = this;
	toBuy.testString = 'value from ToBuyController';
	console.log(toBuy);
};


function AlreadyBoughtController() {
	var bought = this;
	bought.testString = 'value from AlreadyBoughtController';
	console.log(bought);
};


}

)();