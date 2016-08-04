
/*
	SERVICES
		Used for particular design patterns (singletons)
		Used inside of controllers (with dependency injection)
			Must specify in the controller declaration that it's being used
			BEFORE: testApp.controller('MainCtrl', ['$scope', function ($scope) {
			AFTER: testApp.controller('MainCtrl', ['$scope', 'Math', function ($scope, Math) {
			
*/
var nov = angular.module('nov.services', []);

nov.service('Data', function () {

	//////////////////////////////////////////////////////////////////////////////////////////////////////////
	// Student
	//////////////////////////////////////////////////////////////////////////////////////////////////////////
	
	var student = {
		name: 'David Holik',
		id: '301142643',
		enrolledCourses: [
		{ name: 'CMPT 475', id: 0, instructor: 'Herbert H. Tsang', semester: 'Summer 2014', section: 'E100', role: 'Student',
			courseMaterials: [
				{ name: 'Intro to Software Engineering', id: 10, fileType: 'pdf', uploadDate: '2014-05-05', url: 'test/1.pdf'},
				{ name: 'Agile Development', id: 11, fileType: 'pdf', uploadDate: '2014-05-12', url: 'test/1.pdf'},
				{ name: 'Security', id: 12, fileType: 'pdf', uploadDate: '2014-06-16', url: 'test/1.pdf'}
			],
			assignments: [
				{name: 'Project Deliverable 1', id: 21, dueDate: '2014-05-25', weight: 25},
				{name: 'Report', id: 22, dueDate: '2014-06-15', weight: 30},
				{name: 'Project Deliverable 2', id: 23, dueDate: '2014-08-20', weight: 30}
			] },
		{ name: 'CMPT 355', id: 1, instructor: 'Wo Shun Luk', semester: 'Summer 2014', section: 'D100', role: 'Student' },
		{ name: 'ENGL 103w', id: 2, instructor: 'Orion Kidder', semester: 'Summer 2014', section: 'D100', role: 'Student' }
		],
		submissions: [
			{id: 40, assignmentId: 21, submitDate: '2014-05-25', status: 'submitted', grade: 100, comment: 'Well done'},
			{id: 41, assignmentId: 22, submitDate: '2014-06-16', status: 'late', grade: 80, comment: 'Late!'},
			{id: 42, assignmentId: 33, submitDate: '2014-06-16', status: 'submitted', grade: 85, comment: ''},
		]
	};
	
	this.getStudent = function() {
		return student;
	}
	

	//////////////////////////////////////////////////////////////////////////////////////////////////////////
	// Courses
	//////////////////////////////////////////////////////////////////////////////////////////////////////////

	
	var currentCourse = student.enrolledCourses[0]; // Default value to avoid strange cases
	
	this.getCourse = function(id) {
		console.log('Course: ' + id);
		return student.enrolledCourses[id];
	}

	//////////////////////////////////////////////////////////////////////////////////////////////////////////
	// Course Materials & Assignments
	//////////////////////////////////////////////////////////////////////////////////////////////////////////
	
	this.getCourseMaterials = function(id) {
		console.log('Course: ' + id);
		return student.enrolledCourses[id].courseMaterials;
	}

	this.getCourseMaterial = function(courseId, materialId) {
		return student.enrolledCourses[courseId].courseMaterials[materialId];
	}

	this.getAssignments = function(courseId) {
		return student.enrolledCourses[courseId].assignments;
	}

	this.getAssignment = function(courseId, assignmentId) {
		return student.enrolledCourses[courseId].assignments[assignmentId];
	}

	this.getAssignmentSubmissions = function(assignmentId) {
		var submissions = student.submissions;
		var filtered_list = [];
		for (var i = 0; i < submissions.length; i++) {
			if (submissions[i].assignmentId == assignmentId) {
			  	filtered_list.push(submissions[i]);
			}
		}
		return filtered_list;
	}

});