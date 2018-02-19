function(doc) {
  if(doc.ri_name) {
    emit(doc.email, doc);
  }
}