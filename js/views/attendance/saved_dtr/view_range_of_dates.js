define([
    'underscore',
    'backbone',
    'text!templates/attendance/saved_dtr/temp_range_of_dates.html',
    'moment'], 
    function(_, Backbone, template, moment) {
   
    var Subview = Backbone.View.extend({
    
        	initialize: function(){
                // this.render();
        	},
    
        	tagName: 'tbody',
    
        	el: '#range-of-dates',
    
        	template: _.template(template),
    
            events: {
                // bound events
            },
    
        	render: function(values){
        	    var self = this;
                self.$el.off();
                self.$el.empty();
                var sortedList = self.getFullnameOfEmp(self.collection);
                var output = self.template({'library': sortedList.toJSON(), 'value': values, 'moment': moment });
                self.$el.append(output);
                self.onRender();
    	        return self;
        	},
    
        	onRender: function(){
                var self = this;
                setTimeout(function() {
                    saved_dtrs.forEach(function(model) {
                        var id = '#' + model.get('id');
                        $(id).prop( "checked", true );
                    });
                }, 500);

                $(function() {
                    var usertype = sessionStorage.getItem('usertype');
                    if (Number(usertype) === 2) {
                        accounts.subviews.forSecretaryEditingTd(false);
                    }
                });

        	},

            getFullnameOfEmp(collection){
                var self = this;
                var sortedCols = [];
                collection.forEach(function(model) {
                    var rs = employees.where({id: model.get('emp')});
                    if (rs.length) {
                        var emp = employees.get(model.get('emp'));
                        model.set({fullname: emp.get('lastname') + ' ' + emp.get('firstname')}, {silent: true});
                    }
                });
                sortedCols = self.sortByKey(collection.toJSON(), 'fullname');
                return new Backbone.Collection(sortedCols);
            },

            sortByKey(array, key) {
                return array.sort(function(a, b) {
                    var x = a[key]; var y = b[key];
                    return ((x < y) ? -1 : ((x > y) ? 1 : 0));
                });
            },
    
    });
   
    return Subview; 
});