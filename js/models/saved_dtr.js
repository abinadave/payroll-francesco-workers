define(['underscore','backbone'], function(_, Backbone) {
   
    var Saved_dtr = Backbone.Model.extend({
    
    	initialize: function(){
            var self = this;
    		this.on('change', function(){
                if (self.hasChanged('value')) {
                    var model = self.toJSON();
                    var dtrs = self.functions.filterRows(model);
                    self.functions.updateNod(dtrs.length, model);
                }
    		});
    		this.on('invalid', function(model, error){
                router.alertify_error(error);
            });
    	},

        functions: {
            
            updateNod(length, model){
                var nod = length / 2;
                var id = model.id.split('-')[0];
                var objWhere = {emp: id, payroll_id: model.payroll_id};
                var rs = payrollemps.where(objWhere);
                if (rs.length) {
                    var payrollemp = payrollemps.where({emp: id, payroll_id: model.payroll_id}, true);
                    payrollemp.set({num_of_days: nod.toString()});

                    $.ajax({
                        url: 'index.php/payrollemp',
                        type: 'POST',
                        data: { nod: nod, id: id, model: model },
                        success: function(result) {
                            var json = $.parseJSON(result);
                            if (json.success) {
                                var el_id = '#nod-' + payrollemp.get('emp') + '-' + payrollemp.get('payroll_id');
                                $(el_id).text(nod);
                            }
                        }
                    });

                }
            },

            filterRows(model){
                var id = model.id.split('-')[0];
                return saved_dtrs.toJSON().filter(function(dtr) {
                    return Number(dtr.id.split('-')[0]) === Number(id) && Number(dtr.value) === 1;
                });
            }
        }

        

    });
   
    return Saved_dtr; 
});