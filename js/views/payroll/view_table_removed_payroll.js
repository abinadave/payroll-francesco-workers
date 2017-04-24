define(
    [
		'underscore',
		'backbone',
		'text!templates/payroll/temp_table_removed_payroll.html',
        'moment'
	],  function(_, Backbone, template, moment) {
   
    var Subview = Backbone.View.extend({
    
        	initialize: function(){
                this.$el.off();
        		this.render();
        	},
    
        	tagName: 'div',
    
        	el: '#main',
    
        	template: _.template(template),
    
            events: {
                // bound events
                'keyup #search-query-removed-payrolls': 'search',
                'click #btnGo': 'clickGo'
            },
    
        	render: function(){
        	    var self = this;
                // self.$el.off();
                self.$el.empty();
                var output = self.template(template);
                self.$el.append(output);
                self.init();
    	        return self;
        	},
    
        	init: function(){
        		var self = this;

                $(function() {
                    self.$el.find('#btnReset').click(function(event) {
                        removed_payrolls.subviews.appendList(removed_payrolls, 300);
                        self.$el.find('#filter-date-1, #filter-date-2').val('');
                    });
                });

                $(function(){
                    self.$el.css({
                    	marginLeft: '0px'
                    });
                });

                $(function() {

                    employees.fetch({silent: true, 
                        url: 'api.php/get_order_by/employees/id/desc'
                    });

                    positions.fetch({silent: true, 
                        url: 'api.php/get/positions'
                    });

                    self.onFetching();

                    $.when(payrollemps.fetch({
                        silent: true, 
                        url: 'api.php/get/payrollemps'
                    })).then(function(event) {
                        $.when(removed_payrolls.fetch({silent: true,
                            url: 'api.php/get_order_by/removed_payrolls/date/desc'
                        })).then(function() {
                            removed_payrolls.subviews.appendList(removed_payrolls, 100);
                        });
                    });

                });

                $(function() {
                    var width = $(window).width();
                    var height = $(window).height();
                    self.$el.find('#table-rpayrolls').css({
                        width: width + 400
                    });
                    self.$el.find('#div-table-rpayrolls').height(height * 70 / 100);
                });

                $(function() {
                    self.$el.find('#search-query-removed-payrolls').keyup(function(event) {
                        /* Act on the event */
                        var value = $(this).val();
                        console.log(value);
                        var list = accounts.function.search('removed_payrolls', value);
                        clearTimeout(self.timer);
                        self.timer = setTimeout(function() {
                            removed_payrolls.subviews.appendList(list, 100);
                        }, 700);
                    });
                });

                $(function() {
                    require(['jqueryui'], function(jqueryUi){
                        self.$el.find('#filter-date-1, #filter-date-2').datepicker();
                    });
                });

        	},

            onFetching: function() {
                var self = this;

            },

            search: function(event) {
                var self = this;
                var value = event.currentTarget.value;
                self.normarSearch(value);
            },

            normarSearch: function(value) {
                var json = {}, list = new Backbone.Collection();
                this.$el.find('tbody').html('<tr><td colspan="10">Searching for results..</td></tr>');
                clearTimeout(this.timer);
                this.timer = setTimeout(function() {
                   removed_payrolls.forEach(function(model) {
                       $.each(model.attributes, function(index, val) {
                            if (model.get(index).toLowerCase().indexOf(value.toLowerCase()) !== - 1) {
                                list.add(model);
                            }
                       });
                   });
                   removed_payrolls.subviews.appendList(list, 300);
                }, 700);
            },

            clickGo: function(event) {
                var self = this, date_from = '', date_to = '';
                var d1 = moment($('#filter-date-1').val()).format('MMMM DD, YYYY'),
                d2 = moment($('#filter-date-2').val()).format('MMMM DD, YYYY');
                var list = new Backbone.Collection();

                removed_payrolls.forEach(function(model) {
                    date_form = moment(model.get('date_from')).format('MMMM DD, YYYY');
                    date_to = moment(model.get('date_to')).format('MMMM DD, YYYY');
                    if (d1 === date_from || d2 === date_to) {
                        list.add(model);
                    }
                });

                if (list.length) {
                    removed_payrolls.subviews.appendList(list, 500);
                }else {
                    self.$el.find('tbody').html('<tr><td colspan="15" style="font-size: 16px">No data was found for date1: <b class="text-primary">'+d1+'</b> and date2: <b class="text-primary">'+d2+'</b></td></tr>');
                }
                
            }
    
    });
   
    return Subview;
});