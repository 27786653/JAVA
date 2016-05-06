/**
 * Created by qunzhi on 2015/10/13.
 * @author wuketeng
 * @module BOM文件管理
 * @description 显示选中订单的柜体、五金、门信息
 */
Ext.define('App.win.sys.infoGridPanel',{
    extend:'Ext.grid.Panel',
    orderNo:null,

    initComponent:function() {
        var me = this;
        Ext.apply(this, {
            resizable:false,
            autoScroll:true,
            dockedItems:[{
                xtype:'pagingtoolbar',
                store:me.getStore(),
                dock:'bottom',
                emptyMsg:'没有数据',
                displayInfo:true,
                displayMsg:'第{0}条到{1}条,一共{2}条'
            }]
        });
        this.callParent(arguments);
    },

    createStore : function(config) {
        /*		console.log('config');
         console.log(config.sortProperty);
         console.log(config.sortDirection);
         console.log(config);*/
        Ext.applyIf(this, config);

        return Ext.create('Ext.data.Store', {
            model : config.modelName,
            // autoDestroy: true,
            // autoLoad: true,
            remoteSort : true,
            pageSize : globalPageSize,
            proxy : {
                type : 'ajax',
                url : config.proxyUrl,
                extraParams : config.extraParams || null,
                reader : {
                    type : 'json',
                    root : 'items',
                    totalProperty : 'total'
                },
                //前台传字符串到后台乱码问题
                actionMethods:{
                    read:'POST'
                }
            },
            sorters : [ {
                property : config.sortProperty || 'id',
                direction : config.sortDirection || 'ASC'
            } ]
        });
    }
});



Ext.define('App.win.sys.panelInfoWin', {
    extend :'App.win.sys.infoGridPanel',
    orderNo:null,

    initComponent : function() {
        var me = this;

        Ext.define('List', {
            extend : 'Ext.data.Model',
            idProperty : 'barCode',
            fields : [ 'barCode', 'orderNo', 'materialId', 'name', 'material',
                'cutLength', 'cutWidth', 'qty', 'exceed', 'exceed',
                'ignore', 'grain', 'batchNo', 'slotting', 'remarks',
                'dimension', 'edgeBanding1', 'edgeBanding2',
                'edgeBanding3', 'edgeBanding4', 'barCode2', 'length',
                'width', 'height', 'ratio', 'area', 'volume', 'weight',
                'classify', 'isBOM3', 'packNo', 'layerNo', 'xh' ]
        });

        var store = me.createStore({
            modelName : 'List',
            proxyUrl : './Panel/getPage',
            sortProperty : 'orderNo',
            sortDirection : 'DESC',
            extraParams:{
                orderNo:me.orderNo
            }
        });
        store.load();

        var columns = [ {
            xtype : 'rownumberer',
            text : '序号',
            align : 'center',
            width : 50
        }, {
            text : "包装号",
            dataIndex : 'packNo',
            width : 100
        }, {
            text : "条码号",
            dataIndex : 'barCode',
            width : 150
        }, {
            text : "订单号",
            dataIndex : 'orderNo',
            width : 150
        }, {
            text : "分类编号",
            dataIndex : 'classify',
            width : 150
        } ];

        Ext.apply(this, {
            store : store,
            columns : columns
        });
        this.callParent(arguments);
    }
});



Ext.define('App.win.sys.hardwareInfoWin', {
    extend : 'App.win.sys.infoGridPanel',

    initComponent : function() {
        var me = this;

        Ext.define('List', {
            extend : 'Ext.data.Model',
            idProperty : 'barCode',
            fields : [ 'orderNo', 'idx', 'warehouse', 'procuctNo',
                'productName', 'factoryNo', 'hardwareName', 'spec', 'qty',
                'material', 'color', 'remarks', 'remarks1', 'barCode',
                'code', 'length', 'width', 'height', 'ratio', 'area',
                'volume', 'weight', 'classify', 'packNo', 'layerNo', 'xh' ]
        });

        var store = me.createStore({
            modelName : 'List',
            proxyUrl : './HardWare/getPage',
            sortProperty : 'orderNo',
            sortDirection : 'DESC',
            extraParams:{
                orderNo:me.orderNo
            }
        });
        store.load();

        var columns = [ {
            xtype : 'rownumberer',
            text : '序号',
            align : 'center',
            width : 50
        }, {
            text : "包装号",
            dataIndex : 'packNo',
            width : 100
        }, {
            text : "条码号",
            dataIndex : 'barCode',
            width : 150
        }, {
            text : "订单号",
            dataIndex : 'orderNo',
            width : 150
        }, {
            text : "分类编号",
            dataIndex : 'classify',
            width : 150
        } ];

        Ext.apply(this, {
            store : store,
            columns : columns,
        });
        this.callParent(arguments);
    }
});



Ext.define('App.win.sys.doorInfoWin', {
    extend : 'App.win.sys.infoGridPanel',

    initComponent : function() {
        var me = this;

        Ext.define('List', {
            extend : 'Ext.data.Model',
            idProperty : 'barCode',
            fields : [ 'barCode', 'orderNo', 'workshop', 'procuctNo',
                'productName', 'factoryNo', 'doorType', 'doorHoleNo',
                'doorName', 'spec', 'doorLeafNo', 'qty', 'edgeBanding',
                'remarks', 'remarks2', 'remarks3', 'remarks3', 'packNo' ]
        });

        var store = me.createStore({
            modelName : 'List',
            proxyUrl : './Door/getPage',
            sortProperty : 'orderNo',
            sortDirection : 'DESC',
            extraParams:{
                orderNo:me.orderNo
            }
        });
        store.load();

        var columns = [ {
            xtype : 'rownumberer',
            text : '序号',
            align : 'center',
            width : 50
        }, {
            text : "包装号",
            dataIndex : 'packNo',
            width : 100
        }, {
            text : "条码号",
            dataIndex : 'barCode',
            width : 150
        }, {
            text : "订单号",
            dataIndex : 'orderNo',
            width : 150
        }, {
            text : "门车间",
            dataIndex : 'workshop',
            width : 150
        }, {
            text : "产品号",
            dataIndex : 'procuctNo',
            width : 150
        }, {
            text : "产品名称",
            dataIndex : 'productName',
            width : 150
        }, {
            text : "厂编",
            dataIndex : 'factoryNo',
            width : 100
        }, {
            text : "分类编号",
            dataIndex : 'classify',
            width : 150
        } ];

        Ext.apply(this, {
            store : store,
            columns : columns
        });
        this.callParent(arguments);
    }
});



Ext.define('App.win.sys.PHDInfoWin',{
    extend:'Ext.tab.Panel',
    chooseId:null,

    initComponent:function(){
        var me = this;

        Ext.apply(me,{
            region:'center',
            id : 'content_panel',
            activeTab:0,
            border:false,
            resizable:false,
            items:[{
                title:'柜体信息',
                xtype:'panel',
                layout:'fit',
                items:Ext.create('App.win.sys.panelInfoWin',{
                    orderNo:me.chooseId
                })
            },{
                title:'五金信息',
                xtype:'panel',
                layout:'fit',
                items:Ext.create('App.win.sys.hardwareInfoWin',{
                    orderNo:me.chooseId
                })
            },{
                title:'门信息',
                xtype:'panel',
                layout:'fit',
                items:Ext.create('App.win.sys.doorInfoWin',{
                    orderNo:me.chooseId
                })
            }]
        });

        me.callParent(arguments);
    }
});