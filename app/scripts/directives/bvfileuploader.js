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

				var name = attrs.name;
				if (!name){
					name='files';
				}

				var url= attrs.bvFileUploader;
				if (!url) {
					url='api/upload';
				}
				
				element.bind('change', function(e) {


					scope.$apply(function() {

						var files = ngModel.$viewValue;
						files.length = 0;
						for (var i = 0; i < e.target.files.length; i++) {
							var item = {
								data: e.target.files[i],
								submit: function() {
									var fd = new FormData();
									fd.append(name, this.data);
									return $http.post(url, fd, {
										transformRequest: angular.identity,
										headers: {
											'Content-Type': undefined
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