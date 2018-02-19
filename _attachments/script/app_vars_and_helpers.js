

////*******************************   HELPERS ************************//////
	
	
	
	
	
	
	// make an array of certain length filled with 'value' values
	function makeArrayOf(value, length) {
		  var arr = [], i = length;
		  while (i--) {
			arr[i] = value;
		  }
		  return arr;
		}
	
	//merges two objects a = {a : 1} b = {b : 2} c = {c : 3}
	//~ x = MergeJSON ( a, b); x = MergeJSON ( x, c);
	//~ result : x == {a : 1, b : 2, c : 3}
	//~ 
	function MergeJSON (o, ob) {
      for (var z in ob) {
           o[z] = ob[z];
      }
      return o;
	}
	
	//merges 2 arrays of objects: arr1=[{obj1}, {obj2}]  arr2=[{obja}, {objb}] ----> outarr=[{obj1, obja}, {obj2, objb}]
	//merges two arrays and outputs an array of key/vals
	function mergeObjArrays(arr1, arr2) {
    var l = Math.min(arr1.length,arr2.length), ret = [], i;
    for( i=0; i<l; i++) {
		//~ console.log(arr1[i],arr2[i]);
		ret.push(MergeJSON(arr1[i],arr2[i]));
		}
    return ret;
		}
	
	//merges two arrays and outputs an array of key/vals
	function mergeArrays(arr1, arr2) {
    var l = Math.min(arr1.length,arr2.length), ret = [], i;
    for( i=0; i<l; i++) {
		var myObj={};
		myObj[arr1[i]]=arr2[i];
		ret.push(myObj);
		}
    return ret;
		}
	
	//convert from json to CSV
	function ConvertToCSV(objArray) {
	var array = typeof objArray != 'object' ? JSON.parse(objArray) : objArray;
	var str = '';

	for (var i = 0; i < array.length; i++) {
            var line = '';

            for (var index in array[i]) {
                line += array[i][index] + ',';
            }

            line.slice(0,line.length-2); 
 
            str += line + '\r\n';
        }

		return str;
	}
	
	//sums the value of each attribute iassuming that: 1) all attributes are numerical, the object is 1 level depth
		function sumAttrVal(MyObject){
		var totSum = 0;
		for (var k in MyObject) {
			if (MyObject.hasOwnProperty(k)) {
			   totSum=totSum+MyObject[k]
				}
			}
		return totSum;
		}
	
	// count number of attributes of an object (only at firt level, do not work for nested objevts)
	function countAttr(MyObject){
		var count = 0;
		for (var k in MyObject) {
			if (MyObject.hasOwnProperty(k)) {
			   ++count;
				}
			}
		return count;
		}
	
	
	//adjust textarea size
	function textAreaAdjust(o) {
    o.style.height = "1px";
    o.style.height = (25+o.scrollHeight)+"px";
		}
		
		
		
    //creates an nD array of zeros
	function zeros(dimensions) {
		var array = [];

		for (var i = 0; i < dimensions[0]; ++i) {
			array.push(dimensions.length == 1 ? 0 : zeros(dimensions.slice(1)));
		}

		return array;
	}
    
    //gives a random hash string of 32 chars
	function randomHashString() {
	    var chars = "0123456789abcdefghiklmnopqrstuvwxyz";
	    var string_length = 32;
	    var randomstring = '';
	    for (var i=0; i<string_length; i++) {
		    var rnum = Math.floor(Math.random() * chars.length);
		    randomstring += chars.substring(rnum,rnum+1);
		}
	    return randomstring;
	    }
	
	//function to get data from server (view or list), used in visualsearch callbacks definition 
	function getJSONData(myurl) {
	var data;
	$.ajax({
	    async: false, //thats the trick
	    url: myurl,
	    dataType: 'json',
	    success: function(response){
	       data = response;
			    }
		    });
	return data;
	}
    
    function getJSONDataPOST(myurl, queryParams) {
	var data;
	$.ajax({
	    async: false, //thats the trick
	    url: myurl,
        type:"POST",
        data:queryParams,
	    dataType: 'json',
	    success: function(response){
	       data = response;
			    }
		    });
	return data;
	}
    
    //capitalize first letter
    function capitaliseFirstLetter(string){
		return string.charAt(0).toUpperCase() + string.slice(1);
		}
    
    //build an array of abjects [{val:"original value", label:"capitalized Value"}]
    function buildLabels(inputArray){
		var outputArray=[];
		for (var elem in inputArray){
			var myVal=inputArray[elem];
			var myLabel=capitaliseFirstLetter(myVal);
			outputArray.push({val:myVal, label:myLabel})
			}
		return outputArray;
		}
    
    
	
	//func to get as 1-level json object all nested backboneJSONform objects. Like this:
     //~ {ri_name: 'Text',ri_type: 'Select',  file_path:'Text'}}
    function fieldTypeList(JSONobj){
        var returnObj=new Object();
        for (var item in JSONobj){
            for (var field in JSONobj[item]){
                returnObj[field]=JSONobj[item][field]['type'];
                }
            }
        return returnObj;
        }
	
	function getKeys(obj){
		//~ console.log(obj);
		var returnArray=[];
		for (var key in obj) {
			returnArray.push(key);
			}
		return returnArray;
		}
	

	//*************** GLOBAL VARS *****************
    
    //general purpose
    var generalPurposeGlobalVar={}; //general purpose global var
    
    
    //facets/filter heigth. increment the header of the given number of px when adding a filter
    var addHeaderPx=25;
    
    var RUvalueMatches=[];;
    var RUfacets=[];
    //~ NB RUfacets value is present in RUfacets var
    // var for couchdb fetching
    $.ajax({
	    async: false, //thats the trick
	    url: "_list/get_facets_categories/facets",
	    dataType: 'json',
	    success: function(response){
	       var RUvalueMatches= response;
	       var RUfacets= getKeys(RUvalueMatches);
			    }
		    });

    
    //~ NB RUfacets value is present in RUfacets var
    // var for couchdb fetching
    //~ TO ADD NEW FACETS: modify the view function called "facets"
    var RUvalueMatches=getJSONData('_list/get_facets_categories_nolist/facets');
    var RUfacets=  getKeys(getJSONData('_list/get_facets_categories_nolist/facets'));
    
    //["doctype","ri_name","ri_type","country","wg","facility_type","network_code","type","stations","kind","laboratory_research_field","equipment","brand"];//NB REMEMBER TO MODIFY VALUES of RUfacets ALSO IN THE LIST FUNCTIONS 
    //getJSONData('_list/json_field_names/field_names');
	
	var JSONriDescription='_list/aggregate_items/allfields_RIaskey';
	var JSONriView="_view/allfields_RIaskey";
    var labCoordsView="_view/gelocate_lab_RIaskey";
    var netStationsCoordsView="_view/geolocate_seismicNet";
    var GPSCoordsView="_view/geolocate_GPS";
    var geomagneticCoordsView="_view/geolocate_geomagnetic";
    var genericStationCoordsView="_view/geolocate_otherStations"
    var RIDEusersGetUsers='/ride-users/_design/ride-users/_view/getusers';
    var logDB="epos-log";
    var net_name_and_code_query="_list/selectbox/all_network_codes_and_names";
    
    //various stats
    var QUERYnumberOfRI="_view/number_of_RI";
    var QUERYnumberOfLabs="_view/number_of_Labs";
    var QUERYnumberOfCountries="_view/number_of_countries?group=true";
    var QUERYnumberOfInstitutions="_view/number_of_institutions?group=true";
    var QUERYnumberOfTotalStations="_view/number_of_total_stations";
    
	//var for backbone forms
	var ri_types=["PLEASE SELECT","Computational Infrastructure (independent of monitoring RIs)","EPOS Supersite","Geological Repository","Geomagnetic Observatory/network","GPS Network","Gravimetric Infrastructure", "Induced Seismicity", "In-situ fault-zone observatory","International Data Infrastructure","Laboratory","Marine Research Infrastructures","Multi-disciplinary Research Infrastructure","National Data Infrastructure","Satellite data processing infrastructure","Seismic Network","Volcano Observatory","Other","n/a"];
	var seismic_network_kinds=["PLEASE SELECT","Global", "Local", "Mobile","National","Other", "Array", "Regional","n/a"];
	var data_type_options=["PLEASE SELECT", "images","metadata", "in-house","Parametric","TimeSeries","other","n/a"];
	var data_format_options=["PLEASE SELECT","ASCII","CSS","Earthworm","GCF","GSE","in-house","miniSEED", "nanometrics","Reftek","SAC","seisan","other","n/a"];
	var data_transmission_options=["PLEASE SELECT","real-time","delayed","on-demand","dial-up","dial-in","stand-alone","other","n/a"];
	var data_policy_options=["PLEASE SELECT","open","restricted","on-request","closed","other","n/a"];
	var seismicStationTypes=["PLEASE SELECT","very broadband","broadband","strongmotion","shortperiod","very broadband / strongmotion","broadband / strongmotion","broadband / shortperiod","shortperiod / strongmotion","infrasound", "strainmeter", "tiltmeter", "geophone","acoustic emission", "n/a"];
	var wg_list=[1,2,3,4,5,6,7,8,9,10];
	var lab_data_policy=["PLEASE SELECT","payment","collaboration only","free of charge","other"];
	var instr_ded_pers=["PLEASE SELECT","yes-permanent","yes-not permanent","no"];
    var countries=["PLEASE SELECT", "austria","czech_republic", "denmark","estonia", "lithuania","finland","france", "germany", "greece","hungary", "iceland", "international-organization", "ireland", "italy", "netherlands", "norway", "poland","portugal", "romania", "slovenia", "spain", "sweden", "switzerland", "turkey", "united_kingdom"];
    var lab_res_field=["PLEASE SELECT","analytical", "experimental petrology and volcanology","rock physics","paleomagnetism","tectonic modeling", "other","n/a"];
    var gnss_networks_kinds=["PLEASE SELECT","Local","National","Regional","Mobile","Other"];
    var yes_or_no=["PLEASE SELECT","yes","no"];
    var gnss_data_transmission_select=["PLEASE SELECT","real-time","hourly","daily","manual"];
    var gnss_data_communication_select=["PLEASE SELECT","DSL","Mobile","Satellite","None"];
    var gnss_data_policy_select=["PLEASE SELECT","Open", "On-Request","Delayed","Closed", "n/a"];
    var monumentList =["PLEASE SELECT","Roof", "Ground", "Exposed Rock","Existence of Physical Marker", "Mast", "Pillar", "Other", "n/a"];
    var procSfwMod_options=["PLEASE SELECT","Bernese","Gamit","Gipsy","Other"];
    var procProd_options=["PLEASE SELECT","Differential Corrections"," Positions", "Velocities", "ZTD Time-Series", "Ionospheric Parameters", "RTK products", "Other"];
    var dissProd_options=["PLEASE SELECT","None","Differential Corrections", "Positions", "Velocities","ZTD Time-Series", "Ionospheric Parameters", "Other"];
	var gnss_data_format_options=["PLEASE SELECT","Raw/Rinex", "RTCM 2.x", "RTCM 3.x", "Binex", "Other"];
    var dataSmplType_options=["PLEASE SELECT","30s daily data", "1s hourly data", "1s sub-hourly data", "real-time data"];
    var dc_connectivity_protocols_options=["PLEASE SELECT", "none","FTP","HTTP","SCP"];
    var dc_metadata_options=["PLEASE SELECT","none","logsheet","QC"];
    var gnss_type_of_transmission_select=["PLEASE SELECT","wireless","wireless - hyperlan", "wired","none","n/a"];
    var geodetic_and_deformation_type_select=["PLEASE SELECT","permanent","campaigns", "n/a"];//["PLEASE SELECT","Benchmarks","ground GPS", "tiltmeters", "strainmeters", "tidegauges", "terrestrial SAR", "Other", "n/a"];
    var geodetic_and_deformation_instrument_type_select=["PLEASE SELECT", "---PERMANENT ---","GPS","tiltmeters","strainmeters","tide gauges","automatic total stations","---CAMPAINGS---", "GPS","levelling", "EDM","n/a"];
    var potential_field_type_select=["PLEASE SELECT","Benchmarks","gravity", "magnetometers", "geoelectrical", "Other", "n/a"];
    var instrument_local_storage_select=["PLEASE SELECT","<10Mb","<100Mb","<500Mb","<1Tb","other","n/a"];
    var instr_local_power_supply_select=["PLEASE SELECT","power grid","solar","eolic","batteries","nuclear","other","n/a"];
    var data_centre_type_select=["PLEASE SELECT","Seismic","Computational","Acquisition and Storage","Other","n/a"];
    var net_name_and_code_select=getJSONData(net_name_and_code_query);
    var volc_fac_type_select=["PLEASE SELECT","--BENCHMARK NETWORK (SELECT ONE BELOW)--","geodetic benchmarks","gravimetric benchmarks","generic benchmark","meteo benchmarks","--POTENTIAL FIELD MONITORING NETWORK (SELECT ONE BELOW)--","gravity Net.","magnetometers Net.","geoelectrical Net.","--GEODETIC AND DEFORMAITON MONITORING (SELECT ONE BELOW)--","tiltmeters Net.","strainmeters Net.","tide gauges Net.","automatic total stations Net.","levelling Net.","EDM Net.","--GEOCHEMICAL MONITORING NET. (SELECT ONE BELOW)--","geochemical stations/instruments Net.","--HYDROLOGICAL MONITORING NET. (SELECT ONE BELOW)--","hydrological stations/instruments","--WEATHER MONITORING NET. (SELECT ONE BELOW)--","weather stations/instruments","--TEMPORARY NET. (SELECT ONE BELOW)--", "mobile instrument pool", "temporary instrument pool", "--OTHER--", "other","n/a"];
    var volcStationType=["PLEASE SELECT","--BENCHMARKS (SELECT ONE BELOW)--","geodetic benchmark","gravimetric benchmark","generic benchmark","meteo benchmark","--POTENTIAL FIELD (SELECT ONE BELOW)--","gravity","magnetometers","geoelectrical","--GEODETIC AND DEFORMATION MONITORING (SELECT ONE BELOW)--","tiltmeter","strainmeter","tide gauge","automatic total station","levelling","EDM","--GEOCHEMICAL MONITORING (SELECT ONE BELOW)--","geochemical station/instrument","--HYDROLOGICAL MONITORING  (SELECT ONE BELOW)--","hydrological station/instrument","--WEATHER MONITORING (SELECT ONE BELOW)--","weather station/instrument", "--OTHER--", "other","n/a"];
    var geomagnetic_net_kinds=[ "PLEASE SELECT","observatory","station"];
    var geomagnetic_net_data_format=["PLEASE SELECT","IAGA2002","other"];
    var geomagnetic_data_transmission_options=["PLEASE SELECT","within 1 hour","within 72 hours","within a month", "stand-alone"];
    var geomagnetic_data_communication_select =  ["PLEASE SELECT","internet","e-mail","satellite"];
    var geomagnetic_data_sampling=["PLEASE SELECT","1 sec sampling","1 minute sampling"]
    
    
    
    
    
    
    
    
	//MODELS FOR different kinds of equipment, USED IN THE POPUP UPDATE FORM 
	var LabInstrument = Backbone.Model.extend({
		schema:{
			type: {type:'Text', help:"Type of instruments (short name), e.g. Electron Microprobe (EMP), Thermal ionization mass spectrometer (TIMS)"},
			brand: {type:'Text', help:"Name of laboratory", help:"Brand and model of the instrument, e.g. Thermo TRITON"},
			instr_local_storage:{type:'Select',options:instrument_local_storage_select,  title:"Instrument local storage",help:"Fill this field if the instrument has a local storage for data"},
			instr_local_power_supply:{type:'Select',options:instr_local_power_supply_select,  title:"instrument power supply"},
			campaign_instr:{type:'Select',options:yes_or_no,  title:"Field / Campagin instrument",help:"It includes all the portable equipment, for field and campaign work as well as temporary environmental monitoring, including networks, geophysical equipment, portable kits for physical and chemical  determinations."},
			instr_local_power_supply:{type:'Select',options:instr_local_power_supply_select,  title:"instrument power supply"},
			specifics: {type:'TextArea', help:"Other specification"},
			year_of_acquisition: {type:'Number', title:"Year of acquisition (yyyy)",help:"When was the instrument acquired? Fill it in if the date is avilable."},
			purchase_value: {type:'Number', title:"Purchase Value (euros)", help:"Cost of the instrument at the moment of purchase. THIS IS THE UNIT VALUE. It's independent from the 'quantity' fields, it refers to the single instrument"},
			quantity: {type:'Number', help:"Number of instrument of the same type. This field is not applicable when gps coordinates can be declared (i.e. in the case of network station of any type)."
				},
			gpsLat:{type:'Hidden',title:"Latitude (deg, min 3 dec places), if applicable", help:"specify gps Latitude, ONLY IF APPLICABLE"},//Number
			gpsLon:{type:'Hidden',title:"Longitude (deg, min 3 dec places), if applicable", help:"specify gps Longitude, ONLY IF APPLICABLE"},//Number
			access_policy: {type:'Select',options:lab_data_policy,title:"Access policy", help:"Policy to access the instrument/station. Specify if available"},//Number
			instrument_www:{type:'Text', title:"instrument website", dataType:"url", help:"Fill this field in if the instrument is accessible by a website."},
			instrument_contact_person:{type:"Text", title:"Instrument contact person"},
			instrument_contact_person_phone:{type:"Text", title:"Instrument contact person Phone"},
			instrument_contact_person_email:{type:"Text", title:"Instrument contact person email"},
			instrument_personnel:{type:'Select', options:instr_ded_pers, title:'Instrument dedicated personnel', help:"Personnel dedicated to instrument use and maintainance"},
			comments:{type:'TextArea', help:"other information of interest about the instrument"}
			},
		toString:function(item){
			return JSON.stringify(this.schema.type);// + this.schema.brand;
			}
		});

		var BenchmarkModel = Backbone.Model.extend({
			schema:{
			code:{type:'Text', title:"Code or Name", help:"Input a code or a name of the benchmark"},
			gpsLat:{type:'Number',title:"Latitude ", help:"specify gps Latitude (deg, min 3 dec places)"},
			gpsLon:{type:'Number',title:"Longitude ", help:"specify gps Longitude (deg, min 3 dec places)"},
			gpsElev:{type:'Number',title:"Elevation ", help:"specify gps Elevation (m, no dec places)"},
			specifics: {type:'Text', title:"other benchmarks details", help:"add other details"}
				}
			});
			
		var OnlyCoordsModel = Backbone.Model.extend({
			schema:{
			gpsLat:{type:'Number',title:"Latitude ", help:"specify gps Latitude (deg, min 3 dec places)"},
			gpsLon:{type:'Number',title:"Longitude ", help:"specify gps Longitude (deg, min 3 dec places)"},
			gpsElev:{type:'Number',title:"Elevation ", help:"specify gps Elevation (m, no dec places)"}
				}
			});

        var seismicSation = Backbone.Model.extend({
		schema:{
			Station_code:{type:'Text', title:"Station Code"},
			type: {type:'Select', options:seismicStationTypes, title:"", hrlp:"Type of station. It is possible to specify more than one sensor."},
			gpsLat:{type:'Number',title:"Latitude (deg, min 3 dec places)", help:"GPS Latitude (deg, min 3 dec places). LEAVE EMPTY FOR MOBILE STATIONS"},
			gpsLon:{type:'Number',title:"Longitude (deg, min 3 dec places)", help:"GPS Longitude (deg, min 3 dec places). LEAVE EMPTY FOR MOBILE STATIONS"},
			gpsElev:{type:'Number',title:"Elevation (m, no dec places)", help:"GPS Elevation (m, no dec places). LEAVE EMPTY FOR MOBILE STATIONS"},
            data_transmission: {type:'Select', options: data_transmission_options, title:"Data transmission", help:"How data is transmitted by the staitons"},
			number_of_sensors: {type:'Select', options:[1,2,3,4,5,6,7,8,9,10], help:"Number of sensors for this stations. (Sensor with the same GPS coords)"},
			orfeus_member: {type:'Select', options:["PLEASE SELECT","yes", "no"], title:"available at ORFEUS", help:"specify if this station data is also available at Orfeus datacentre"}
			},
			
		toString:function(item){
			return JSON.stringify(this.schema.type);// + this.schema.brand;
			}
		});
		
		
		
		
		var volcStation = Backbone.Model.extend({
		schema:{
			Station_code:{type:'Text', title:"Station Code"},
			type: {type:'Select', options:volcStationType, title:"Type of station"},
			gpsLat:{type:'Number',title:"Latitude (deg, min 3 dec places)"},
			gpsLon:{type:'Number',title:"Longitude (deg, min 3 dec places)"},
			gpsElev:{type:'Number',title:"Elevation (m, no dec places)"},
            data_transmission: {type:'Select', options: data_transmission_options, title:"Data transmission"},
            year_of_acquisition: {type:'Number', title:"(OPTIONAL) Year of acquisition (yyyy)",help:"When was the station/instrument acquired? Fill it in if the date is avilable."},
			purchase_value: {type:'Number', title:"(OPTIONAL) Purchase Value (euros)", help:"Cost of the station/instrument at the moment of purchase. THIS IS THE UNIT VALUE. It's independent from the 'quantity' fields, it refers to the single instrument"},
            comments:{type:'TextArea'}
			},
			
		toString:function(item){
			return JSON.stringify(this.schema.type);// + this.schema.brand;
			}
		});

        
        var monumentGnss= Backbone.Model.extend({
		schema:{
			monument_type: {type:'Select', options:monumentList, title:"Monument Type"}
            },
		toString:function(item){
			return JSON.stringify(this.schema.monument_type);// + this.schema.brand;
			}
		});


        var dataSmplType = Backbone.Model.extend({
		schema:{
			data_sampling_type: {type:'Select', options:dataSmplType_options, title:"Data sampling type"}
            },
		toString:function(item){
			return JSON.stringify(this.schema.data_sampling_type);// + this.schema.brand;
			}
		});

        var gnssStation=Backbone.Model.extend({
		schema:{
			station_code:{type:'Text', help:"Not applicable in case of temporarycampaing  station/instrument"},
			temporary_station:{type:'Select', title:"Temporary/campaing Station", options:yes_or_no , help:"Is it a Temporary/campaing Station?"},
			domes_number: {type:'Text', title:"Domes number", help:"Number of Domes"},
			gpsLat:{type:'Number',title:"Latitude (deg, min 3 dec places)", help:"Not applicable in case of temporarycampaing  station/instrument"},
			gpsLon:{type:'Number',title:"Longitude (deg, min 3 dec places)",help:"Not applicable in case of temporarycampaing  station/instrument"},
			ellips_height:{type:'Number',title:"Ellipse Height",help:"Not applicable in case of temporarycampaing  station/instrument"},
            installation_date: {type:'Number', title:"Installation date (year: yyyy)"},
			monument: {type:'List', listType:'NestedModel', model: monumentGnss, itemToString:function(instrument){
						var myText=(instrument.monument_type);
						return myText;
						}
                },
            data_sampling_1s:{type:'Select', options:yes_or_no, title:"1sec sampling", help:"does it support 1sec sampling?"},
            data_sampling_30s:{type:'Select', options:yes_or_no, title:"30secs sampling", help:"does it support 30secs sampling?"},
            data_sampling_hourly:{type:'Select', options:yes_or_no, title:"hourly sampling", help:"does it support hourly sampling?"},
            data_sampling_daily:{type:'Select', options:yes_or_no, title:"daily sampling", help:"does it support daily sampling?"},
            data_realtime:{type:'Select', options:yes_or_no, title:"realtime?", help:"does the station outputs realtime data?"},
            physical_marker:{type:'Select', options:yes_or_no, title:"Physical Marker", help:"does the station have a physical marker?"},
            data_communication:{type:'Select', options:gnss_data_communication_select, title:"Data communication"},
            logsheet:{type:'Text',dataType:'url', help:'URL of logsheet or n/a'}
			},
		toString:function(item){
			return JSON.stringify(this.schema.station_code);// + this.schema.brand;
			}
		});

        var gnssDataFormatModel = Backbone.Model.extend({
		schema:{
			gnss_data_format_type: {type:'Select', options:gnss_data_format_options}
            },
		toString:function(item){
			return JSON.stringify(this.schema.gnss_data_format_type);// + this.schema.brand;
			}
		});
        
        var procSfwMod  = Backbone.Model.extend({
            schema:{
                processing_software:{type:'Select', title:"Processing Software", options:procSfwMod_options}
                },
            toString:function(item){
                return JSON.stringify(this.schema.processing_software);// + this.schema.brand;
                }
            });
        
        var procProd= Backbone.Model.extend({
            schema:{
                proc_prod:{type:'Select', title:"Processed Products", options:procProd_options}
                },
            toString:function(item){
                return JSON.stringify(this.schema.proc_prod);// + this.schema.brand;
                }
            });
        
        var dissProd= Backbone.Model.extend({
            schema:{
                diss_prod:{type:'Select', title:"Disseminated Products", options:dissProd_options}
                },
            toString:function(item){
                return JSON.stringify(this.schema.diss_prod);// + this.schema.brand;
                }
            });
            
        var seismicNetDataTypeModel = Backbone.Model.extend({
			schema:{
				seismic_network_data_type: {type:'Select', options:data_type_options, title:"Data Type"}
				},
			toString:function(item){
				return JSON.stringify(this.schema.seismic_network_data_type);// + this.schema.brand;
				}
			});
			
		var seismicNetDataFormatModel = Backbone.Model.extend({
			schema:{
				seismic_network_data_format: {type:'Select', options:data_format_options, title:"Data Format"}
				},
			toString:function(item){
				return JSON.stringify(this.schema.seismic_network_data_format);// + this.schema.brand;
				}
			});
			
			
		var geomagneticObservatory=Backbone.Model.extend({
			schema:{
				observatory_code:{type:'Text', help:"3 letter IAGA code OR \"mobile\"", title:"Observatory Code"},
				gpsLat:{type:'Number',title:"Latitude (deg, min 3 dec places)", help:"Not applicable in case of temporarycampaing  station/instrument"},
				gpsLon:{type:'Number',title:"Longitude (deg, min 3 dec places)",help:"Not applicable in case of temporarycampaing  station/instrument"},
				gpsElev:{type:'Number',title:"Ellipse Height",help:"Not applicable in case of temporarycampaing  station/instrument"},
				establishment_year:{type:'Number',title:"Establishment Year (YYYY)",help:"Starting year of continous series of yearly means stored in WDC"},
				absolute_instruments:{type:'Text',title:"Absolute instruments", help:"Description of the instruments - free text"},
				recording_variometer:{type:'Text',title:"Recording variometer", help:"Description of the instruments - free text"},
				number_of_variometers:{type:'Number',title:"Number of variometers",help:"Number of variometers"},
				data_transmission: {type:'Select', options:geomagnetic_data_transmission_options, title:"Data Transmission", help:"real time = within one hour"},
				data_communication:{type:'Select', options:geomagnetic_data_communication_select, title:"Data communication"}, 
				data_sampling_1s:{type:'Select', options:yes_or_no, title:"1sec sampling", help:"does it support 1sec sampling?"},
				data_sampling_60s:{type:'Select', options:yes_or_no, title:"1 minute sampling", help:"does it support 1 minute sampling?"},
				intermagnet_data:{type:'Select', options:yes_or_no, title:"INTERMAGNET availability:", help:"Is data available in INTERMAGNET system?"},
				wdc_data:{type:'Select', options:yes_or_no, title:"WDC availability:", help:"Is data available in WDC?"},
				comments:{type:'Text',title:"Other details", help:"Free text - usually copy of readme.obs.file for INTERMAGNET Observatories"}
				},
			toString:function(item){
				return JSON.stringify(this.schema.seismic_network_data_format);// + this.schema.brand;
				}
			});
			
			
			//~ {
			//~ station_code:{type:'Text', help:"Not applicable in case of temporarycampaing  station/instrument"},
			//~ temporary_station:{type:'Select', title:"Temporary/campaing Station", options:yes_or_no , help:"Is it a Temporary/campaing Station?"},
			//~ domes_number: {type:'Text', title:"Domes number", help:"Number of Domes"},
			//~ gpsLat:{type:'Number',title:"Latitude (deg, min 3 dec places)", help:"Not applicable in case of temporarycampaing  station/instrument"},
			//~ gpsLon:{type:'Number',title:"Longitude (deg, min 3 dec places)",help:"Not applicable in case of temporarycampaing  station/instrument"},
			//~ ellips_height:{type:'Number',title:"Ellipse Height",help:"Not applicable in case of temporarycampaing  station/instrument"},
            //~ installation_date: {type:'Number', title:"Installation date (year: yyyy)"},
			//~ monument: {type:'List', listType:'NestedModel', model: monumentGnss, itemToString:function(instrument){
						//~ var myText=(instrument.monument_type);
						//~ return myText;
						//~ }
                //~ },
            //~ data_sampling_1s:{type:'Select', options:yes_or_no, title:"1sec sampling", help:"does it support 1sec sampling?"},
            //~ data_sampling_30s:{type:'Select', options:yes_or_no, title:"30secs sampling", help:"does it support 30secs sampling?"},
            //~ data_sampling_hourly:{type:'Select', options:yes_or_no, title:"hourly sampling", help:"does it support hourly sampling?"},
            //~ data_sampling_daily:{type:'Select', options:yes_or_no, title:"daily sampling", help:"does it support daily sampling?"},
            //~ data_realtime:{type:'Select', options:yes_or_no, title:"realtime?", help:"does the station outputs realtime data?"},
            //~ physical_marker:{type:'Select', options:yes_or_no, title:"Physical Marker", help:"does the station have a physical marker?"},
            //~ data_communication:{type:'Select', options:gnss_data_communication_select, title:"Data communication"},
            //~ logsheet:{type:'Text',dataType:'url', help:'URL of logsheet or n/a'}
			//~ }

//*********SCHEMA FOR THE backbone form EDITOR*********
	var backboneJSONform={
		ri:{
			   _id: {type:'Hidden'},
			   _rev: {type:'Hidden'},
			   doctype: {type:'Hidden'},
			   ri_name: {type:'Text', title:"RI Name", help:"This is the RI name. Name format: Institution - RI name"},
			   ri_type: {type:'Select', options:ri_types, title:"RI type"},
			   file_path:{type:'Hidden', title:"File Name", help:"File name of the original paper questionnaire submitted after EPOS kikckoff meeting, located on the GFZ ftp."},
			   country: {type:'Select', options:buildLabels(countries), itemToString: function(user) {
						return user.firstName + ' ' + user.lastName;
					}
				},
			   ri_institution:{type:'Text', title:"RI institution"},
			   ri_website:{type:'Text', dataType:"url", title:"RI website"},
			   wg: {type:'List', listType:'Select',options:wg_list, title: "WG", help:"List of working groups to which the Research Infrastructure belongs"},
			   //~ wg_related: {type:'List', listType:'Select',options:wg_list, title:"WG (related)"},
			   ri_manager:{type:'Text', title: "RI manager"},
			   ri_manager_email:{ type:'Text', dataType: 'email', validators: ['required'], title:"RI manager email" },
			   ri_manager_phone: {type:'Text', title:"RI manager phone"},
			   ri_manager_institution: {type:'Text', title:"RI manager institution"},
			   national_contact_person: {type:'Text', title:"National contact person"},
			   national_contact_person_email:{ dataType: 'email', validators: ['required'], title:"National contact person email" },
			   national_contact_person_phone:{type:'Text', title:"National contact person phone"},
			   national_contact_person_institution: {type:'Text', title:"National contact person institution"},
			   legal_contact_person: {type:'Text', title:"Legal contact person"},
			   legal_contact_person_email:{ dataType: 'email', validators: ['required'], title:"Legal contact person email" },
			   legal_contact_person_phone: {type:'Text', title:"Legal contact person phone"},
			   legal_contact_person_institution: {type:'Text', title:"Legal contact person institution"},
			   financial_contact_person: {type:'Text', title:"Financial contact person"},
			   financial_contact_person_email:{ dataType: 'email', validators: ['required'], type:'Text', title:"Financial contact person email" },
			   financial_contact_person_phone: {type:'Text', title:"Financial contact person phone"},
			   financial_contact_person_institution: {type:'Text', title:"Financial contact person institution"},
			   comments:{type:'TextArea'}
			},
			
		seismic_net:{
			   _id: {type:'Hidden'},
			   _rev: {type:'Hidden'},
			   doctype: {type:'Hidden'},
			   ri_name: {type:'Hidden'},
			   facility_type: {type:'Hidden'},
			   network_code:{type:'Text', title:"Network code"},
			   iris_code:{type:'Hidden', title:"Iris Network code (if available)", help:"Iris Network code"},
			   kind: {type:'Select', options:seismic_network_kinds, help:"Kind of seismic Network; GLOBAL for  World wide networks; REGIONAL for networks which cover more than one nation but are not world-wide; NATIONAL for national (:-)); LOCAL for sub-national netoworks; MOBILE if you are declaring a pool up of mobile stations; OTHER if your network is not included in the previous options." },                   //da cambiare
			    stations: {type:'List', sort:true, listType:'NestedModel', model: seismicSation, itemToString:function(instrument){
						var myText=(instrument.Station_code+' --\t'+instrument.type);
						//~ alert(myText);
						return myText;
						}
					},
			   site_of_study: {type:'Text',  title:"Monitoring Area"},
			    data_type:{type:'List', listType:'NestedModel',title:"Data type", model: seismicNetDataTypeModel, itemToString:function(instrument){
						var myText=(instrument.seismic_network_data_type);
						return myText;
						}
                    },
			   data_format: {type:'List', listType:'NestedModel',title:"Data format", model: seismicNetDataFormatModel, itemToString:function(instrument){
						var myText=(instrument.seismic_network_data_format);
						return myText;
						}
                    },

			   data_policy: {type:'Select', options:data_policy_options, title:"Data policy" },
			   active:{ type:'Select', options:yes_or_no, title:"Network is Active?", help:"Is the network active" },
			    other_details: {type:'TextArea', title:"Other details"}
			},
			
		gnss_net:{
			   _id: {type:'Hidden'},
			   _rev: {type:'Hidden'},
			   doctype: {type:'Hidden'},
			   ri_name: {type:'Hidden'},
			   facility_type: {type:'Hidden'},
               gnss_net_name:{type:'Text', title:"Network Name", help:"Internal Name ofthe network"},
			   gnss_net_kind: {type:'Select', title:"Kind of network", options:gnss_networks_kinds},
			    GNSS_stations: {type:'List', sort:true, listType:'NestedModel', model: gnssStation, title:"Stations", itemToString:function(instrument){
						var myText=(instrument.station_code);
						return myText;
						}
					},
				GNSS_campaing_stations: {type:'Number',  title:"Number of Campagin Stations, only if available (optional)",help:"Specify the number of campaign stations. Also, define a list of benchmarks in the field just below"
					},
				gnss_benchmarks:{type:'List', sort:true,title: 'Benchmark list', listType:'NestedModel', model: volcStation, help:"List of Benchmarks (optional)", itemToString:function(instrument){
						var myText=(instrument.Station_code+' \t'+instrument.type);
						//~ alert(myText);
						return myText;
						}
					},
			   number_sites: {type:'Number', title:"Number of sites", help:"Number of sites included on this network. One station only can belong to a single network."},
               gnss_raw_data_archive:{type:'Select', title:"Raw data is archived?", options:yes_or_no},
               gnss_rinex_data_archive:{type:'Select', title:"RINEX data is archived?", options:yes_or_no},
               gnss_data_transmission:{type:'Select', title:"Data transmission ", options:gnss_data_transmission_select},
               gnss_type_of_transmission:{type:'Hidden', title:"Type of transmission", options:gnss_type_of_transmission_select},//Select
               gnss_data_format:{type:'List', listType:'NestedModel',title:"GNSS data format", model: gnssDataFormatModel, itemToString:function(instrument){
						var myText=(instrument.gnss_data_format_type);
						return myText;
						}
                    },
               gnss_data_policy:{type:'Select', title:"Data Policy", options:gnss_data_policy_select, help:"Delayed means months to the data become Open. On-Request means an Open policy but no active effort. Restricted to particular groups also means Closed."},
			    other_details: {type:'TextArea',title:"Other details"}
			},
			
		gnss_datacentre:{
            _id: {type:'Hidden'},
			_rev: {type:'Hidden'},
			doctype: {type:'Hidden'},
			facility_type: {type:'Hidden'},
			ri_name: {type:'Hidden'},
            data_centre_storage_capacity_tb: {type:'Number', title:'Data centre storage capacity tb'},
            exclusive_cors:{type:'Number', title:"Number of Exclusive CORS", help:"number CORS (Continuously Operating Reference Station) archived in this datacentre."},
            total_cors:{type:'Number', title:"Total number of cors CORS", help:"Number CORS (Continuously Operating Reference Station) archived in this datacentre which are shared."},
            //~ data_availability:{type:'Number',options:lab_data_policy,title:"% of data availability", help:"Description of how the archived data is made available to the community via internet protocol:None (0%) , Partial (%)), All (100%)"},
            dc_connectivity_protocols:{type:"Select", title:"Connectivity protocols", help:"Protocols to access to data", options:dc_connectivity_protocols_options},
            web_data_access:{type:'Text', dataType:"url", title:"website to access to data"},
            dc_metadata:{type:"Select", title:"Datacenter metadata",options:dc_metadata_options},
            comments:{type:"TextArea", help:"add any comment."}
            },
			
		laboratory:{
			   _id: {type:'Hidden'},
			   _rev: {type:'Hidden'},
			   doctype: {type:'Hidden'},
			   ri_name: {type:'Hidden'},
			   facility_type: {type:'Hidden'},
			   laboratory_name: {type:'Text', title:"Laboratory name", help:"Name of laboratory"},
               laboratory_research_field:{type:'Select', options:lab_res_field, title:"Lab. Research Field", help:"Research area of the laboratory"},
			    equipment: {type:'List', title:'Instrument pool',listType:'NestedModel', model: LabInstrument, help:"Laboratory available instruments", itemToString:function(instrument){
						var myText=(instrument.quantity+' \t'+instrument.type);
						//~ alert(myText);
						return myText;
						}
					},
				mobile_equipment:{type:'Hidden', title: 'Mobile instrument pool', listType:'NestedModel', model: LabInstrument, help:"Laboratory available MOBILE instruments", itemToString:function(instrument){
						var myText=(instrument.quantity+' \t'+instrument.type);
						//~ alert(myText);
						return myText;
						}
					},//the type was "List"
			   lab_contact_person:{type:"Text", title:"Laboratory contact person"},
			   lab_contact_person_phone:{type:"Text", title:"Laboratory contact person Phone"},
			   lab_contact_person_email:{type:"Text", title:"Laboratory contact person email"},
			   lab_address: {type:'Text', title:"Full address (st., city, PObox)"},
			   lab_city:{type:'Text', title:"City"},
			   lab_gpsLat:{type:'Hidden',title:"Laboratory Latitude (deg, min 3 dec places)", help:"Insert gpsLat coordinates if you want your lab to be shown on map"},
			   lab_gpsLon:{type:'Hidden',title:"Laboratory Longitude (deg, min 3 dec places)", help:"Insert gpsLon coordinates if you want your lab to be shown on map"},
			   lab_www:{type:'Text', title:"Laboratory website"},
			   data_type: {type:'List', listType:'Text', title:"Data type", help:"Type of data produced by laboratory machinery"},
			   status: {type:'Hidden'},
			    other_details: {type:'TextArea',title:"Other details", help:"Additional informations"}
			},
			
        data_processing_facility:{
            _id: {type:'Hidden'},
            _rev: {type:'Hidden'},
            doctype: {type:'Hidden'},
            status: {type:'Hidden'},
            facility_type: {type:'Hidden'},
            ri_name: {type:'Hidden'},
            processing_software:{type:"List", listType:'NestedModel', model:procSfwMod, title:"Processing Software",itemToString:function(instrument){
						var myText=(instrument.processing_software);
						return myText;
						}
                    },
            processing_hardware:{type:"List",listType:"TextArea", title:'Processing Hardware', help:"Hardware used for processing"},
            proc_st:{type:"Text",title:"Avg Num. of processed stations (only for GPS)", help:"Average number of Processed Stations"},
            data_origin:{type:"List",listType:"TextArea", title:"Data origin", help:"List of sources of data, e.g: Satellite, instrument, airborne, etc"},
            proc_prod:{type:"List", listType:'NestedModel', model:procProd, title:"Processed Products", help:"Products usually computed from the archived observations",itemToString:function(instrument){
						var myText=(instrument.proc_prod);
						return myText;
						}
                    },
            dissem_prod:{type:"List", listType:'NestedModel', model:dissProd, title:"Disseminated Products", help:"Products make available to other users via web:",itemToString:function(instrument){
						var myText=(instrument.diss_prod);
						return myText;
						}},
			proc_website:{type:"Text",title:"Products webpage", help:"Main page for results visualization & downloading"},
            comments:{type:"TextArea", help:"add any comment."}
            },
        
        volcano_remote_sensing:{
			_id: {type:'Hidden'},
			_rev: {type:'Hidden'},
			doctype: {type:'Hidden'},
			facility_type: {type:'Hidden'},
			ri_name: {type:'Hidden'},
			vrs_hardware: {type:'List', title:'Instruments/hardware pool',listType:'NestedModel', model: LabInstrument, help:"Instruments or hardware used in your remote sensing facility", itemToString:function(instrument){
						var myText=(instrument.quantity+' \t'+instrument.type);
						//~ alert(myText);
						return myText;
						}
					},
			vrs_software:{type:'List', title:"List of used software ", listType:'TextArea', help:"List of commercial or open source software for processing data"},
			vrs_algorithm:{type:'List', title:"List of used Algorithms ", listType:'TextArea', help:"Known algorithms for data processing and conversion"},
			vrs_data_provider:{type:'List', title:"Data Provider (List)",listType:'TextArea', help:"Example: 'NASA', 'LANDSat', 'SPOT' etc."},
			vrs_data_type: {type:'List', listType:'Text', title:"Data type", help:"Type of data produced"},
			comments:{type:"TextArea", help:"add any comment."}
			},
			
		temporary_instrument_pool:{
			_id: {type:'Hidden'},
			_rev: {type:'Hidden'},
			doctype: {type:'Hidden'},
			facility_type: {type:'Hidden'},
			ri_name: {type:'Hidden'},
			temporary_instrument_pool_type_name:{type:'List', title:"Netowrk Type (objective of the measure)",listType:'TextArea', help:'e.g. Geodetic, geo-chemical..'},
			temporary_instrument_pool_instruments:{type:'List', title: 'Mobile instrument pool (list)', listType:'NestedModel', model: LabInstrument, help:"Instrument pool", itemToString:function(instrument){
						var myText=(instrument.quantity+' \t'+instrument.type);
						//~ alert(myText);
						return myText;
						}
					},
			temporary_instrument_pool_connectivity:{type:'List', listType:'Select',options:gnss_type_of_transmission_select,  title:"Type of available connectivity (list)",listType:'TextArea', help:'e.g. wireless, wired etc.'},
			comments:{type:"TextArea", help:"add any comment."}
			},
        
        geochemical_monitoring_network:{
		   _id: {type:'Hidden'},
		   _rev: {type:'Hidden'},
		   doctype: {type:'Hidden'},
		   ri_name: {type:'Hidden'},
		   facility_type: {type:'Hidden'},
		   network_name:{type:'Text', title:"Network Name/Code (optional)", help:"Please specify a network name or code if available"},
		   kind: {type:'Text', title:"Kind of Chemical monitoring Network (opt.)", help:"Please specify a kind of network, if a definition is applicable" },
		    equipment: {type:'List', title:'Instruments pool',listType:'NestedModel', model: LabInstrument, help:"Laboratory available instruments", itemToString:function(instrument){
						var myText=(instrument.quantity+' \t'+instrument.type);
						//~ alert(myText);
						return myText;
						}
					},
		    data_type: {type:'List', listType:'Text', title:"Data type (list)", help:"Specify the type of data produced by the instruments/stations. You can insert more than one"},
		   data_format: {type:'List', listType:'Text', title:"Data format (list)", help:"Specify the format of data produced by the instruments/stations. You can insert more than one."},
		   connectivity:{type:'List', listType:'Select',options:gnss_type_of_transmission_select,  title:"Type of available connectivity (list)",listType:'TextArea', help:'e.g. wireless, wired etc.'},
		    comments:{type:"TextArea", help:"add any comment."}
		},
		
		volcanological_facility:{
		   _id: {type:'Hidden'},
		   _rev: {type:'Hidden'},
		   doctype: {type:'Hidden'},
		   ri_name: {type:'Hidden'},
		   facility_type: {type:'Hidden'},
		   network_name:{type:'Text', title:"Network Name/Code (optional)", help:"Please specify a network name or code if available"},
		   volc_fac_type: {type:'Select', options:volc_fac_type_select, title:"Type of volcanological Facility", help:"Select one of the values in the dropdown menu. It should describe the type of volcanological facility you are declaring." },
		    equipment: {type:'List', title:'Instruments List',listType:'NestedModel', model: LabInstrument, help:"Instruments of your network/pool (no gps coords)", itemToString:function(instrument){
						var myText=(instrument.quantity+' \t'+instrument.type);
						//~ alert(myText);
						return myText;
						}
					},
			stations: {type:'List', title:'Stations/benchmarks list',listType:'NestedModel', model: volcStation, help:"Stations of your network/pool (with gps coords)", itemToString:function(station){
						var myText=(station.Station_code+'\t'+station.type);
						//~ alert(myText);
						return myText;
						}
					},
					
					
		    data_type: {type:'List', listType:'Text', title:"Data type (list)", help:"Specify the type of data produced by the instruments/stations. You can insert more than one"},
		   data_format: {type:'List', listType:'Text', title:"Data format (list)", help:"Specify the format of data produced by the instruments/stations. You can insert more than one."},
		   connectivity:{type:'List', listType:'Select',options:gnss_type_of_transmission_select,  title:"Type of available connectivity (list)",listType:'TextArea', help:'e.g. wireless, wired etc.'},
		   facility_contact_person:{type:'Text', title: "Facility Contact Person"},
			   facility_contact_person_email:{ type:'Text', dataType: 'email', validators: ['required'], title:"Facility Contact Person email" },
			   facility_contact_person_phone: {type:'Text', title:"Facility Contact Person phone"},
			   facility_contact_person_institution: {type:'Text', title:"Facility Contact Person institution"},
		    comments:{type:"TextArea", help:"add any comment."}
		},
		
		benchmarks_list:{
			_id: {type:'Hidden'},
			_rev: {type:'Hidden'},
			doctype: {type:'Hidden'},
			facility_type: {type:'Hidden'},
			ri_name: {type:'Hidden'},
			benchmarks_list_list:{type:'List', title: 'List of benchmarks ', listType:'NestedModel', model: BenchmarkModel, help:"Insert the list of benchmarks with their geocoordinates"},
			comments:{type:"TextArea", help:"add any comment."}
			},
			
        geodetic_and_deformation_monitoring:{
			_id: {type:'Hidden'},
			_rev: {type:'Hidden'},
			doctype: {type:'Hidden'},
			facility_type: {type:'Hidden'},
			ri_name: {type:'Hidden'},
			geodetic_and_deformation_mon_name:{type:'Text', title:"Network Name (if any)", help:"Specify a network name if available"},
			geodetic_and_deformation_type:{type:'Select',options:geodetic_and_deformation_type_select,title:"Network Type", help:"Specify the type of network/nstrument pool"},
			geodetic_and_deformation_instrument_type:{type:'Select',options:geodetic_and_deformation_instrument_type_select,title:"Network Instrument Type", help:"Specify the type of instrument composing the network"},
			geodetic_and_deformation_equipment_list:{type:'List', title: 'Equipment/station list', listType:'NestedModel', model: LabInstrument, help:"List of stations/instruments", itemToString:function(instrument){
						var myText=(instrument.quantity+' \t'+instrument.type);
						//~ alert(myText);
						return myText;
						}
					},
					
			data_type:{type:'List', listType:'Text',title:"Data type",help:"Specify the type of data produced by the instruments/stations. You can insert more than one"},
			data_format:{type:'List', listType:'Text',title:"Data format",help:"Specify the format of data produced by the instruments/stations. You can insert more than one."},
            connectivity:{type:'List', listType:'Select',options:gnss_type_of_transmission_select,  title:"Type of available connectivity (list)",listType:'TextArea', help:'e.g. wireless, wired etc.'},
			comments:{type:"TextArea", help:"add any comment."}
			},
			
		potential_field_monitoring:{
			_id: {type:'Hidden'},
			_rev: {type:'Hidden'},
			doctype: {type:'Hidden'},
			facility_type: {type:'Hidden'},
			ri_name: {type:'Hidden'},
			potential_field_mon_name:{type:'Text', title:"Network Name (if any)", help:"Specify a network name if available"},
			potential_field_type:{type:'Select',options:potential_field_type_select,title:"Network Type", help:"Specify the type of network/nstrument pool"},
			potential_field_equipment_list:{type:'List', title: 'Equipment/station list', listType:'NestedModel', model: LabInstrument, help:"List of stations/instruments", itemToString:function(instrument){
						var myText=(instrument.quantity+' \t'+instrument.type);
						//~ alert(myText);
						return myText;
						}
					},
					
			data_type:{type:'List', listType:'Text',title:"Data type",help:"Specify the type of data produced by the instruments/stations. You can insert more than one"},
			data_format:{type:'List', listType:'Text',title:"Data format",help:"Specify the format of data produced by the instruments/stations. You can insert more than one."},
            connectivity:{type:'List', listType:'Select',options:gnss_type_of_transmission_select,  title:"Type of available connectivity (list)",listType:'TextArea', help:'e.g. wireless, wired etc.'},
			comments:{type:"TextArea", help:"add any comment."}
			},
			
		datacentre:{
            _id: {type:'Hidden'},
			_rev: {type:'Hidden'},
			doctype: {type:'Hidden'},
			ri_name: {type:'Hidden'},
			data_centre_type:{type:'List', listType:'Select',options:data_centre_type_select,  title:"Type of Datacentre (list)", help:'Specify if it is a Seismological DAtacentre, Computational etc. More than one entry allowed.'},
			data_centre_data_from:{type:'List', listType:'Select',options:net_name_and_code_select,  title:"List of Networks connected to this DC", help:'Select the networks which deliver data to this datacentre.'},
           data_centre_hardware: {type:"List", listType:'Text', title:"Data centre hardware"},
           data_centre_acquisition_software: {type:'List', listType:'Text', title:"Data centre acquisition software"},
           data_centre_data_type:{type:"List", listType:'Text', title:"Data centre data type (optional)", help:"type of data stored (e.g. images, waveforms etc)"},
			data_centre_data_format:{type:"List", listType:'Text', title:"Data centre data format (optional)", help:"format of stored data (e.g. ascii, binary, proprietary etc.)"},
			data_organization: {type:"List", listType:'Text', title:"Data organization", help:"How data is organized.  E.G. relatinal DB, noSQL DB, filesystem etc."},
           data_centre_storage_capacity_tb: {type:'Number', title:"Data centre storage capacity tb", help:"Maximum amount of data that can be stored"},
           "data_centre_growth_rate_storage_capacity_tb-y": {type:'Number', title:"Data centre growth rate storage capacity (tb/y)"},
           data_volume_tb: {type:'Number', title:"Data volume tb", help:"Volume of the actual data stored."},
           "data_volume_growth_rate_tb-y": {type:'Number', title:"Data volume growth rate (tb/y)"},
           dc_connectivity_bandwidth: {type:'Text', title:"Dc connectivity bandwidth"} ,
           dc_connectivity_protocols: {type:'List', listType:'Text', title:"Dc connectivity protocols"},
           dc_objective: {type:'Hidden', title:"Datacentre  objective"},
           dc_software: {type:'List', listType:'Text', title:"Datacentre software & languages", help:"(e.g. fortran, MPI, c++ etc)"},
           
           licensed_software: {type:'List', listType:'Text', title:"Licensed software"},
           data_policy: {type:'Text', title:"Data policy"},
           comments:{type:"TextArea", help:"add any comment."}
			},
            
		dataarchive:{
		   "_id": {type:'Hidden'},
		   "_rev": {type:'Hidden'},
		   "doctype": {type:'Hidden'},
		   "status": {type:'Hidden'},
		   "ri_name": {type:'Hidden'},
		   "data_archive_name":{type:'Text', title:"Data archive name (optional)", help:"Name of the data archive, if any"},
		   "data_archive_data_type": {type:'List', listType:'Text', title: 'Data Archive data type', help:"Types of data stored in the archive (list). e.g. time series, parametric, images etc."},
		   "data_archive_hardware": {type:'List', listType:'Text', title:"Data archive hardware", help:"Hardware used for the archive"},
		   "data_archive_software": {type:'List', listType:'Text',title:"Data archive software", help:"Software used in and for the archive"},
		   "data_archive_languages": {type:'List', listType:'Text',title:"Languages", help:"Languages used in and for the archive.  E.g C, Delphi etc"},
		   "data_archive_organization": {type:'Text', title:"Data archive organization", help:"How is the data organized? e.g. relational database, noSQL database, filesystem directories etc."},
		   "data_archive_storage_tb": {type:'Number', title: "Data archive storage (TB)", help:"Available Storage in TERABYTES (not Gigabytes!!!!)"},
		   "data_archive_storage_tb_growth_rate_tb-y": {type:'Number', title: "Data archive storage growth rate (TB/y)", help:"Storage yearly growth in TERABYTES (not Gigabytes!!!!)"},
		   "data_archive_volume_tb": {type:'Number', title:"Data archive volume (TB)", help:"Volume of data in TERABYTES (not Gigabytes!!!!)"},
		   "data_archive_volume_growth_rate_tb-y": {type:'Number', title: "Data Archive Volume growth rate (TB/y)", help:"Yearly data volume growth in TERABYTES (not Gigabytes!!!!)"},
		   "data_archive_os": {type:'Text', title:"Data Archive Operating System"},
		   "data_archive_access": {type:'Text', title:"Data archive access"},
		   "data_archive_policy": {type:'Text', title:"Data archive policy"},
		   comments:{type:"TextArea", help:"add any comment."}
			},
			
		financial:{
		    "_id": {type:'Hidden'},
		   "_rev": {type:'Hidden'},
		    "ri_name":{type:'Hidden'},
		    "doctype":{type:'Hidden'},
		    
		    "ri_total_value":{type:'Hidden', title:"RI total Value"},//Number
		    "total_labour_costs":{type:'Hidden', title:"Total Labour costs"},//Text
		    "total_labour_full_time_equivalent":{type:'Hidden', title:"Total Labour full time equivalent"},//Number
		    "annual_running_cost_budget":{type:'Hidden', title:"Annual running cost budget"},//Number
		    "total_common_services_participating":{type:'Hidden', title:"Total common services participating"},//Number
		    "total_cost_of_RI":{type:'Hidden', title:"Total cost of RI"},//Number
		    "total_funding_of_labour":{type:'Hidden', title:"Total funding of labour"},//Number
		    "total_funding_of_labour_full_time_equivalent":{type:'Hidden', title:"Total funding of labour full time equivalent"},//Number
		    "total_funding_of_running_costs":{type:'Hidden', title:"Total funding of running costs"},//Number
		    "total_funding_for_RI":{type:'Hidden', title:"Total funding for RI"},//Number
		    "comments":{type:'Hidden'}//TextArea
		    },

        comment_form:{
            "_id": {type:'Hidden'},
		   "_rev": {type:'Hidden'},
		    "ri_name":{type:'Hidden'},
		    "doctype":{type:'Hidden'},
            comment:{type:'TextArea', title:"Insert your comments here", help:"Here you can add comments about the Research Infrastructure data. What is missing, what should be improved etc."}
            }, 

        onegeology:{
			_id: {type:'Hidden'},
			_rev: {type:'Hidden'},
			doctype: {type:'Hidden'},
			facility_type: {type:'Hidden'},
			ri_name: {type:'Hidden'},
			onegeology_link:{type:'Text', title:"One Geology Link", dataType:"url", help:"OneGeology link to this RI."},
			comments:{type:"TextArea", help:"add any comment."}
			},
			
        geomagnetic_permanent:{
				_id: {type:'Hidden'},
			   _rev: {type:'Hidden'},
			   doctype: {type:'Hidden'},
			   ri_name: {type:'Hidden'},
			   facility_type: {type:'Hidden'},
			   name:{type:'Text', title:"Name", help:"Current name of the facility. In case there is no official name please report RI name"},
			   kind: {type:'Select', options:geomagnetic_net_kinds, help:"Select the different kind of facility. Observatory is a permanent installation with a unique IAGA code, station is a permantent installation without IAGA code." },
			   iaga_code:{type:'Text', title:"IAGA code", help:"IAGA code if your observatory is registered in IAGA database http://www.iugg.org/IAGA/index.html"},
				number_of_vectorial_magnetometers:{type:'Number',title:"Number of vector magnetometers",help:"Number of vector magnetometers"},
				number_of_scalar_magnetometers:{type:'Number',title:"Number of scalar magnetometers",help:"Number of scalar magnetometers"},
				number_of_teodolites:{type:'Number',title:"Number of Fluxgate Theodolites",help:"Number of Fluxgate Theodolites"},
				geo_coords:{type:'List', title: 'Observatory Location', listType:'NestedModel', model: OnlyCoordsModel, help:"Insert Observatory Location (GPS coordinates)", itemToString:function(instrument){
						var myText=("Lat:"+instrument.gpsLat+"  -  " +"Lon:"+instrument.gpsLon);
						return myText;
						}
					},
				//~ gpsLat:{type:'Number',title:"Latitude (deg, min 3 dec places)", help:"specify gps Latitude (deg, min 3 dec places)"},
				//~ gpsLon:{type:'Number',title:"Longitude (deg, min 3 dec places)", help:"specify gps Longitude (deg, min 3 dec places)"},
				//~ gpsElev:{type:'Number',title:"Elevation (m, no dec places)", help:"specify gps Elevation (m, no dec places)"},
				establishment_year:{type:'Number',title:"Establishment Year (YYYY)",help:"Starting year of data delivery"},
				data_transmission: {type:'Select', options:geomagnetic_data_transmission_options, title:"Data Transmission Rate", help:"real time = within one hour"},
				data_communication:{type:'Select', options:geomagnetic_data_communication_select, title:"Data Communication", help:"How data are transmitted"}, 
				data_sampling_rate:{type:'Select', options:geomagnetic_data_sampling, title:"Sampling Rate", help:"best data sampling rate available at the observatory/station"},
				intermagnet_data:{type:'Select', options:yes_or_no, title:"INTERMAGNET Membership:", help:"Is the observatory included in INTERMAGNET network?"},
				wdc_data:{type:'Select', options:yes_or_no, title:"WDC availability:", help:"Is data available in WDC?"},
			    data_format: {type:'List', listType:'Select',title:"Data format",options:geomagnetic_net_data_format, help:"INTERMAGNET and WDC's distribute data in IAGA2010, some observatories can have their own format " },
			   data_policy: {type:'Select', options:data_policy_options, title:"Data policy" , help:"Policy for delivering data"},
			   other_experimental_equipment: {type:'TextArea', title:"Other Experimental Equipment", help:"Any other experimental equipment developed in the observatory"},
			   comments: {type:'TextArea', title:"Other details or comments", help:"add comments"}
			},
		geomagnetic_temporary:{
				_id: {type:'Hidden'},
			   _rev: {type:'Hidden'},
			   doctype: {type:'Hidden'},
			   ri_name: {type:'Hidden'},
			   facility_type: {type:'Hidden'},
			   name:{type:'Text', title:"Name", help:"Current name of the facility. In case there is no official name please report RI name"},
			   kind: {type:'Select', options:["temporary"], help:"temporary (or mobile) stations" },
				number_of_vectorial_magnetometers:{type:'Number',title:"Number of vector magnetometers",help:"Number of vector magnetometers"},
				number_of_scalar_magnetometers:{type:'Number',title:"Number of scalar magnetometers",help:"Number of scalar magnetometers"},
				number_of_teodolites:{type:'Number',title:"Number of Fluxgate Theodolite",help:"Number of Fluxgate Theodolite"},
				//~ data_transmission: {type:'Select', options:geomagnetic_data_transmission_options, title:"Data Transmission Rate", help:"real time = within one hour"},
				//~ data_communication:{type:'Select', options:geomagnetic_data_communication_select, title:"Data Communication", help:"How data are transmitted"}, 
				data_sampling_rate:{type:'Select', options:geomagnetic_data_sampling, title:"Sampling Rate", help:"best data sampling rate available at the station"},
			    data_format: {type:'List', listType:'Select',title:"Data format",options:geomagnetic_net_data_format, help:"INTERMAGNET and WDC's distribute data in IAGA2010, some observatories can have their own format " },
			   data_policy: {type:'Select', options:data_policy_options, title:"Data policy" , help:"Policy for delivering data"},
			   other_experimental_equipment: {type:'TextArea', title:"Other Experimental Equipment", help:"Any other experimental equipment developed in the observatory"},
			   comments: {type:'TextArea', title:"Other details or comments"}
			},
		geomagnetic_repeat_stations:{
				_id: {type:'Hidden'},
			   _rev: {type:'Hidden'},
			   doctype: {type:'Hidden'},
			   ri_name: {type:'Hidden'},
			   facility_type: {type:'Hidden'},
			   name:{type:'Text', title:"Name", help:"Current name of the facility. In case there is no official name please report RI name"},
			   kind: {type:'Select', options:["repeat stations"], help:"Repeat stations are permanently marked sites where it is possible to make accurate observations of the Earth’s magnetic field vector for a period of a few hours (sometimes a few days) every few years" },
			   benchmarks_list_list:{type:'List', sort:true, title: 'List of benchmarks ', listType:'NestedModel', model: BenchmarkModel, help:"Insert the list of benchmarks with their geocoordinates", itemToString:function(instrument){
						var myText=(instrument.code);
						return myText;
						}
					}			   
			}
			
			
	};





//*********UNCOMMENT TO DUMP SCHEME IN A TABLE*********
//~ var newdiv1 = $('<div id="object1"/>');
//~ 
//~ for (var table in backboneJSONform) {
//~ $(newdiv1).append("<br><br><h1>"+table+"</h1>");
//~ 
//~ var tempobj=$('<div id="'+table+'"/>');
//~ var oggettotable= $("<table border=1>");
    //~ for (var row in backboneJSONform[table]) {		
        //~ var riga=("<tr>");
        //~ riga=riga+("<td>"+row+"</td>");
        //~ riga=riga+("<td>"+backboneJSONform[table][row]["type"]+"</td>");
        //~ riga=riga+("<td>"+backboneJSONform[table][row]["help"]+"</td>");
        //~ riga=riga+"</tr>";
        //~ $(oggettotable).append(riga);
    //~ }
    //~ console.log($(oggettotable));
//~ $(tempobj).append($(oggettotable));
//~ $(newdiv1).append($(tempobj));    
//~ 
//~ }
//~ 
//~ $('body').append(newdiv1);
//~ //-*************************************************//
//~ var myObject= new LabInstrument();
//~ 
//~ var tempobj=$('<div id="tabella"/>');
//~ var oggettotable= $("<table border=1 id=\"reporttable\">");
//~ for (var field in myObject.schema){
	//~ var riga=("<tr>");
	//~ riga=riga+("<td>"+field+"</td>");
    //~ riga=riga+("<td>"+myObject.schema[field]["type"]+"</td>");
    //~ riga=riga+("<td>"+myObject.schema[field]["help"]+"</td>");
	//~ $(oggettotable).append(riga);
	//~ }
//~ $(tempobj).append($(oggettotable));
//~ //$('body').append(tempobj);
//~ 
//~ 
//~ var generator=window.open('popup','name','height=400,width=500');
  //~ 
  //~ 
//~ generator.document.write('<html><head><title>Popup</title>');
    //~ generator.document.write('</head>');
    //~ generator.document.write('<body>');
  //~ generator.document.write('<form action=\"http://epos.bo.ingv.it/assets/documents/ride/SaveToExcel.php\" method=\"post\" target=\"_blank\" onsubmit=\'$(\"#datatodisplay\").val( $(\"&lt;div&gt;\").append( $(\"#reporttable\").eq(0).clone() ).html() );\'> <input  type=\"image\" src=\"/epos-couch/_design/epos-couch/img/xcel.png\"  > <input type=\"hidden\" id=\"datatodisplay\" name=\"datatodisplay\" /></form>');
    //~ generator.document.write('</body></html>');
    //~ $(generator.document.body).append($(tempobj));
  //~ generator.document.close();
  //~ 
//~ 
