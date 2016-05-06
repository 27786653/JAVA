package util;

import java.io.File;
import java.util.ArrayList;
import java.util.regex.Matcher;
import java.util.regex.Pattern;
/**
 * 查找文件的工具类
 * @author 李森林
 * 描述一下：
 * 2016-4-10  下午10:15:37
 */
public class SearchFile {
	

	public SearchFile() {
	}

	/**
	 * 在本文件夹下查找
	 * 
	 * @param s
	 *            String 文件名
	 * @return File[] 找到的文件
	 */
	public static File[] getFiles(String s) {
		return getFiles("./", s);
	}

	/**
	 * 获取文件 可以根据正则表达式查找
	 * 
	 * @param dir
	 *            String 文件夹名称
	 * @param s
	 *            String 查找文件名，可带*.?进行模糊查询
	 * @return File[] 找到的文件
	 */
	public static File[] getFiles(String dir, String s) {
		// 开始的文件夹
		File file = new File(dir);
		s = s.replace('.', '#');
		s = s.replaceAll("#", "\\\\.");
		s = s.replace('*', '#');
		s = s.replaceAll("#", ".*");
		s = s.replace('?', '#');
		s = s.replaceAll("#", ".?");
		s = "^" + s + "$";
		  File[] rtns = null;
		Pattern p = Pattern.compile(s);
		ArrayList list = filePattern(file, p);
		
		if(list==null)list=new ArrayList();
			
			rtns = new File[list.size()];
			list.toArray(rtns);
		
		return rtns;
	}

	/**
	 * @param file
	 *            File 起始文件夹
	 * @param p
	 *            Pattern 匹配类型
	 * @return ArrayList 其文件夹下的文件夹
	 */

	private static ArrayList filePattern(File file, Pattern p) {
		if (file == null) {
			return null;
		} else if (file.isFile()) {
			Matcher fMatcher = p.matcher(file.getName());
			if (fMatcher.matches()) {
				ArrayList list = new ArrayList();
				list.add(file);
				return list;
			}
		} else if (file.isDirectory()) {
			File[] files = file.listFiles();
			if (files != null && files.length > 0) {
				ArrayList list = new ArrayList();
				for (int i = 0; i < files.length; i++) {
					ArrayList rlist = filePattern(files[i], p);
					if (rlist != null) {
						list.addAll(rlist);
					}
				}
				return list;
			}
		}
		return null;
	}

	/**
	 * 测试
	 * 
	 * @param args
	 *            String[]
	 */
	public static void main(String[] args) {
//				File[] files = SearchFile.getFiles("C:\\Users\\李森林\\Desktop\\file\\测试\\20160404更新合同","*移动广东佛山自有000618.*");
//				System.out.println(files);
	}
}