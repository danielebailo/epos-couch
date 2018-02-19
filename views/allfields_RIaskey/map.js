function(doc) {
  if(doc.ri_name) {
    emit(doc.ri_name, doc);
  }
}