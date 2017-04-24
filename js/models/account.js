define(
	[
		'underscore',
		'backbone'
	],  function(_, Backbone) {
   
    var Account = Backbone.Model.extend({
        url: 'index.php/account',
    	initialize: function(){
    		//console.log('Account model initialized');
            this.on('change', function(){
                console.log('Account model changed');
                if (this.hasChanged('rand')) {

                    var prev_rand = this.previous('rand');
                    var id = this.get('id');
                     console.log(id + ' - ' + prev_rand);
                    accounts.function.removePhoto(id, prev_rand);
                    $('#image-account').hide().attr('src', 'images/accounts/account'+'-'+this.get('id')+'-'+this.get('rand')+'.png').fadeIn('fast');
                    $('#modalUpdateAccountPhoto').modal('hide');
                };
            });
    	}

    });
   
    return Account; 
});