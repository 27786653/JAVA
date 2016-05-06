import java.awt.Component;
import java.io.IOException;
import java.util.List;

import javax.swing.JLabel;
import javax.swing.table.DefaultTableModel;

import util.baseTools;

import entity.projectBean;

/*
 * Mainform.java
 *
 * Created on __DATE__, __TIME__
 */

/**
 *
 * @author  __USER__
 */
public class Mainform extends javax.swing.JFrame {

	/** Creates new form Mainform */
	public Mainform() {
		initComponents();
	}

	//GEN-BEGIN:initComponents
	// <editor-fold defaultstate="collapsed" desc="Generated Code">
	private void initComponents() {

		jScrollPane1 = new javax.swing.JScrollPane();
		jTable1 = new javax.swing.JTable();
		button1 = new java.awt.Button();
		button2 = new java.awt.Button();
		jScrollPane2 = new javax.swing.JScrollPane();
		jTable2 = new javax.swing.JTable();
		textField1 = new java.awt.TextField();
		textField2 = new java.awt.TextField();
		textField3 = new java.awt.TextField();
		textField4 = new java.awt.TextField();
		textField5 = new java.awt.TextField();
		jTextField1 = new javax.swing.JTextField();
		jTextField2 = new javax.swing.JTextField();
		jTextField3 = new javax.swing.JTextField();
		jLabel1 = new javax.swing.JLabel();

		jTable1.setModel(new javax.swing.table.DefaultTableModel(
				new Object[][] { { null, null, null, null },
						{ null, null, null, null }, { null, null, null, null },
						{ null, null, null, null } }, new String[] { "Title 1",
						"Title 2", "Title 3", "Title 4" }));
		jScrollPane1.setViewportView(jTable1);

		setDefaultCloseOperation(javax.swing.WindowConstants.EXIT_ON_CLOSE);

		button1.setLabel("DataOutput");
		button1.addActionListener(new java.awt.event.ActionListener() {
			public void actionPerformed(java.awt.event.ActionEvent evt) {
				button1ActionPerformed(evt);
			}
		});

		button2.setLabel("DataInput");
		button2.addActionListener(new java.awt.event.ActionListener() {
			public void actionPerformed(java.awt.event.ActionEvent evt) {
				button2ActionPerformed(evt);
			}
		});

		jTable2.setModel(new javax.swing.table.DefaultTableModel(
				new Object[][] { { null, null, null, null },
						{ null, null, null, null }, { null, null, null, null },
						{ null, null, null, null } }, new String[] { "Title 1",
						"Title 2", "Title 3", "Title 4" }));
		jScrollPane2.setViewportView(jTable2);

		textField1.setText("\u8bf7\u8f93\u5165\u0078\u006c\u0073\u0078\u6587\u4ef6\u540d\u79f0");
		textField1.addActionListener(new java.awt.event.ActionListener() {
			public void actionPerformed(java.awt.event.ActionEvent evt) {
				textField1ActionPerformed(evt);
			}
		});

		textField2.setText("\u516c\u7528\u8def\u5f84");

		textField3.setText("\u5408\u540c\u6587\u4ef6\u5939\u540d\u79f0");
		textField3.addActionListener(new java.awt.event.ActionListener() {
			public void actionPerformed(java.awt.event.ActionEvent evt) {
				textField3ActionPerformed(evt);
			}
		});

		textField4.setText("\u540c\u610f\u51fd\u6587\u4ef6\u5939\u540d\u79f0");
		textField4.addActionListener(new java.awt.event.ActionListener() {
			public void actionPerformed(java.awt.event.ActionEvent evt) {
				textField4ActionPerformed(evt);
			}
		});

		textField5.setText("\u5bfc\u51fa\u8def\u5f84");

		jTextField1.setText("\u6587\u4ef6\u540d\u5217\u53f7");

		jTextField2.setText("\u5408\u540c\u5217\u53f7");

		jTextField3.setText("\u540c\u610f\u6db5\u5217\u53f7");

		javax.swing.GroupLayout layout = new javax.swing.GroupLayout(
				getContentPane());
		getContentPane().setLayout(layout);
		layout.setHorizontalGroup(layout
				.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING)
				.addGroup(
						layout.createSequentialGroup()
								.addContainerGap()
								.addGroup(
										layout.createParallelGroup(
												javax.swing.GroupLayout.Alignment.LEADING)
												.addGroup(
														layout.createSequentialGroup()
																.addComponent(
																		textField4,
																		javax.swing.GroupLayout.DEFAULT_SIZE,
																		265,
																		Short.MAX_VALUE)
																.addGap(495,
																		495,
																		495))
												.addGroup(
														layout.createSequentialGroup()
																.addGroup(
																		layout.createParallelGroup(
																				javax.swing.GroupLayout.Alignment.LEADING)
																				.addGroup(
																						layout.createSequentialGroup()
																								.addComponent(
																										button1,
																										javax.swing.GroupLayout.PREFERRED_SIZE,
																										javax.swing.GroupLayout.DEFAULT_SIZE,
																										javax.swing.GroupLayout.PREFERRED_SIZE)
																								.addGap(24,
																										24,
																										24)
																								.addComponent(
																										jLabel1,
																										javax.swing.GroupLayout.PREFERRED_SIZE,
																										511,
																										javax.swing.GroupLayout.PREFERRED_SIZE))
																				.addComponent(
																						jScrollPane2,
																						javax.swing.GroupLayout.DEFAULT_SIZE,
																						748,
																						Short.MAX_VALUE)
																				.addComponent(
																						textField1,
																						javax.swing.GroupLayout.DEFAULT_SIZE,
																						748,
																						Short.MAX_VALUE)
																				.addGroup(
																						layout.createSequentialGroup()
																								.addGroup(
																										layout.createParallelGroup(
																												javax.swing.GroupLayout.Alignment.TRAILING,
																												false)
																												.addComponent(
																														textField3,
																														javax.swing.GroupLayout.Alignment.LEADING,
																														javax.swing.GroupLayout.DEFAULT_SIZE,
																														javax.swing.GroupLayout.DEFAULT_SIZE,
																														Short.MAX_VALUE)
																												.addComponent(
																														textField2,
																														javax.swing.GroupLayout.Alignment.LEADING,
																														javax.swing.GroupLayout.DEFAULT_SIZE,
																														265,
																														Short.MAX_VALUE))
																								.addGroup(
																										layout.createParallelGroup(
																												javax.swing.GroupLayout.Alignment.LEADING)
																												.addGroup(
																														layout.createSequentialGroup()
																																.addGap(71,
																																		71,
																																		71)
																																.addComponent(
																																		textField5,
																																		javax.swing.GroupLayout.PREFERRED_SIZE,
																																		251,
																																		javax.swing.GroupLayout.PREFERRED_SIZE)
																																.addGap(21,
																																		21,
																																		21)
																																.addComponent(
																																		jTextField1,
																																		javax.swing.GroupLayout.PREFERRED_SIZE,
																																		56,
																																		javax.swing.GroupLayout.PREFERRED_SIZE))
																												.addGroup(
																														layout.createSequentialGroup()
																																.addGap(43,
																																		43,
																																		43)
																																.addGroup(
																																		layout.createParallelGroup(
																																				javax.swing.GroupLayout.Alignment.LEADING)
																																				.addGroup(
																																						layout.createSequentialGroup()
																																								.addComponent(
																																										jTextField3,
																																										javax.swing.GroupLayout.PREFERRED_SIZE,
																																										56,
																																										javax.swing.GroupLayout.PREFERRED_SIZE)
																																								.addPreferredGap(
																																										javax.swing.LayoutStyle.ComponentPlacement.RELATED,
																																										315,
																																										Short.MAX_VALUE)
																																								.addComponent(
																																										button2,
																																										javax.swing.GroupLayout.PREFERRED_SIZE,
																																										javax.swing.GroupLayout.DEFAULT_SIZE,
																																										javax.swing.GroupLayout.PREFERRED_SIZE))
																																				.addComponent(
																																						jTextField2,
																																						javax.swing.GroupLayout.PREFERRED_SIZE,
																																						56,
																																						javax.swing.GroupLayout.PREFERRED_SIZE))))))
																.addContainerGap(
																		javax.swing.GroupLayout.DEFAULT_SIZE,
																		Short.MAX_VALUE)))));
		layout.setVerticalGroup(layout
				.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING)
				.addGroup(
						javax.swing.GroupLayout.Alignment.TRAILING,
						layout.createSequentialGroup()
								.addContainerGap()
								.addComponent(textField1,
										javax.swing.GroupLayout.PREFERRED_SIZE,
										javax.swing.GroupLayout.DEFAULT_SIZE,
										javax.swing.GroupLayout.PREFERRED_SIZE)
								.addPreferredGap(
										javax.swing.LayoutStyle.ComponentPlacement.RELATED)
								.addGroup(
										layout.createParallelGroup(
												javax.swing.GroupLayout.Alignment.LEADING,
												false)
												.addGroup(
														layout.createSequentialGroup()
																.addComponent(
																		textField2,
																		javax.swing.GroupLayout.PREFERRED_SIZE,
																		javax.swing.GroupLayout.DEFAULT_SIZE,
																		javax.swing.GroupLayout.PREFERRED_SIZE)
																.addGap(23, 23,
																		23)
																.addComponent(
																		textField3,
																		javax.swing.GroupLayout.PREFERRED_SIZE,
																		javax.swing.GroupLayout.DEFAULT_SIZE,
																		javax.swing.GroupLayout.PREFERRED_SIZE))
												.addGroup(
														javax.swing.GroupLayout.Alignment.TRAILING,
														layout.createSequentialGroup()
																.addGroup(
																		layout.createParallelGroup(
																				javax.swing.GroupLayout.Alignment.LEADING)
																				.addComponent(
																						textField5,
																						javax.swing.GroupLayout.PREFERRED_SIZE,
																						javax.swing.GroupLayout.DEFAULT_SIZE,
																						javax.swing.GroupLayout.PREFERRED_SIZE)
																				.addComponent(
																						jTextField1,
																						javax.swing.GroupLayout.PREFERRED_SIZE,
																						javax.swing.GroupLayout.DEFAULT_SIZE,
																						javax.swing.GroupLayout.PREFERRED_SIZE))
																.addPreferredGap(
																		javax.swing.LayoutStyle.ComponentPlacement.RELATED,
																		javax.swing.GroupLayout.DEFAULT_SIZE,
																		Short.MAX_VALUE)
																.addComponent(
																		jTextField2,
																		javax.swing.GroupLayout.PREFERRED_SIZE,
																		javax.swing.GroupLayout.DEFAULT_SIZE,
																		javax.swing.GroupLayout.PREFERRED_SIZE)))
								.addGap(39, 39, 39)
								.addGroup(
										layout.createParallelGroup(
												javax.swing.GroupLayout.Alignment.TRAILING)
												.addGroup(
														layout.createSequentialGroup()
																.addGroup(
																		layout.createParallelGroup(
																				javax.swing.GroupLayout.Alignment.TRAILING)
																				.addComponent(
																						jTextField3,
																						javax.swing.GroupLayout.PREFERRED_SIZE,
																						javax.swing.GroupLayout.DEFAULT_SIZE,
																						javax.swing.GroupLayout.PREFERRED_SIZE)
																				.addComponent(
																						textField4,
																						javax.swing.GroupLayout.PREFERRED_SIZE,
																						javax.swing.GroupLayout.DEFAULT_SIZE,
																						javax.swing.GroupLayout.PREFERRED_SIZE))
																.addGap(17, 17,
																		17))
												.addGroup(
														layout.createSequentialGroup()
																.addComponent(
																		button2,
																		javax.swing.GroupLayout.PREFERRED_SIZE,
																		javax.swing.GroupLayout.DEFAULT_SIZE,
																		javax.swing.GroupLayout.PREFERRED_SIZE)
																.addPreferredGap(
																		javax.swing.LayoutStyle.ComponentPlacement.RELATED)))
								.addComponent(jScrollPane2,
										javax.swing.GroupLayout.PREFERRED_SIZE,
										275,
										javax.swing.GroupLayout.PREFERRED_SIZE)
								.addPreferredGap(
										javax.swing.LayoutStyle.ComponentPlacement.RELATED)
								.addGroup(
										layout.createParallelGroup(
												javax.swing.GroupLayout.Alignment.LEADING,
												false)
												.addComponent(
														jLabel1,
														javax.swing.GroupLayout.DEFAULT_SIZE,
														javax.swing.GroupLayout.DEFAULT_SIZE,
														Short.MAX_VALUE)
												.addComponent(
														button1,
														javax.swing.GroupLayout.DEFAULT_SIZE,
														javax.swing.GroupLayout.DEFAULT_SIZE,
														Short.MAX_VALUE))
								.addContainerGap()));

		pack();
	}// </editor-fold>
	//GEN-END:initComponents

	private void textField4ActionPerformed(java.awt.event.ActionEvent evt) {
		// TODO add your handling code here:
	}

	private void textField3ActionPerformed(java.awt.event.ActionEvent evt) {
		// TODO add your handling code here:
	}

	private void textField1ActionPerformed(java.awt.event.ActionEvent evt) {
		// TODO add your handling code here:
	}

	ProjectBeanDao pd = new ProjectBeanDao();
	private List<projectBean> data2;

	private void button1ActionPerformed(java.awt.event.ActionEvent evt) {
		jLabel1.setText("正在整理,请稍后...");
		pd.OKbing(data2,jLabel1);
		}

	private void button2ActionPerformed(java.awt.event.ActionEvent evt) {
		// TODO add your handling code here:
		baseTools.PublicFIlePath = textField2.getText();
		baseTools.src_xlspath = baseTools.PublicFIlePath + "\\"
				+ textField1.getText();
		baseTools.heTongPath = baseTools.PublicFIlePath + "\\"
				+ textField3.getText();
		baseTools.TruePath = baseTools.PublicFIlePath + "\\"
				+ textField4.getText();
		baseTools.ExprotPath = baseTools.PublicFIlePath + "\\"
				+ textField5.getText();

		baseTools.TrueCodeCol = Integer.parseInt(jTextField3.getText());
		baseTools.FIleNameCol = Integer.parseInt(jTextField1.getText());
		baseTools.SaoFileCol = Integer.parseInt(jTextField2.getText());
		try {
			data2 = pd.getData();
			Object data[][] = new Object[data2.size()][3];
			for (int i = 0; i < data2.size(); i++) {
				data[i][0] = data2.get(i).getTrueCode();
				data[i][1] = data2.get(i).getFileName();
				data[i][2] = data2.get(i).getSaoFileCode();
			}
			String columnNames[] = { "同意函编码", "资产清查物理站址编号", "  扫描件编码" };
			jTable2.setModel(new DefaultTableModel(data, columnNames));
			jLabel1.setText("导入数据集合长度为:"+data2.size()+"条");
		} catch (Exception e) {
			jLabel1.setText("数据异常");
			e.printStackTrace();
		}
		
		
	}

	/**
	 * @param args the command line arguments
	 */
	public static void main(String args[]) {
		java.awt.EventQueue.invokeLater(new Runnable() {
			public void run() {
				new Mainform().setVisible(true);
			}
		});
	}

	//GEN-BEGIN:variables
	// Variables declaration - do not modify
	private java.awt.Button button1;
	private java.awt.Button button2;
	private javax.swing.JScrollPane jScrollPane1;
	private javax.swing.JScrollPane jScrollPane2;
	private javax.swing.JTable jTable1;
	private javax.swing.JTable jTable2;
	private javax.swing.JTextField jTextField1;
	private javax.swing.JTextField jTextField2;
	private javax.swing.JTextField jTextField3;
	private java.awt.TextField textField1;
	private java.awt.TextField textField2;
	private java.awt.TextField textField3;
	private java.awt.TextField textField4;
	private java.awt.TextField textField5;
	private JLabel jLabel1;

}