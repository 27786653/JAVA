Ext.define('Ext.ux.custom.AppInfoPanel', {
    extend: 'Ext.form.Panel',
    alias: 'widget.Appform',
    initComponent: function () {
        var me = this;
        me.dataId = me.dataId == undefined ? 0 : me.dataId;

        me.reader = Ext.create('Ext.data.JsonReader', {
            model: me.modelName,
            root: 'data'
        });

        var saveBtnText = me.saveBtnText || '保存';

        Ext.apply(this, {
            border: false,
            autoScroll: true,
            bodyPadding: 10,
            waitMsgTarget: true,
            buttonAlign:'right',
            buttons: [{
                xtype: 'button',
                itemId: 'btnSaveToList',
                iconCls: 'icon_list',
                text: saveBtnText + '并返回列表',
                scope: this,
                handler: me.onSaveToListClick
            }, {
                xtype: 'button',
                itemId: 'btnSave',
                iconCls: 'icon_save',
                text: saveBtnText,
                scope: this,
                handler: me.onSaveClick
            }, {
                xtype: 'button',
                itemId: 'btnCancel',
                iconCls: 'icon_delete',
                text: '取消',
                scope: this,
                handler: me.onCancelClick
            }],
            defaults: {
                border: false
            }
        });

        this.callParent(arguments);

        this.on('boxready', function () {
            if (me.loadUrl && me.dataId != 0) {
                me.getForm().waitMsgTarget = me.getEl();
                me.load({
                    url: me.loadUrl,
                    params: {
                        'id': me.dataId
                    },
                    waitMsg: '数据载入中，请稍候...'
                });
            }
        });
        this.on('render', function (panel) {
            panel.el.on('keypress', function (e) {
                if (e.getKey() == e.ENTER) {
                    me.onSaveClick();
                }
            });
        });
    },
    //保存并返回列表
    onSaveToListClick: function () {
        this.onSave('list');
    },
    //保存
    onSaveClick: function () {
        this.onSave();
    },
    onSave: function (t) {
        var me = this;
        if (me.getForm().isValid()) {
            me.getForm().waitMsgTarget = me.getEl();
            me.getForm().submit({
                submitEmptyText: false,
                url: me.saveUrl,
                waitMsg: '保存中，请稍候...',
                success: function (form, action) {
                    App.msgTip('保存成功！');
                    if (t == 'list') {
                        App.closeTab(me.listTabId);
                    }
                    if (me.onSaveSuccess) me.onSaveSuccess(action);
                },
                failure: function (form, action) {
                    App.errTip(action.result.msg);
                }
            });
        }
    },
    //取消
    onCancelClick: function () {
        App.closeTab(this.listTabId);
    }
});
