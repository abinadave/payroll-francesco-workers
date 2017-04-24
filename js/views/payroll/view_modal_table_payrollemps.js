define(
	[
		'underscore',
		'backbone',
		'text!templates/payroll/temp_modal_table_payrollemps.html',
        'libs/backbone.obscura',
        'printarea'
	],  function(_, Backbone, template, Obscura) {

    var ViewModalTablePayrollEmps = Backbone.View.extend({
    
        	initialize: function(){
        		//console.log('View initialized..');
        	},
    
        	tagName: 'div',
    
        	el: '#modal-placeholder-table-payrollemps',
    
        	template: _.template(template),
    
            events: {
                // bound events
                'click #btnPayrollEmpBreakDown': 'showBreakDown',
                'click #btnPrintEnvelopes': 'showEnvelopes'
            },
    
        	render: function(id){
        	    var self = this;
                self.$el.empty();
                // self.$el.off();
                var output = self.template({'payroll_id': id});
                self.$el.append(output);
                self.init(id);
    	        return self;
        	},
    
        	init: function(payrollId){
                var self = this;

                $(function() {
                    self.$el.find('#btnShowAttendance').on('click', function(event){
                        $('#modalTablePayrollemps').modal('hide');
                        setTimeout(function() {
                            router.navigate('Attendance/view/'+payrollId, true);
                        }, 800);
                    });
                });

                $(function(){
                    self.$el.find('#retreive-payrollemps').click(function(event) {
                        var lastId = payrolls.function.currentId;
                        if (lastId > 0) {
                           var lists = payrollemps_removed.function.getEmpWherePayrollId(lastId);
                           if (lists.length) {
                                payrollemps_removed.subviews.appendModalRemovedEmployees().appendRetreivedRemovedEmployees(lists);
                           } else{
                                console.log('no employee was found');
                           };
                        }
                    });

                    self.$el.find('#btnPrint').click(function(event) {
                        self.printInNewTab(self);
                    }).hover(function() {
                        console.log('hover')
                        $('#modalTablePayrollemps').find('#remove').find('span').hide();
  
                        var $sig = $('#modalTablePayrollemps').find('.signature');
                        $('.signature').width(200);
                        $('.signature').text('Signature');
                    }, function() {
                        console.log('out')
                        $('#modalTablePayrollemps').find('#remove').find('span').show();
                        $('#modalTablePayrollemps').find('#remove').css({
                            width: '1px'
                        });
                    });



                    self.$el.find('#btnPayrollEmpBreakDown').click(function(event) {
                            $('#modalBreakdown').modal();
                            var numbers = [1000,500,200,100,50,20,10,5,1];
                       
                            $('#breakdown-1000').text(payrollemps._1000);
                            $('#breakdown-500').text(payrollemps._500);
                            $('#breakdown-200').text(payrollemps._200);
                            $('#breakdown-100').text(payrollemps._100);
                            $('#breakdown-50').text(payrollemps._50)
                            $('#breakdown-20').text(payrollemps._20);
                            $('#breakdown-10').text(payrollemps._10);
                            $('#breakdown-5').text(payrollemps._5);
                            $('#breakdown-1').text(payrollemps._1);
                    });

                    self.$el.find('#btnPrintEnvelopes').click(function(event) {
                        var currentId = payrolls.function.currentId;
                        var list = payrollemps.function.getPayrollempsIdOf(payrollemps, currentId);
                        var sortedCollection = payrollemps.function.getEmpsAndSort(list);
                        var proxy = new Obscura(sortedCollection);
                        proxy.setSort('lastname','asc');
                        $('#modalTablePayrollemps').modal('hide');
                        $('#navigation').removeClass('navbar navbar-default navbar-fixed-top').empty();
                        setTimeout(function() {
                            $main = $('#main');
                            $main.empty();
                            require(['views/employee/view_append_envelope'], function(Subview){  
                                var view = new Subview({
                                    collection: proxy
                                });
                            });
                        }, 1000);
                    });

                });

                     (function() {

                            var beforePrint = function() {
                                console.log('Functionality to run before printing.');
                            }

                            var afterPrint = function() {
                               view_navigation.render();
                               $('#main, #placeholder').empty();
                               $('#navigation').show();
                               router.navigate('', true);
                               router.navigate('Payroll', true);
                               $('#navigation').addClass('navbar navbar-default navbar-fixed-top');
                            }

                            if (window.matchMedia) {
                                var mediaQueryList = window.matchMedia('print');
                                mediaQueryList.addListener(function(mql) {
                                    if (mql.matches) {
                                        beforePrint();
                                    } else {
                                        afterPrint();
                                    }
                                });
                            }

                            window.onbeforeprint = beforePrint;
                            window.onafterprint = afterPrint;

                        }());

        	},

            printInNewTab: function(self) {
                var html = $('#body-to-print').html();
                $('#modalTablePayrollemps').modal('hide');
                setTimeout(function() {
                    $('#main, #navigation').hide();
                    $('#placeholder').html(html);
                    window.print();
                }, 1000);                
            }

           
    
    });
   
    return ViewModalTablePayrollEmps; 
});