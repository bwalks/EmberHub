App = Ember.Application.create();

App.Router.map(function() {
	this.resource('users', {path: '/'}, function(){
  		this.route('user', {path: '/user/:user_id'});
  	});
});

App.Router.reopen({
  location: 'hash'
});

App.Store = DS.Store.extend({
    adapter: DS.LSAdapter
});
