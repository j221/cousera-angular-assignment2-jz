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

	toBuy.itemBought = function(index){
		ShoppingListCheckOffService.itemBought(index);
	};

	toBuy.isToBuyListEmpty = function(){
		return ShoppingListCheckOffService.isToBuyListEmpty();
	};

	toBuy.addItem = function(){
		ShoppingListCheckOffService.addItem(toBuy.newItemName, toBuy.newItemQuantity);
	};

};

function AlreadyBoughtController(ShoppingListCheckOffService) {
	var bought = this;
	bought.items = ShoppingListCheckOffService.getBoughtItems();

	bought.itemReturned = function(index){
		ShoppingListCheckOffService.itemReturned(index);
	};

	bought.isBoughtListEmpty = function(){
		return ShoppingListCheckOffService.isBoughtListEmpty();
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
		_cutAndPushItem(toBuyItems,index,boughtItems);
	};

	service.itemReturned = function(index){
		_cutAndPushItem(boughtItems,index,toBuyItems);
	};

	service.isBoughtListEmpty = function() {
		return boughtItems.length > 0 ? false : true;
	};

	service.isToBuyListEmpty = function() {
		return toBuyItems.length > 0 ? false : true;
	};

	service.addItem = function(name, quantity) {
		return toBuyItems.push({'name': name, 'value': quantity});
	};

	//local functions
	function _cutAndPushItem(fromArray,index,toArray){
		toArray.push(fromArray[index]);
		fromArray.splice(index,1);
	}

};

})();