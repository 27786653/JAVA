package util;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.FileWriter;
import java.io.IOException;
import java.io.InputStream;
import java.io.PrintWriter;
import java.util.ArrayList;
import java.util.List;

/**
 * <h1>此工具类包含的对文件及文件夹的基本操作</h1>
 * 创建、移动、删除、复制、zip压缩、zip解压 <br>
 * 依赖jar包，ant.jar <br>
 * @author RSun
 * @date 2012-2-26下午04:26:28
 */
public final class FileUtil {

/** 压缩解压编码   **/
private static String ZIP_ENCODING = "GBK";





/**
 * 判断文件是否存在(文件名不区分大小写)
 * @param filePath
文件路径，例如：F:\a.txt
 * @return  存在，返回true；否则，返回false
 */
public static boolean isExist(String filePath) {
File file = null;
boolean boo = false;
try {
file = new File(filePath);
boo = file.exists();
} catch (Exception e) {
e.printStackTrace();
boo = false;
}
return boo;
}


/**
 * 保存文件时避免出现重复文件，后缀加1 <br>
 * 例如：a.txt - a1.txt - a2.txt
 * @param folderPath
文件夹路径
 * @param fileName
文件名
 * @return 可以保存的文件流
 */
public static File clearFile(String folderPath, String fileName) {
File file = new File(folderPath + "/" + fileName);
String prefix = fileName.substring(0, fileName.lastIndexOf("."));
String postfix = fileName.substring(fileName.lastIndexOf("."), fileName.length());
String newFilePrefix = prefix;
int temp = 0;
while (file.exists()) { // 避免新上传目录重复
temp++;
newFilePrefix = prefix + temp;


file = new File(folderPath + "/" + newFilePrefix + postfix);
}

return file;
}



    /**
 * 创建文件夹(目录)
 * @param folderPath 文件夹路径，例如：F:\\bb
 * @return file流
 */
public static File createDir(String folderPath) {
File dirFile = null;
try {
dirFile = new File(folderPath);
// 当前不存在，且路径是文件夹(目录)时创建
if (!(dirFile.exists()) && !(dirFile.isDirectory())) {
dirFile.mkdirs();
}
} catch (Exception e) {
e.printStackTrace();
}
return dirFile;
}



/**
 * 创建文件(文件夹需存在)
 * @param filePath 文件路径，例如F:\\a.txt
 * @return file
 */
public static File createFile(String filePath) {
File file = new File(filePath);
try {
file.createNewFile();
} catch (IOException e) {
e.printStackTrace();
}
return file;
}



/**
 * 新建文件(带内容) -- 文件夹需存在
 * @param filePath
文件路径及名称，如：F:\\a.txt
 * @param fileContent 要写入的文件内容
 * @return
 */
public static void createFile(String filePath, String fileContent) {


try {
File myFilePath = new File(filePath);
if (!myFilePath.exists()) {
myFilePath.createNewFile();
}
FileWriter resultFile = new FileWriter(myFilePath);
PrintWriter myFile = new PrintWriter(resultFile);
String strContent = fileContent;
myFile.println(strContent);
resultFile.close();


} catch (Exception e) {
e.printStackTrace();
}


}



/**
 * 删除文件或空文件夹
 * @param filePath
文件路径，如F:\bb\b.txt
 * @return boolean
 */
public static void delFile(String filePath) {
try {
File myDelFile = new File(filePath);
myDelFile.delete();
} catch (Exception e) {
e.printStackTrace();
}
}



/**
 * 删除文件夹(包含文件夹下的文件)
 * @param folderPath 文件夹路径，如F:\bb
 * @return
 */
public static void delFolder(String folderPath) {
delFolderByALLFile(folderPath); // 删除完里面所有内容
delFile(folderPath);
}


/**
 * 删除文件夹里面的所有文件
 * @param folderPath
文件夹路径，例如：F:\bb
 */
public static void delFolderByALLFile(String folderPath) {
File file = new File(folderPath);
if (!file.exists()) return;
if (!file.isDirectory()) return;
String[] tempList = file.list();
File temp = null;
for (int i = 0; i < tempList.length; i++) {
if (folderPath.endsWith(File.separator)) {
temp = new File(folderPath + tempList[i]);
} else {
temp = new File(folderPath + File.separator + tempList[i]);
}
if (temp.isFile()){
temp.delete();
}
if (temp.isDirectory()){
delFolderByALLFile(folderPath + "/" + tempList[i]);
}
}
}


/**
 * 复制文件内容到新文件 <br>
 * newPath路径要存在，否则会报错
 * @param oldPath
原文件路径 如：F:\a.txt
 * @param newPath
复制保存文件路径 如：F:\b.txt
 */
public static void copyFile(String oldPath, String newPath) {
InputStream inStream = null;
FileOutputStream fs = null;
try {
int bytesum = 0;
int byteread = 0;
File oldfile = new File(oldPath);
if (oldfile.exists()) { // 文件存在时
inStream = new FileInputStream(oldPath); // 读入原文件
fs = new FileOutputStream(newPath);
byte[] buffer = new byte[1024];
while ((byteread = inStream.read(buffer)) != -1) {
bytesum += byteread; // 字节数 文件大小
fs.write(buffer, 0, byteread);
}
}
} catch (Exception e) {
e.printStackTrace();
}finally{
try {
if(inStream != null){
inStream.close();
inStream = null;
}
} catch (IOException e) {
e.printStackTrace();
}
try {
if(fs != null){
fs.close();
fs = null;
}
} catch (IOException e) {
e.printStackTrace();
}
}
}


/**
 * 复制文件到文件夹 <br>
 * @param oldPath
原文件路径 如：F:\a.txt
 * @param folderPath 保存文件的文件夹
 * @param newFileName
新文件名称，不传入，默认使用被copy文件的名称
 */
public static void copyFile(String oldPath, String folderPath, String newFileName) {
createDir(folderPath);
oldPath = oldPath.replace('\\', '/');
folderPath = folderPath.replace('\\', '/');
newFileName = (newFileName == null || "".equals(newFileName)) ? oldPath.substring(oldPath.lastIndexOf("/")) : ("/"+newFileName);
String newPath = folderPath + newFileName;
copyFile(oldPath, newPath);
}



/**
 * 复制整个文件夹的文件
 * @param oldPath
原文件夹路径 如：F:\a
 * @param newPath
复制保存路径 如：F:\b
 */
public static void copyFolder(String oldPath, String newPath) {
FileInputStream input = null;
FileOutputStream output = null;
try {
(new File(newPath)).mkdirs(); // 如果文件夹不存在 则建立新文件夹
File a = new File(oldPath);
String[] file = a.list(); // 获取所有目录和文件
File temp = null;
for (int i=0,len=file.length; i<len; i++) {
if (oldPath.endsWith(File.separator)) { // 检查路径"\"
temp = new File(oldPath + file[i]);
} else {
temp = new File(oldPath + File.separator + file[i]);
}
if (temp.isFile()) {// 如果是文件
input = new FileInputStream(temp);
output = new FileOutputStream(newPath+ "/" + (temp.getName()).toString());
byte[] b = new byte[1024 * 5];
int len2;
while ((len2 = input.read(b)) != -1) {
output.write(b, 0, len2);
}
output.flush();
output.close();
input.close();
}
if (temp.isDirectory()) {// 如果是子文件夹
copyFolder(oldPath + "/" + file[i], newPath + "/" + file[i]);
}
}
} catch (Exception e) {
e.printStackTrace();
}finally{
try {
if(output != null){
output.close();
output = null;
}
} catch (IOException e) {
e.printStackTrace();
}
try {
if(input != null){
input.close();
input = null;
}
} catch (IOException e) {
e.printStackTrace();
}
}


}


/**
 * 移动文件到指定文件夹
 * @param oldPath
原文件路径 如：F:\a.txt
 * @param folderPath
复制保存文件路径 如：F:\b
 */
public static void moveFile(String oldPath, String folderPath) {
createDir(folderPath);
oldPath = oldPath.replace('\\', '/');
folderPath = folderPath.replace('\\', '/');
String newPath = folderPath + oldPath.substring(oldPath.lastIndexOf("/"));
copyFile(oldPath, newPath);
delFile(oldPath);
}


/**
 * 移动文件夹的所有文件到指定文件夹(默认删除原文件夹) <br>
 * 如不想删除，请使用 copyFolder()
 * @param oldPath
原文件夹路径 如：F:\a
 * @param newPath
复制保存路径 如：F:\b
 */
public static void moveFolder(String oldPath, String newPath) {
copyFolder(oldPath, newPath);
delFolder(oldPath);
}










    
   
public static void main(String args[]) {

// System.out.println("文件是否存在：" + isExist("F:\\a.txt"));
// System.out.println("创建文件夹："+ createDir("F:\\bb"));
// System.out.println("创建文件："+ createFile("F:\\bb\\a.txt").getName());
// 
// System.out.println("创建带内容的文件...");
// createFile("F:\\bb\\b.txt", "联通");

// System.out.println("删除文件...");
// delFile("F:\\bb\\a.txt");

// System.out.println("删除文件夹里的所有文件...");
// delFolderByALLFile("F:\\bb");
// 
// System.out.println("删除文件夹里...");
// delFolder("F:\\bb");

// System.out.println("复制文件内容...");
// copyFile("F:\\bb\\b.txt", "F:\\cc\\a.txt");

// System.out.println("复制文件到新文件夹...");
// copyFile("F:\\aa\\a.txt", "F:\\cc", "b.txt");

// System.out.println("复制文件夹的文件...");;
// copyFolder("F:\\cc", "F:\\dd\\aa\\bb\\dd");

// System.out.println("移动文件...");;
// moveFolder("F:\\aa", "F:\\bb");

// System.out.println("压缩文件...");
// zip("F:\\b.zip", "F:\\aa");

// System.out.println("解压文件...");
// unzip("F:\\b.zip", "F:\\cc");


}


}