(function () {
'use strict'

angular.module('ShoppingListCheckOff', [])
.controller('ToBuyController', ToBuyController)
.controller('AlreadyBoughtController', AlreadyBoughtController)
// name of provider function, does not relate to name of
// provider injected to config
.provider('ShoppingListCheckOff', ShoppingListCheckOffProv)  
.config(Config);


// injected provider came from servine name + 'Provider' string
// service name is ShoppingListCheckOff
// so result is ShoppingListCheckOffProvider
Config.$inject = ['ShoppingListCheckOffProvider'];
function Config(ShoppingListCheckOffProvider) {
	console.log("i am in config.");
	ShoppingListCheckOffProvider.defaults.something = 'something from config.';
}


ToBuyController.$inject = ['ShoppingListCheckOff'];
AlreadyBoughtController.$inject = ['ShoppingListCheckOff'];

function ToBuyController(ShoppingListCheckOff) {
	var toBuy = this;
	toBuy.items = ShoppingListCheckOff.getToBuyItems();
	toBuy.something = ShoppingListCheckOff.something;

	toBuy.itemBought = function(index){
		ShoppingListCheckOff.itemBought(index);
	};

	toBuy.isToBuyListEmpty = function(){
		return ShoppingListCheckOff.isToBuyListEmpty();
	};

	toBuy.addItem = function(){
		ShoppingListCheckOff.addItem(toBuy.newItemName, toBuy.newItemQuantity);
	};

	toBuy.deleteItem = function(index){
		ShoppingListCheckOff.deleteItem(index);
	};

};

function AlreadyBoughtController(ShoppingListCheckOff) {
	var bought = this;
	bought.items = ShoppingListCheckOff.getBoughtItems();

	bought.itemReturned = function(index){
		ShoppingListCheckOff.itemReturned(index);
	};

	bought.isBoughtListEmpty = function(){
		return ShoppingListCheckOff.isBoughtListEmpty();
	};

};

function ShoppingListCheckOffService(toBuyItems, boughtItems){

	var service = this;
	var toBuyItems =  toBuyItems === undefined ? [] : toBuyItems;
	var boughtItems = boughtItems === undefined ? [] : boughtItems;

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

	service.deleteItem = function(index){
		toBuyItems.splice(index,1);
	};

	// local functions are hiden/invisible, when Service function
	// is instantiated as Class (as you can see, following functions
	// are not attached to 'service' variable.
	function _cutAndPushItem(fromArray,index,toArray){
		toArray.push(fromArray[index]);
		fromArray.splice(index,1);
	}

};

function ShoppingListCheckOffProv() {
  var provider = this;

  provider.defaults = {
	toBuyItems: [
		{ 'name': 'cookies', 'value': '10 bags'},
		{ 'name': 'drinks', 'value': '10 bottles'}
	],

	boughtItems: [
		{ 'name': 'snacks', 'value': '5 bags'},
		{ 'name': 'bananas', 'value': '5 pieces'}
	]
  };

  provider.$get = function () {
    var shoppingCheckOffList = new ShoppingListCheckOffService(
    		provider.defaults.toBuyItems,
    		provider.defaults.boughtItems
    	);
    return shoppingCheckOffList;
  };
}

})();