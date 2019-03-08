(function () {
'use strict'

angular.module('ShoppingListCheckOff', [])
.controller('ToBuyController', ToBuyController)
.controller('AlreadyBoughtController', AlreadyBoughtController)
.service('ShoppingListCheckOffService', ShoppingListCheckOffService);

ToBuyController.$inject = ['ShoppingListCheckOffService'];
AlreadyBoughtController.$inject = ['ShoppingListCheckOffService'];

function ToBuyController(ShoppingListCheckOffService) {
	var toBuy = this;
	toBuy.items = ShoppingListCheckOffService.getToBuyItems();
	console.log(toBuy);
};

function AlreadyBoughtController(ShoppingListCheckOffService) {
	var bought = this;
	bought.items = ShoppingListCheckOffService.getBoughtItems();
	console.log(bought);
};

function ShoppingListCheckOffService(){
	var service = this;

	var toBuyItems = [
		{ 'name': 'cookies', 'value': '10 bags'},
		{ 'name': 'drinks', 'value': '10 bottles'}
	];

	var boughtItems = [
		{ 'name': 'snacks', 'value': '5 bags'},
		{ 'name': 'bananas', 'value': '5 pieces'},
	];

	service.getToBuyItems = function(){
		return toBuyItems;
	};

	service.getBoughtItems = function(){
		return boughtItems;
	};

	console.log(service);

};

})();