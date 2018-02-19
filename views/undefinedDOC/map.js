function(doc) {
if (doc.doctype==undefined)
  emit(doc._id, doc);
}