angular
	/*
	.module() is being used to add our 'contactManager' module and it's dependency (ngRoute) to AngularJS.
	*/
	.module('contactManager', ['ngRoute'])
	/*
	.constant() is being used to define the path to the individual files within our compressed static resource.
	*/
	.constant('resourceUrl', '/resource/'+Date.now()+'/ContactManagerSPA/app')
	/*
	.config() is being used to configure our application before it runs.
	$routeProvider is provided by the ngRoute module and allows us to have different locations within our appication.
	resourceUrl is the constant we just defined. It is being used to build the path to our ng Templates.
	*/
	.config(['$routeProvider', 'resourceUrl', function($routeProvider, resourceUrl) {
		$routeProvider
			.when('/', {
				templateUrl:  resourceUrl+'/contact/contact-list.html'
				,controller: 'contactListController'
			})
			.when('/new', {
				templateUrl:  resourceUrl+'/contact/contact-new.html'
				,controller: 'contactNewController'
			})
			.when('/edit/:contactId', {
				templateUrl:  resourceUrl+'/contact/contact-edit.html'
				,controller: 'contactEditController'
			})
			.otherwise({
				redirectTo: '/'
			});
	}])
	/*
	.service() is being used to make our proxy object available to the rest of the application to use 
	*/
	.service('contactGateway', SObjectModel.ContactGateway);