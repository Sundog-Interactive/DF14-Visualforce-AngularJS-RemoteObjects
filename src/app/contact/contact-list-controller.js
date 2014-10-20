angular
	/*
	Here; .module() is used to get our 'contactManager' module.
	*/
	.module('contactManager')
	/*
	Here; .controller() is used to add our 'contactListController' constructor function and any of it's dependencies, $scope and contactGateway, to our module.
	$scope is the ng Scope we access in our ng Template. Any variables added here are accessible there.
	'contactGateway' is the proxy object created with the JavaScript Remote Object markup.
	*/
	.controller('contactListController', ['$scope', 'contactGateway', function($scope, contactGateway) {
		$scope.persons = [];
		$scope.limits = [5, 10, 25, 50, 100];
		$scope.selectedLimit = 5;
		$scope.offset = 0;
		$scope.showMoreRecords = true;
		$scope.query = '';
		$scope.predicate = 'createdDate';
		$scope.reverse = true;

		$scope.loadMoreRecords = function() {
			/*
			Remote Objects uses an object to specify query criteria such as where, limit, and offset conditions.
			http://www.salesforce.com/us/developer/docs/pages/index_Left.htm#StartTopic=Content/pages_remote_objects_using_retrieve_query_object.htm
			*/
			var criteria = {orderby: [{CreatedDate: 'DESC'}], limit: parseInt($scope.selectedLimit)};

			if ($scope.offset > 0) {
				criteria.offset = $scope.offset;
			}

			/*
			contactGateway is the Remote Objects proxy object generated from Visualforce and then injected into our ng application.
			We're passing in the criteria object we built as well as a callback method to execute when the call is complete.
			*/
			contactGateway.retrieve(criteria, function(error, results, event) {
				if (error) {
					alert(error);
					return;
				}

				$scope.offset += results.length;

				if (results.length < $scope.selectedLimit) {
					$scope.showMoreRecords = false;
				}

				results.forEach(function(element, index, array) {
					/*
					ContactEntity is a wrapper object with native JavaScript properties so we can take adavantage of the out-of-the box sorting and filtering capabilities of ng.
					*/
					var entity = ContactEntity.fromRemoteObjectModel(element);
					$scope.persons.push(entity);
				});

				/*
				This callback leaves outside of the ng scope. Through JavaScript scope we can manipulate ng scope but we need a way to tell ng to update the view. We use $scope.$apply() to do this.
				*/
				$scope.$apply();
			});

		};
		
		$scope.loadMoreRecords();

		$scope.selectedContact = {};

		$scope.selectContact = function(id) {
			var i = 0;
			var found = false;
			$scope.selectedContact = false;

			while (!found && i < $scope.persons.length) {
				var contact = $scope.persons[i];

				if (contact.id == id) {
					found = true;
					$scope.selectedContact = contact;

				} else {
					i++;

				}

			}

			if ($scope.selectContact == false) {
				alert('ERROR!');
			}

		};

		$scope.deleteContact = function(id) {
			contactGateway.del(id, function(error, ids) {
				if (error) {
					alert(error);
					return;
				}

				var i = 0;
				var found = false;

				while (!found && i < $scope.persons.length) {
					var contact = $scope.persons[i];

					if (contact.id == id) {
						found = true;
						$scope.persons.splice(i, 1);
						$scope.$apply();

					} else {
						i++;

					}

				}

			});
			
		};

	}]);