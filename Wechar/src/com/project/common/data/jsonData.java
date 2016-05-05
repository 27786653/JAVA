package com.project.common.data;


public class jsonData {

	private String info;                //内容 
	private String status;            //状态
	private String  timeto;         //超时时间
	private String gotoPage;    //到达的页面
	private Object Content;     //自定义内容
	
	
	private static jsonData jsondata;
	
	public static jsonData getjsondata(String info,String status,String timeto,String gotopage,Object content){
		if(jsondata==null){
			jsondata=new jsonData();
		}
		jsondata.setInfo(info);
		jsondata.setGotoPage(gotopage);
		jsondata.setStatus(status);
		jsondata.setTimeto(timeto);
		if(content!=null)jsondata.setContent(content);
		return jsondata;
	}
	
	public String getInfo() {
		return info;
	}
	public void setInfo(String info) {
		this.info = info;
	}
	public String getStatus() {
		return status;
	}
	public void setStatus(String status) {
		this.status = status;
	}
	public String getTimeto() {
		return timeto;
	}
	public void setTimeto(String timeto) {
		this.timeto = timeto;
	}
	public String getGotoPage() {
		return gotoPage;
	}
	public void setGotoPage(String gotoPage) {
		this.gotoPage = gotoPage;
	}
	public Object getContent() {
		return Content;
	}
	public void setContent(Object content) {
		Content = content;
	}
	
}
