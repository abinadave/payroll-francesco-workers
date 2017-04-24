define(
    [
        'underscore',
        'backbone'
    ],  function(_, Backbone) {
   
    var Project = Backbone.Model.extend({
        
        initialize: function(){
            console.log('project model initialized');
        },
        
        defaults: {
            id: 0,
            location: 'no location',
            rice_allowance: 2
        }
        
    });
   
    return Project; 
});