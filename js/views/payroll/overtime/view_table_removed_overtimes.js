define([
    'underscore',
    'backbone',
    'text!templates/payroll/overtime/temp_table_removed_overtimes.html',
    'libs/backbone.obscura',
    'moment'
    ], 
	function(_, Backbone, template, Obscura, moment) {
   
    var ListOfRemovedOvertime = Backbone.View.extend({
    
        	initialize: function(){
                this.$el.off();
                this.spinner = "<i class='fa fa-circle-o-notch fa-spin fa-fw'></i><span class='sr-only'>Loading...</span>";
                this.render();
        	},
    
        	tagName: 'div',
    
        	el: '#main',
    
        	template: _.template(template),
    
            events: {
                // bound events
                'keyup #searc-removed-overtimes': 'search'
            },
    
        	render: function(){
        	    var self = this;
                self.$el.empty();
                var output = self.template(template);
                self.$el.append(output);
                self.onRender();
    	        return self;
        	},
    
        	onRender: function(){
                var self = this;

                $(function(){
                    var height = $(window).height() - 200;
                    self.$el.find('#div-overflow').css({
                        'height': height + 'px'
                    });
                });

                $(function() {
                    self.$el.find('tbody').html('<tr><td colspan="8">'+self.spinner+' Fetching data from the server </td></tr>');
                    $.when(overtime_payrollemps.fetch({silent: true})).then(function() {
                        $.when(removed_overtimes.fetch({silent: true,
                            url: 'api.php/get_order_by/removed_overtimes/date/desc'
                        })).then(function() {
                            removed_overtimes.subviews.appendListOfRemovedOvertimes(removed_overtimes);
                            removed_overtimes.function.setTotalAndWorkers(removed_overtimes);
                        });
                    });
                });

                $(function() {
                    self.$el.find('#btnFilterDate').click(function(event) {
                        var $btn = $(this);
                        self.changeDate(event, self);
                        $btn.text('Filtering........').prop('disabled', true);
                        setTimeout(function() {
                            $btn.text('Filter');
                            $btn.prop('disabled', false);
                        }, 1200);
                    });
                });

                $(function() {
                    self.$el.find('#btnReset').on('click', function(event) {
                        self.$el.find('#filter-1, #filter-2').val('');
                        removed_overtimes.subviews.appendListOfRemovedOvertimes(removed_overtimes);
                    });
                });
        	},

            changeDate: function(event, self) {
                var date1 = moment($('#filter-1').val()).subtract(1,'d');
                var date2 = moment($('#filter-2').val()).add(1,'d');
                if (moment(date1).isValid() && moment(date2).isValid()) {
                    if(moment(date1).isBefore(moment(date2))){
                        var output = "<tr><td colspan='8'><i class='fa fa-circle-o-notch fa-spin fa-fw'></i><span class='sr-only'>Loading...</span> Fetching please wait..</td></tr>";
                        $('#list-of-removed-overtime-payrolls').html(output);
                        var models = removed_overtimes.function.getListBetween(date1, date2);
                        setTimeout(function() {
                            removed_overtimes.subviews.appendListOfRemovedOvertimes(models);
                        }, 1000);
                    }else {
                        router.alertify_warning('Incorrent dates');
                    }
                }
            },

            search: function(event) {
                var self = this;
                var value = event.currentTarget.value;
                var great = value.search('>');
                var less = value.search('<');
                if (value.search('>') !== -1 || value.search('<') !== -1) {
                    if (great !== -1) {
                        var number = value.replace('>','');
                        clearTimeout(this.timer);
                        this.timer = setTimeout(function() {
                            self.getGreaterThan(number);
                        }, 700);
                    }else if(less !== -1){
                        var number = value.replace('<','');
                        clearTimeout(this.timer);
                        this.timer = setTimeout(function() {
                            self.getLessThan(number);
                        }, 700);
                    }
                }else {
                    self.normarSearch(value);
                }                
            },

            normarSearch: function(value) {
                var json = {}, list = new Backbone.Collection();
                this.$el.find('tbody').html('<tr><td colspan="10">Searching for results..</td></tr>');
                clearTimeout(this.timer);
                this.timer = setTimeout(function() {
                   removed_overtimes.forEach(function(model) {
                       $.each(model.attributes, function(index, val) {
                            if (model.get(index).toLowerCase().indexOf(value.toLowerCase()) !== - 1) {
                                list.add(model);
                            }
                       });
                   });
                   removed_overtimes.subviews.appendListOfRemovedOvertimes(list);
                }, 700);
            },

            getGreaterThan: function(number) {
                var self = this;
                var list = new Backbone.Collection();
                
                removed_overtimes.forEach(function(model) {
                    if (Number(model.get('total')) >= Number(number)) {
                        list.add(model);
                    }
                });

                if (!list.length) {
                    self.$el.find('tbody').html('<tr><td colspan="10" class="text-danger" style="font-weight:bolder">No data was found..</td></tr>')
                }else {
                    removed_overtimes.subviews.appendListOfRemovedOvertimes(list);
                }
            },

            getLessThan: function(number) {
                var list = new Backbone.Collection();                
                removed_overtimes.forEach(function(model) {
                    if (Number(model.get('total')) <= Number(number)) {
                        list.add(model);
                    }
                });
                if (!list.length) {
                    self.$el.find('tbody').html('<tr><td colspan="10" class="text-danger" style="font-weight:bolder">No data was found..</td></tr>');
                }else {
                    removed_overtimes.subviews.appendListOfRemovedOvertimes(list);
                }
            }
    
    });
   
    return ListOfRemovedOvertime; 
});