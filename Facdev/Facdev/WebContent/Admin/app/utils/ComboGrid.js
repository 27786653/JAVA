/**
 * Created by lihuibin on 2014/8/29.
 * combobox里插入grid
 */
Ext.define('App.utils.ComboGrid', {
    extend: 'Ext.form.field.ComboBox',
    requires: [
        'Ext.grid.Panel'
    ],
    alias: ['widget.ComboGrid'],
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
                pageSize: me.pageSize,
                dockedItems : [{
                    xtype:'pagingtoolbar',
                    store:me.store,
                    dock:'bottom',
                    emptyMsg:'没有数据',
                    displayInfo:false,
                    itemId:'ComboGridPagingtoolbar',
                    afterPageText:'页'
                }]
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