define(['underscore','backbone',
	'text!templates/employee/picture/temp_modal_update_picture.html',
    'libs/functions',
    'moment',
    'printarea'], function(_, Backbone, template, fn, moment, printarea) {
   
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
                var output = self.template({
                    'model': self.model.toJSON(),
                    'fn': fn,
                    'moment': moment
                });
                self.$el.append(output);
                self.onRender();
    	        return self;
        	},
    
        	onRender: function(){
                var self = this;
                var found = [];

                $(function() {
                    self.$el.find('#printId').on('click', function(event){
                        // $('#for-printing').printArea();
                        let elemsToHide = '#div-emps-with-pic, #navigation, #main';
                        let cloned = $('#for-printing').clone();
                        $('#modalUpdatePicture').modal('hide');
                        $(elemsToHide).hide();
                        $('#placeholder-id').append(cloned);
                        setTimeout(function() {
                            window.print();
                            setTimeout(function(){
                                 $(elemsToHide).show();
                                 $('#placeholder-id').empty();
                            }, 1000);
                        }, 5000);
                        
                    });
                });

                $(function(){
                    $('#modalUpdatePicture').modal('show');
                    $('#modalUpdatePicture').on('hidden.bs.modal', function(event) {
                        if (!$('#div-emps-with-pic').length) {
                            router.navigate('Employees');
                        }else {
                            router.navigate('EmployeesWithPictures');
                        }

                    });
                });

                $(function() {
                    pictures.functions.fileUpload();
                    var empJSON = self.model.toJSON();
                    var objWhere = { fullname: empJSON.firstname.toUpperCase() + ' ' +empJSON.lastname.toUpperCase() };
                    var rs = pictures.where(objWhere);
                    if (rs.length) {
                        var model = pictures.findWhere(objWhere, true);
                        var dir = 'assets/pictures/' + model.get('fullname') + '.' + model.get('ext');
                        self.$el.find('#img-src').attr('src', dir);
                    }
                });

        	},

            print1(){
                var self = this;
                var html = $('#for-printing').clone();
                $('#modalUpdatePicture').modal('hide');
                setTimeout(function() {
                    $('#navigation, #main').hide();
                    $('#placeholder').html(html).addClass('container');
                    window.print();
                    setTimeout(function() {
                        $('#navigation, #main').show();
                        $('#placeholder').empty();    
                    }, 200);
                }, 1000);
            },


            printArea(){

            }
    
    });
   
    return Subview; 
});