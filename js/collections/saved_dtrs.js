define(['underscore','backbone',
	'models/saved_dtr'], function(_, Backbone, Saved_dtr) {
   
    var Saved_dtrs = Backbone.Collection.extend({
    	url: 'index.php/saved_dtr',
    	model: Saved_dtr,
    		
    	initialize: function(){
    		this.on('add', function(model){
    			console.log('new dtr was added');
    		});
    		this.on('remove', function(model){
    			console.log('dtr successfully removed');
    		});
    	},

    	functions: {
    		save(p_id, clonedCol){
    			$.post('index.php/saved_dtr', {
    				dtr: clonedCol.toJSON(),
    				pid: p_id
    			}, function(data, textStatus, xhr) {
    				/*optional stuff to do after success */
    			}).success(function(data){
    				var json = $.parseJSON(data);
                    if (json.a === json.b) {
                        router.alertify_success('Payroll and Employee attendance was saved');
                    }
    			}).fail(function(xhr){
    				alert(' '+xhr.status);
    			});
    		},

            findModelIfPresent(i){
                var rs = saved_dtrs.where({id: i}); if (rs.length) { var model = saved_dtrs.get(i).toJSON(); if (Number(model.value) === 1) { return '<i class="fa fa-check text-primary" aria-hidden="true"></i>'; } else { return '' }}
            },

            update(id, bool){
                var rs = saved_dtrs.where({id: id});
                if (rs.length) {
                    var dtr = saved_dtrs.get(id);
                    dtr.set({value: bool});
                    dtr.save(dtr.attributes, {url: 'index.php/saved_dtr'});
                }
            }

    	},
    
    	print: function(){
    		saved_dtrs.forEach(function(model) {
    			console.log(model.attributes); 
    		});
    	}
    
    });
   
    return Saved_dtrs; 
});