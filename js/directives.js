/*
	DIRECTIVE:
		For manipulating DOM
		4 DOM Styles
			Attribute (A) 	<a custom-element> </a>
			Element (E)		<custom-element> </custom-element>		<---- Buggy in old browsers
			Class(C)		<a class="custom-element"> </a> 		<---- Compatible with old IE
			Comment (M)		<!-- directive: custom-button -->
		Naming Convention
			JS: customElement
			DOM: custom-element
			
*/

var nov = angular.module('nov.directives', []);

nov.directive('novContent', function() {
	return {
	
		restrict: 'E', 
		replace: true,
		transclude: true,
		templateUrl: 'nov-templates/novContent.html'
	};
});

nov.directive('novButton', function() {
	return {
	
		restrict: 'E', 
		replace: true,
		transclude: true,
		templateUrl: 'nov-templates/novButton.html'
	};
});

nov.directive('novFrame', function() {
	return {
	
		restrict: 'E', 
		replace: true,
		transclude: true,
		templateUrl: 'nov-templates/novFrame.html'
	};
});

nov.directive('novCourseButton', function() {
	return {
	
		restrict: 'E', 
		replace: true,
		transclude: true,
		templateUrl: 'nov-templates/novCourseButton.html'
	};
});

nov.directive('novCourseIcons', function() {
	return {
	
		restrict: 'E', 
		replace: true,
		transclude: false,
		templateUrl: 'nov-templates/novCourseIcons.html'
	};
});

//http://tech.pro/tutorial/1357/phonegap-and-angularjs-in-app-browser
nov.directive("openExternal", function($window){
    return {
        restrict: 'E',
        scope: {
            url : "=",
            exit : "&",
            loadStart : "&",
            loadStop : "&",
            loadError: "&"
        },
        transclude: true,
        template:"<button class='btn' ng-click='openUrl()'><span ng-transclude></span></button>",
        controller: function($scope){

            var wrappedFunction = function(action){
                return function(){
                    $scope.$apply(function(){
                        action();
                    });
                }
            };
            var inAppBrowser;
            $scope.openUrl = function(){
            	// inAppBrowser = $window.open('test/1.pdf', '_blank', 'location=yes');
                inAppBrowser = $window.open($scope.url, '_blank', 'location=yes');
                if($scope.exit instanceof Function){
                    inAppBrowser.addEventListener('exit', wrappedFunction($scope.exit));
                }
            };
        }
    };
});