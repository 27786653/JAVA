import java.io.BufferedWriter;
import java.io.File;
import java.io.FileWriter;
import java.io.IOException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import javax.swing.JLabel;

import org.apache.poi.ss.usermodel.Row;

import util.ExcelUtil;
import util.FileUtil;
import util.SearchFile;
import util.baseTools;
import entity.projectBean;


public class ProjectBeanDao {
	
	
	//获取列表数据
	public List<projectBean> getData() throws IOException{
		ExcelUtil eu = new ExcelUtil();
		//从第一行开始读取
		eu.setStartReadPos(1);
		List<Row> rowList;
		List<projectBean> prolist=new ArrayList<projectBean>();
			rowList = eu.readExcel(baseTools.src_xlspath);
			for(Row row:rowList){
				projectBean bean=new projectBean();
				try {
				 bean.setTrueCode((int)row.getCell(baseTools.TrueCodeCol).getNumericCellValue()+"");
				} catch (Exception e) {
					try {
						bean.setTrueCode(row.getCell(baseTools.TrueCodeCol).getStringCellValue().trim());
					} catch (Exception e2) {
						bean.setTrueCode("");
					}
				}
				try {
					 bean.setFileName(row.getCell(baseTools.FIleNameCol).getNumericCellValue()+"");
					} catch (Exception e) {
						try {
							bean.setFileName(row.getCell(baseTools.FIleNameCol).getStringCellValue().trim());
						} catch (Exception e2) {
							bean.setFileName("");
						}
					}
				try {
					bean.setSaoFileCode((int)row.getCell(baseTools.SaoFileCol).getNumericCellValue()+"");
				} catch (Exception e) {
					try {
						bean.setSaoFileCode(row.getCell(baseTools.SaoFileCol).getStringCellValue().trim());
					} catch (Exception e2) {
						bean.setSaoFileCode("");
					}
				}
				prolist.add(bean);
			}
			System.out.println("导入数据集合长度为:"+rowList.size());
		return prolist;
	}
	

	private boolean isPicExist=true;
	private boolean isHetongExist=true;
	
	//数据整理导出
	public void OKbing(final List<projectBean> beanList,final JLabel j ){
		new Thread(new Runnable() {
			@Override
			public void run() {
				for (int i=0;i<beanList.size();i++) {
					//初始化存放文件夹
					projectBean bean = beanList.get(i);
					String savefilename = baseTools.ExprotPath+"\\"+bean.getFileName();
					if(!FileUtil.isExist(savefilename)){
						FileUtil.createDir(savefilename+"\\同意函");
					}
					//同意函图片
					String imagePath = baseTools.TruePath+"\\"+bean.getTrueCode();
					File[] picfiles = SearchFile.getFiles(baseTools.TruePath,bean.getTrueCode()+".*");
					if(picfiles.length>0&&bean.getTrueCode()!=null&&bean.getTrueCode().length()>0){
						for (int j2 = 0; j2 < picfiles.length; j2++) {
							FileUtil.moveFile(picfiles[j2].getAbsolutePath(),savefilename+"\\同意函");
						}
						if(FileUtil.isExist(imagePath)&&bean.getTrueCode()!=null&&bean.getTrueCode().length()>0){
							FileUtil.moveFolder(imagePath, savefilename+"\\同意函\\"+bean.getTrueCode());
						}
						baseTools.PIcTrue++;
					}else{
						boolean exist=FileUtil.isExist(imagePath);
						if(exist&&bean.getTrueCode()!=null&&bean.getTrueCode().length()>0){
							FileUtil.moveFolder(imagePath, savefilename+"\\同意函\\"+bean.getTrueCode());
							baseTools.PIcTrue++;
						}else{
							isPicExist=false;
						}
					}
					//合同
					if(!FileUtil.isExist(savefilename)){
						FileUtil.createDir(savefilename+"\\合同");
					}
					String hetongPath=baseTools.heTongPath+"\\"+bean.getSaoFileCode();
					File[] files = SearchFile.getFiles(baseTools.heTongPath,"*"+bean.getSaoFileCode()+".*");
					if(files.length>0&&bean.getSaoFileCode()!=null&&bean.getSaoFileCode().length()>0){
						for (int j2 = 0; j2 < files.length; j2++) {
							FileUtil.moveFile(files[j2].getAbsolutePath(),savefilename+"\\合同");
						}
						if(FileUtil.isExist(hetongPath)&&bean.getSaoFileCode()!=null&&bean.getSaoFileCode().length()>0){
							FileUtil.moveFolder(hetongPath, savefilename+"\\合同\\"+bean.getSaoFileCode());
						}
						baseTools.OnlineTrue++;
					}else{
						if(FileUtil.isExist(hetongPath)&&bean.getSaoFileCode()!=null&&bean.getSaoFileCode().length()>0){
							FileUtil.moveFolder(hetongPath, savefilename+"\\合同\\"+bean.getSaoFileCode());
							baseTools.OnlineTrue++;
						}else{
							isHetongExist=false;
						}
					}
					showERROR(i,bean);
				}
				errorContent.append("\r\n成功导出同意函:"+baseTools.PIcTrue+"条,错误导出"+baseTools.Picerror+"条");
				errorContent.append("\r\n成功导出合同:"+baseTools.OnlineTrue+"条,错误导出"+baseTools.Onlineerror+"条");
				
				WriteLog();			
				j.setText("成功导出同意函:"+baseTools.PIcTrue+"条,错误导出"+baseTools.Picerror+"条"+",,"+"成功导出合同:"+baseTools.OnlineTrue+"条,错误导出"+baseTools.Onlineerror+"条");

			}
		}).start();
	}
	
	//打印日志
	public void WriteLog(){
		try {
			BufferedWriter writer = new BufferedWriter(new FileWriter(new File(baseTools.PublicFIlePath+"\\"+new SimpleDateFormat("yyyy年MM月dd日HH时mm分ss秒SSS毫秒").format(new Date())+".txt")));
			 writer.write(errorContent.toString());
			 writer.close();
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
	}
	
	StringBuffer errorContent=new StringBuffer("");
	
	//错误日志拼接
	public  void showERROR(int i,projectBean bean){
		if(isHetongExist&&isPicExist){
			errorContent.append("(存在同意函与合同)-记录第"+(i+1)+"条-文件夹名:"+bean.getFileName()+"-同意函文件名:"+bean.getTrueCode()+"\r\n");
			return;
		}else if(isHetongExist&&!isPicExist){
			errorContent.append("(不存在同意函)-记录第"+(i+1)+"条-文件夹名:"+bean.getFileName()+"-同意函文件名:"+bean.getTrueCode()+"\r\n");
			baseTools.Picerror++;
		}else if(!isHetongExist&&isPicExist){
			errorContent.append("(不存在合同)-记录第"+(i+1)+"条-文件夹名:"+bean.getFileName()+"-合同文件名:"+bean.getSaoFileCode()+"\r\n");
			baseTools.Onlineerror++;
		}else if(!isHetongExist&&!isPicExist){
			errorContent.append("(不存在同意函与合同)-记录第"+(i+1)+"条-文件夹名:"+bean.getFileName()+"-同意函文件名:"+bean.getTrueCode()+"-合同文件名:"+bean.getSaoFileCode()+"\r\n");
			baseTools.Picerror++;
			baseTools.Onlineerror++;
		}
		isHetongExist=true;
		isPicExist=true;
	}
	
}
