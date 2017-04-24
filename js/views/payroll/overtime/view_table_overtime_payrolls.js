define(['underscore','backbone',
    'text!templates/payroll/overtime/temp_table_overtime_payrolls.html',
    'views/payroll/overtime/view_list_of_overtime_payrolls'], 
    function(_, Backbone, template, ListOfOTs) {
   
    var Subview = Backbone.View.extend({
    
        	initialize: function(){
                this.render();
        	},
    
        	tagName: 'div',
    
        	el: '#main',
    
        	template: _.template(template),
    
            events: {
                // bound events
            },
    
        	render: function(){
        	    var self = this;
                // self.$el.off();
                self.$el.empty();
                var output = self.template(template);
                self.$el.append(output);
                self.onRender();
    	        return self;
        	},
    
        	onRender: function(){
                var self = this;

                $(function() {
                    self.$el.find('input#search-box').keyup(function(event) {
                        var value = $(this).val().toLowerCase();
                        clearTimeout(self.timer);
                        self.timer = setTimeout(function() {
                            var list = self.filterRecords(value);
                            new ListOfOTs({
                                collection: new Backbone.Collection(list)
                            });
                        }, 700);
                    });
                });

                $(function(){
                    //jQuery
                   self.$el.css({
                   		marginLeft: '0px'
                   }); 
                });

                

                $(function() {
                    require(['jqueryui'], function(){
                        self.$el.find('#date-from, #date-to').datepicker({
                            beforeShow: function (input, inst) {
                                setTimeout(function () {
                                    inst.dpDiv.css({
                                        top: '20%'
                                    });
                                }, 0);
                            }
                        });
                    });
                });

                $(function() {
                    /*
                        filter date
                    */
                    self.$el.find('#btnFilterDate').click(function(event) {
                       var from = $('#date-from').val();
                       var to = $('#date-to').val();
                       
                       var list = overtime_payrolls.function.betweenTwoDates(from, to);
                       overtime_payrolls.subviews.appendList(list);
                    });
                });

                $(function() {
                    self.$el.find('#btnReset').click(function(event) {
                        $('#date-from, #date-to').val('');
                        $('#date-from').focus();
                        overtime_payrolls.subviews.appendList(overtime_payrolls);
                    });
                });

                $(function() {
                    var output = '';
                    output += '<tr>';
                    output += '<td colspan="12" class="text-center"><i class="fa fa-spinner fa-pulse fa-3x"></i></td>';
                    output += '</tr>';
                    self.$el.find('tbody').html(output);
                    setTimeout(function() {
                        overtime_payrolls.function.fetchData();
                    }, 700);
                    
                });

                $(function() {
                    self.$el.find('#chk-overtime-payrolls').change(function(event) {
                        var is = $(this).is(':checked');
                        self.$el.find('tbody').find(':checkbox').prop('checked', is);
                    });
                });

                $(function() {
                    self.$el.find('#btnBreakDownOvertime').click(function(event) {
                        var ids = [];
                        self.$el.find('tbody').find('input[type="checkbox"]:checked').each(function(index, el) {
                            ids.push($(this).val());
                        });
                        if (ids.length) {
                            var myCollection = new Backbone.Collection();

                            ids.forEach(function(model) {
                                myCollection.add(overtime_payrolls.get(model));
                            });

                            myCollection.length && overtime_payrolls.subviews.appendTabBreakDown(myCollection);
                            
                        };
                    });
                });

        	},

            filterRecords(value){
                return overtime_payrolls.toJSON().filter(function(model) {
                    return model.date.toLowerCase().indexOf(value) != -1 ||
                           model.work_hrs.toLowerCase().indexOf(value) != -1 ||
                           model.location_name.toLowerCase().indexOf(value) != -1 ||
                           model.work_scope.toLowerCase().indexOf(value) != -1;
                });
            }
    
    });
   
    return Subview; 
});