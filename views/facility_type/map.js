function(doc) {
if (doc.doctype=='facility')
  emit(doc.facility_type, null);
}