angular
	.module('contactManager')
	.controller('contactNewController', ['$scope', '$location', 'contactGateway', function($scope, $location, contactGateway) {
		//Instatiate an instance of the injected Remote Objects proxy object generated from Visualforce
		var cg = new contactGateway();

		$scope.entity = new ContactEntity();
		$scope.beerCategories = ['Pilsner','Bock','Light Hybrid Beer', 'Amber Hybrid Beer', 'English Pale Ale', 'Scottish and Irish Ale', 'American Ale', 'English Brown Ale', 'Porter', 'Stout', 'India Pale Ale (IPA)', 'German Wheat and Rye Beer', 'Belgian and French Ale', 'Sour Ale', 'Belgian Strong Ale'];
		$scope.save = function() {
			cg.create($scope.entity.toRemoteObjectModelDetails(), function(err, results, event) {
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

	}]);