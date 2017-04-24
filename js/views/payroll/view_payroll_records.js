define(
	[
		'underscore',
		'backbone',
		'text!templates/payroll/temp_payroll_records.html',
        'jqueryui',
        'views/payroll/view_record_list_payroll'
	],  function(_, Backbone, template, jqueryUi, SubviewListOfPayrolls) {
   
    var ViewPayrollRecords = Backbone.View.extend({
    
        	initialize: function(){
                this.spinner = "<i class='fa fa-circle-o-notch fa-spin fa-fw'></i><span class='sr-only'>Loading...</span>";
        	},
    
        	tagName: 'div',
    
        	el: '#main',
    
        	template: _.template(template),
    
            events: {
                // bound events
                'change #check-all-payroll-records': 'checkAll',
                // 'click #btnOverAllBreakdown': 'overAllBreakdown'
            },
    
        	render: function(){
        	    var self = this;
                self.$el.empty();
                var output = self.template(template);
                self.$el.append(output);
                self.init();
    	        return self;
        	},
    
        	init: function(){
                var self = this;

                $(function() {
                    var html = '<tr><td colspan="15" style="font-weight: bolder; font-size: 14px">'+ self.spinner +' Fetching data please wait...</td></tr>'; 
                    self.$el.find('tbody').html(html);   
                });

                $(function() {
                    var height = $(window).height();
                    self.$el.find('#div-tbl-payroll').height(height - 200);
                });
                
                $(function() {
                    self.$el.find('#btnOverAllBreakdown').click(function(event) {
                        /* Act on the event */
                        $('#modalOverAllBreakdown').modal();
                        payrolls.subviews.appendOverAllBreakDown(payrolls);
                        $('#dialogModalOverAllBreakdown').draggable({
                            cursor: "move"
                        });
                    });
                });

                $(function() {
                    self.$el.find('input#search-box').keyup(function(event) {
                        var value = $(this).val().toLowerCase();
                        clearTimeout(self.timer);
                        self.timer = setTimeout(function() {
                            var list = self.filterRecords(value);
                            if (!list.length) {
                                self.$el.find('tbody').html('<tr><td colspan="20">No data was found</td></tr>')
                            }else {
                                var view = new SubviewListOfPayrolls({
                                    collection: new Backbone.Collection(list)
                                });
                                view.render();
                            }
                        }, 700);
                    });
                });

                $(function() {
                    require(['jqueryui'], function(){
                        self.$el.find('#date-from, #date-to').datepicker();
                        self.$el.find('#date-from, #date-to').change(function(event) {
                            var $el = $(this);
                            require(['moment'], function(moment){
                                $el.val(moment($el.val()).format('MMMM DD, YYYY'));
                            });
                        });
                    });
                });

                $(function() {
                    self.$el.find('form').find('#btnFilter').click(function(event) {
                        var form = self.$el.find('input#date-from').val();
                        var to = self.$el.find('input#date-to').val();

                        var list = payrolls.function.getRange(form, to);
                        if (list.length) {
                            payrolls.subviews.appendListOfPayroll2(list);
                        }else {
                            self.$el.find('tbody').html('<tr><td>No data was found for date1: '+form+' date2: '+to+' </td></tr>')
                        }

                    });
                });

                $(function() {
                    self.$el.find('form').find('button#btnReset').click(function(event) {
                        payrolls.subviews.appendAllRecordsPayroll();
                    });
                });

                $(function() {
                    setTimeout(function() {
                        $.when(payrollemps.fetch({silent: true, url: 'api.php/payrollemps/partial'})).then(function() {
                            $.when(payrolls.fetch({silent: true, url: 'api.php/get_order_by/payrolls/date/desc'})).then(function() {
                                payrolls.subviews.appendAllRecordsPayroll();
                                pbreakdowns.function.getBreakdown(payrollemps);
                            });
                        });
                    }, 1500);
                    
                });

                $(function() {
                    setTimeout(function() {
                        $.when(positions.fetch({silent: true, url: 'api.php/get/positions'})).then(function() {
                            $.when(employees.fetch({silent: true, url: 'api.php/get/employees'})).then(function() {
                                // body...
                            });
                        });
                    }, 2000);
                });
        	},

            checkAll: function(event){
                var $target = $(event.currentTarget);
                if($target.is(':checked')){
                    $('#record-list-payroll').find('input[type="checkbox"]').prop('checked', true);
                }else {
                    $('#record-list-payroll').find('input[type="checkbox"]').prop('checked', false);
                }
            },

            filterRecords(value){
                return payrolls.toJSON().filter(function(model) {
                    return model.location.toLowerCase().indexOf(value) != -1 ||
                           model.date_from.toLowerCase().indexOf(value) != -1 ||
                           model.date_to.toLowerCase().indexOf(value) != -1 ||
                           model.total.toLowerCase().indexOf(value) != -1 ||
                           model.net.toLowerCase().indexOf(value) != -1 ||
                           model.id.toLowerCase().indexOf(value) != -1;
                });
            },

            overAllBreakdown: function(events){
                

            }
    
    });
   
    return ViewPayrollRecords; 
});