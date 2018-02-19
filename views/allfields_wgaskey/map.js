function(doc) {
  if(doc.wg) {
    emit(doc.wg, doc);
  }
}