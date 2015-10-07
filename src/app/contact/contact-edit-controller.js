angular
	.module('contactManager')
	.controller('contactEditController', ['$scope', '$routeParams', '$location', 'contactGateway', function($scope, $routeParams, $location, contactGateway) {
		//Instatiate an instance of the injected RemoteObject
		var cg = new contactGateway();

		$scope.contactEntity = false;
		$scope.beerCategories = ['Pilsner','Bock','Light Hybrid Beer', 'Amber Hybrid Beer', 'English Pale Ale', 'Scottish and Irish Ale', 'American Ale', 'English Brown Ale', 'Porter', 'Stout', 'India Pale Ale (IPA)', 'German Wheat and Rye Beer', 'Belgian and French Ale', 'Sour Ale', 'Belgian Strong Ale'];
		$scope.save = function() {
			//Instatiate an instance of the injected Remote Objects proxy object generated from Visualforce with record details
			var record = new contactGateway($scope.contactEntity.toRemoteObjectModelDetails());

			record.update(function(err, results, event) {
			    if(err) { 
			        console.log(err);
			        alert(err.message);
			    } else {
					$location.path('/');
					$scope.$apply();
			    }
			});

		};

		$scope.cancel = function() {
			$location.path('/');
		};

		var criteria = {where: {Id: {eq: $routeParams.contactId}}, limit: 1};
		cg.retrieve(criteria, function(error, results, event) {
			if (error) {
				alert(error);
				return;
			}

			results.forEach(function(element, index, array) {
				$scope.contactEntity = ContactEntity.fromRemoteObjectModel(element);
				$scope.fullName = $scope.contactEntity.firstName + ' ' + $scope.contactEntity.lastName;
			});

			$scope.$apply();
			console.log($scope.contactEntity.toRemoteObjectModelDetails());
		});
	}]);