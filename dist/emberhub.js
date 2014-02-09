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

App.ApplicationController = Ember.ArrayController.extend({
	actions: { 
		'createUser' : function(){
						  	var name = this.get('newUser');
						  	if(!name){
						  		return;
						  	}

						  	var that = this;

						  	Ember.$.getJSON('https://api.github.com/users/' + name).then(function(data){
						  		data.id = data.login;
						  		var user = that.store.createRecord('user', data);
						  		user.save();
						  		that.set('newUser', '');
						  	});
						}
	}
});	
App.UsersController = Ember.ArrayController.extend({
	sortProperties: ["name"]
})
App.User = DS.Model.extend({
    	   		name: DS.attr('string'),
    			avatar_url: DS.attr('string'),
    			login: DS.attr('string')
			});
App.UsersIndexRoute = Ember.Route.extend({
    model: function(user) {
    	return this.store.find('user');	
  	}
});
App.UsersUserRoute = Ember.Route.extend({
    model: function(user) {
    	return this.store.find('user', user.user_id);	
  	}
});