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

DS.JSONSerializer.reopen({
    serializeHasMany : function(record, json, relationship) {
        var key = relationship.key;

        var relationshipType = DS.RelationshipChange.determineRelationshipType(
                record.constructor, relationship);
        if (relationshipType === 'manyToNone'
                || relationshipType === 'manyToMany'
                || relationshipType === 'manyToOne') {
            json[key] = Ember.get(record, key).mapBy('id');
        }
    }
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
						  		data.repos = [];
						  		var user = that.store.createRecord('user', data);
						  		user.save();
						  		that.set('newUser', '');
						  		Ember.$.getJSON('https://api.github.com/users/' + data.id + '/repos').then(function(data){
						  				var length = data.length;
						  				for(var i = 0; i < length; i++){
						  					data[i].id = data[i].name;
						  					data[i].user_id = user.get('id');
						  					var repo = that.store.createRecord('repo', data[i]);
						  					repo.save();
						  					user.get('repos').addObject(repo);
						  				}

						  				user.save();
						  		});
						  	});
						},
						
		},
		'deleteUsers' : function(){
							this.get('store').findAll('user').then(function(records){
     							records.invoke('deleteRecord');
     							records.invoke('save');
  							});
  							this.get('store').findAll('repo').then(function(records){
     							records.invoke('deleteRecord');
     							records.invoke('save');
  							});
  							this.transitionToRoute('users');
						}
});	
App.UsersController = Ember.ArrayController.extend({
	sortProperties: ["id"]
})
App.Repo = DS.Model.extend({
    	   		full_name: DS.attr('string'),
    			html_url: DS.attr('string'),
    			user: DS.belongsTo('user')
			});
App.User = DS.Model.extend({
    	   		name: DS.attr('string'),
    			avatar_url: DS.attr('string'),
    			login: DS.attr('string'),
    			repos: DS.hasMany('repo', { async: true})
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