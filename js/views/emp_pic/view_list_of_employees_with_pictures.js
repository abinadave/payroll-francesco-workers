define(['underscore','backbone',
	'text!templates/emp_pic/temp_list_of_employees_with_pictures.html'],
	function(_, Backbone, template) {
   
    var SubviewLEWP = Backbone.View.extend({
    
        	initialize: function(){
                this.render();
        	},
    
        	tagName: 'div',
    
        	el: '#list-of-emps-with-pic',
    
        	template: _.template(template),
    
            events: {
                // bound events
            },
    
        	render: function(){
        	    var self = this;
                self.$el.off();
                self.$el.empty();
                var output = self.template({'library': self.collection.toJSON()});
                self.$el.hide().append(output).slideDown(300);
                self.onRender();
    	        return self;
        	},
    
        	onRender: function(){
                var self = this;
                $(function(){
                   if (!self.collection.length) {
                      var seached = $('#search-query-pic').val();
                      var output = '';
                      if (seached !== '') {
                          output = '<p style="font-weight: bolder">No data was found for  "<i class="text-info">'+seached+'</i>"</p>';
                      }else {
                          output = '<p style="font-weight: bolder">No Information was found in this table</p>';
                      }
                      self.$el.hide().append(output).slideDown(300);
                   }
                });

                var $span = $('#no-of-pics');

                $(function() {
                    $span.text(self.collection.length);
                });

                $(function() {
                    self.$el.find('a.for-removal').on('click', function(e){
                        let id = this.id;
                        let confirmed = confirm('Are you sure ?');
                        if (confirmed) {
                            let model = pictures.get(id);
                            $.when(model.destroy()).then((resp) => {
                              console.log(resp)
                               $('#picture-'+id).remove();
                            }, (resp) => {

                            });
                       
                        }
                    });
                });
        	}
    
    });
   
    return SubviewLEWP; 
});