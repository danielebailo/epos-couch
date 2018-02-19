function(doc) {
  if (doc.doctype=='ri') {
    emit([doc.country,doc.wg], doc);
  }
}