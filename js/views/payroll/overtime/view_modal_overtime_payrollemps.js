define(['underscore','backbone','text!templates/payroll/overtime/temp_modal_overtime_payrollemps.html'
    ,'css!libs/css/th_td_padding.css'], function(_, Backbone, template, css) {
   
    var Subview = Backbone.View.extend({
    
        	initialize: function(){
                this.render();
        	},
    
        	tagName: 'div',
    
        	el: '#placeholder-modal',
    
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
                $(function(){
                   
                    $('#modalOvertimePayrollemps').modal('show');
                     (function() {

                            var beforePrint = function() {
                                console.log('Functionality to run before printing.');
                            }

                            var afterPrint = function() {
                               // view_navigation.render();
                               // $view_navigation.render();
                               $('#main, #placeholder').empty();
                               $('#navigation').show();
                               router.navigate('', true);
                               router.navigate('overtimePayroll', true);
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
                });

                $(function() {
                    self.$el.find('#btnPrint').click(function(event) {
                        var $removeThis = self.$el.find('#remove-this');
                        require(['printarea'], function(){
                             $removeThis.empty();
                             $removeThis.css({
                                 width: '200px'
                             });
                             self.$el.find('.signature-overtime').text('SIGNATURE').addClass('text-center');
                             self.printInNewTab(self);
                             setTimeout(function() {
                                 $('#modalOvertimePayrollemps').modal('hide');
                             }, 200);
                        });
                    });

                    self.$el.find('#envPrint').click(function(event) {
                        
                        var currentId = overtime_payrollemps.currentId;
                        var list = overtime_payrollemps.function.getPayrollempsIdOf(overtime_payrollemps, currentId);
                        $('#modalOvertimePayrollemps').modal('hide');
                        $('#navigation').removeClass('navbar navbar-default navbar-fixed-top').empty();
                        
                        list.forEach(function(model) {
                            console.log(model.attributes); 
                        });

                        setTimeout(function() {
                            $main = $('#main');
                            $main.empty();
                            
                                require(['views/payroll/overtime/view_append_envelope_overtime'], function(Subview){  
                                    var view = new Subview({
                                        collection: list,
                                        interval: 1000
                                    });
                                });
                           
                        }, 1000);
                    });
                });

                $(function() {
                    self.$el.find('#btnRestore').click(function(event) {
                        removed_overtime_payrollemps.forEach(function(model) {
                            overtime_payrollemps.add(model, {silent: true});
                        });
                        removed_overtime_payrollemps.reset();
                    });
                });

                $(function() {
                    self.$el.find('td').css({
                        padding: '1.5px'
                    });
                });

        	},

            printInNewTab: function(self) {
                var html = $('#print-div').html();
                $('#modalOvertimePayrollemps').modal('hide');
                setTimeout(function() {
                    $('#main, #navigation').hide();
                    $('#placeholder').html(html);
                    window.print();
                }, 1000);
                
            }
    
    });
   
    return Subview; 
});