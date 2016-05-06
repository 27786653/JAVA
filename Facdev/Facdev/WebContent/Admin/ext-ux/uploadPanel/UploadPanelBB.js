/**
 * 多文件上传组件 for extjs4.0
 * 
 * @author caizhiping
 * @since 2012-11-15
 */
Ext.define('Ext.ux.uploadPanel.UploadPanelBB', {
	extend : 'Ext.grid.Panel',
	alias : 'widget.uploadpanelBB',
//	width : 700,
	height : 500,
	columns : [
			{
                text:'序号',
				xtype : 'rownumberer',
                align:'center',
                width:50
			},
			{
				text : '文件名',
				width : 200,
				dataIndex : 'fileName',
                align:'center'
			},
//			 {
//				text : '自定义文件名',
//				width : 200,
//				dataIndex : 'name',
//                align:'center',
//				editor : {
//					xtype : 'textfield'
//				}
//			},
			// {text: '类型', width: 70,dataIndex: 'type'},
			{
				text : '大小',
				width : 80,
				dataIndex : 'size',
                align:'center',
				renderer : function(v) {
					return Ext.util.Format.fileSize(v);
				}
			},
			{
				text : '进度',
				width : 130,
				dataIndex : 'percent',
                align:'center',
				renderer : function(v) {
					var stml = '<div>' + '<div style="border:1px solid #008000;height:15px;width:115px;margin:2px 0px 1px 0px;float:left;">'
							+ '<div style="float:left;background:#FFCC66;width:' + v + '%;height:15px;"><div></div></div>' + '</div>' +
							// '<div
							// style="text-align:center;float:right;width:40px;margin:3px
							// 0px 1px
							// 0px;height:10px;font-size:12px;">{3}%</div>'+
							'</div>';
					return stml;
				}
			}, {
				text : '状态',
				flex : 1,
				dataIndex : 'status',
                align:'center',
                width:80,
				renderer : function(v) {
					var status;
					if (v == -1) {
						status = "等待上传";
					} else if (v == -2) {
						status = "上传中...";
					} else if (v == -3) {
						status = "<div style='color:red;'>上传失败</div>";
					} else if (v == -4) {
						status = "上传成功";
					} else if (v == -5) {
						status = "停止上传";
					}
					return status;
				}
			}, {
				xtype : 'actioncolumn',
                text:'删除',
				width : 60,
                align:'center',
				items : [ {
					icon : appBaseUri + 'ext-ux/uploadPanel/icons/delete.gif',
					tooltip : 'Remove',
					handler : function(grid, rowIndex, colIndex) {
//                        console.log(grid);
//                        console.log(rowIndex);
						var id = grid.store.getAt(rowIndex).get('id');
//                        console.log('id='+id);
						grid.store.remove(grid.store.getAt(rowIndex));
					}
				} ]
			} ],
	plugins : [ Ext.create('Ext.grid.plugin.CellEditing', {
		clicksToEdit : 1
	}) ],
	store : Ext.create('Ext.data.JsonStore', {
		autoLoad : false,
		fields : [ 'id', 'name', 'type', 'size', 'percent', 'status', 'fileName' ]
	}),
	addFileBtnText : 'Add File',
	uploadBtnText : 'Upload',
//	removeBtnText : 'Remove All',
	cancelBtnText : 'Cancel',
	debug : false,
	file_size_limit : "2",//MB
	file_types : '*.jpg;*.gif;*.jpeg;*.png;*.bmp',
	file_types_description : 'All Files',
	file_upload_limit : 50,
	file_queue_limit : 0,
	post_params : {},
	upload_url : './upFile.do',
	flash_url : appBaseUri + "ext-ux/uploadPanel/swfupload/swfupload.swf",
	flash9_url : appBaseUri + "ext-ux/uploadPanel/swfupload/swfupload_fp9.swf",
	initComponent : function() {

		this.dockedItems = [ {
			xtype : 'toolbar',
			dock : 'top',
			items : [ {
				xtype : 'button',
				itemId : 'addFileBtn',
				// iconCls : 'add',
				icon : appBaseUri + 'ext-ux/uploadPanel/icons/add.gif',
				id : '_btn_for_swf_',
				text : this.addFileBtnText
			}, {
				xtype : 'tbseparator'
			}, {
				xtype : 'button',
				itemId : 'uploadBtn',
				// iconCls : 'up',
				icon : appBaseUri + 'ext-ux/uploadPanel/icons/up.gif',
				text : this.uploadBtnText,
				scope : this,
				handler : this.onUpload
			}, {
				xtype : 'tbseparator'
			},
//                {
//				xtype : 'button',
//				itemId : 'removeBtn',
//				// iconCls : 'trash',
//				icon : appBaseUri + 'ext-ux/uploadPanel/icons/trash.gif',
//				text : this.removeBtnText,
//				scope : this,
//				handler : this.onRemove()
//			},
                {
				xtype : 'tbseparator'
			}, {
				xtype : 'button',
				itemId : 'cancelBtn',
				// iconCls : 'cancel',
				icon : appBaseUri + 'ext-ux/uploadPanel/icons/cancel.gif',
				disabled : true,
				text : this.cancelBtnText,
				scope : this,
				handler : this.onCancelUpload
			} ]
		} ];

		this.callParent();
		this.down('button[itemId=addFileBtn]').on({
			afterrender : function(btn) {
//                console.log('addFileBtn1');
                var config = this.getSWFConfig(btn);
				this.swfupload = new SWFUpload(config);
//                console.log('addFileBtn2');
                Ext.get(this.swfupload.movieName).setStyle({
					position : 'absolute',
					top : 0,
					left : -2
				});
//                console.log('addFileBtn3');
            },
			scope : this,
			buffer : 300
		});
	},
//    destroy:function(){
//        console.log('upload_destroy');
//        this.swfupload.destroy();
//    },
	getSWFConfig : function(btn) {
		var me = this;
		var placeHolderId = Ext.id();
		var em = btn.getEl().child('em');
		if (em == null) {
			em = Ext.get(btn.getId() + '-btnWrap');
		}
		em.setStyle({
			position : 'relative',
			display : 'block'
		});
		em.createChild({
			tag : 'div',
			id : placeHolderId
		});
		return {
			debug : me.debug,
			flash_url : me.flash_url,
			flash9_url : me.flash9_url,
			upload_url : me.upload_url,
			post_params : me.post_params || {
				savePath : 'middleFolder\\'
			},
			file_size_limit : me.file_size_limit,
			file_types : me.file_types,
			file_types_description : me.file_types_description,
			file_upload_limit : me.file_upload_limit,
			file_queue_limit : me.file_queue_limit,
			button_width : em.getWidth(),
			button_height : em.getHeight(),
			button_window_mode : SWFUpload.WINDOW_MODE.TRANSPARENT,
			button_cursor : SWFUpload.CURSOR.HAND,
			button_placeholder_id : placeHolderId,
			custom_settings : {
				scope_handler : me
			},
			swfupload_preload_handler : me.swfupload_preload_handler,
			file_queue_error_handler : me.file_queue_error_handler,
			swfupload_load_failed_handler : me.swfupload_load_failed_handler,
			upload_start_handler : me.upload_start_handler,
			upload_progress_handler : me.upload_progress_handler,
			upload_error_handler : me.upload_error_handler,
			upload_success_handler : me.upload_success_handler,
			upload_complete_handler : me.upload_complete_handler,
			file_queued_handler : me.file_queued_handler
		/*
		 * , file_dialog_complete_handler : me.file_dialog_complete_handler
		 */
		};
	},
	swfupload_preload_handler : function() {
		if (!this.support.loading) {
			Ext.Msg.show({
				title : '提示',
				msg : '浏览器Flash Player版本太低,不能使用该上传功能！',
				width : 250,
				icon : Ext.Msg.ERROR,
				buttons : Ext.Msg.OK
			});
			return false;
		}
	},
	file_queue_error_handler : function(file, errorCode, message) {
		switch (errorCode) {
		case SWFUpload.QUEUE_ERROR.QUEUE_LIMIT_EXCEEDED:
			msg('上传文件列表数量超限,不能选择！');
			break;
		case SWFUpload.QUEUE_ERROR.FILE_EXCEEDS_SIZE_LIMIT:
			msg('文件大小超过20M, 不能上传！');
			break;
		case SWFUpload.QUEUE_ERROR.ZERO_BYTE_FILE:
			msg('该文件大小为0,不能选择！');
			break;
		case SWFUpload.QUEUE_ERROR.INVALID_FILETYPE:
			msg('该文件类型不允许上传！');
			break;
		}
		function msg(info) {
			Ext.Msg.show({
				title : '提示',
				msg : info,
				width : 250,
				icon : Ext.Msg.WARNING,
				buttons : Ext.Msg.OK
			});
		}
	},
	swfupload_load_failed_handler : function() {
		Ext.Msg.show({
			title : '提示',
			msg : 'SWFUpload加载失败！',
			width : 180,
			icon : Ext.Msg.ERROR,
			buttons : Ext.Msg.OK
		});
	},
	upload_start_handler : function(file) {
//        console.log('upload_start_handler');
//        console.log(file);
        var me = this.settings.custom_settings.scope_handler;
//        console.log(me.store.getById());
		me.down('#cancelBtn').setDisabled(false);
        if(me.store.getById(file.id)!=null){       //修复删除后不能断点上传7.24
//            console.log('11111111');
            var rec = me.store.getById(file.id);
//            console.log(rec);
            this.setFilePostName(encodeURIComponent(rec.get('fileName')));
        }

	},
	upload_progress_handler : function(file, bytesLoaded, bytesTotal) {
//        console.log('upload_progress_handler');
		var me = this.settings.custom_settings.scope_handler;
        if(me.store.getById(file.id)!=null) {       //
            var percent = Math.ceil((bytesLoaded / bytesTotal) * 100);
            percent = percent == 100 ? 99 : percent;
            var rec = me.store.getById(file.id);
            rec.set('percent', percent);
            rec.set('status', file.filestatus);
            rec.commit();
        }
	},
	upload_error_handler : function(file, errorCode, message) {
//        console.log('upload_error_handler');
        var me = this.settings.custom_settings.scope_handler;
		var rec = me.store.getById(file.id);
		rec.set('percent', 0);
		rec.set('status', file.filestatus);
		rec.commit();
	},
	upload_success_handler : function(file, serverData, responseReceived) {
//        console.log('upload_success_handler');
        var me = this.settings.custom_settings.scope_handler;
        if(me.store.getById(file.id)!=null) {  //
            var rec = me.store.getById(file.id);
            if (Ext.JSON.decode(serverData).success) {
                rec.set('percent', 100);
                rec.set('status', file.filestatus);
            } else {
                rec.set('percent', 0);
                rec.set('status', SWFUpload.FILE_STATUS.ERROR);
            }
            rec.commit();

        }
        if (this.getStats().files_queued > 0 && this.uploadStopped == false) {
            this.startUpload();
        } else {
            me.showBtn(me, true);
        }
	},
	upload_complete_handler : function(file) {

	},
	file_queued_handler : function(file) {
		var me = this.settings.custom_settings.scope_handler;
		me.store.add({
			id : file.id,
			name : file.name,
			fileName : file.name,
			size : file.size,
			type : file.type,
			status : file.filestatus,
			percent : 0
		});
	},
	onUpload : function() {
//        console.log('onUpload');
		if (this.swfupload && this.store.getCount() > 0) {
//            console.log('1');
//            console.log(this.swfupload.getStats());
//            console.log(this.swfupload.getStats().files_queued);
			if (this.swfupload.getStats().files_queued > 0) {
//                console.log(this);
				this.showBtn(this, false);
//                console.log(this.swfupload.uploadStopped);
				this.swfupload.uploadStopped = false;
				this.swfupload.startUpload();
			}
		}
	},
	showBtn : function(me, bl) {
//        console.log('addFileBtn2');
        me.down('#addFileBtn').setDisabled(!bl);
		me.down('#uploadBtn').setDisabled(!bl);
//		me.down('#removeBtn').setDisabled(!bl);
		me.down('#cancelBtn').setDisabled(bl);
		if (bl) {
			me.down('actioncolumn').show();
		} else {
			me.down('actioncolumn').hide();
		}
	},
//	onRemove : function() {
//		var ds = this.store;
//        console.log('ds');
//        console.log(ds);
//		for (var i = 0; i < ds.getCount(); i++) {
//            console.log('for');
//			var record = ds.getAt(i);
//			var file_id = record.get('id');
//            this.swfupload.cancelUpload(file_id, false);
//
//        }
//        if(ds.getCount()!=0){
//            console.log('removeAll');
//                ds.removeAll();
//        }
//        this.swfupload.uploadStopped = false;
////		ds.removeAll();
//	},

//    onRemove : function() {
//        var ds = this.store;
//        for (var i = 0; i < ds.getCount(); i++) {
//            var record = ds.getAt(i);
//            var file_id = record.get('id');
//            this.swfupload.cancelUpload(file_id, false);
//        }
//        if (ds.getCount() != 0) {
//            ds.loadData([], false);
//        } else {
//            showFailMesg({
//                msg : '上传任务列表为空，请选择上传文件。'
//            });
//        }
//        this.swfupload.uploadStopped = false;
//    },
	onCancelUpload : function() {
		if (this.swfupload) {
			this.swfupload.uploadStopped = true;
			this.swfupload.stopUpload();
			this.showBtn(this, true);
		}
	}
});