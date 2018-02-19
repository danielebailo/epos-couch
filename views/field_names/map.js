function(doc) {
  if (doc.doctype)
  var fields=new Array;
  for (elem in doc){
    fields.push(elem);
  }
  emit (doc, fields);
}