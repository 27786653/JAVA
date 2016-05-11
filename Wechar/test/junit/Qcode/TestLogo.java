package junit.Qcode;

import java.io.File;
import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

import org.junit.Test;

import com.google.zxing.BarcodeFormat;
import com.google.zxing.EncodeHintType;
import com.google.zxing.MultiFormatWriter;
import com.google.zxing.WriterException;
import com.google.zxing.common.BitMatrix;
import com.project.common.QCode.MatrixToImageWriter;
import com.project.common.QCode.QRCodeUtil;

public class TestLogo {

	
	/**
	 * 生产二维码
	 */
	@Test
	public void makePICbyTextNoImage(){
		 try {
				String content = "https://www.baidu.com";
				 String path = "E:/";
				 
				 MultiFormatWriter multiFormatWriter = new MultiFormatWriter();
				 Map hints = new HashMap();
				 hints.put(EncodeHintType.CHARACTER_SET, "UTF-8");
				 BitMatrix bitMatrix = multiFormatWriter.encode(content, BarcodeFormat.QR_CODE, 400, 400,hints);
				 File file1 = new File(path,"01.jpg");
				 MatrixToImageWriter.writeToFile(bitMatrix, "jpg", file1);
			} catch (WriterException e) {
				e.printStackTrace();
			} catch (IOException e) {
				e.printStackTrace();
			}
	}
	
	
	/**
	 * 生产图片logo二维码
	 */
	@Test
public void MakeQcodeByimage(){
	try {
		String text = "https://www.baidu.com";  
		QRCodeUtil.encode(text, "e:/01.jpg", "e:/image/", true);
	} catch (Exception e) {
		e.printStackTrace();
	}  
}
	

}
