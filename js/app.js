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