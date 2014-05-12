App.Repo = DS.Model.extend({
    	   		full_name: DS.attr('string'),
    			html_url: DS.attr('string'),
    			user: DS.belongsTo('user', { async: true})
			});