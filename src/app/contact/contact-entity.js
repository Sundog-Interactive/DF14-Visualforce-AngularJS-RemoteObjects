/*
This is a wrapper class for Contacts so we can use native JavaScript properties.
*/
var ContactEntity = function() {

};

ContactEntity.fromRemoteObjectModel = function(model) {
	var entity = new ContactEntity();

	/*
	model is an instance of a Remote Object. You can use .get() to retrieve the field value by the API name or the jsShorthand you specified.
	*/
	entity.id = model.get('Id');
	entity.firstName = model.get('FirstName');
	entity.lastName = model.get('LastName');
	entity.createdDate = model.get('CreatedDate');
	entity.favoriteBeerCategory = model.get('FavoriteBeerCategory');

	return entity;
}

ContactEntity.prototype.toRemoteObjectModelDetails = function() {
	var details = {};

	if (this.id) {
		details.Id = this.id;
	}

	details.FirstName = this.firstName;
	details.LastName = this.lastName;
	details.FavoriteBeerCategory = this.favoriteBeerCategory;

	return details;
}

ContactEntity.prototype.id = '';
ContactEntity.prototype.firstName = '';
ContactEntity.prototype.lastName = '';
ContactEntity.prototype.createdDate = '';
ContactEntity.prototype.favoriteBeerCategory = '';