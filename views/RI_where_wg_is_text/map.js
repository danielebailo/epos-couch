function(doc) {
  if (doc.doctype=='ri'){
     if (typeof(doc.wg_main)=='string'){
	emit(doc.ri_name, doc); 
	}
 }
}