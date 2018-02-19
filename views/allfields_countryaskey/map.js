function(doc) {
  if(doc.ri_name) {
    emit(doc.country, doc);
  }
}