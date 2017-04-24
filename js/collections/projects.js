define(
    [
        'underscore',
        'backbone',
        'models/project',
        //subviews

        'views/project/view_modal_project',
        'views/project/view_list_of_projects',
        'views/project/view_list_of_location_in_modal',
        'views/project/view_list_of_project_in_modal',
        'views/project/view_list_of_projects_by_id'

    ],  function(_, Backbone, Project, ViewModalProject, ViewListOfProjects, ViewListOfLocationInModal, ViewListOfProjectInModal, ViewListOfProjectsByid) {
   
    var Projects = Backbone.Collection.extend({
        initialize: function(){
            //console.log('Collection projects initialized');
            this.on('add', function(model){
                console.log('new project was added');
                projects.subviews.appendListOfSubjects();
                projects.subviews.appendListOfLocationInModal();
                projects.subviews.appendListOfProjectInModal();
                $('#display-by-project').chosen();
                $("#display-by-project").trigger("chosen:updated");
            });

            this.on('remove', function(model){
                console.log('project removed');
                projects.subviews.appendListOfSubjects();
                projects.subviews.appendListOfLocationInModal();
                projects.subviews.appendListOfProjectInModal();
                $('#display-by-project').chosen();
                $("#display-by-project").trigger("chosen:updated");
            });
        },

        function: {
            fetchData: function(){
                if (projects.length) {
                    projects.function.populateAll();
                }else {
                    $.getJSON('ajax/select/get_projects.php', function(json, textStatus) {
                        /*optional stuff to do after success */
                    }).success(function(json){
                        projects.function.saveModel(json, 1).populateAll();
                    });
                }
            },

            saveDb: function(form){
                $.post('ajax/save/save_project.php', form, function(data, textStatus, xhr) {
                    $('#output-save-project').hide().html(data).fadeIn('fast');
                }).success(function(data){
                    router.alertify_success('Successfully added');
                }).fail(function(xhr){
                    alert(' '+xhr.status);
                });
            },

            saveModel: function(json, type){
                projects.add(json, {silent: type});
                return this;
            },

            removeDb: function(id){
                $.post('ajax/delete/delete_project.php', {pid: id}, function(data, textStatus, xhr) {
                    /*optional stuff to do after success */
                }).success(function(data){
                    projects.remove(id);
                }).fail(function(xhr){
                    alert(' '+xhr.status);
                });
            },

            populateAll: function(){
                projects.subviews.appendListOfLocationInModal();
                projects.subviews.appendListOfProjectInModal();
                employees.function.fetchData();
                projects.subviews.callback();
                return this;
            },

            print: function(){
                if (projects.length) {
                    projects.forEach(function(model) {
                        console.log(model.attributes); 
                    });
                }else {
                    console.log('model projects has: 0 length');
                }
            },

            getLocation: function(iid){
                var result = projects.where({id: iid});
                if (result.length) {
                    var proj = projects.get(iid);
                    return proj.get('location');
                }else {
                    return 'unknown location';
                }
            },

            searchAndReturn: function(value){
                var ids = [];
                projects.forEach(function(model) {
                    if (model.get('location').toLowerCase().indexOf(value.toLowerCase()) !== -1) {
                        ids.push(model.get('id'));
                    };
                });
                return ids;
            }

        },


        subviews: {
            appendModalProject: function(){
                var view = new ViewModalProject();
                view.render();
                return this;
            },

            appendListOfSubjects: function(){
                var view = new ViewListOfProjects({
                    collection: projects
                });
                view.render();
                return this;
            },

            appendListOfLocationInModal: function(){
                var view = new ViewListOfLocationInModal({
                    collection: projects
                });
                view.render();
            },

            appendListOfProjectInModal: function(){
                var view = new ViewListOfProjectInModal({
                    collection: projects
                });
                view.render();
            },

            appendListOfProjectsByid: function(ids){
                var view = new ViewListOfProjectsByid();
                view.render(ids);
            },

            appendListInEmpPic(list){
                require(['views/project/view_list_of_projects_in_emp_pic'], function(Subview){
                   new Subview({
                       collection: list
                   });
                });
            },

            callback: function(){
                if (sessionStorage.getItem('usertype') == 3) {
                    $('#location').text(projects.function.getLocation(sessionStorage.getItem('location')));
                };
            }
        }
    });
   
    return Projects; 
});