define([
	'underscore',
	'backbone',
	'text!templates/attendance/saved_dtr/temp_modal_saved_dtr.html',
    'moment'], 
	function(_, Backbone, template, moment) {
   
    var Subview = Backbone.View.extend({
    
        	initialize: function(){
                this.render();
        	},
    
        	tagName: 'div',
    
        	el: '#placeholder',
    
        	template: _.template(template),
    
            events: {
                // bound events
            },
    
        	render: function(){
        	    var self = this;
                self.$el.off();
                self.$el.empty();
                var output = self.template({'model': self.model.toJSON()});
                self.$el.append(output);
                self.onRender();
    	        return self;
        	},
    
        	onRender: function(){
                var self = this;
                var models = payrollemps.where({payroll_id: self.model.get('id')}, false);
                payrolls.function.currentId = self.model.get('id');
                
                $(function() {
                    self.$el.find('#btnShowPayroll').on('click', function(event){
                        var id = self.model.get('id');
                        $('#modal-saved-dtr').modal('hide');
                        setTimeout(function() {
                            router.navigate('Payroll/view/'+id, true);
                        }, 800);
                    });
                });

                $(function() {
                    $('#chk-enable-editing').change(function(event) {
                        var is = $(this).is(':checked');
                        accounts.subviews.forSecretaryEditingTd((is === true) ? true : false);
                    });
                });

                $(function() {
                    var $label = $('#for-secretary');
                    var usertype = sessionStorage.getItem('usertype');
                    if (parseInt(usertype) !== 2) {
                        $label.remove();
                    }
                });

                $(function() {
                    self.$el.find('#btnPrint').on('click', function(event) {
                        $('#modal-saved-dtr').modal('hide');
                        var cloned = self.$el.find('.modal-body').clone();
                        setTimeout(function() {
                            $('#placeholder').html(cloned);
                            $('#main, #navigation').hide();
                            window.print();
                            setTimeout(function() {
                                $('#main, #navigation').show();
                                $('#placeholder').empty();
                            }, 200);
                        }, 800);   
                    });
                });

                $(function(){
                                        
                    var start = moment(self.model.get('date_from')).format('MM/DD/YYYY');
                    var end = moment(self.model.get('date_to')).format('MM/DD/YYYY');

                    $.get('ajax/others/range_of_dates2.php', {
                        start: start,
                        end: end
                    }, function(data, textStatus, xhr) {
                        /*optional stuff to do after success */
                    }).success(function(data){
                        var dates = $.parseJSON(data);
                        
                        $('#modal-saved-dtr').modal('show');
                        $.when(saved_dtrs.fetch({
                            url: 'index.php/saved_dtr/'+ self.model.get('id'),
                            silent: true
                        })).then((resp) => {
                            
                            require(['views/attendance/saved_dtr/view_range_of_dates'], function(SubviewROD){
                                var view = new SubviewROD({
                                    collection: new Backbone.Collection(models)
                                });
                                view.render(dates);
                            });

                        }, (resp) => {
                            
                        });

                    }).fail(function(xhr){
                        console.log(' '+xhr.status);
                    });
                    
                });

                $(function() {
                    $('#modal-saved-dtr').on('hidden.bs.modal', function(event){
                        router.navigate('Payroll');
                    });
                });
        	}
    
    });
   
    return Subview; 
});

