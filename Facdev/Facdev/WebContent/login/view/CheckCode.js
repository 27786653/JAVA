Ext.define('LoYi.view.CheckCode', {
	extend : 'Ext.form.field.Text',
	alias : 'widget.checkcode',
	inputTyle : 'codefield',
	codeUrl : Ext.BLANK_IMAGE_URL,
	isLoader : true,
	onRender : function(ct, position) {
		this.callParent(arguments);
		this.codeEl = ct.createChild({
			tag : 'img',
			src : Ext.BLANK_IMAGE_URL
		});
		this.codeEl.addCls('x-form-code');
		this.codeEl.on('click', this.loadCodeImg, this);

		if (this.isLoader)
			this.loadCodeImg();
	},
	alignErrorIcon : function() {
		this.errorIcon.alignTo(this.codeEl, 'tl-tr', [ 2, 0 ]);
	},

	loadCodeImg : function() {
		this.codeEl.set({
			src : this.codeUrl + '?id=' + Math.random()
		});
	}
});