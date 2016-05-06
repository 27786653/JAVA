/**
 * 文件上传校验
 */

function checkFile(o){
	//验证图片文件的正则
	var img_reg = /\.([xX][lL][sS]){1}$/;
	if(!img_reg.test(o.value)){
		Ext.Msg.alert('提示','文件类型错误,请选择Excel文件(后缀名为xls)');
		o.setRawValue('');
	}
}
