'use strict';

describe('Directive: bvFileUploader', function () {

  // load the directive's module
  beforeEach(module('bvFileUploaderApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<bv-file-uploader></bv-file-uploader>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the bvFileUploader directive');
  }));
});
