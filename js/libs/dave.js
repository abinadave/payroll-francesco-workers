define(['underscore','backbone'], function(_, Backbone) {
   
    var Dave = {
    	loadData(arrOfCols, Obj){
    		var length = arrOfCols.length;
    		var fetched = 0;
    		arrOfCols.forEach(function(collection) {
    			$.when(window[collection].fetch({
    				url: 'api.php/get/'+collection,
    				silent: true
    			})).then(function(arguments) {
    				++fetched;
    				if (fetched === length) {
    					Obj.done();
    				}
    			}, function(arguments) {
    				console.log('error');
    			})
    		});
    	}
    };
   
    return Dave; 
});