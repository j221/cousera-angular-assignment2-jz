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

	toBuy.itemBought = function(index){
		ShoppingListCheckOffService.itemBought(index);
	};

};

function AlreadyBoughtController(ShoppingListCheckOffService) {
	var bought = this;
	bought.items = ShoppingListCheckOffService.getBoughtItems();
	console.log(bought);

	bought.itemReturned = function(index){
		ShoppingListCheckOffService.itemReturned(index);
	};
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

	service.itemBought = function(index){
		boughtItems.push(toBuyItems[index]);
		toBuyItems.splice(index,1);
	};

	service.itemReturned = function(index){
		toBuyItems.push(boughtItems[index]);
		boughtItems.splice(index,1);
	};

	console.log(service);

};

})();