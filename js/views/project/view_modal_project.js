define(
    [
        'underscore',
        'backbone',
        'text!templates/project/temp_modal_project.html'
    ],  function(_, Backbone, template) {
   
    var ViewModalProject = Backbone.View.extend({
    
            initialize: function(){
                //console.log('View initialized..');
            },
    
            tagName: 'div',
    
            el: '#placeholder-modal-create-project',
    
            template: _.template(template),
    
            events: {
                // bound events
                'click #btnSaveProject': 'saveProject'
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


                $(function(){
                    //jQuery
                    var $modal = $('#modalProject');
                    $modal.find('#location').keyup(function(event) {
                        var value = $(this).val();
                        var ids = projects.function.searchAndReturn(value);
                        projects.subviews.appendListOfProjectsByid(ids);
                    });
                });


                $(function() {
                    $('#form-add-designation').submit(function(event) {
                        /* Act on the event */
                        event.preventDefault();
                        if (Number(sessionStorage.getItem('usertype')) === 2) {
                            var value = $(this).find('#designation').val(), match = 0;
                            if (value != '') {
                                positions.forEach(function(model) {
                                    if (_.isEqual(model.get('name').toLowerCase(), value.toLowerCase())) {
                                        ++match;
                                    };
                                });
                                if (match > 0) {
                                     router.alertify_error('Designation name already exist');
                                     $(this).find('#designation').focus();
                                }else {
                                     positions.function.saveDB(value);
                                }
                               
                            }
                        }else {
                            router.alertify_error('Sorry, you are not allowed to add any designation from the system.');
                        }
                        
                    });
                });


            },

            saveProject: function(event){
                event.preventDefault();
                if (Number(sessionStorage.getItem('usertype')) === 2) {
                    var form = $('#form-add-project').serialize();
                    var value = $('#form-add-project #location').val();
                    var match = 0;
                    projects.forEach(function(model) {
                        var location = model.get('location').toLowerCase();
                        if (_.isEqual(location, value.toLowerCase())) {
                            console.log('Location name already exist');
                            ++match;
                        };
                    });
                    if (match > 0) {
                        router.alertify_error('Project location already defined');
                    }else {
                        projects.function.saveDb(form);
                    }
                }else {
                    router.alertify_error('Sorry, you are not allowed to add any project location.');
                }
                
            }

           
    
    });
   
    return ViewModalProject; 
});