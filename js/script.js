$(function() {
	var width = $(window).width(), height = $(window).height();
	if ((width <= 1500) || (height >= 500)) {
		// alert(true)
		// $('#main').css({
		// 	marginLeft: '200px'
		// });
	}
});

$(function() {
	$('#form-signin').submit(function(event) {
		event.preventDefault();
		var form = $(this).serialize(), $btn = $(this).find(':submit');
		$btn.prop('disabled', true);
		$btn.text('Authenticating...');
		$.post('ajax/select/verify_account.php', form, function(data, textStatus, xhr) {
			/*optional stuff to do after success */
			$('#output-login').hide().html(data).fadeIn('fast');
		}).success(function(data){
			// alert('success');
		});
	});
});






// var pubnub = PUBNUB.init({ 
// 	publish_key: 'pub-c-1d2a9f94-a584-420e-8488-408a4939d158', 
// 	subscribe_key: 'sub-c-4916848e-f47b-11e4-8763-0619f8945a4f'
// }); 

