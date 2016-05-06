/**
 * Created by lihuibin on 2014/9/19.
 * 无工具栏的comboGrid
 */
Ext.define('App.utils.NoPagingToolbarComboGrid', {
    extend: 'Ext.form.field.ComboBox',
    requires: [
        'Ext.grid.Panel'
    ],
    alias: ['widget.NoPagingToolbarComboGrid'],
    layout:'fit',
    // copied from ComboBox
    createPicker: function() {
        var me = this,
            picker,
            menuCls = Ext.baseCSSPrefix + 'menu',
            opts = Ext.apply({
                selModel: {
                    mode: me.multiSelect ? 'SIMPLE' : 'SINGLE'
                },
                floating: true,
                hidden: true,
                ownerCt: me.ownerCt,
                cls: me.el.up('.' + menuCls) ? menuCls : '',
                store: me.store,
                displayField: me.displayField,
                focusOnToFront: false,
                pageSize: me.pageSize
            }, me.listConfig, me.defaultListConfig);

        // NOTE: we simply use a grid panel
        //picker = me.picker = Ext.create('Ext.view.BoundList', opts);
        picker = me.picker = Ext.create('Ext.grid.Panel', opts);

        // hack: pass getNode() to the view
        picker.getNode = function() {
            picker.getView().getNode(arguments);
        };

        me.mon(picker, {
            itemclick: me.onItemClick,
            refresh: me.onListRefresh,
            scope: me
        });

        me.mon(picker.getSelectionModel(), {
            selectionChange: me.onListSelectionChange,
            scope: me
        });

        return picker;
    }
});