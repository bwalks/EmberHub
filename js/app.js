App = Ember.Application.create();

App.Router.map(function() {
  this.route('user', {path: '/user/:user_id'});
});

App.Router.reopen({
  location: 'hash'
});


App.User = DS.Model.extend({
    	   		name: DS.attr('string'),
    			avatar_url: DS.attr('string'),
    			login: DS.attr('string')
			});


DS.RESTAdapter.reopen({
  host: 'https://api.github.com'
});

App.Store = DS.Store.extend({
    adapter: DS.RESTAdapter.extend()
});

App.UserSerializer = DS.RESTSerializer.extend({
    // Override normalize method in all models

    extractSingle: function (store, primaryType, payload) {
    	var primaryTypeName = primaryType.typeKey;
    	var typeName = primaryTypeName,
        type = store.modelFor(typeName);
        var data = {};
        data[typeName] = payload;
    return this._super.call(this, store, primaryType, data);
},
});

App.UserRoute = Ember.Route.extend({
    model: function(user) {
    	return this.store.find('user', user.user_id);	
  	}
});