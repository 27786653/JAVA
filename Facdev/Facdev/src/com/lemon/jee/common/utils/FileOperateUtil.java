/**
 *
 * @author geloin
 * @date 2012-5-5 下午12:05:57
 */
package com.lemon.jee.common.utils;

import java.awt.Image;
import java.awt.image.BufferedImage;
import java.io.BufferedInputStream;
import java.io.BufferedOutputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;

import com.sun.image.codec.jpeg.JPEGCodec;
import com.sun.image.codec.jpeg.JPEGEncodeParam;
import com.sun.image.codec.jpeg.JPEGImageEncoder;

/**
 * 
 * @author lichuangwu
 * @date 2012-5-5 下午12:05:57
 */
public class FileOperateUtil {
	public static final String PARANAME = "paraName";
	public static final String REALNAME = "realName";
	public static final String STORENAME = "storeName";
	public static final String FILEPATH = "filepath";
	public static final String PATHDIR = "pathDir";
	public static final String SIZE = "size";
	public static final String SUFFIX = "suffix";
	public static final String CONTENTTYPE = "contentType";
	public static final String CREATETIME = "createTime";
	// public static final String UPLOADDIR = "Gimgs";
	public static final String UPLOADDIR = "upload";
	public static final String EXTRAPARAMS = "extraParams";

	/**
	 * 将上传的文件进行重命名
	 * 
	 * @author geloin
	 * @date 2012-3-29 下午3:39:53
	 * @param name
	 * @return
	 */
	@SuppressWarnings("unused")
	private static String rename(String name) {

		Long now = Long.parseLong(new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()));
		Long random = (long) (Math.random() * now);
		String fileName = now + "" + random;

		if (name.indexOf(".") != -1) {
			fileName += name.substring(name.lastIndexOf("."));
		}

		return fileName;
	}

	/**
	 * 压缩后的文件名
	 * 
	 * @author geloin
	 * @date 2012-3-29 下午6:21:32
	 * @param name
	 * @return
	 */
	private static String suffixName(String name) {
		String suffix = name.substring(name.lastIndexOf("."));
		return suffix;
	}

	/**
	 * 上传文件
	 * 
	 * @author geloin
	 * @date 2012-5-5 下午12:25:47
	 * @param request
	 * @return
	 * @throws Exception
	 */
	public static List<Map<String, Object>> upload(HttpServletRequest request, String path) {

		List<Map<String, Object>> result = new ArrayList<Map<String, Object>>();

		MultipartHttpServletRequest mRequest = (MultipartHttpServletRequest) request;
		Map<String, MultipartFile> fileMap = mRequest.getFileMap();
		System.out.println("fileMap.size() : " + fileMap.size());

		String uploadDir = request.getSession().getServletContext().getRealPath("/") + path;
		System.out.println(uploadDir);
		File file = new File(uploadDir);

		if (!file.exists()) {
			file.mkdir();
		}

		String fileName = null;
		// int i = 0;
		for (Iterator<Map.Entry<String, MultipartFile>> it = fileMap.entrySet().iterator(); it.hasNext();/* i++ */) {

			Map.Entry<String, MultipartFile> entry = it.next();
			MultipartFile mFile = entry.getValue();

			fileName = mFile.getOriginalFilename();
			if (fileName.trim().equals("")) {
				continue;
			}

			String storeName = rename(fileName);

			/** 拼成完整的文件保存路径加文件* */
			String fileUpName = uploadDir + File.separator + storeName;
			File fileUp = new File(fileUpName);
			try {
				mFile.transferTo(fileUp);

			} catch (IllegalStateException e) {
				e.printStackTrace();
				return null;
			} catch (IOException e) {
				e.printStackTrace();
				return null;
			}

			Map<String, Object> map = new HashMap<String, Object>();
			// 固定参数值对
			map.put(FileOperateUtil.PARANAME, mFile.getName());
			map.put(FileOperateUtil.REALNAME, fileName);
			map.put(FileOperateUtil.STORENAME, storeName);
			map.put(FileOperateUtil.FILEPATH, fileUpName);
			map.put(FileOperateUtil.SIZE, fileUp.length());
			map.put(FileOperateUtil.SUFFIX, suffixName(fileName));
			map.put(FileOperateUtil.CONTENTTYPE, "application/octet-stream");
			map.put(FileOperateUtil.CREATETIME, new Date());
			map.put(FileOperateUtil.PATHDIR, uploadDir);
			map.put(FileOperateUtil.EXTRAPARAMS, mRequest.getParameter("batchNo"));

			result.add(map);
		}
		return result;
	}

	/**
	 * 下载
	 * 
	 * @author geloin
	 * @date 2012-5-5 下午12:25:39
	 * @param request
	 * @param response
	 * @param storeName
	 * @param contentType
	 * @param realName
	 * @throws Exception
	 */
	public static void download(HttpServletRequest request, HttpServletResponse response, String storeName,
			String contentType, String realName) throws Exception {
		response.setContentType("text/html;charset=UTF-8");
		request.setCharacterEncoding("UTF-8");
		BufferedInputStream bis = null;
		BufferedOutputStream bos = null;
		String ctxPath = request.getSession().getServletContext().getRealPath("/") + FileOperateUtil.UPLOADDIR;
		System.out.println("ctxPath==" + ctxPath + "storeName=" + File.separator + storeName);
		String downLoadPath = ctxPath + File.separator + storeName;
		System.out.println("path=" + downLoadPath);
		long fileLength = new File(downLoadPath).length();
		response.reset();
		response.setContentType(contentType);
		response.setHeader("Content-Disposition",
				"attachment; filename=" + new String(realName.getBytes("utf-8"), "ISO8859-1"));
		response.setHeader("Content-Length", String.valueOf(fileLength));
		System.out.println("downLoadPath=" + downLoadPath);
		bis = new BufferedInputStream(new FileInputStream(downLoadPath));
		bos = new BufferedOutputStream(response.getOutputStream());
		byte[] buff = new byte[2048];
		int bytesRead;
		while (-1 != (bytesRead = bis.read(buff, 0, buff.length))) {
			bos.write(buff, 0, bytesRead);
		}
		bis.close();
		bos.close();
	}

	/**
	 * 下载
	 * 
	 * @author geloin
	 * @date 2012-5-5 下午12:25:39
	 * @param request
	 * @param response
	 * @param storeName
	 * @param contentType
	 * @param realName
	 * @param path
	 * @throws Exception
	 */
	public static void downloadPDF(HttpServletRequest request, HttpServletResponse response, String storeName,
			String contentType, String realName, String path) throws Exception {
		response.setContentType("text/html;charset=UTF-8");
		request.setCharacterEncoding("UTF-8");
		BufferedInputStream bis = null;
		BufferedOutputStream bos = null;

		// String ctxPath = request.getSession().getServletContext()
		// .getRealPath("/")
		// + path;
		// String downLoadPath = ctxPath + storeName;
		String downLoadPath = path;

		long fileLength = new File(downLoadPath).length();
		response.setContentType(contentType);
		response.setHeader("Content-disposition",
				"attachment; filename=" + new String(realName.getBytes("utf-8"), "ISO8859-1"));
		response.setHeader("Content-Length", String.valueOf(fileLength));

		bis = new BufferedInputStream(new FileInputStream(downLoadPath));
		bos = new BufferedOutputStream(response.getOutputStream());
		byte[] buff = new byte[2048];
		int bytesRead;
		while (-1 != (bytesRead = bis.read(buff, 0, buff.length))) {
			bos.write(buff, 0, bytesRead);
		}
		bis.close();
		bos.close();
	}

	/**
	 * 返回存储路径
	 * 
	 * @param request
	 * @return
	 */
	public static String getSaveFile(HttpServletRequest request) {
		return request.getSession().getServletContext().getRealPath("/");
	}

	/**
	 * 删除临时文件
	 * 
	 * @param pathName
	 * @return
	 */
	public static boolean deleteDirictory(String pathName) {

		if (!pathName.endsWith(File.separator)) {
			pathName = pathName + File.separator;
		}
		File file = new File(pathName);
		if (!file.exists() || !file.isDirectory()) {
			return false;
		}
		// 删除文件夹下的所有文件(包括子目录)
		File[] files = file.listFiles();
		for (int i = 0; i < files.length; i++) {
			if (files[i].isFile()) {
				String path = files[i].getAbsolutePath();
				File f = new File(path);
				if (f.isFile() && f.exists()) {
					f.delete();
				}
			} else {
				deleteDirictory(files[i].getAbsolutePath());
			}
		}
		return true;
	}

	/**
	 * 创建缩略图
	 * 
	 * @param file
	 *            上传的文件流
	 * @param height
	 *            最小的尺寸
	 * @throws IOException
	 */
	public static void createMiniPic(File file, float width, float height) throws IOException {
		Image src = javax.imageio.ImageIO.read(file); // 构造Image对象
		int old_w = src.getWidth(null); // 得到源图宽
		int old_h = src.getHeight(null);
		System.out.println("old_w=" + old_w);
		System.out.println("old_h=" + old_h);
		int new_w = 0;
		int new_h = 0; // 得到源图长
		float tempdouble = old_w / width;
		// if (old_w >= old_h) {
		// tempdouble = old_w / width;
		// } else {
		// tempdouble = old_h / height;
		// }
		System.out.println(tempdouble);
		new_w = Math.round(old_w / tempdouble);
		new_h = Math.round(old_h / tempdouble);// 计算新图长宽
		while (new_w > width && new_h > height) {
			if (new_w > width) {
				tempdouble = new_w / width;
				new_w = Math.round(new_w / tempdouble);
				new_h = Math.round(new_h / tempdouble);
			}
			if (new_h > height) {
				tempdouble = new_h / height;
				new_w = Math.round(new_w / tempdouble);
				new_h = Math.round(new_h / tempdouble);
			}
		}

		// BufferedImage tag = new BufferedImage(new_w, new_h,
		// BufferedImage.TYPE_INT_RGB);
		// tag.getGraphics().drawImage(src, 0, 0, new_w, new_h, null); //
		// 绘制缩小后的图
		BufferedImage tag = new BufferedImage(580, 370, BufferedImage.TYPE_INT_RGB);
		tag.getGraphics().drawImage(src, 0, 0, 580, 370, null); // 绘制缩小后的图
		FileOutputStream newimage = new FileOutputStream(file); // 输出到文件流
		JPEGImageEncoder encoder = JPEGCodec.createJPEGEncoder(newimage);
		JPEGEncodeParam param = encoder.getDefaultJPEGEncodeParam(tag);
		param.setQuality((float) (80 / 100.0), true);// 设置图片质量,100最大,默认70
		encoder.encode(tag, param);
		encoder.encode(tag); // 将JPEG编码
		newimage.close();
		// if (old_w >= width || old_h >= height) { // 如果文件小于锁略图的尺寸则复制即可
		// new_w = Math.round(old_w / tempdouble);
		// new_h = Math.round(old_h / tempdouble);// 计算新图长宽
		// while (new_w > width && new_h > height) {
		// if (new_w > width) {
		// tempdouble = new_w / width;
		// new_w = Math.round(new_w / tempdouble);
		// new_h = Math.round(new_h / tempdouble);
		// }
		// if (new_h > height) {
		// tempdouble = new_h / height;
		// new_w = Math.round(new_w / tempdouble);
		// new_h = Math.round(new_h / tempdouble);
		// }
		// }
		// System.out.println("new_w="+new_w);
		// System.out.println("new_h="+new_h);
		//// BufferedImage tag = new BufferedImage(new_w, new_h,
		//// BufferedImage.TYPE_INT_RGB);
		//// tag.getGraphics().drawImage(src, 0, 0, new_w, new_h, null); //
		// 绘制缩小后的图
		// BufferedImage tag = new BufferedImage(520, 340,
		// BufferedImage.TYPE_INT_RGB);
		// tag.getGraphics().drawImage(src, 0, 0, 520, 340, null); // 绘制缩小后的图
		// FileOutputStream newimage = new FileOutputStream(file); // 输出到文件流
		// JPEGImageEncoder encoder = JPEGCodec.createJPEGEncoder(newimage);
		// JPEGEncodeParam param = encoder.getDefaultJPEGEncodeParam(tag);
		// param.setQuality((float) (80 / 100.0), true);// 设置图片质量,100最大,默认70
		// encoder.encode(tag, param);
		// encoder.encode(tag); // 将JPEG编码
		// newimage.close();
		// }
	}

	/**
	 * 文件的复制
	 * 
	 * @param fileFrom
	 * @param fileTo
	 * @return
	 * @throws IOException
	 */
	public static boolean copy(String fileFrom, String fileTo, HttpServletRequest request, String storeName) {
		try {
			File file = new File(fileTo);

			System.out.println("name=" + file.getName());
			if (!file.exists()) {
				file.mkdir();
			}
			FileInputStream in = new java.io.FileInputStream(fileFrom);
			FileOutputStream out = new java.io.FileOutputStream(fileTo + File.separator + storeName);
			out.getChannel().transferFrom(in.getChannel(), 0, in.getChannel().size());
			in.close();
			out.close();
			return true;
		} catch (IOException ex) {
			return false;
		}
	}

	public static boolean delFile(File file) throws Exception {
		if (!file.exists()) {
			return false;
		}
		if (file.isFile()) {
			if (file.canWrite()) {
				file.delete();
				return true;
			} else {
				return false;
			}
		} else {
			return false;
		}
	}
}
