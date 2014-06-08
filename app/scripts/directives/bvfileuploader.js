'use strict';

angular.module('bvFileUploaderApp')
	.directive('bvFileUploader', function($http) {
		return {
			restrict: 'A',
			require: '?ngModel',
			link: function(scope, element, attrs, ngModel) {

				if (!ngModel) {
					return;
				}

				var options = scope.$eval(attrs.bvFileUploader)
				if (!options) {
					var options = {};
				}
				options = angular.extend({
					url: 'api/upload',
					filedName: 'files'
				}, options);
				element.bind('change', function(e) {


					scope.$apply(function() {

						var files = ngModel.$viewValue;
						files.length = 0;
						for (var i = 0; i < e.target.files.length; i++) {
							var item = {
								data: e.target.files[i],
								submit: function() {
									return $http({
										method: 'POST',
										url: options.url,
										data: this.data,
										headers: {
											'Content-Type': undefined
										},
										transformRequest: function(data) {
											var formData = new FormData();
											formData.append(options.filedName, data);
											return formData;
										}
									});
								}
							};
							(function(item) {
								var fileReader = new FileReader();
								fileReader.readAsDataURL(item.data);

								fileReader.onload = function(e) {
									scope.$apply(function() {
										item.preview = e.target.result;
									});

								};
							})(item);


							files.push(item);
						};
					});


				});
			}
		};


	});