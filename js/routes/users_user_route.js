App.UsersUserRoute = Ember.Route.extend({
    model: function(user) {
    	return this.store.find('user', user.user_id);	
  	}
});