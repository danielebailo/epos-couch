function(doc) {
   emit(doc.ri_name, [doc.ri_name,  doc.ri_type, doc.country,doc.wg, doc.ri_manager,  doc.network_code, doc.laboratory_research_field, doc.equipment ]);
}


//to insert new facets, put it after the doc.network_code
//then go to the get_facets_categories.js AND get_facets_categories_nolist.jslist function
//and modify the line (which one? is evident if you open the file).
//REMEMBER TO ADD, IN THE LIST FILE, THE FACETS AT THE SAME PLACE IN THE ARRAY (AFTER NETWORK_CODE)