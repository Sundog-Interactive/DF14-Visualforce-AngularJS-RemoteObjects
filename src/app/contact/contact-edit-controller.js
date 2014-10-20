angular
	.module('contactManager')
	.controller('contactEditController', ['$scope', '$routeParams', '$location', 'contactGateway', function($scope, $routeParams, $location, contactGateway) {
		$scope.contactEntity = false;
		$scope.beerCategories = ['Pilsner','Bock','Light Hybrid Beer', 'Amber Hybrid Beer', 'English Pale Ale', 'Scottish and Irish Ale', 'American Ale', 'English Brown Ale', 'Porter', 'Stout', 'India Pale Ale (IPA)', 'German Wheat and Rye Beer', 'Belgian and French Ale', 'Sour Ale', 'Belgian Strong Ale'];
		$scope.save = function() {
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
		contactGateway.retrieve(criteria, function(error, results, event) {
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