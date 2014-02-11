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