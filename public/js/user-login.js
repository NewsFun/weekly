(function (win, $, undefined) {
	var form = $('#form');
	var submit = $('#submit');
	var signin = $('#signin');
	var msge = $('#msg');
	var path = '/users';

	function handle() {
		submit.on('click',function (e) {
			var msg = getFormMsg(form);
			postUserMsg(path, msg, goBack);
		});
		signin.on('click',function (e) {
			var msg = getFormMsg(form);
			postUserMsg(path+'/add', msg);
		});
	}

	function getFormMsg(node) {
		var inputs = node.find('input');
		var msg = {};
		inputs.each(function(index, el) {
			var name = $(this).attr('name');
			var value = $(this).val();
			if(name) msg[name] = value;
		});
		return msg;
	}

	function postUserMsg(url, msg, cb) {
		$.ajax({
			url: url,
			type: 'POST',
			dataType: 'json',
			data: msg
		}).done(function(data) {
			// console.log(data);
			if(!data.success){
				msge.html('用户名或密码错误！');
			}else{
				if(cb) cb();
			}
		});
	}

	function goBack() {
		win.location.replace(win.document.referrer);
	}

	handle();

})(window, jQuery);