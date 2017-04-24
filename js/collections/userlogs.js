define(['underscore','backbone','models/userlog','moment'], function(_, Backbone, Userlog, moment) {
   
    var Userlogs = Backbone.Collection.extend({
    
    	model: Userlog,
    		
    	initialize: function(){
    		this.on('add', function(model){
    			console.log('new log was added');
    		});
    		this.on('remove', function(model){
    			console.log('log successfully removed');
    		});
    	},
    
    	function: {

            loadMore: function() {
               var newHtml = "<i class='text-info fa fa-circle-o-notch fa-spin fa-fw'></i><span class='sr-only'>Loading...</span>";
               $('#btnLoadMore').replaceWith(newHtml);
               var num = userlogs.partial;
               var total = num + 50;
               setTimeout(function() {
                   $.post('ajax/select/userlog_partial.php', { partial: total }, function(data, textStatus, xhr) {
                       /*optional stuff to do after success */
                   }).success(function(data){
                       var json = $.parseJSON(data);
                       userlogs.add(json, {silent: true});
                       userlogs.subviews.appendList(userlogs);
                       userlogs.partial = total;
                   }).fail(function(xhr){
                       alert(' '+xhr.status);
                   });
               }, 500);
               
            },

    		print: function(arguments) {
    			userlogs.forEach(function(model) {
    				console.log(model.attributes); 
    			});
    		},

            fetchData: function() {
                $.getJSON('ajax/select/select.php', {
                    table: 'userlogs'
                }, function(json, textStatus, xhr) {
                        /*optional stuff to do after success */
                }).success(function(json){
                    if (json.length !== userlogs.length) {
                        userlogs.reset();
                        userlogs.add(json);
                    };
                    if ($('#list-of-userlogs').length) {
                        userlogs.subviews.appendList(userlogs);
                    };
                }).fail(function(xhr){
                    alert(' '+xhr.status);
                });    
            },

            saveDB: function(act){
                $.post('ajax/save/save.php', 
                        {
                            table: 'userlogs',
                            date: router.getDate(),
                            person: sessionStorage.getItem('firstname') + ' ' + sessionStorage.getItem('lastname'),
                            usertype: sessionStorage.getItem('usertype'),
                            activity: act
                        }
                    , 
                function(data, textStatus, xhr) {
                    /*optional stuff to do after success */
                }).success(function(data){
                    var json = $.parseJSON(data);
                    console.log(json);
                }).fail(function(xhr){
                    console.log(' '+xhr.status);
                });
            },

            getUsertype: function(i) {
                switch(parseInt(i)) {
                    case 1:
                        return 'admin';
                        break;
                    case 2:
                        return 'secretary';
                        break;
                    default:
                        return 'unknown';
                }
            },

            filterDates: function(d1, d2) {
                var date1 = moment(d1).subtract(1, 'd').format('dddd MMMM DD, YYYY');
                var date2 = moment(d2).add(1, 'd').format('dddd MMMM DD, YYYY');
                var list = new Backbone.Collection();
                userlogs.forEach(function(model) {
                    if (moment(model.get('date')).isBetween(date1, date2)) {
                        list.add(model);
                    };
                });
                return list;
            }

    	},

    	subviews: {
    		appendPanel: function() {
    			require(['views/userlog/view_panel_logs'], function(Subview){
    			    var view = new Subview();
    			});
    		},

            appendList: function(list) {
                require(['views/userlog/view_list_of_userlogs'], function(Subview){
                    var view = new Subview({
                        collection: list
                    });
                });
            }
    	}
    
    });
   
    return Userlogs; 
});