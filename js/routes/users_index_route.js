App.UsersIndexRoute = Ember.Route.extend({
    model: function(user) {
    	return this.store.find('user');	
  	}
});