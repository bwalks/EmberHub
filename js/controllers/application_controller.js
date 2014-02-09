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