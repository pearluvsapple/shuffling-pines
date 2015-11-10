describe('tabController', function() {
  var tabController;
  var scope;

  beforeEach(module('shuffling'));
  beforeEach(inject(function($controller, $rootScope) {
    scope = $rootScope.$new();
    tabController = $controller('TabController', {
      $scope: scope,
    });
  }));

  it('should exist', function() {
    expect(tabController).toBeDefined();
  });

  it('should initialize to tab 1', function() {
    expect(tabController.tab).toBe(1);
  });

});

describe('formController', function() {
  var formController;
  var scope;

  beforeEach(module('shuffling'));
  beforeEach(inject(function($controller, $rootScope) {
    scope = $rootScope.$new();
    formController = $controller('FormController', {
      $scope: scope,
    });
  }));

  it('should exist', function() {
    expect(formController).toBeDefined();
  });

  it('should always have records in local storage', function() {
    expect(localStorage.length).toBeDefined();
  });

  it('should have populated the ourGuests array', function() {
    expect(ourGuests.length).toEqual(4);
  });

  xit('should call localStorage.insert to add a guest', function(){
    formController.addGuest();
    spyOn().
  });

  xit('should have a working submit', function(){

  });

  xit('should take a name', function(){

  });

});

describe('guestController', function() {
  var guestController;
  var scope;

  beforeEach(module('shuffling'));
  beforeEach(inject(function($controller, $rootScope) {
    scope = $rootScope.$new();
    guestController = $controller('GuestController', {
      $scope: scope,
    });
  }));

  it('should allow editing of a guest record', function() {
    expect(guestController).toBeDefined();
  });

  xit('should allow deleting a guest record', function() {

  });

  xit('should fire a confirmation on delete', function() {

  });

});
