App = Ember.Application.create();

App.Router.map(function() {
	this.resource('users', {path: '/'}, function(){
  		this.route('user', {path: '/user/:user_id'});
  	});
});

App.Router.reopen({
  location: 'hash'
});


App.User = DS.Model.extend({
    	   		name: DS.attr('string'),
    			avatar_url: DS.attr('string'),
    			login: DS.attr('string')
			});


App.Store = DS.Store.extend({
    adapter: DS.LSAdapter
});

App.UsersController = Ember.ArrayController.extend({
	actions: { 
		'createUser' : function(){
						  	var name = this.get('newUser');
						  	if(!name){
						  		return;
						  	}

						  	var that = this;

						  	Ember.$.getJSON('https://api.github.com/users/' + name).then(function(data){
						  		var user = that.store.createRecord('user', data);
						  		user.save();
						  		that.set('newUser', '');
						  	});
						}
	}
});

App.UsersRoute = Ember.Route.extend({
    model: function(user) {
    	return this.store.find('user');	
  	}
});

App.UsersUserRoute = Ember.Route.extend({
    model: function(user) {
    	return this.store.find('user', user.user_id);	
  	}
});