define(['underscore','backbone',
	'text!templates/userlog/temp_panel_logs.html'], function(_, Backbone, template) {
   
    var SubviewLogs = Backbone.View.extend({
    
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
                self.$el.off();
                self.$el.empty();
                var output = self.template(template);
                self.$el.append(output);
                self.onRender();
    	        return self;
        	},
    
        	onRender: function(){
                var self = this;
                userlogs.reset();
                $(function(){
                    
                    self.$el.css({
                    	marginLeft: '0'
                    });

                    // userlogs.function.fetchData();
                    userlogs.partial = 0;
                    $.post('ajax/select/userlog_partial.php' , { partial: userlogs.partial }, function(data, textStatus, xhr) {
                        /*optional stuff to do after success */
                    }).success(function(data){
                        var json = $.parseJSON(data);
                        userlogs.add(json, {silent: true});
                        userlogs.subviews.appendList(userlogs);
                    }).fail(function(xhr){
                        alert(' '+xhr.status);
                    });
                
                });
        	    
                $(function() {
                    self.$el.find('#btnFilterGo').click(function(event) {
                        var d1 = self.$el.find('#d1').val(), d2 = self.$el.find('#d2').val();
                        var list = userlogs.function.filterDates(d1, d2);
                        userlogs.subviews.appendList(list);
                    });
                });
                
            }
    
    });
   
    return SubviewLogs; 
});