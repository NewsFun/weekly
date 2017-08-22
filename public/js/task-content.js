(function (win, $, undefined) {
	var operat = $('#operat');
	var users = $('#users');
	operat.on('click','a',function (e) {
		var type = $(this).data('type');
		if(type){
			var id = getTaskID();
			var nm = users.text();
			var url = '/task.'+type;
			sendMessage(url,{
				_id:id,
				name:nm
			});
		}
	});
	function getTaskID() {
		var url = win.location.pathname;
		var re = url.split('/');
		return re[re.length-1];
	}
	function sendMessage(url, data, cb) {
		$.ajax({
			url: url,
			type: 'POST',
			dataType: 'json',
			data: data
		}).done(function (data) {
			alert(data.success);
		});
	}
})(window, jQuery);