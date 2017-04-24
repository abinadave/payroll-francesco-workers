// This set's up the module paths for underscore and backbone
require.config({ 
	waitSeconds : 25,
    'paths': { 
		"underscore": "libs/underscore", 
		"backbone": "libs/backbone",
		"moment": "libs/momentjs/moment.min",
		"chosen": "libs/choosenJS/chosen.jquery.min",
		"jqueryui": "libs/jquery-ui/jquery-ui.min",
		'accounting': "libs/accounting.min",
		'timepciker': "libs/jquery-time-picker/jquery.timepicker.min",
		'timepickercss': 'css!libs/jquery-time-picker/jquery.timepicker',
		"datatable": "libs/dataTables/jquery.dataTables",
		"DT-bootstrap": "libs/dataTables/dataTables.bootstrap",
		"datepicker": "libs/datepicker/js/bootstrap-datepicker",
		"css": "libs/require-css/css",
		"file-upload": "libs/fileuploader/fileuploader",
		"printarea": "libs/print-area/demo/jquery.PrintArea"
	},
	'shim': 
	{
		backbone: {
			'deps': ['jquery', 'underscore'],
			'exports': 'Backbone'
		},
		underscore: {
			'exports': '_'
		},

		timepicker: {
			'deps': ['css!libs/jquery-time-picker/jquery.timepicker']
		},

		datatable: {
			"deps": ['jquery']
		},

		"DT-bootstrap": {
            "deps": [
            	'css!libs/dataTables/dataTables.bootstrap.css'
            ]
        },

        "file-upload": {
        	"deps": [
        		"css!libs/fileuploader/fileuploader.css"
        	]
        }
        
	},

	'map': {
        "*": {
            "css":  "libs/require-css/css"
        }
    }	

}); 

require([
	'underscore',
	'backbone',
	'app'
	], 
	function(_, Backbone, app){
		app.init();
});
