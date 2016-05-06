function printBarCode(code) {
	var LODOP = getLodop(document.getElementById('LODOP'), document.getElementById('LODOP_EM'));
	LODOP.SET_PRINT_PAGESIZE(1,'24mm','24mm','二维条码');
	LODOP.ADD_PRINT_BARCODE(2,2,120,120,"QRCode","B112815081401A02-01-9999999");
	LODOP.SET_PRINT_STYLEA(0,"QRCodeVersion",3);
	for(var i=0;i<10;i++){
		LODOP.NewPage();
		LODOP.SET_PRINT_PAGESIZE(1,'24mm','24mm','二维条码');
		LODOP.ADD_PRINT_BARCODE(2,2,120,120,"QRCode",i);
		LODOP.SET_PRINT_STYLEA(0,"QRCodeVersion",3);
	}
	LODOP.PREVIEW();
	// LODOP.PRINT_DESIGN();
}