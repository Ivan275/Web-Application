/*
	CONTROLLERS:
		For manipulating DATA only
		NEVER use DOM manipulation here (do that with directives)
*/

var nov = angular.module('nov.controllers', []);

// Commonly used app-wide methods
nov.controller('AppCtrl', ['$scope', '$ionicModal', '$timeout', '$ionicSideMenuDelegate', function($scope, $ionicModal, $timeout, $ionicSideMenuDelegate) {
	
	// Enable/disable dragging to open the menu
	$scope.setMenuDrag = function(val) {
		$ionicSideMenuDelegate.canDragContent(val);
	};

}]);


// Provide data access to HTML (corresponds with services.js)
nov.controller('DataCtrl', ['$scope', 'Data', function($scope, Data) {
	
	$scope.getStudent = function() {
		return Data.getStudent();
	}

}]);

nov.controller('LoginCtrl', ['$scope', function($scope) {

}]);

nov.controller('CoursesCtrl', ['$scope', function($scope) {

}]);

nov.controller('CourseCtrl', ['$scope', '$stateParams', 'Data', function($scope, $stateParams, Data) {
	$scope.course = Data.getCourse($stateParams.courseId);
	$scope.materials = Data.getCourseMaterials($stateParams.courseId);
	$scope.predicate = '-uploadDate';
}]);

nov.controller('ParticipationCtrl', ['$scope', '$stateParams', 'Data', function($scope, $stateParams, Data) {
	$scope.course = Data.getCourse($stateParams.courseId);
}]);

nov.controller('AssignmentsCtrl', ['$scope', '$stateParams', 'Data', function($scope, $stateParams, Data) {
	$scope.course = Data.getCourse($stateParams.courseId);
	$scope.assignments = Data.getAssignments($stateParams.courseId);
	$scope.predicate = '-dueDate';
	$scope.date = new Date();
}])

//Adapted from Zack Argyle
//http://stackoverflow.com/questions/20335409/ng-repeat-compare-to-current-date-using-filter
.filter('upcomingAssignments', function() {
return function (assignments) {
	var filtered_list = [];
	for (var i = 0; i < assignments.length; i++) {
		var today = new Date().getTime()
		var dueDate = new Date(assignments[i].dueDate).getTime();
		if (today <= dueDate) {
		  	filtered_list.push(assignments[i]);
		}
	}
	return filtered_list;
}
})

.filter('pastAssignments', function() {
return function (assignments) {
	var filtered_list = [];
	for (var i = 0; i < assignments.length; i++) {
		var today = new Date().getTime()
		var dueDate = new Date(assignments[i].dueDate).getTime();
		if (today > dueDate) {
		  	filtered_list.push(assignments[i]);
		}
	}
	return filtered_list;
}
});

nov.controller('AssignmentCtrl', ['$scope', '$stateParams', 'Data', '$filter', function($scope, $stateParams, Data, $filter) {
	$scope.course = Data.getCourse($stateParams.courseId);
	var assignments = Data.getAssignments($stateParams.courseId);
	var assignment = $filter('filter')(assignments, {id: $stateParams.assignmentId})[0];
	$scope.assignment = assignment;
	$scope.submissions = Data.getAssignmentSubmissions($stateParams.assignmentId);
}]);

nov.controller('GradesCtrl', ['$scope', '$stateParams', 'Data', function($scope, $stateParams, Data) {
	$scope.course = Data.getCourse($stateParams.courseId);
}]);

nov.controller('QuizzesCtrl', ['$scope', '$stateParams', 'Data', function($scope, $stateParams, Data) {
	$scope.course = Data.getCourse($stateParams.courseId);
}]);

//http://tech.pro/tutorial/1357/phonegap-and-angularjs-in-app-browser
nov.controller('MaterialsCtrl', ['$scope', '$stateParams', 'Data', function($scope, $stateParams, Data){
    $scope.course = Data.getCourse($stateParams.courseId);
    $scope.url = 'http://www.google.com';
    $scope.actions = [];
    $scope.closeBrowser = function(){
        $scope.actions.push('Closed Browser');
    };
    $scope.loadStart = function(){
        $scope.actions.push('Load Start');
    }   ;
    $scope.loadStop = function(){
        $scope.actions.push('Load Stop');
    };
    $scope.loadError = function(){
        $scope.actions.push('Load Error');
    }; }]);
