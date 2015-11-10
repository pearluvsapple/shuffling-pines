window.ourGuests = [
  {guestName: 'Freddy Alston', transitionDate: '01/01/2015', status: 'pick up', location: 'Boston, MA', recordState:'live' },
  {guestName: 'Granny Smith', transitionDate: '05/13/2015', status: 'drop off', location: 'Cambridge, MA', recordState:'live' },
  {guestName: 'Maxx Hedrom', transitionDate: '07/11/2015', status: 'arrived', location: 'Braintree, MA', recordState:'live' },
  {guestName: 'Miss Ing', transitionDate: '10/31/2015', status: 'pick up', location: 'Providence, RI', recordState:'live' },
];

angular.module('shuffling', [])
  .run(['localStorage', function(localStorage) {
    localStorage.get();
    if (!localStorage.guestList.length) {
      window.ourGuests.forEach(localStorage.insert);
    }

  },
])
  .controller('TabController', [function() {
    this.tab = 1;
    this.setTab = function(tabNum) {
      this.tab = tabNum;
    };

    this.checkTab = function(tabNum) {
      return this.tab === tabNum;
    };
  },
])

  .controller('FormController', ['localStorage', function(localStorage) {

    this.guestArray = window.ourGuests;

    this.addGuest = function() {
      var thisGuest = {
        guestName: this.guestName,
        transitionDate: this.transitionDate,
        status: this.status,
        location: this.location,
      };

      localStorage.insert(thisGuest);

      this.guestName = '';
      this.transitionDate = '';
      this.status = '';
      this.location = '';

      //console.log(this.guestArray);
    };
  },
])

  .controller('GuestController', ['localStorage', function(localStorage) {
    var statusTransitions = {
      'pick up': 'arrived',
      'drop off': 'arrived',
      arrived: 'pick up',
    };

    var recordStateTransistions = {
      live: 'pending removal',
      'pending removal': 'live',
    };

    var removal = function(aGuest) {
      return aGuest.recordState === 'pending removal';
    };

    this.ourGuests = localStorage.guestList;

    this.purgeDeletedGuests = function() {
      var deletedGuests = localStorage.guestList.filter(removal);
      deletedGuests.forEach(localStorage.delete);
    };

    this.incrementGuestStatus = function(aGuest) {
      var newStatus = statusTransitions[aGuest.status];
      aGuest.status = newStatus;
      localStorage.save(aGuest);
    };

    this.editGuest = function(thisGuest) {
      localStorage.save(thisGuest);
    };

    //`Remove ${thisGuest.guestName}?` causes Karma and Gulp to crash
    //do those characters need to be escaped?
    this.removeGuest = function(thisGuest) {
      if (!confirm('Remove ' + thisGuest.guestName + '?')) {
        return;
      }

      thisGuest.recordState = 'pending removal';
      localStorage.save(thisGuest);
    };
  },
])

  .service('localStorage', ['$q', function($q) {
    'use strict';

    var STORAGE_ID = 'shuffling-localstorage';

    var store = {
      guestList: [],

      _getFromLocalStorage: function() {
        return JSON.parse(localStorage.getItem(STORAGE_ID) || '[]');
      },

      _saveToLocalStorage: function(guestList) {
        localStorage.setItem(STORAGE_ID, JSON.stringify(guestList));
      },

      delete: function(aGuest) {
        var deferred = $q.defer();

        store.guestList.splice(store.guestList.indexOf(aGuest), 1);

        store._saveToLocalStorage(store.guestList);
        deferred.resolve(store.guestList);

        return deferred.promise;
      },

      get: function() {
        var deferred = $q.defer();

        angular.copy(store._getFromLocalStorage(), store.guestList);
        deferred.resolve(store.guestList);

        return deferred.promise;
      },

      insert: function(aGuest) {
        var deferred = $q.defer();
        store.guestList.push(aGuest);

        store._saveToLocalStorage(store.guestList);
        deferred.resolve(store.guestList);

        return deferred.promise;
      },

      put: function(aGuest, index) {
        var deferred = $q.defer();

        store.guestList[index] = aGuest;

        store._saveToLocalStorage(store.guestList);
        deferred.resolve(store.guestList);

        return deferred.promise;
      },

      save: function(aGuest) {
        var guestIndex = store.guestList.indexOf(aGuest);
        if (guestIndex > -1) store.put(aGuest, guestIndex);
        else store.insert(aGuest);
      },
    };
    console.log(store);
    return store;
  },
]);
