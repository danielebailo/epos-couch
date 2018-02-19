



function isObject(obj) {
    return obj === Object(obj);
  }
  
  
function isArray (obj) {
    return toString.call(obj) == '[object Array]';
  }


function searchIntoObj(key,obj){
    var retVals=[];
    for (var objKey in obj){
        if (isObject(obj[objKey])){
            console.log(obj[objKey]);
            retVals.concat((searchIntoObj(key,obj[objKey])));
            }
        else{
            if (objKey==key)
                retVals.push(obj[objKey]);
            }
        }
    return retVals;
    }
    
    
var obj={
rows: [
{
key: " Geological-Geophysical facilities",
value: [
{
doctype: "ri",
ri_name: " Geological-Geophysical facilities",
ri_type: "Geological-geophysical equipments and software",
country: "spain",
wg_main: 5
},
{
doctype: "financial",
ri_name: " Geological-Geophysical facilities"
}
]
},
{
key: "Applied Geophysics",
value: [
{
doctype: "ri",
ri_name: "Applied Geophysics",
ri_type: "equipment and software of applied geophysics",
country: "spain",
wg_main: 5
},
{
doctype: "financial",
ri_name: "Applied Geophysics"
}
]
},
{
key: "ASCR - Czech regional seismic center",
value: [
{
doctype: "financial",
ri_name: "ASCR - Czech regional seismic center"
},
{
doctype: "ri",
ri_name: "ASCR - Czech regional seismic center",
ri_type: "PLEASE SELECT",
country: "czech_republic",
wg_main: "1"
},
{
doctype: "facility",
ri_name: "ASCR - Czech regional seismic center",
facility_type: "seismic_net",
network_code: "",
kind: "PLEASE SELECT",
equipment: [
{
type: "broadband",
brand: ""
},
{
type: "shortperiod",
brand: ""
},
{
type: "accelerometer",
brand: ""
}
]
},
{
doctype: "datacentre",
ri_name: "ASCR - Czech regional seismic center"
}
]
},
{
key: "ASCR - Local seismic array East Bohemia",
value: [
{
doctype: "financial",
ri_name: "ASCR - Local seismic array East Bohemia"
},
{
doctype: "ri",
ri_name: "ASCR - Local seismic array East Bohemia",
ri_type: "PLEASE SELECT",
country: "czech_republic",
wg_main: "1"
},
{
doctype: "facility",
ri_name: "ASCR - Local seismic array East Bohemia",
facility_type: "seismic_net",
network_code: "",
kind: "PLEASE SELECT",
equipment: [
{
type: "broadband",
brand: ""
},
{
type: "shortperiod",
brand: ""
},
{
type: "accelerometer",
brand: ""
}
]
},
{
doctype: "datacentre",
ri_name: "ASCR - Local seismic array East Bohemia"
}
]
},
{
key: "ASCR - Local seismic array Provadia",
value: [
{
doctype: "financial",
ri_name: "ASCR - Local seismic array Provadia"
},
{
doctype: "ri",
ri_name: "ASCR - Local seismic array Provadia",
ri_type: "PLEASE SELECT",
country: "czech_republic",
wg_main: "1"
},
{
doctype: "facility",
ri_name: "ASCR - Local seismic array Provadia",
facility_type: "seismic_net",
network_code: "",
kind: "PLEASE SELECT",
equipment: [
{
type: "broadband",
brand: ""
},
{
type: "shortperiod",
brand: ""
},
{
type: "accelerometer",
brand: ""
}
]
},
{
doctype: "datacentre",
ri_name: "ASCR - Local seismic array Provadia"
}
]
},
{
key: "ASCR - Local seismic network norther Moravia (Masaryk Univ.)",
value: [
{
doctype: "financial",
ri_name: "ASCR - Local seismic network norther Moravia (Masaryk Univ.)"
},
{
doctype: "ri",
ri_name: "ASCR - Local seismic network norther Moravia (Masaryk Univ.)",
ri_type: "PLEASE SELECT",
country: "czech_republic",
wg_main: "1"
},
{
doctype: "facility",
ri_name: "ASCR - Local seismic network norther Moravia (Masaryk Univ.)",
facility_type: "seismic_net",
network_code: "",
kind: "PLEASE SELECT",
equipment: [
{
type: "broadband",
brand: ""
},
{
type: "shortperiod",
brand: ""
},
{
type: "accelerometer",
brand: ""
}
]
},
{
doctype: "datacentre",
ri_name: "ASCR - Local seismic network norther Moravia (Masaryk Univ.)"
}
]
},
{
key: "ASCR - Mobile seismic network (mobnet)",
value: [
{
doctype: "financial",
ri_name: "ASCR - Mobile seismic network (mobnet)"
},
{
doctype: "ri",
ri_name: "ASCR - Mobile seismic network (mobnet)",
ri_type: "PLEASE SELECT",
country: "czech_republic",
wg_main: "1"
},
{
doctype: "facility",
ri_name: "ASCR - Mobile seismic network (mobnet)",
facility_type: "seismic_net",
network_code: "",
kind: "PLEASE SELECT",
equipment: [
{
type: "broadband",
brand: ""
},
{
type: "shortperiod",
brand: ""
},
{
type: "accelerometer",
brand: ""
}
]
},
{
doctype: "datacentre",
ri_name: "ASCR - Mobile seismic network (mobnet)"
}
]
},
{
key: "ASCR - Seismologial software center",
value: [
{
doctype: "financial",
ri_name: "ASCR - Seismologial software center"
},
{
doctype: "ri",
ri_name: "ASCR - Seismologial software center",
ri_type: "PLEASE SELECT",
country: "czech_republic",
wg_main: "1"
},
{
doctype: "facility",
ri_name: "ASCR - Seismologial software center",
facility_type: "seismic_net",
network_code: "",
kind: "PLEASE SELECT",
equipment: [
{
type: "broadband",
brand: ""
},
{
type: "shortperiod",
brand: ""
},
{
type: "accelerometer",
brand: ""
}
]
},
{
doctype: "datacentre",
ri_name: "ASCR - Seismologial software center"
}
]
},
{
key: "ASCR - West Bohemia Seismic network (Webnet)",
value: [
{
doctype: "datacentre",
ri_name: "ASCR - West Bohemia Seismic network (Webnet)"
},
{
doctype: "financial",
ri_name: "ASCR - West Bohemia Seismic network (Webnet)"
},
{
doctype: "facility",
ri_name: "ASCR - West Bohemia Seismic network (Webnet)",
facility_type: "seismic_net",
network_code: "",
stations: [
{
type: "shortperiod"
},
{
type: "shortperiod"
},
{
type: "shortperiod"
},
{
type: "shortperiod"
},
{
type: "shortperiod"
},
{
type: "shortperiod"
},
{
type: "shortperiod"
},
{
type: "shortperiod"
},
{
type: "shortperiod"
},
{
type: "shortperiod"
},
{
type: "shortperiod"
},
{
type: "shortperiod"
},
{
type: "shortperiod"
}
],
kind: "Local"
},
{
doctype: "ri",
ri_name: "ASCR - West Bohemia Seismic network (Webnet)",
ri_type: "Seismic Network",
country: "czech_republic",
wg_main: "1"
}
]
},
{
key: "BCMT",
value: [
{
doctype: "ri",
ri_name: "BCMT",
ri_type: "geomagnetic observatory network and data center",
country: "france",
wg_main: 5
},
{
doctype: "financial",
ri_name: "BCMT"
}
]
},
{
key: "Beowulf Computer Cluster forVolcanic Plume Modelling",
value: [
{
doctype: "financial",
ri_name: "Beowulf Computer Cluster forVolcanic Plume Modelling"
},
{
doctype: "ri",
ri_name: "Beowulf Computer Cluster forVolcanic Plume Modelling",
ri_type: "Seismic Network",
country: "italy",
wg_main: "2"
},
{
doctype: "facility",
ri_name: "Beowulf Computer Cluster forVolcanic Plume Modelling",
facility_type: "cluster",
network_code: "",
kind: "PLEASE SELECT",
equipment: [ ]
}
]
},
{
key: "BGR - German Regional Seismic Network - Graefenberg Array (Grsn-grf)",
value: [
{
doctype: "financial",
ri_name: "BGR - German Regional Seismic Network - Graefenberg Array (Grsn-grf)"
},
{
doctype: "ri",
ri_name: "BGR - German Regional Seismic Network - Graefenberg Array (Grsn-grf)",
ri_type: "Seismic Network",
country: "germany",
wg_main: "1"
},
{
doctype: "facility",
ri_name: "BGR - German Regional Seismic Network - Graefenberg Array (Grsn-grf)",
facility_type: "seismic_net",
network_code: "",
kind: "PLEASE SELECT",
equipment: [
{
type: "broadband",
brand: ""
},
{
type: "shortperiod",
brand: ""
},
{
type: "accelerometer",
brand: ""
}
]
},
{
doctype: "datacentre",
ri_name: "BGR - German Regional Seismic Network - Graefenberg Array (Grsn-grf)"
}
]
},
{
key: "BGS - rock physics laboratories",
value: [
{
doctype: "financial",
ri_name: "BGS - rock physics laboratories"
},
{
doctype: "ri",
ri_name: "BGS - rock physics laboratories",
ri_type: "analytical and experimental laboratories",
country: "united_kingdom",
wg_main: 6
}
]
},
{
key: "BGS (NERC) - UK seismological network",
value: [
{
doctype: "financial",
ri_name: "BGS (NERC) - UK seismological network"
},
{
doctype: "facility",
ri_name: "BGS (NERC) - UK seismological network",
facility_type: "seismic_net",
network_code: "",
kind: "PLEASE SELECT",
equipment: [
{
type: "broadband",
brand: ""
},
{
type: "shortperiod",
brand: ""
},
{
type: "shortperiod",
brand: ""
}
]
},
{
doctype: "ri",
ri_name: "BGS (NERC) - UK seismological network",
ri_type: "PLEASE SELECT",
country: "united_kingdom",
wg_main: "1"
},
{
doctype: "datacentre",
ri_name: "BGS (NERC) - UK seismological network"
}
]
},
{
key: "BGS Geoseas",
value: [
{
doctype: "financial",
ri_name: "BGS Geoseas"
},
{
doctype: "ri",
ri_name: "BGS Geoseas",
ri_type: "database",
country: "portugal",
wg_main: 3
}
]
},
{
key: "BGS Remote Sensing facility",
value: [
{
doctype: "financial",
ri_name: "BGS Remote Sensing facility"
},
{
doctype: "ri",
ri_name: "BGS Remote Sensing facility",
ri_type: "Processing and interpretation systems for satellite and remotely sensed data",
country: "united_kingdom",
wg_main: 6
}
]
},
{
key: "British Geological Survey (BGS) - Experimental Laboratories",
value: [
{
doctype: "facility",
ri_name: "British Geological Survey (BGS) - Experimental Laboratories",
facility_type: "laboratory",
laboratory_research_field: "analytical",
equipment: [
{
type: "scanning electron microscope  (SEM)",
brand: ""
},
{
type: "transmission electron microscope (TEM)",
brand: ""
}
]
},
{
doctype: "ri",
ri_name: "British Geological Survey (BGS) - Experimental Laboratories",
ri_type: "Laboratory",
country: "united_kingdom",
wg_main: "6"
},
{
doctype: "facility",
ri_name: "British Geological Survey (BGS) - Experimental Laboratories",
facility_type: "laboratory",
laboratory_research_field: "rock physics",
equipment: [
{
type: "MTS rock triaxial deformation rig ",
brand: ""
},
{
type: "stress-path permeameters",
brand: ""
},
{
type: "constant volume cells",
brand: ""
},
{
type: "permeameters",
brand: ""
},
{
type: "bespoke shear rigs ",
brand: ""
},
{
type: "large scale gas injection test",
brand: ""
}
]
}
]
},
{
key: "CAI of Geochronology and Isotope geochemistry, UCM - analytical laboratories, isotope geochemistry laboratory",
value: [
{
doctype: "financial",
ri_name: "CAI of Geochronology and Isotope geochemistry, UCM - analytical laboratories, isotope geochemistry laboratory"
},
{
doctype: "ri",
ri_name: "CAI of Geochronology and Isotope geochemistry, UCM - analytical laboratories, isotope geochemistry laboratory",
ri_type: "analytical and experimental laboratories",
country: "spain",
wg_main: 6
}
]
},
{
key: "CENIEH - Experimental and Analytical Laboratories",
value: [
{
doctype: "facility",
ri_name: "CENIEH - Experimental and Analytical Laboratories",
facility_type: "laboratory",
laboratory_research_field: "analytical",
equipment: [
{
type: "X-ray fluorescence (XRF)",
brand: ""
},
{
type: "FTIR spectroscopy",
brand: ""
},
{
type: "Raman spectroscopy",
brand: ""
},
{
type: "3D laser scanner",
brand: ""
},
{
type: "sample preparation",
brand: ""
}
]
},
{
doctype: "ri",
ri_name: "CENIEH - Experimental and Analytical Laboratories",
ri_type: "Laboratory",
country: "spain",
wg_main: "6"
}
]
},
{
key: "CENIEH, analytical laboratories, geological laboratory",
value: [
{
doctype: "financial",
ri_name: "CENIEH, analytical laboratories, geological laboratory"
},
{
doctype: "ri",
ri_name: "CENIEH, analytical laboratories, geological laboratory",
ri_type: "analytical and experimental laboratories",
country: "spain",
wg_main: 6
}
]
},
{
key: "CENIEH, rock physics, geological laboratory",
value: [
{
doctype: "financial",
ri_name: "CENIEH, rock physics, geological laboratory"
},
{
doctype: "ri",
ri_name: "CENIEH, rock physics, geological laboratory",
ri_type: "analytical and experimental laboratories",
country: "spain",
wg_main: 6
}
]
},
{
key: "CGPS TOPOIBERIA",
value: [
{
doctype: "financial",
ri_name: "CGPS TOPOIBERIA"
},
{
doctype: "ri",
ri_name: "CGPS TOPOIBERIA",
ri_type: "PLEASE SELECT",
country: "spain",
wg_main: "4"
}
]
},
{
key: "Charles University Prague and University of Patras - Seismic regional network PSLNET",
value: [
{
doctype: "financial",
ri_name: "Charles University Prague and University of Patras - Seismic regional network PSLNET"
},
{
doctype: "ri",
ri_name: "Charles University Prague and University of Patras - Seismic regional network PSLNET",
ri_type: "PLEASE SELECT",
country: "greece",
wg_main: "1"
},
{
doctype: "facility",
ri_name: "Charles University Prague and University of Patras - Seismic regional network PSLNET",
facility_type: "seismic_net",
network_code: "",
kind: "PLEASE SELECT",
equipment: [
{
type: "broadband",
brand: ""
}
]
},
{
doctype: "datacentre",
ri_name: "Charles University Prague and University of Patras - Seismic regional network PSLNET"
}
]
},
{
key: "CMR - DIRECT",
value: [
{
doctype: "ri",
ri_name: "CMR - DIRECT",
ri_type: "Computational Infrastructure (independent of monitoring RIs)",
country: "norway",
wg_main: "7"
}
]
},
{
key: "CNR - Analytical and Experimental Laboratories",
value: [
{
doctype: "facility",
ri_name: "CNR - Analytical and Experimental Laboratories",
facility_type: "laboratory",
laboratory_research_field: "tectonic modeling",
equipment: [
{
type: "large capacity centrifuge",
brand: "PM980R"
},
{
type: "pure-simple shear apparatus",
brand: ""
},
{
type: "magma injection apparatus",
brand: ""
},
{
type: "squeeze box",
brand: ""
},
{
type: "high-resolution 3D-video laser system",
brand: ""
},
{
type: "viscometer",
brand: ""
},
{
type: "pycnometer",
brand: ""
}
]
},
{
doctype: "facility",
ri_name: "CNR - Analytical and Experimental Laboratories",
facility_type: "laboratory",
laboratory_research_field: "analytical",
equipment: [
{
type: "rare gas mass spectrometer",
brand: "MAP215Ã¢â‚¬â€œ50"
},
{
type: "thermal ionization mass spectrometry (TIMS)",
brand: "Finnigan MAT 262"
},
{
type: "isotope ratios mass specrometers",
brand: "Thermo Delta XP, Thermo Delta Plus, Finningam MAT Delta Plus"
},
{
type: "thermal ionizating mass spectrometry (TIMS)",
brand: "Micromass VG 54E"
},
{
type: "clean room",
brand: ""
}
]
},
{
doctype: "financial",
ri_name: "CNR - Analytical and Experimental Laboratories"
},
{
doctype: "ri",
ri_name: "CNR - Analytical and Experimental Laboratories",
ri_type: "Laboratory",
country: "italy",
wg_main: "6"
},
{
doctype: "facility",
ri_name: "CNR - Analytical and Experimental Laboratories",
facility_type: "laboratory",
laboratory_research_field: "analytical",
equipment: [
{
type: "secondary ion mass spectrometry (SIMS)",
brand: "CAMECA IMS 4f"
},
{
type: "X-ray diffraction (XRD)",
brand: "3 Philips PV 1100, 1 Bruker AXS Apex CCD diffractometer"
},
{
type: "laser ablation-inductively coupled plasma-mass spectrometry (LA-ICP-MS)",
brand: "SF-ICP-MS : Element I (Thermo); Q-ICP-MS: Elan DRC-e (Perkin Elmer) ArF excimer laser: Geolas 200Q Microlas; 266 nm Nd:YAG laser: Brilliant Quantel"
}
]
},
{
doctype: "facility",
ri_name: "CNR - Analytical and Experimental Laboratories",
facility_type: "laboratory",
laboratory_research_field: "analytical",
equipment: [
{
type: "electron microprobe (EMP)",
brand: "CAMECA SX-50"
},
{
type: "thermal ionization mass spectrometry (TIMS)",
brand: "Micromass 54E"
}
]
},
{
doctype: "facility",
ri_name: "CNR - Analytical and Experimental Laboratories",
facility_type: "laboratory",
laboratory_research_field: "experimental petrology and volcanology",
equipment: [
{
type: "piston cylinder",
brand: ""
},
{
type: "externally heated pressure vessel (EHPV)",
brand: "Leco Corp. (model HR-2B-2)"
},
{
type: "gas mixing vertical furnace",
brand: "Deltec DT-311"
}
]
},
{
doctype: "facility",
ri_name: "CNR - Analytical and Experimental Laboratories",
facility_type: "laboratory",
laboratory_research_field: "analytical",
equipment: [
{
type: "fission track analytical system",
brand: "Zeiss Axioskope and Jena Jenaval microscopes and FT Stage"
},
{
type: "heating/freezing stage for microthermometric analyses of fluid inclusions",
brand: "Linkam THMSG 600 stage equipped with a cooling system (LNP93/2) and temperature controller and programmer (TMS93/1500); JVC TK-C1380 video camera for digital image acquisition"
}
]
}
]
},
{
key: "CNRS - INSU - RESIF",
value: [
{
doctype: "financial",
ri_name: "CNRS - INSU - RESIF"
},
{
doctype: "ri",
ri_name: "CNRS - INSU - RESIF",
ri_type: "PLEASE SELECT",
country: "france",
wg_main: "1"
},
{
doctype: "facility",
ri_name: "CNRS - INSU - RESIF",
facility_type: "seismic_net",
network_code: "",
kind: "PLEASE SELECT",
equipment: [
{
type: "broadband",
brand: ""
},
{
type: "broadband",
brand: ""
},
{
type: "accelerometer",
brand: ""
},
{
type: "gps",
brand: ""
},
{
type: "gps",
brand: ""
},
{
type: "gravimeter",
brand: ""
},
{
type: "gravimeter",
brand: ""
}
]
},
{
doctype: "datacentre",
ri_name: "CNRS - INSU - RESIF"
},
{
doctype: "facility",
ri_name: "CNRS - INSU - RESIF",
facility_type: "seismic_net",
network_code: "",
kind: "PLEASE SELECT",
equipment: [
{
type: "broadband",
brand: ""
},
{
type: "accelerometer",
brand: ""
},
{
type: "GPS",
brand: ""
},
{
type: "gravimeter",
brand: ""
}
]
},
{
doctype: "datacentre",
ri_name: "CNRS - INSU - RESIF"
}
]
},
{
key: "CZ Geomagnetic Observatory",
value: [
{
doctype: "ri",
ri_name: "CZ Geomagnetic Observatory",
ri_type: "Geomagnetic Observatory",
country: "czech_republic",
wg_main: 5
},
{
doctype: "financial",
ri_name: "CZ Geomagnetic Observatory"
}
]
},
{
key: "Deformation facilities",
value: [
{
doctype: "financial",
ri_name: "Deformation facilities"
},
{
doctype: "ri",
ri_name: "Deformation facilities",
ri_type: "PLEASE SELECT",
country: "spain",
wg_main: "4"
}
]
},
{
key: "Delft University of Technology - Experimental Laboratories",
value: [
{
doctype: "facility",
ri_name: "Delft University of Technology - Experimental Laboratories",
facility_type: "laboratory",
laboratory_research_field: "rock physics",
equipment: [
{
type: "biaxial pressure cell",
brand: ""
},
{
type: "CT scanner",
brand: ""
},
{
type: "shock tube",
brand: ""
},
{
type: "terratek cell",
brand: ""
},
{
type: "triaxial stress cell",
brand: ""
}
]
},
{
doctype: "ri",
ri_name: "Delft University of Technology - Experimental Laboratories",
ri_type: "Laboratory",
country: "netherlands",
wg_main: "6"
}
]
},
{
key: "Delft university of technology - laboratory, department of geotechnology",
value: [
{
doctype: "ri",
ri_name: "Delft university of technology - laboratory, department of geotechnology",
ri_type: "analytical and experimental laboratories",
country: "netherlands",
wg_main: 6
},
{
doctype: "financial",
ri_name: "Delft university of technology - laboratory, department of geotechnology"
}
]
},
{
key: "Dep. fisica tierra I, univ. complutense Madrid - rock physics laboratories, Paleomagnetic facilities (laboratories)",
value: [
{
doctype: "financial",
ri_name: "Dep. fisica tierra I, univ. complutense Madrid - rock physics laboratories, Paleomagnetic facilities (laboratories)"
},
{
doctype: "ri",
ri_name: "Dep. fisica tierra I, univ. complutense Madrid - rock physics laboratories, Paleomagnetic facilities (laboratories)",
ri_type: "analytical and experimental laboratories",
country: "spain",
wg_main: 6
}
]
},
{
key: "Dep. of geodynamics, univ. of Granada - analytical laboratories, low-temperature geochronological laboratory",
value: [
{
doctype: "financial",
ri_name: "Dep. of geodynamics, univ. of Granada - analytical laboratories, low-temperature geochronological laboratory"
},
{
doctype: "ri",
ri_name: "Dep. of geodynamics, univ. of Granada - analytical laboratories, low-temperature geochronological laboratory",
ri_type: "analytical and experimental laboratories",
country: "spain",
wg_main: 6
}
]
},
{
key: "Department of earth science Ludwig-maximilians University - Munich Earth Observatory",
value: [
{
doctype: "financial",
ri_name: "Department of earth science Ludwig-maximilians University - Munich Earth Observatory"
},
{
doctype: "ri",
ri_name: "Department of earth science Ludwig-maximilians University - Munich Earth Observatory",
ri_type: "Seismic Network",
country: "germany",
wg_main: "1"
},
{
doctype: "facility",
ri_name: "Department of earth science Ludwig-maximilians University - Munich Earth Observatory",
facility_type: "seismic_net",
network_code: "",
kind: "PLEASE SELECT",
equipment: [
{
type: "broadband",
brand: ""
},
{
type: "shortperiod",
brand: ""
},
{
type: "accelerometer",
brand: ""
}
]
},
{
doctype: "datacentre",
ri_name: "Department of earth science Ludwig-maximilians University - Munich Earth Observatory"
}
]
},
{
key: "DTU - Denmkark array of vector magnetometer",
value: [
{
doctype: "ri",
ri_name: "DTU - Denmkark array of vector magnetometer",
ri_type: "array of vector magnetometer",
country: "denmark",
wg_main: 5
},
{
doctype: "financial",
ri_name: "DTU - Denmkark array of vector magnetometer"
}
]
},
{
key: "DTU Space",
value: [
{
doctype: "financial",
ri_name: "DTU Space"
},
{
doctype: "ri",
ri_name: "DTU Space",
ri_type: "PLEASE SELECT",
country: "denmark",
wg_main: "4"
}
]
},
{
key: "Durham University - Experimental Laboratories",
value: [
{
doctype: "facility",
ri_name: "Durham University - Experimental Laboratories",
facility_type: "laboratory",
laboratory_research_field: "rock physics",
equipment: [
{
type: "low to high velocity rotary shear apparatus (LHVRS)",
brand: "rotary"
}
]
},
{
doctype: "ri",
ri_name: "Durham University - Experimental Laboratories",
ri_type: "Laboratory",
country: "united_kingdom",
wg_main: "6"
}
]
},
{
key: "Durham university - rock mechanics and physics laboratory",
value: [
{
doctype: "financial",
ri_name: "Durham university - rock mechanics and physics laboratory"
},
{
doctype: "ri",
ri_name: "Durham university - rock mechanics and physics laboratory",
ri_type: "analytical and experimental laboratories",
country: "united_kingdom",
wg_main: 6
}
]
},
{
key: "Edinburgh university - rock physics laboratory, university laboratory",
value: [
{
doctype: "financial",
ri_name: "Edinburgh university - rock physics laboratory, university laboratory"
},
{
doctype: "ri",
ri_name: "Edinburgh university - rock physics laboratory, university laboratory",
ri_type: "analytical and experimental laboratories",
country: "united_kingdom",
wg_main: 6
}
]
},
{
key: "EHU - Analytical Laboratories",
value: [
{
doctype: "ri",
ri_name: "EHU - Analytical Laboratories",
ri_type: "Laboratory",
country: "spain",
wg_main: "6"
},
{
doctype: "facility",
ri_name: "EHU - Analytical Laboratories",
facility_type: "laboratory",
laboratory_research_field: "analytical",
equipment: [
{
type: "inductively coupled plasma-mass spectrometry (ICP-MS)",
brand: "XSeries 2"
},
{
type: "inductively coupled plasma-mass spectrometry (MC-ICP-MS)",
brand: "Neptune"
},
{
type: "thermal ionization mass spectrometer (TIMS)",
brand: "Finnigan MAT262"
},
{
type: "laser ablation (LA)",
brand: ""
},
{
type: "clean room",
brand: ""
}
]
}
]
},
{
key: "EHU- analytical laboratories, laboratory of chemical analysis of major and trace elements by x-ray fluorescence",
value: [
{
doctype: "financial",
ri_name: "EHU- analytical laboratories, laboratory of chemical analysis of major and trace elements by x-ray fluorescence"
},
{
doctype: "ri",
ri_name: "EHU- analytical laboratories, laboratory of chemical analysis of major and trace elements by x-ray fluorescence",
ri_type: "analytical and experimental laboratories",
country: "spain",
wg_main: 6
}
]
},
{
key: "EHU- analytical laboratories, laboratory of mineralogic analysis by x-ray diffraction",
value: [
{
doctype: "financial",
ri_name: "EHU- analytical laboratories, laboratory of mineralogic analysis by x-ray diffraction"
},
{
doctype: "ri",
ri_name: "EHU- analytical laboratories, laboratory of mineralogic analysis by x-ray diffraction",
ri_type: "analytical and experimental laboratories",
country: "spain",
wg_main: 6
}
]
},
{
key: "EHU- Basque Country University, analytical laboratories, isotope geochemistry laboratory",
value: [
{
doctype: "financial",
ri_name: "EHU- Basque Country University, analytical laboratories, isotope geochemistry laboratory"
},
{
doctype: "ri",
ri_name: "EHU- Basque Country University, analytical laboratories, isotope geochemistry laboratory",
ri_type: "analytical and experimental laboratories",
country: "spain",
wg_main: 6
}
]
},
{
key: "Electric and electromagnetic prospecting and geophysical logging",
value: [
{
doctype: "ri",
ri_name: "Electric and electromagnetic prospecting and geophysical logging",
ri_type: "MINERAL RESOURCES and GEOPHYSICS",
country: "portugal",
wg_main: 5
},
{
doctype: "financial",
ri_name: "Electric and electromagnetic prospecting and geophysical logging"
}
]
},
{
key: "ETH Zurich - Analytical and Experimental Laboratories",
value: [
{
doctype: "ri",
ri_name: "ETH Zurich - Analytical and Experimental Laboratories",
ri_type: "Laboratory",
country: "switzerland",
wg_main: "6"
},
{
doctype: "facility",
ri_name: "ETH Zurich - Analytical and Experimental Laboratories",
facility_type: "laboratory",
laboratory_research_field: "rock physics",
equipment: [
{
type: "sample preparation",
brand: ""
},
{
type: "pycnometer",
brand: "Accupync"
},
{
type: "internal heated pressure vessels (IHPV)",
brand: "Patterson type"
},
{
type: "acoustic emission instrumentation",
brand: "Physical Acoustic"
},
{
type: "seismic wave attenuation module (SWAM)",
brand: "self made"
},
{
type: "transmission electron microscope (TEM)",
brand: ""
},
{
type: "scanning electron microscope (SEM)",
brand: ""
},
{
type: "electron microprobe (EMP)",
brand: ""
},
{
type: "microscope",
brand: "Zeiss"
},
{
type: "piston cylinder",
brand: "Griggs type"
}
]
},
{
doctype: "facility",
ri_name: "ETH Zurich - Analytical and Experimental Laboratories",
facility_type: "laboratory",
laboratory_research_field: "paleomagnetism",
equipment: [
{
type: "superconducting rock magnetometer",
brand: "2G Enterprises Model 755"
},
{
type: "vibrating sample magnetometer",
brand: "Princeton Measurements Corporation Model 3900"
},
{
type: "alternating field magnetometer",
brand: "Princeton Measurements Corporation Model 2900"
},
{
type: "spinner magnetometer",
brand: "Molspin"
},
{
type: "high-fileld torsion magnetometer",
brand: "self made"
},
{
type: "susceptibility bridges",
brand: "Agico Corporation, KLY-2 and MFK1-FA"
},
{
type: "thermal demagnetizers",
brand: "ASC TD-40"
},
{
type: "thermal demagnetizer with atmospheric control",
brand: "ASC TD40"
},
{
type: "alternating field demagnetizers",
brand: "self made"
},
{
type: "pulse field magnetizer",
brand: "ASC IM-10-30"
},
{
type: "3-axis fluxgate sensor",
brand: "Applied Physics Systems Model"
},
{
type: "microscopes",
brand: "Zeiss Axioplan transmitted light microscope, Nikon Microphot-SA reflected light microscope"
},
{
type: "magnetically shielded room",
brand: "Lodestar Magentics"
}
]
}
]
},
{
key: "ETH Zurich - Lab of Natural Magnetism",
value: [
{
doctype: "ri",
ri_name: "ETH Zurich - Lab of Natural Magnetism",
ri_type: "Laboratory of Natural Magnetism",
country: "switzerland",
wg_main: 6
},
{
doctype: "financial",
ri_name: "ETH Zurich - Lab of Natural Magnetism"
}
]
},
{
key: "ETH Zurich - Rock Deformation Lab",
value: [
{
doctype: "financial",
ri_name: "ETH Zurich - Rock Deformation Lab"
},
{
doctype: "ri",
ri_name: "ETH Zurich - Rock Deformation Lab",
ri_type: "analytical and experimental laboratories",
country: "switzerland",
wg_main: 6
}
]
},
{
key: "ETH Zurich - Swiss Broadband Seismic Network",
value: [
{
doctype: "financial",
ri_name: "ETH Zurich - Swiss Broadband Seismic Network"
},
{
doctype: "ri",
ri_name: "ETH Zurich - Swiss Broadband Seismic Network",
ri_type: "Seismic Network",
country: "switzerland",
wg_main: "1"
},
{
doctype: "facility",
ri_name: "ETH Zurich - Swiss Broadband Seismic Network",
facility_type: "seismic_net",
network_code: "CH",
stations: [
{
type: "broadband"
}
],
kind: "National"
}
]
},
{
key: "ETH Zurich - Swiss Strong Motion Seismic Network",
value: [
{
doctype: "financial",
ri_name: "ETH Zurich - Swiss Strong Motion Seismic Network"
},
{
doctype: "ri",
ri_name: "ETH Zurich - Swiss Strong Motion Seismic Network",
ri_type: "PLEASE SELECT",
country: "switzerland",
wg_main: "1"
},
{
doctype: "datacentre",
ri_name: "ETH Zurich - Swiss Strong Motion Seismic Network"
},
{
doctype: "facility",
ri_name: "ETH Zurich - Swiss Strong Motion Seismic Network",
facility_type: "seismic_net",
network_code: "CH",
stations: [
{
type: "strongmotion"
}
],
kind: "National"
}
]
},
{
key: "European Pendulum Network",
value: [
{
doctype: "ri",
ri_name: "European Pendulum Network",
ri_type: "Vertical static pendulum (tiltmeter) network",
country: "czech_republic",
wg_main: 5
},
{
doctype: "financial",
ri_name: "European Pendulum Network"
}
]
},
{
key: "EUROSEIS Technological Educational Institute of Crete -TEST",
value: [
{
doctype: "ri",
ri_name: "EUROSEIS Technological Educational Institute of Crete -TEST",
ri_type: "Laboratory",
country: "greece",
wg_main: "1"
},
{
doctype: "facility",
ri_name: "EUROSEIS Technological Educational Institute of Crete -TEST",
facility_type: "laboratory",
laboratory_research_field: "PLEASE SELECT",
equipment: [ ]
}
]
},
{
key: "EUROSEISTEST",
value: [
{
doctype: "financial",
ri_name: "EUROSEISTEST"
},
{
doctype: "ri",
ri_name: "EUROSEISTEST",
ri_type: "Seismic Network",
country: "greece",
wg_main: 0
},
{
doctype: "facility",
ri_name: "EUROSEISTEST",
facility_type: "seismic_net",
network_code: "",
stations: [ ],
kind: "PLEASE SELECT"
},
{
doctype: "datacentre",
ri_name: "EUROSEISTEST"
},
{
doctype: "ri",
ri_name: "EUROSEISTEST",
ri_type: "Laboratory",
country: "greece",
wg_main: "1"
}
]
},
{
key: "EUTecNet",
value: [
{
doctype: "financial",
ri_name: "EUTecNet"
},
{
doctype: "ri",
ri_name: "EUTecNet",
ri_type: "3D monitoring of fault microdisplacement",
country: "czech_republic",
wg_main: 3
}
]
},
{
key: "EUXINUS",
value: [
{
doctype: "ri",
ri_name: "EUXINUS",
ri_type: "Integrated regional Black Sea observation and early-warning system",
country: "romania",
wg_main: 5
},
{
doctype: "financial",
ri_name: "EUXINUS"
}
]
},
{
key: "Geodynamic EAST SUDETEN, WEST SUDETEN, HIGHLANDS and WEST BOHEMIA Networks",
value: [
{
doctype: "financial",
ri_name: "Geodynamic EAST SUDETEN, WEST SUDETEN, HIGHLANDS and WEST BOHEMIA Networks"
},
{
doctype: "ri",
ri_name: "Geodynamic EAST SUDETEN, WEST SUDETEN, HIGHLANDS and WEST BOHEMIA Networks",
ri_type: "PLEASE SELECT",
country: "czech_republic",
wg_main: "4"
}
]
},
{
key: "GeoLOFAR",
value: [
{
doctype: "financial",
ri_name: "GeoLOFAR"
},
{
doctype: "facility",
ri_name: "GeoLOFAR",
facility_type: "seismic_net",
kind: "",
equipment: [
{
type: "?",
brand: ""
}
]
},
{
doctype: "ri",
ri_name: "GeoLOFAR",
ri_type: "Network of seismic stations (1-500 Hz)",
country: "netherlands",
wg_main: "/"
},
{
doctype: "datacentre",
ri_name: "GeoLOFAR"
}
]
},
{
key: "Geological Sciences, University College Dublin - Analytical Laboratories",
value: [
{
doctype: "ri",
ri_name: "Geological Sciences, University College Dublin - Analytical Laboratories",
ri_type: "Laboratory",
country: "ireland",
wg_main: "6"
},
{
doctype: "facility",
ri_name: "Geological Sciences, University College Dublin - Analytical Laboratories",
facility_type: "laboratory",
laboratory_research_field: "analytical",
equipment: [
{
type: "clean room",
brand: ""
},
{
type: "rock crushing and mineral separation",
brand: ""
},
{
type: "thermal ionization mass spectrometry (TIMS)",
brand: "Thermo Scientific, VG354"
},
{
type: "laser ablation (LA)",
brand: "New Wave 193nm Excimer laser ablation"
},
{
type: "micromill",
brand: "New Wave"
}
]
}
]
},
{
key: "Geological sciences, university college dublin, national centre for isotope geochemistry laboratory",
value: [
{
doctype: "financial",
ri_name: "Geological sciences, university college dublin, national centre for isotope geochemistry laboratory"
},
{
doctype: "ri",
ri_name: "Geological sciences, university college dublin, national centre for isotope geochemistry laboratory",
ri_type: "analytical and experimental laboratories",
country: "ireland",
wg_main: 6
}
]
},
{
key: "GEONAS",
value: [
{
doctype: "financial",
ri_name: "GEONAS"
},
{
doctype: "ri",
ri_name: "GEONAS",
ri_type: "PLEASE SELECT",
country: "czech_republic",
wg_main: "4"
}
]
},
{
key: "Geophysical Facilities",
value: [
{
doctype: "ri",
ri_name: "Geophysical Facilities",
ri_type: "Geological-geophysical equipments and database",
country: "spain",
wg_main: 5
},
{
doctype: "financial",
ri_name: "Geophysical Facilities"
}
]
},
{
key: "Geophysics and seismology laboratory of the technological educational institute of Crete (LGS-TEICR)",
value: [
{
doctype: "financial",
ri_name: "Geophysics and seismology laboratory of the technological educational institute of Crete (LGS-TEICR)"
},
{
doctype: "facility",
ri_name: "Geophysics and seismology laboratory of the technological educational institute of Crete (LGS-TEICR)",
facility_type: "seismic_net",
network_code: "",
stations: [ ],
kind: "PLEASE SELECT"
},
{
doctype: "ri",
ri_name: "Geophysics and seismology laboratory of the technological educational institute of Crete (LGS-TEICR)",
ri_type: "Seismic Network",
country: "greece",
wg_main: 0
},
{
doctype: "datacentre",
ri_name: "Geophysics and seismology laboratory of the technological educational institute of Crete (LGS-TEICR)"
}
]
},
{
key: "GEOSCOPE",
value: [
{
doctype: "financial",
ri_name: "GEOSCOPE"
},
{
doctype: "ri",
ri_name: "GEOSCOPE",
ri_type: "PLEASE SELECT",
country: "france",
wg_main: "1"
},
{
doctype: "facility",
ri_name: "GEOSCOPE",
facility_type: "seismic_net",
network_code: "",
stations: [ ],
kind: "PLEASE SELECT"
},
{
doctype: "datacentre",
ri_name: "GEOSCOPE"
},
{
ri_name: "GEOSCOPE"
}
]
},
{
key: "Geoseas",
value: [
{
doctype: "financial",
ri_name: "Geoseas"
},
{
doctype: "facility",
ri_name: "Geoseas",
facility_type: "seismic_net",
kind: "",
equipment: [
{
type: "Marine Geo DC",
brand: ""
}
]
},
{
doctype: "ri",
ri_name: "Geoseas",
ri_type: "European database infra",
country: "portugal",
wg_main: "/"
},
{
doctype: "datacentre",
ri_name: "Geoseas"
}
]
},
{
key: "Germany unknown",
value: [
{
doctype: "ri",
ri_name: "Germany unknown",
ri_type: "Geomagnetic observatory network",
country: "germany",
wg_main: 5
},
{
doctype: "financial",
ri_name: "Germany unknown"
}
]
},
{
key: "GEUS - National Seismological Network",
value: [
{
doctype: "financial",
ri_name: "GEUS - National Seismological Network"
},
{
doctype: "ri",
ri_name: "GEUS - National Seismological Network",
ri_type: "PLEASE SELECT",
country: "denmark",
wg_main: "1"
}
]
},
{
key: "GFZ - GEOFON",
value: [
{
doctype: "datacentre",
ri_name: "GFZ - GEOFON"
},
{
doctype: "facility",
ri_name: "GFZ - GEOFON",
facility_type: "seismic_net",
network_code: "",
stations: [ ],
kind: "PLEASE SELECT"
},
{
doctype: "ri",
ri_name: "GFZ - GEOFON",
ri_type: "Seismic Network",
country: "germany",
wg_main: "1"
}
]
},
{
key: "GPS monitoring",
value: [
{
doctype: "financial",
ri_name: "GPS monitoring"
},
{
doctype: "ri",
ri_name: "GPS monitoring",
ri_type: "PLEASE SELECT",
country: "spain",
wg_main: "4"
}
]
},
{
key: "GPS surveys on Sicilian tectonic area",
value: [
{
doctype: "financial",
ri_name: "GPS surveys on Sicilian tectonic area"
},
{
doctype: "ri",
ri_name: "GPS surveys on Sicilian tectonic area",
ri_type: "GPS Network",
country: "italy",
wg_main: "4"
}
]
},
{
key: "Gravimetric laboratory Pecny",
value: [
{
doctype: "financial",
ri_name: "Gravimetric laboratory Pecny"
},
{
doctype: "ri",
ri_name: "Gravimetric laboratory Pecny",
ri_type: "PLEASE SELECT",
country: "czech_republic",
wg_main: "4"
}
]
},
{
key: "Gravity and Tilt Observatories",
value: [
{
doctype: "financial",
ri_name: "Gravity and Tilt Observatories"
},
{
doctype: "ri",
ri_name: "Gravity and Tilt Observatories",
ri_type: "PLEASE SELECT",
country: "czech_republic",
wg_main: "4"
}
]
},
{
key: "Gravity observation in West Bohemia",
value: [
{
doctype: "financial",
ri_name: "Gravity observation in West Bohemia"
},
{
doctype: "ri",
ri_name: "Gravity observation in West Bohemia",
ri_type: "PLEASE SELECT",
country: "czech_republic",
wg_main: "4"
}
]
},
{
key: "Greece unknown",
value: [
{
doctype: "ri",
ri_name: "Greece unknown",
ri_type: "Tide gauges and boys Network",
country: "greece",
wg_main: 5
},
{
doctype: "financial",
ri_name: "Greece unknown"
}
]
},
{
key: "GREECE-UNKNOWN-NAME",
value: [
{
doctype: "financial",
ri_name: "GREECE-UNKNOWN-NAME"
},
{
doctype: "facility",
ri_name: "GREECE-UNKNOWN-NAME",
facility_type: "seismic_net",
kind: "permanent",
equipment: [
{
type: "broadband",
brand: ""
}
]
},
{
doctype: "ri",
ri_name: "GREECE-UNKNOWN-NAME",
ri_type: "/",
country: "greece",
wg_main: "/"
}
]
},
{
key: "GSI - Mobile seismic network",
value: [
{
doctype: "financial",
ri_name: "GSI - Mobile seismic network"
},
{
doctype: "facility",
ri_name: "GSI - Mobile seismic network",
facility_type: "seismic_net",
network_code: "",
kind: "PLEASE SELECT",
equipment: [
{
type: "broadband",
brand: ""
}
]
},
{
doctype: "ri",
ri_name: "GSI - Mobile seismic network",
ri_type: "PLEASE SELECT",
country: "ireland",
wg_main: "1"
},
{
doctype: "datacentre",
ri_name: "GSI - Mobile seismic network"
}
]
},
{
key: "GSI - Portable seismic network",
value: [
{
doctype: "financial",
ri_name: "GSI - Portable seismic network"
},
{
doctype: "ri",
ri_name: "GSI - Portable seismic network",
ri_type: "PLEASE SELECT",
country: "ireland",
wg_main: "1"
},
{
doctype: "datacentre",
ri_name: "GSI - Portable seismic network"
}
]
},
{
key: "GSI - Seismic network",
value: [
{
doctype: "financial",
ri_name: "GSI - Seismic network"
},
{
doctype: "facility",
ri_name: "GSI - Seismic network",
facility_type: "seismic_net",
network_code: "",
kind: "PLEASE SELECT",
equipment: [
{
type: "broadband",
brand: ""
}
]
},
{
doctype: "ri",
ri_name: "GSI - Seismic network",
ri_type: "PLEASE SELECT",
country: "ireland",
wg_main: "1"
},
{
doctype: "datacentre",
ri_name: "GSI - Seismic network"
}
]
},
{
key: "IAF - Institute of Applied Research, Karlsruhe",
value: [
{
doctype: "financial",
ri_name: "IAF - Institute of Applied Research, Karlsruhe"
},
{
doctype: "ri",
ri_name: "IAF - Institute of Applied Research, Karlsruhe",
ri_type: "PLEASE SELECT",
country: "germany",
wg_main: "4"
}
]
},
{
key: "IAG - Seismic networks 2",
value: [
{
doctype: "financial",
ri_name: "IAG - Seismic networks 2"
},
{
doctype: "ri",
ri_name: "IAG - Seismic networks 2",
ri_type: "PLEASE SELECT",
country: "spain",
wg_main: "1"
}
]
},
{
key: "ICTJA - Experimental and Analytical Laboratories",
value: [
{
doctype: "facility",
ri_name: "ICTJA - Experimental and Analytical Laboratories",
facility_type: "laboratory",
laboratory_research_field: "analytical",
equipment: [
{
type: "X-ray fluorescence (XRF)",
brand: ""
},
{
type: "mass spectrometer",
brand: ""
},
{
type: "electron microprobe (EMP)",
brand: ""
}
]
},
{
doctype: "ri",
ri_name: "ICTJA - Experimental and Analytical Laboratories",
ri_type: "Laboratory",
country: "spain",
wg_main: "6"
},
{
doctype: "facility",
ri_name: "ICTJA - Experimental and Analytical Laboratories",
facility_type: "laboratory",
laboratory_research_field: "paleomagnetism",
equipment: [
{
type: "magnetometer",
brand: ""
}
]
}
]
},
{
key: "ICTJA-CSIC - Seismological equipment",
value: [
{
doctype: "financial",
ri_name: "ICTJA-CSIC - Seismological equipment"
},
{
doctype: "ri",
ri_name: "ICTJA-CSIC - Seismological equipment",
ri_type: "PLEASE SELECT",
country: "spain",
wg_main: "1"
},
{
doctype: "facility",
ri_name: "ICTJA-CSIC - Seismological equipment",
facility_type: "seismic_net",
network_code: "",
kind: "PLEASE SELECT",
equipment: [
{
type: "broadband",
brand: ""
},
{
type: "shortperiod",
brand: ""
}
]
},
{
doctype: "datacentre",
ri_name: "ICTJA-CSIC - Seismological equipment"
}
]
},
{
key: "ICTJA-CSIC, physics laboratory, laboratory of paleomagnetism",
value: [
{
doctype: "financial",
ri_name: "ICTJA-CSIC, physics laboratory, laboratory of paleomagnetism"
},
{
doctype: "ri",
ri_name: "ICTJA-CSIC, physics laboratory, laboratory of paleomagnetism",
ri_type: "analytical and experimental laboratories",
country: "spain",
wg_main: 6
}
]
},
{
key: "IGC - Catalonian Seismic networks",
value: [
{
doctype: "financial",
ri_name: "IGC - Catalonian Seismic networks"
},
{
doctype: "ri",
ri_name: "IGC - Catalonian Seismic networks",
ri_type: "PLEASE SELECT",
country: "spain",
wg_main: "1"
},
{
doctype: "facility",
ri_name: "IGC - Catalonian Seismic networks",
facility_type: "seismic_net",
network_code: "",
kind: "PLEASE SELECT",
equipment: [
{
type: "broadband",
brand: ""
},
{
type: "shortperiod",
brand: ""
},
{
type: "accelerometer",
brand: ""
}
]
},
{
doctype: "datacentre",
ri_name: "IGC - Catalonian Seismic networks"
}
]
},
{
key: "IGME - Analytical Laboratories",
value: [
{
doctype: "facility",
ri_name: "IGME - Analytical Laboratories",
facility_type: "laboratory",
laboratory_research_field: "analytical",
equipment: [
{
type: "thermal ionization mass spectrometry (TIMS)",
brand: "TRITON Thermo"
},
{
type: "equipment XPert of Panalytical. Cu Tube. Detector Xcelerator",
brand: ""
},
{
type: "equipment Magix of Panalytical. Rh Tube. PerlexÃ‚Â´3",
brand: ""
},
{
type: "laser ablation (LA)",
brand: ""
},
{
type: "mass spectrometer",
brand: "Agilent 7500ce"
}
]
},
{
doctype: "ri",
ri_name: "IGME - Analytical Laboratories",
ri_type: "Laboratory",
country: "spain",
wg_main: "6"
}
]
},
{
key: "IGME Geological databases",
value: [
{
doctype: "financial",
ri_name: "IGME Geological databases"
},
{
doctype: "ri",
ri_name: "IGME Geological databases",
ri_type: "geological databases",
country: "spain",
wg_main: 3
}
]
},
{
key: "IGN - Seismic networks",
value: [
{
doctype: "financial",
ri_name: "IGN - Seismic networks"
},
{
doctype: "ri",
ri_name: "IGN - Seismic networks",
ri_type: "PLEASE SELECT",
country: "spain",
wg_main: "1"
},
{
doctype: "facility",
ri_name: "IGN - Seismic networks",
facility_type: "seismic_net",
network_code: "",
kind: "PLEASE SELECT",
equipment: [
{
type: "broadband",
brand: ""
},
{
type: "shortperiod",
brand: ""
},
{
type: "accelerometer",
brand: ""
}
]
},
{
doctype: "datacentre",
ri_name: "IGN - Seismic networks"
}
]
},
{
key: "IMO - SIL seismic monitoring system",
value: [
{
doctype: "financial",
ri_name: "IMO - SIL seismic monitoring system"
},
{
doctype: "ri",
ri_name: "IMO - SIL seismic monitoring system",
ri_type: "PLEASE SELECT",
country: "iceland",
wg_main: "1"
}
]
},
{
key: "INCDFP, resonant-columns, laboratory",
value: [
{
doctype: "financial",
ri_name: "INCDFP, resonant-columns, laboratory"
},
{
doctype: "ri",
ri_name: "INCDFP, resonant-columns, laboratory",
ri_type: "analytical and experimental laboratories",
country: "romania",
wg_main: 6
}
]
},
{
key: "INGV - Experimental and Analytical Laboratories",
value: [
{
doctype: "facility",
ri_name: "INGV - Experimental and Analytical Laboratories",
facility_type: "laboratory",
laboratory_research_field: "rock physics",
equipment: [
{
type: "EDYNAS Ã¢â‚¬â€œ Earthquake DYNamics Analogic System",
brand: ""
},
{
type: "permeameter",
brand: ""
},
{
type: "slow to high velocity apparatus (SHIVA)",
brand: "rotary"
},
{
type: "modular rheometer",
brand: "MCR 301 - Anton Paar, Physica"
}
]
},
{
doctype: "financial",
ri_name: "INGV - Experimental and Analytical Laboratories"
},
{
doctype: "ri",
ri_name: "INGV - Experimental and Analytical Laboratories",
ri_type: "Laboratory",
country: "italy",
wg_main: "6"
},
{
doctype: "facility",
ri_name: "INGV - Experimental and Analytical Laboratories",
facility_type: "laboratory",
laboratory_research_field: "experimental petrology and volcanology",
equipment: [
{
type: "chamber furnaces",
brand: "Lenton AWF 12/12 and Nabertherm LHT 04/18"
},
{
type: "Quickpress piston cylinder",
brand: "Depths of the Earth Co."
},
{
type: "piston cylinder / multi anvil",
brand: "Max Voggenreiter GmbH"
},
{
type: "uniaxial press",
brand: "Tecnotest C 025/C"
},
{
type: "vertical gas-mixing furnace",
brand: "Nabertherm RHTV 1800"
},
{
type: "high-speed camera",
brand: "NAC 512 HS"
},
{
type: "high-speed camera",
brand: "Optronis Camrecord CR600"
},
{
type: "thermal camera",
brand: "FLIR SC655"
},
{
type: "sample preparation",
brand: ""
}
]
},
{
doctype: "facility",
ri_name: "INGV - Experimental and Analytical Laboratories",
facility_type: "laboratory",
laboratory_research_field: "paleomagnetism",
equipment: [
{
type: "superconducting rock magnetometer ",
brand: "2G Enterprises Mod. 755-4K"
},
{
type: "liquid-Helium free superconducting rock magnetometer",
brand: "2G Enterprises Mod. 755-4K "
},
{
type: "alternating field demagnetizer and anysteretic magnetizer",
brand: "AGICO Mod. LDA-3A and AMU-1A "
},
{
type: "alternating gradient / vibrating sample magnetometer",
brand: "Princeton Measurement Corporation, Model 2900-AGM and 3900-VSM"
},
{
type: "vibrating sample magnetometer",
brand: "Molspin"
},
{
type: "thermal demagnetizers",
brand: "Pryox, ASC Scientific, Model TD48 (double chamber)"
},
{
type: "pulse magnetizer",
brand: "2G Enterprises  Model 660 "
},
{
type: "magnetically shielded room",
brand: "Lodestar Magnetics"
},
{
type: "spinner magnetometers ",
brand: "AGICO (Models JR-4, JR-5, JR-6A)"
},
{
type: "susceptibility meters",
brand: "AGICO (Models KLY-2, KLY-3S, MFK1-FA), Bartington (MS-2, MS-3)"
}
]
},
{
doctype: "facility",
ri_name: "INGV - Experimental and Analytical Laboratories",
facility_type: "laboratory",
laboratory_research_field: "analytical",
equipment: [
{
type: "field emission-scanning electron microscopy (FE-SEM)",
brand: "Jeol JSM-6500F"
},
{
type: "electron microprobe (EMP)",
brand: "Jeol JXA-8200 Superprobe"
}
]
}
]
},
{
key: "INGV - Italian Distributed Archive database",
value: [
{
doctype: "financial",
ri_name: "INGV - Italian Distributed Archive database"
},
{
doctype: "facility",
ri_name: "INGV - Italian Distributed Archive database",
facility_type: "seismic_net",
network_code: "",
kind: "PLEASE SELECT",
equipment: [ ]
},
{
doctype: "ri",
ri_name: "INGV - Italian Distributed Archive database",
ri_type: "Seismic Network",
country: "italy",
wg_main: "1"
}
]
},
{
key: "INGV - Italian mobile seismic network",
value: [
{
doctype: "financial",
ri_name: "INGV - Italian mobile seismic network"
},
{
doctype: "ri",
ri_name: "INGV - Italian mobile seismic network",
ri_type: "Seismic Network",
country: "italy",
wg_main: "1"
},
{
doctype: "facility",
ri_name: "INGV - Italian mobile seismic network",
facility_type: "seismic_net",
network_code: "",
kind: "PLEASE SELECT",
equipment: [ ]
},
{
doctype: "datacentre",
ri_name: "INGV - Italian mobile seismic network"
}
]
},
{
key: "INGV - Italian Seismic network",
value: [
{
doctype: "financial",
ri_name: "INGV - Italian Seismic network"
},
{
doctype: "ri",
ri_name: "INGV - Italian Seismic network",
ri_type: "Seismic Network",
country: "italy",
wg_main: "1"
},
{
doctype: "facility",
ri_name: "INGV - Italian Seismic network",
facility_type: "seismic_net",
network_code: "",
kind: "PLEASE SELECT",
equipment: [ ]
},
{
doctype: "datacentre",
ri_name: "INGV - Italian Seismic network"
}
]
},
{
key: "INGV - Mediterrean Network (MEDNET)",
value: [
{
doctype: "financial",
ri_name: "INGV - Mediterrean Network (MEDNET)"
},
{
doctype: "ri",
ri_name: "INGV - Mediterrean Network (MEDNET)",
ri_type: "Seismic Network",
country: "italy",
wg_main: "1"
},
{
doctype: "datacentre",
ri_name: "INGV - Mediterrean Network (MEDNET)"
},
{
doctype: "facility",
ri_name: "INGV - Mediterrean Network (MEDNET)",
facility_type: "seismic_net",
network_code: "MN",
stations: [
{
type: "very broadband / strongmotion"
},
{
type: "very broadband"
},
{
type: "very broadband"
},
{
type: "very broadband / strongmotion"
},
{
type: "very broadband / strongmotion"
},
{
type: "very broadband / strongmotion"
},
{
type: "very broadband / strongmotion"
},
{
type: "very broadband / strongmotion"
},
{
type: "very broadband / strongmotion"
},
{
type: "very broadband / strongmotion"
},
{
type: "very broadband / strongmotion"
},
{
type: "very broadband"
},
{
type: "very broadband"
},
{
type: "very broadband"
},
{
type: "very broadband / strongmotion"
},
{
type: "very broadband / strongmotion"
},
{
type: "very broadband"
},
{
type: "very broadband"
},
{
type: "very broadband"
},
{
type: "very broadband"
},
{
type: "very broadband"
},
{
type: "very broadband"
}
],
kind: "Regional"
}
]
},
{
key: "INGV - OV Seismic network",
value: [
{
doctype: "financial",
ri_name: "INGV - OV Seismic network"
},
{
doctype: "facility",
ri_name: "INGV - OV Seismic network",
facility_type: "seismic_net",
network_code: "",
kind: "PLEASE SELECT",
equipment: [ ]
},
{
doctype: "datacentre",
ri_name: "INGV - OV Seismic network"
},
{
doctype: "ri",
ri_name: "INGV - OV Seismic network",
ri_type: "Seismic Network",
country: "italy",
wg_main: "1"
}
]
},
{
key: "INGV - SISMOS",
value: [
{
doctype: "financial",
ri_name: "INGV - SISMOS"
},
{
doctype: "ri",
ri_name: "INGV - SISMOS",
ri_type: "Seismic Network",
country: "italy",
wg_main: "1"
},
{
doctype: "datacentre",
ri_name: "INGV - SISMOS"
}
]
},
{
key: "INGV Geodetic Network",
value: [
{
doctype: "financial",
ri_name: "INGV Geodetic Network"
},
{
doctype: "ri",
ri_name: "INGV Geodetic Network",
ri_type: "GPS Network",
country: "italy",
wg_main: "4"
}
]
},
{
key: "INGV-CT Analytical Laboratories",
value: [
{
doctype: "financial",
ri_name: "INGV-CT Analytical Laboratories"
},
{
doctype: "ri",
ri_name: "INGV-CT Analytical Laboratories",
ri_type: "Seismic Network",
country: "italy",
wg_main: 0
},
{
doctype: "facility",
ri_name: "INGV-CT Analytical Laboratories",
facility_type: "laboratory",
kind: "",
equipment: [
{
type: "SEM-EDS",
brand: ""
},
{
type: "XRF spectrometer",
brand: ""
},
{
type: "ICP-OES spectrometer",
brand: ""
},
{
type: "camsizer",
brand: ""
},
{
type: "microscope",
brand: ""
},
{
type: "microscope",
brand: ""
},
{
type: "pellet press",
brand: ""
},
{
type: "pulverizing mill",
brand: ""
},
{
type: "crush",
brand: ""
},
{
type: "Furnace",
brand: ""
}
]
},
{
doctype: "dataarchive",
ri_name: "INGV-CT Analytical Laboratories"
},
{
doctype: "dataarchive",
ri_name: "INGV-CT Analytical Laboratories"
}
]
},
{
key: "INGV-CT Geodetic Networks on Volcanic areas (Sicily)",
value: [
{
doctype: "financial",
ri_name: "INGV-CT Geodetic Networks on Volcanic areas (Sicily)"
},
{
doctype: "ri",
ri_name: "INGV-CT Geodetic Networks on Volcanic areas (Sicily)",
ri_type: "Seismic Network",
country: "italy",
wg_main: "2"
},
{
doctype: "facility",
ri_name: "INGV-CT Geodetic Networks on Volcanic areas (Sicily)",
facility_type: "Geodedic network",
network_code: "",
kind: "PLEASE SELECT",
equipment: [ ]
},
{
doctype: "datacentre",
ri_name: "INGV-CT Geodetic Networks on Volcanic areas (Sicily)"
}
]
},
{
key: "INGV-CT Geological maps of volcanic areas",
value: [
{
doctype: "financial",
ri_name: "INGV-CT Geological maps of volcanic areas"
},
{
doctype: "ri",
ri_name: "INGV-CT Geological maps of volcanic areas",
ri_type: "Seismic Network",
country: "italy",
wg_main: "2"
},
{
doctype: "facility",
ri_name: "INGV-CT Geological maps of volcanic areas",
facility_type: "infrasound stations",
network_code: "",
kind: "PLEASE SELECT",
equipment: [ ]
},
{
doctype: "datacentre",
ri_name: "INGV-CT Geological maps of volcanic areas"
}
]
},
{
key: "INGV-CT Seismic and Infrasound Monitoring System",
value: [
{
doctype: "financial",
ri_name: "INGV-CT Seismic and Infrasound Monitoring System"
},
{
doctype: "ri",
ri_name: "INGV-CT Seismic and Infrasound Monitoring System",
ri_type: "Seismic Network",
country: "italy",
wg_main: "2"
},
{
doctype: "facility",
ri_name: "INGV-CT Seismic and Infrasound Monitoring System",
facility_type: "infrasound stations",
network_code: "",
kind: "PLEASE SELECT",
equipment: [ ]
},
{
doctype: "datacentre",
ri_name: "INGV-CT Seismic and Infrasound Monitoring System"
}
]
},
{
key: "INGV-CT Volcanological Database",
value: [
{
doctype: "financial",
ri_name: "INGV-CT Volcanological Database"
},
{
doctype: "ri",
ri_name: "INGV-CT Volcanological Database",
ri_type: "Seismic Network",
country: "italy",
wg_main: "2"
}
]
},
{
key: "INGV-OV Geochemical network and laboratories",
value: [
{
doctype: "financial",
ri_name: "INGV-OV Geochemical network and laboratories"
},
{
doctype: "ri",
ri_name: "INGV-OV Geochemical network and laboratories",
ri_type: "Seismic Network",
country: "italy",
wg_main: "2"
},
{
doctype: "facility",
ri_name: "INGV-OV Geochemical network and laboratories",
facility_type: "laboratory",
laboratory_research_field: "PLEASE SELECT",
equipment: [
{
type: "Gas chromatograph",
brand: ""
},
{
type: "Gas chromatograph",
brand: ""
},
{
type: "IRMS",
brand: ""
},
{
type: "ICPMS",
brand: ""
},
{
type: "IC Chromatograph",
brand: ""
},
{
type: "mass spectrometer",
brand: ""
},
{
type: "Infrared camera",
brand: ""
},
{
type: "meteorological stations",
brand: ""
},
{
type: "gas sampler",
brand: ""
}
]
}
]
},
{
key: "INGV-OV Geodedic network",
value: [
{
doctype: "financial",
ri_name: "INGV-OV Geodedic network"
},
{
doctype: "ri",
ri_name: "INGV-OV Geodedic network",
ri_type: "Seismic Network",
country: "italy",
wg_main: "2"
},
{
doctype: "facility",
ri_name: "INGV-OV Geodedic network",
facility_type: "Geodedic network for volcano monitoring",
network_code: "",
kind: "PLEASE SELECT",
equipment: [ ]
},
{
doctype: "datacentre",
ri_name: "INGV-OV Geodedic network"
}
]
},
{
key: "INGV-OV Volcanological monitoring and research facilities",
value: [
{
doctype: "financial",
ri_name: "INGV-OV Volcanological monitoring and research facilities"
},
{
doctype: "ri",
ri_name: "INGV-OV Volcanological monitoring and research facilities",
ri_type: "Seismic Network",
country: "italy",
wg_main: "2"
},
{
doctype: "facility",
ri_name: "INGV-OV Volcanological monitoring and research facilities",
facility_type: "laboratory",
laboratory_research_field: "PLEASE SELECT",
equipment: [
{
type: "Mass spectrometer",
brand: "TRITON"
},
{
type: "FTIR spectrometer",
brand: ""
},
{
type: "NAS (4TB RAID)",
brand: ""
},
{
type: "linux cluster",
brand: ""
}
]
},
{
doctype: "datacentre",
ri_name: "INGV-OV Volcanological monitoring and research facilities"
},
{
doctype: "datacentre",
ri_name: "INGV-OV Volcanological monitoring and research facilities"
}
]
},
{
key: "INGV-PA Geochemical Monitoring Network",
value: [
{
doctype: "financial",
ri_name: "INGV-PA Geochemical Monitoring Network"
},
{
doctype: "ri",
ri_name: "INGV-PA Geochemical Monitoring Network",
ri_type: "Seismic Network",
country: "italy",
wg_main: "2"
},
{
doctype: "datacentre",
ri_name: "INGV-PA Geochemical Monitoring Network"
},
{
doctype: "facility",
ri_name: "INGV-PA Geochemical Monitoring Network",
facility_type: "geochemical monitoring network",
network_code: "",
kind: "PLEASE SELECT",
equipment: [ ]
}
]
},
{
key: "Institute of Earth Sciences Jaume Almera (ICTJA), analytical laboratories, laboratory of geochemistry labGEOTOP",
value: [
{
doctype: "financial",
ri_name: "Institute of Earth Sciences Jaume Almera (ICTJA), analytical laboratories, laboratory of geochemistry labGEOTOP"
},
{
doctype: "ri",
ri_name: "Institute of Earth Sciences Jaume Almera (ICTJA), analytical laboratories, laboratory of geochemistry labGEOTOP",
ri_type: "analytical and experimental laboratories",
country: "spain",
wg_main: 6
}
]
},
{
key: "Institute of Earth Sciences Jaume Almera (ICTJA), analytical laboratories, laboratory of x-ray diffraction analysis",
value: [
{
doctype: "financial",
ri_name: "Institute of Earth Sciences Jaume Almera (ICTJA), analytical laboratories, laboratory of x-ray diffraction analysis"
},
{
doctype: "ri",
ri_name: "Institute of Earth Sciences Jaume Almera (ICTJA), analytical laboratories, laboratory of x-ray diffraction analysis",
ri_type: "analytical and experimental laboratories",
country: "spain",
wg_main: 6
}
]
},
{
key: "IPGP Volcanologic and Seismological Observatories",
value: [
{
doctype: "financial",
ri_name: "IPGP Volcanologic and Seismological Observatories"
},
{
doctype: "ri",
ri_name: "IPGP Volcanologic and Seismological Observatories",
ri_type: "PLEASE SELECT",
country: "france",
wg_main: "2"
},
{
doctype: "facility",
ri_name: "IPGP Volcanologic and Seismological Observatories",
facility_type: "geophysical and geochemical network",
network_code: "",
kind: "PLEASE SELECT",
equipment: [
{
type: "broadband",
brand: ""
},
{
type: "shotperiod",
brand: ""
},
{
type: "broadband",
brand: ""
},
{
type: "accelerometer",
brand: ""
},
{
type: "inclinometer",
brand: ""
},
{
type: "gps",
brand: ""
},
{
type: "gps",
brand: ""
},
{
type: "distancemeters",
brand: ""
},
{
type: "creepmeter",
brand: ""
},
{
type: "levelling",
brand: ""
},
{
type: "Geochemistry Temp. and Fluxmeters",
brand: ""
},
{
type: "gas measurement sites",
brand: ""
},
{
type: "thermal spring sites",
brand: ""
},
{
type: "tidegauge",
brand: ""
},
{
type: "Multiparameter meteorologic station",
brand: ""
},
{
type: "webcam",
brand: ""
}
]
},
{
doctype: "facility",
ri_name: "IPGP Volcanologic and Seismological Observatories",
facility_type: "geophysical and geochemical network",
network_code: "",
kind: "PLEASE SELECT",
equipment: [
{
type: "broadband",
brand: ""
},
{
type: "shotperiod",
brand: ""
},
{
type: "broadband",
brand: ""
},
{
type: "accelerometer",
brand: ""
},
{
type: "inclinometer",
brand: ""
},
{
type: "gps",
brand: ""
},
{
type: "gps",
brand: ""
},
{
type: "distancemeters",
brand: ""
},
{
type: "thermal spring sites",
brand: ""
},
{
type: "Multiparameter meteorologic station",
brand: ""
},
{
type: "webcam",
brand: ""
}
]
},
{
doctype: "facility",
ri_name: "IPGP Volcanologic and Seismological Observatories",
facility_type: "geophysical and geochemical network",
network_code: "",
kind: "PLEASE SELECT",
equipment: [
{
type: "broadband",
brand: ""
},
{
type: "shotperiod",
brand: ""
},
{
type: "broadband",
brand: ""
},
{
type: "inclinometer",
brand: ""
},
{
type: "gps",
brand: ""
},
{
type: "gps",
brand: ""
},
{
type: "creepmeter",
brand: ""
},
{
type: "geochemistry gas",
brand: ""
},
{
type: "thermal camera",
brand: ""
},
{
type: "Multiparameter meteorologic station",
brand: ""
},
{
type: "webcam",
brand: ""
}
]
},
{
doctype: "datacentre",
ri_name: "IPGP Volcanologic and Seismological Observatories"
}
]
},
{
key: "IPL - ISEL-laboratorio de monitorizacao microsismica",
value: [
{
doctype: "ri",
ri_name: "IPL - ISEL-laboratorio de monitorizacao microsismica",
ri_type: "analytical and experimental laboratories",
country: "portugal",
wg_main: 6
},
{
doctype: "financial",
ri_name: "IPL - ISEL-laboratorio de monitorizacao microsismica"
}
]
},
{
key: "IRIS network code: PD",
value: [
{
doctype: "financial",
ri_name: "IRIS network code: PD"
},
{
doctype: "facility",
ri_name: "IRIS network code: PD",
facility_type: "seismic_net",
network_code: "",
stations: [ ],
kind: "PLEASE SELECT"
},
{
doctype: "ri",
ri_name: "IRIS network code: PD",
ri_type: "PLEASE SELECT",
country: "poland",
wg_main: "1"
},
{
doctype: "datacentre",
ri_name: "IRIS network code: PD"
},
{
ri_name: "IRIS network code: PD"
}
]
},
{
key: "ISEL - Experimental and Analytical Laboratories",
value: [
{
doctype: "facility",
ri_name: "ISEL - Experimental and Analytical Laboratories",
facility_type: "laboratory",
laboratory_research_field: "analytical",
equipment: [
{
type: "optical microscope",
brand: "Olympus BX51"
}
]
},
{
doctype: "facility",
ri_name: "ISEL - Experimental and Analytical Laboratories",
facility_type: "laboratory",
laboratory_research_field: "rock physics",
equipment: [
{
type: "uniaxial press",
brand: "TecnoTest C025/C"
},
{
type: "vacuum system",
brand: "General equipment"
}
]
},
{
doctype: "ri",
ri_name: "ISEL - Experimental and Analytical Laboratories",
ri_type: "Laboratory",
country: "portugal",
wg_main: "6"
}
]
},
{
key: "IST - Geophysical Institute of the University of Coimbra",
value: [
{
doctype: "financial",
ri_name: "IST - Geophysical Institute of the University of Coimbra"
},
{
doctype: "facility",
ri_name: "IST - Geophysical Institute of the University of Coimbra",
facility_type: "seismic_net",
network_code: "",
kind: "PLEASE SELECT",
equipment: [
{
type: "broadband",
brand: ""
},
{
type: "?",
brand: ""
}
]
},
{
doctype: "ri",
ri_name: "IST - Geophysical Institute of the University of Coimbra",
ri_type: "PLEASE SELECT",
country: "portugal",
wg_main: "1"
},
{
doctype: "datacentre",
ri_name: "IST - Geophysical Institute of the University of Coimbra"
}
]
},
{
key: "IST - Navigators network",
value: [
{
doctype: "financial",
ri_name: "IST - Navigators network"
},
{
doctype: "ri",
ri_name: "IST - Navigators network",
ri_type: "Seismic Network",
country: "portugal",
wg_main: "1"
},
{
doctype: "facility",
ri_name: "IST - Navigators network",
facility_type: "seismic_net",
network_code: "",
kind: "PLEASE SELECT",
equipment: [
{
type: "broadband",
brand: ""
}
]
},
{
doctype: "datacentre",
ri_name: "IST - Navigators network"
}
]
},
{
key: "Kit-Gpi - KABBA - KArlsruhe BroadBand Array",
value: [
{
doctype: "financial",
ri_name: "Kit-Gpi - KABBA - KArlsruhe BroadBand Array"
},
{
doctype: "ri",
ri_name: "Kit-Gpi - KABBA - KArlsruhe BroadBand Array",
ri_type: "PLEASE SELECT",
country: "germany",
wg_main: "1"
},
{
doctype: "facility",
ri_name: "Kit-Gpi - KABBA - KArlsruhe BroadBand Array",
facility_type: "seismic_net",
network_code: "",
kind: "PLEASE SELECT",
equipment: [
{
type: "broadband",
brand: ""
},
{
type: "shortperiod",
brand: ""
},
{
type: "accelerometer",
brand: ""
}
]
},
{
doctype: "datacentre",
ri_name: "Kit-Gpi - KABBA - KArlsruhe BroadBand Array"
}
]
},
{
key: "KNMI - Netherlands National Seismic Network",
value: [
{
doctype: "ri",
ri_name: "KNMI - Netherlands National Seismic Network",
ri_type: "Seismic Network",
country: "netherlands",
wg_main: "1"
},
{
doctype: "facility",
ri_name: "KNMI - Netherlands National Seismic Network",
facility_type: "seismic_net",
network_code: "NL",
stations: [
{
type: "PLEASE SELECT"
},
{
type: "PLEASE SELECT"
},
{
type: "PLEASE SELECT"
},
{
type: "PLEASE SELECT"
},
{
type: "PLEASE SELECT"
},
{
type: "PLEASE SELECT"
},
{
type: "PLEASE SELECT"
},
{
type: "PLEASE SELECT"
},
{
type: "broadband"
},
{
type: "broadband"
},
{
type: "broadband"
},
{
type: "broadband"
}
],
kind: "National"
},
{
doctype: "dataarchive",
ri_name: "KNMI - Netherlands National Seismic Network"
}
]
},
{
key: "LNEG - sample preparation laboratory",
value: [
{
doctype: "ri",
ri_name: "LNEG - sample preparation laboratory",
ri_type: "analytical and experimental laboratories",
country: "portugal",
wg_main: 6
},
{
doctype: "financial",
ri_name: "LNEG - sample preparation laboratory"
}
]
},
{
key: "LNEG - UCTM-chemical analysis laboratory",
value: [
{
doctype: "ri",
ri_name: "LNEG - UCTM-chemical analysis laboratory",
ri_type: "analytical and experimental laboratories",
country: "portugal",
wg_main: 6
},
{
doctype: "financial",
ri_name: "LNEG - UCTM-chemical analysis laboratory"
}
]
},
{
key: "LNEG coastal geology",
value: [
{
doctype: "financial",
ri_name: "LNEG coastal geology"
},
{
doctype: "ri",
ri_name: "LNEG coastal geology",
ri_type: "coastal geology",
country: "portugal",
wg_main: 3
}
]
},
{
key: "LNEG Geoscience Library",
value: [
{
doctype: "financial",
ri_name: "LNEG Geoscience Library"
},
{
doctype: "ri",
ri_name: "LNEG Geoscience Library",
ri_type: "Library, map collection (paper), historical & technical archive",
country: "portugal",
wg_main: 3
}
]
},
{
key: "LNEG GIS Laboratory",
value: [
{
doctype: "financial",
ri_name: "LNEG GIS Laboratory"
},
{
doctype: "ri",
ri_name: "LNEG GIS Laboratory",
ri_type: "geological information system",
country: "portugal",
wg_main: 3
}
]
},
{
key: "LNEG Remote Sensing",
value: [
{
doctype: "financial",
ri_name: "LNEG Remote Sensing"
},
{
doctype: "ri",
ri_name: "LNEG Remote Sensing",
ri_type: "mineral resources and geophysics",
country: "portugal",
wg_main: 8
}
]
},
{
key: "LNEG Seismic Reflection",
value: [
{
doctype: "financial",
ri_name: "LNEG Seismic Reflection"
},
{
doctype: "ri",
ri_name: "LNEG Seismic Reflection",
ri_type: "marine geophysics",
country: "portugal",
wg_main: 3
}
]
},
{
key: "LNEG-UCTM - Analytical Laboratories",
value: [
{
doctype: "facility",
ri_name: "LNEG-UCTM - Analytical Laboratories",
facility_type: "laboratory",
laboratory_research_field: "analytical",
equipment: [
{
type: "inductively coupled plasma-optical emission spectrometry (ICP-OES)",
brand: ""
},
{
type: "X-ray fluorescence (XRF)",
brand: ""
},
{
type: "inductively coupled plasma-mass spectrometry (ICP-MS)",
brand: ""
},
{
type: "atomic absortion spectrometry (AAS)",
brand: ""
},
{
type: "ion chromatography (IC)",
brand: ""
},
{
type: "microscope",
brand: ""
},
{
type: "Electron Microprobe (EMP)",
brand: ""
},
{
type: "X-ray diffraction (XRD)",
brand: ""
}
]
},
{
doctype: "ri",
ri_name: "LNEG-UCTM - Analytical Laboratories",
ri_type: "Laboratory",
country: "portugal",
wg_main: "6"
}
]
},
{
key: "LNEG, IP Core Lab Survey",
value: [
{
doctype: "financial",
ri_name: "LNEG, IP Core Lab Survey"
},
{
doctype: "ri",
ri_name: "LNEG, IP Core Lab Survey",
ri_type: "drill core library",
country: "portugal",
wg_main: 3
}
]
},
{
key: "LSC - Seismological and geodetic equipment",
value: [
{
doctype: "financial",
ri_name: "LSC - Seismological and geodetic equipment"
},
{
doctype: "ri",
ri_name: "LSC - Seismological and geodetic equipment",
ri_type: "PLEASE SELECT",
country: "spain",
wg_main: "1"
},
{
doctype: "facility",
ri_name: "LSC - Seismological and geodetic equipment",
facility_type: "seismic_net",
network_code: "",
kind: "PLEASE SELECT",
equipment: [
{
type: "broadband",
brand: ""
},
{
type: "shortperiod",
brand: ""
},
{
type: "accelerometer",
brand: ""
},
{
type: "GPS",
brand: ""
},
{
type: "LASER",
brand: ""
}
]
},
{
doctype: "datacentre",
ri_name: "LSC - Seismological and geodetic equipment"
}
]
},
{
key: "LSC Seismological and Geodetic equipment",
value: [
{
doctype: "financial",
ri_name: "LSC Seismological and Geodetic equipment"
},
{
doctype: "ri",
ri_name: "LSC Seismological and Geodetic equipment",
ri_type: "seismological and geodetic (GPS and laser interferometer) equipments ",
country: "spain",
wg_main: 3
}
]
},
{
key: "Ludwig-Maximilians-University Munich (LMU) - Experimental Volcanology Laboratories",
value: [
{
doctype: "financial",
ri_name: "Ludwig-Maximilians-University Munich (LMU) - Experimental Volcanology Laboratories"
},
{
doctype: "ri",
ri_name: "Ludwig-Maximilians-University Munich (LMU) - Experimental Volcanology Laboratories",
ri_type: "Laboratory",
country: "germany",
wg_main: "6"
},
{
doctype: "facility",
ri_name: "Ludwig-Maximilians-University Munich (LMU) - Experimental Volcanology Laboratories",
facility_type: "laboratory",
laboratory_research_field: "analytical",
equipment: [
{
type: "thermal ionization mass spectrometers (TIMS)",
brand: "MAT 261 and Thermo Scientific Triton"
},
{
type: "clean room",
brand: ""
},
{
type: "sample preparation",
brand: ""
}
]
},
{
doctype: "facility",
ri_name: "Ludwig-Maximilians-University Munich (LMU) - Experimental Volcanology Laboratories",
facility_type: "laboratory",
laboratory_research_field: "experimental petrology and volcanology",
equipment: [
{
type: "shock tube apparatus",
brand: ""
},
{
type: "surface area analyzer",
brand: "Gemini 2375, Fa. Micromeritics"
},
{
type: "pycometer",
brand: "Accupyc 1330, Fa. Micromeritics"
},
{
type: "laser diffraction particle analyser",
brand: "LS230, Fa. Beckman Coulter"
},
{
type: "rotational evaporator with waterbath B-480",
brand: ""
}
]
},
{
doctype: "facility",
ri_name: "Ludwig-Maximilians-University Munich (LMU) - Experimental Volcanology Laboratories",
facility_type: "laboratory",
laboratory_research_field: "experimental petrology and volcanology",
equipment: [
{
type: "vertical furnace",
brand: "Deltech"
},
{
type: "vertical furnace",
brand: "Gero"
},
{
type: "vertical furnace",
brand: "Heraus"
},
{
type: "vertical furnace",
brand: "Nabertherm"
},
{
type: "chamber furnaces",
brand: ""
}
]
}
]
},
{
key: "Madrid Complutense University - Experimental and Analytical Laboratories",
value: [
{
doctype: "facility",
ri_name: "Madrid Complutense University - Experimental and Analytical Laboratories",
facility_type: "laboratory",
laboratory_research_field: "analytical",
equipment: [
{
type: "mass spectrometers",
brand: "VG-Sector 54, IsotopX Phoenix "
}
]
},
{
doctype: "ri",
ri_name: "Madrid Complutense University - Experimental and Analytical Laboratories",
ri_type: "Laboratory",
country: "spain",
wg_main: "6"
},
{
doctype: "facility",
ri_name: "Madrid Complutense University - Experimental and Analytical Laboratories",
facility_type: "laboratory",
laboratory_research_field: "paleomagnetism",
equipment: [ ]
}
]
},
{
key: "Magnetic Network of Volcanic areas (Sicily)",
value: [
{
doctype: "financial",
ri_name: "Magnetic Network of Volcanic areas (Sicily)"
},
{
doctype: "ri",
ri_name: "Magnetic Network of Volcanic areas (Sicily)",
ri_type: "Seismic Network",
country: "italy",
wg_main: "2"
},
{
doctype: "facility",
ri_name: "Magnetic Network of Volcanic areas (Sicily)",
facility_type: "magnetic network",
network_code: "",
kind: "PLEASE SELECT",
equipment: [ ]
},
{
doctype: "datacentre",
ri_name: "Magnetic Network of Volcanic areas (Sicily)"
}
]
},
{
key: "Marine Research vessels",
value: [
{
doctype: "ri",
ri_name: "Marine Research vessels",
ri_type: "Coastal and Deep water Research Vessels",
country: "ireland",
wg_main: 5
},
{
doctype: "financial",
ri_name: "Marine Research vessels"
}
]
},
{
key: "MobileEM",
value: [
{
doctype: "financial",
ri_name: "MobileEM"
},
{
doctype: "ri",
ri_name: "MobileEM",
ri_type: "mobile electro magnetic",
country: "ireland",
wg_main: 3
}
]
},
{
key: "Munich Geocomputing",
value: [
{
doctype: "financial",
ri_name: "Munich Geocomputing"
},
{
doctype: "ri",
ri_name: "Munich Geocomputing",
ri_type: "Sumulation software and HPC hardware",
country: "germany",
wg_main: 7
}
]
},
{
key: "NARS",
value: [
{
doctype: "financial",
ri_name: "NARS"
},
{
doctype: "ri",
ri_name: "NARS",
ri_type: "Mobile broadband seismic network",
country: "netherlands"
},
{
doctype: "facility",
ri_name: "NARS",
facility_type: "seismic_net",
kind: "temporary",
equipment: [
{
type: "broadband",
brand: ""
}
]
},
{
doctype: "datacentre",
ri_name: "NARS"
}
]
},
{
key: "National Institute for Research and Development of Earth Physics (INCDFP) - Experimental Laboratory",
value: [
{
doctype: "facility",
ri_name: "National Institute for Research and Development of Earth Physics (INCDFP) - Experimental Laboratory",
facility_type: "laboratory",
laboratory_research_field: "rock physics",
equipment: [
{
type: "resonant column",
brand: "Dmevich"
}
]
},
{
doctype: "ri",
ri_name: "National Institute for Research and Development of Earth Physics (INCDFP) - Experimental Laboratory",
ri_type: "Laboratory",
country: "romania",
wg_main: "6"
}
]
},
{
key: "National lithoteque of Romania",
value: [
{
doctype: "financial",
ri_name: "National lithoteque of Romania"
},
{
doctype: "ri",
ri_name: "National lithoteque of Romania",
ri_type: "lithoteque",
country: "romania",
wg_main: 3
}
]
},
{
key: "National Observatory of Athens - Accelerographic network",
value: [
{
doctype: "financial",
ri_name: "National Observatory of Athens - Accelerographic network"
},
{
doctype: "ri",
ri_name: "National Observatory of Athens - Accelerographic network",
ri_type: "PLEASE SELECT",
country: "greece",
wg_main: "1"
},
{
doctype: "facility",
ri_name: "National Observatory of Athens - Accelerographic network",
facility_type: "seismic_net",
network_code: "",
kind: "PLEASE SELECT",
equipment: [
{
type: "accelerometer",
brand: ""
}
]
},
{
doctype: "datacentre",
ri_name: "National Observatory of Athens - Accelerographic network"
}
]
},
{
key: "National Observatory of Athens - Institute of Geodynamics",
value: [
{
doctype: "financial",
ri_name: "National Observatory of Athens - Institute of Geodynamics"
},
{
doctype: "ri",
ri_name: "National Observatory of Athens - Institute of Geodynamics",
ri_type: "PLEASE SELECT",
country: "greece",
wg_main: "1"
},
{
doctype: "facility",
ri_name: "National Observatory of Athens - Institute of Geodynamics",
facility_type: "seismic_net",
network_code: "",
kind: "PLEASE SELECT",
equipment: [
{
type: "broadband",
brand: ""
},
{
type: "shortperiod",
brand: ""
}
]
},
{
doctype: "datacentre",
ri_name: "National Observatory of Athens - Institute of Geodynamics"
}
]
},
{
key: "National Technical University of Athens - Experimental Laboratories",
value: [
{
doctype: "ri",
ri_name: "National Technical University of Athens - Experimental Laboratories",
ri_type: "Laboratory",
country: "greece",
wg_main: "6"
},
{
doctype: "facility",
ri_name: "National Technical University of Athens - Experimental Laboratories",
facility_type: "laboratory",
laboratory_research_field: "rock physics",
equipment: [
{
type: "uniaxial press",
brand: ""
},
{
type: "triaxial press",
brand: ""
},
{
type: "rockfall simulation",
brand: ""
}
]
}
]
},
{
key: "National technical university of Athens, rock physics, laboratory of engineering geology and rock mechanics",
value: [
{
doctype: "financial",
ri_name: "National technical university of Athens, rock physics, laboratory of engineering geology and rock mechanics"
},
{
doctype: "ri",
ri_name: "National technical university of Athens, rock physics, laboratory of engineering geology and rock mechanics",
ri_type: "analytical and experimental laboratories",
country: "greece",
wg_main: 6
}
]
},
{
key: "NERC BIGS",
value: [
{
doctype: "financial",
ri_name: "NERC BIGS"
},
{
doctype: "ri",
ri_name: "NERC BIGS",
ri_type: "PLEASE SELECT",
country: "united_kingdom",
wg_main: "4"
}
]
},
{
key: "Network CarbNet",
value: [
{
doctype: "ri",
ri_name: "Network CarbNet",
ri_type: "Natural CO2-discharge network",
country: "czech_republic",
wg_main: 5
},
{
doctype: "financial",
ri_name: "Network CarbNet"
}
]
},
{
key: "NGI -  Rock Physics Laboratory",
value: [
{
doctype: "ri",
ri_name: "NGI -  Rock Physics Laboratory",
ri_type: "Laboratory",
country: "portugal",
wg_main: "1"
}
]
},
{
key: "NGI - Rock Physics Laboratory",
value: [
{
doctype: "ri",
ri_name: "NGI - Rock Physics Laboratory",
ri_type: "Laboratory",
country: "norway",
wg_main: "3"
}
]
},
{
key: "NGU - Geological Databases",
value: [
{
doctype: "ri",
ri_name: "NGU - Geological Databases",
ri_type: "Geological Repository",
country: "norway",
wg_main: "3"
}
]
},
{
key: "NIEP",
value: [
{
doctype: "financial",
ri_name: "NIEP"
},
{
doctype: "ri",
ri_name: "NIEP",
ri_type: "PLEASE SELECT",
country: "romania",
wg_main: "4"
}
]
},
{
key: "Nisyros Volcano Observatory",
value: [
{
doctype: "financial",
ri_name: "Nisyros Volcano Observatory"
},
{
doctype: "ri",
ri_name: "Nisyros Volcano Observatory",
ri_type: "PLEASE SELECT",
country: "greece",
wg_main: "2"
},
{
doctype: "facility",
ri_name: "Nisyros Volcano Observatory",
facility_type: "volcano observatory",
network_code: "",
kind: "PLEASE SELECT",
equipment: [
{
type: "station",
brand: ""
}
]
},
{
doctype: "facility",
ri_name: "Nisyros Volcano Observatory",
facility_type: "volcano observatory",
network_code: "",
kind: "PLEASE SELECT",
equipment: [
{
type: "tide gauge",
brand: ""
},
{
type: "dgps",
brand: ""
}
]
},
{
doctype: "facility",
ri_name: "Nisyros Volcano Observatory",
facility_type: "volcano observatory",
network_code: "",
kind: "PLEASE SELECT",
equipment: [
{
type: "Chemical and thermal monitoring station",
brand: ""
},
{
type: "dgps",
brand: ""
}
]
}
]
},
{
key: "NKUA - National and Regional Capodistrian University of Athens Seismological Laboratories",
value: [
{
doctype: "financial",
ri_name: "NKUA - National and Regional Capodistrian University of Athens Seismological Laboratories"
},
{
doctype: "ri",
ri_name: "NKUA - National and Regional Capodistrian University of Athens Seismological Laboratories",
ri_type: "PLEASE SELECT",
country: "greece",
wg_main: "1"
},
{
doctype: "facility",
ri_name: "NKUA - National and Regional Capodistrian University of Athens Seismological Laboratories",
facility_type: "seismic_net",
network_code: "",
kind: "PLEASE SELECT",
equipment: [
{
type: "accelerometer",
brand: ""
},
{
type: "shortperiod",
brand: ""
},
{
type: "broadband",
brand: ""
},
{
type: "borehole",
brand: ""
},
{
type: "3D sensor array",
brand: ""
}
]
},
{
doctype: "datacentre",
ri_name: "NKUA - National and Regional Capodistrian University of Athens Seismological Laboratories"
}
]
},
{
key: "NMA - Geodetic institute",
value: [
{
doctype: "ri",
ri_name: "NMA - Geodetic institute",
ri_type: "GPS Network",
country: "norway",
wg_main: "4"
}
]
},
{
key: "NOANET",
value: [
{
doctype: "financial",
ri_name: "NOANET"
},
{
doctype: "ri",
ri_name: "NOANET",
ri_type: "GPS Network",
country: "greece",
wg_main: "4"
}
]
},
{
key: "OPGC Volcanologic and Seismological Observatories",
value: [
{
doctype: "ri",
ri_name: "OPGC Volcanologic and Seismological Observatories",
ri_type: "PLEASE SELECT",
country: "france",
wg_main: "2"
},
{
doctype: "financial",
ri_name: "OPGC Volcanologic and Seismological Observatories"
}
]
},
{
key: "ORFEUS - ORFEUS Data Center",
value: [
{
doctype: "financial",
ri_name: "ORFEUS - ORFEUS Data Center"
},
{
doctype: "ri",
ri_name: "ORFEUS - ORFEUS Data Center",
ri_type: "Data repository",
country: "international-organization",
wg_main: "1"
},
{
doctype: "datacentre",
ri_name: "ORFEUS - ORFEUS Data Center"
},
{
doctype: "dataarchive",
ri_name: "ORFEUS - ORFEUS Data Center"
},
{
doctype: "facility",
ri_name: "ORFEUS - ORFEUS Data Center",
facility_type: "seismic_net",
network_code: "",
stations: [ ],
kind: "PLEASE SELECT"
}
]
},
{
key: "Permanent Magnetic Observatories",
value: [
{
doctype: "ri",
ri_name: "Permanent Magnetic Observatories",
ri_type: "Permanent Magnetic Observatories",
country: "poland",
wg_main: 5
},
{
doctype: "financial",
ri_name: "Permanent Magnetic Observatories"
}
]
},
{
key: "PLSN (IRIS CODE PL)",
value: [
{
doctype: "financial",
ri_name: "PLSN (IRIS CODE PL)"
},
{
doctype: "ri",
ri_name: "PLSN (IRIS CODE PL)",
ri_type: "PLEASE SELECT",
country: "poland",
wg_main: "1"
},
{
doctype: "facility",
ri_name: "PLSN (IRIS CODE PL)",
facility_type: "seismic_net",
network_code: "",
stations: [ ],
kind: "PLEASE SELECT"
},
{
doctype: "datacentre",
ri_name: "PLSN (IRIS CODE PL)"
},
{
ri_name: "PLSN (IRIS CODE PL)"
}
]
},
{
key: "Polish Permanent short period seismic network",
value: [
{
doctype: "financial",
ri_name: "Polish Permanent short period seismic network"
},
{
doctype: "facility",
ri_name: "Polish Permanent short period seismic network",
facility_type: "seismic_net",
network_code: "",
stations: [ ],
kind: "PLEASE SELECT"
},
{
doctype: "ri",
ri_name: "Polish Permanent short period seismic network",
ri_type: "PLEASE SELECT",
country: "poland",
wg_main: "1"
}
]
},
{
key: "Portugese Seismic ?",
value: [
{
doctype: "financial",
ri_name: "Portugese Seismic ?"
},
{
doctype: "facility",
ri_name: "Portugese Seismic ?",
facility_type: "seismic_net",
network_code: "",
stations: [ ],
kind: "PLEASE SELECT"
},
{
doctype: "ri",
ri_name: "Portugese Seismic ?",
ri_type: "PLEASE SELECT",
country: "portugal",
wg_main: "1"
}
]
},
{
key: "Portuguese Geographic Institute",
value: [
{
doctype: "financial",
ri_name: "Portuguese Geographic Institute"
},
{
doctype: "ri",
ri_name: "Portuguese Geographic Institute",
ri_type: "PLEASE SELECT",
country: "portugal",
wg_main: "4"
}
]
},
{
key: "Remote Sensing Laboratory",
value: [
{
doctype: "financial",
ri_name: "Remote Sensing Laboratory"
},
{
doctype: "ri",
ri_name: "Remote Sensing Laboratory",
ri_type: "PLEASE SELECT",
country: "greece",
wg_main: "4"
}
]
},
{
key: "ROA - Seismic monitoring",
value: [
{
doctype: "financial",
ri_name: "ROA - Seismic monitoring"
},
{
doctype: "ri",
ri_name: "ROA - Seismic monitoring",
ri_type: "PLEASE SELECT",
country: "spain",
wg_main: "1"
},
{
doctype: "facility",
ri_name: "ROA - Seismic monitoring",
facility_type: "seismic_net",
network_code: "",
kind: "PLEASE SELECT",
equipment: [
{
type: "broadband",
brand: ""
},
{
type: "shortperiod",
brand: ""
},
{
type: "accelerometer",
brand: ""
}
]
},
{
doctype: "datacentre",
ri_name: "ROA - Seismic monitoring"
}
]
},
{
key: "ROA Geomagnetic monitoring",
value: [
{
doctype: "ri",
ri_name: "ROA Geomagnetic monitoring",
ri_type: "Geomagnetism",
country: "spain",
wg_main: 5
},
{
doctype: "financial",
ri_name: "ROA Geomagnetic monitoring"
}
]
},
{
key: "Roma Tre - Experimental and Analytical Laboratories",
value: [
{
doctype: "financial",
ri_name: "Roma Tre - Experimental and Analytical Laboratories"
},
{
doctype: "ri",
ri_name: "Roma Tre - Experimental and Analytical Laboratories",
ri_type: "Laboratory",
country: "italy",
wg_main: "6"
},
{
doctype: "facility",
ri_name: "Roma Tre - Experimental and Analytical Laboratories",
facility_type: "laboratory",
laboratory_research_field: "tectonic modeling",
equipment: [
{
type: "thermomechanical apparata",
brand: "self made"
},
{
type: "apparatus to simulate volcano-tectonic processes ",
brand: "self made"
},
{
type: "rheometer MCR 301",
brand: "Anton Paar, Physica "
},
{
type: "subduction boxes ",
brand: "Gaglini  & Gaglini SRL e Vignaroli SRL "
},
{
type: "peristaltic pump with digital controller ",
brand: "Watson, Marlow, Bredel Pumps "
},
{
type: "dinamometers ",
brand: "Mecmesin "
},
{
type: "safe blower",
brand: ""
},
{
type: "technical ovens",
brand: "Lenton"
},
{
type: "concrete mixers",
brand: "Imer"
},
{
type: "picnometers",
brand: ""
},
{
type: "videocameras ATV",
brand: "Image S, Pike F-505-C"
},
{
type: "3D laser scan",
brand: "EScan Model"
},
{
type: "viscosimeter couette",
brand: "self made"
},
{
type: "horizontal fridge",
brand: "Liebherr FT 2900"
},
{
type: "sand box",
brand: "self made"
}
]
},
{
doctype: "facility",
ri_name: "Roma Tre - Experimental and Analytical Laboratories",
facility_type: "laboratory",
laboratory_research_field: "experimental petrology and volcanology",
equipment: [
{
type: "differential scanning calorimeter (DSC) TASC 414/4 ",
brand: "Netzsch "
},
{
type: "vertical furnace ",
brand: "Deltha Instruments "
},
{
type: "micro Raman ",
brand: "micro Raman Integrato Mod. LABRAM HR800 - Jobin Yvon"
},
{
type: "chamber furnace",
brand: "Nabertherm"
},
{
type: "uniaxial press",
brand: "LoadTracII Geocomp"
},
{
type: "dilatometer",
brand: "Setsys Setaram"
},
{
type: "technical oven",
brand: "Lenton mod. WF30"
},
{
type: "concentric cylinder apparatus",
brand: " Paar Rheolab "
},
{
type: "sample preparation",
brand: "various"
}
]
}
]
},
{
key: "Romania unknown",
value: [
{
doctype: "ri",
ri_name: "Romania unknown",
ri_type: "R/V Mare Nigrum +ROV GEOS",
country: "romania",
wg_main: 5
},
{
doctype: "financial",
ri_name: "Romania unknown"
}
]
},
{
key: "Romanian seismic network and NIEP accelerometer network",
value: [
{
doctype: "financial",
ri_name: "Romanian seismic network and NIEP accelerometer network"
},
{
doctype: "facility",
ri_name: "Romanian seismic network and NIEP accelerometer network",
facility_type: "seismic_net",
network_code: "",
kind: "PLEASE SELECT",
equipment: [
{
type: "broadband",
brand: ""
},
{
type: "accelerometer",
brand: ""
}
]
},
{
doctype: "ri",
ri_name: "Romanian seismic network and NIEP accelerometer network",
ri_type: "PLEASE SELECT",
country: "romania",
wg_main: "1"
},
{
doctype: "datacentre",
ri_name: "Romanian seismic network and NIEP accelerometer network"
}
]
},
{
key: "RV Keary",
value: [
{
doctype: "financial",
ri_name: "RV Keary"
},
{
doctype: "facility",
ri_name: "RV Keary",
facility_type: "seismic_net",
kind: "",
equipment: [ ]
},
{
doctype: "ri",
ri_name: "RV Keary",
ri_type: "Coastal Reseach Vessel",
country: "ireland",
wg_main: "5"
},
{
doctype: "facility",
ri_name: "RV Keary",
facility_type: "seismic station",
kind: "",
equipment: [ ]
},
{
doctype: "datacentre",
ri_name: "RV Keary"
}
]
},
{
key: "Santorini Volcano Observatory",
value: [
{
doctype: "financial",
ri_name: "Santorini Volcano Observatory"
},
{
doctype: "ri",
ri_name: "Santorini Volcano Observatory",
ri_type: "PLEASE SELECT",
country: "greece",
wg_main: "2"
},
{
doctype: "facility",
ri_name: "Santorini Volcano Observatory",
facility_type: "volcano observatory",
network_code: "",
kind: "PLEASE SELECT",
equipment: [
{
type: "station",
brand: ""
}
]
},
{
doctype: "facility",
ri_name: "Santorini Volcano Observatory",
facility_type: "volcano observatory",
network_code: "",
kind: "PLEASE SELECT",
equipment: [
{
type: "tide gauge",
brand: ""
},
{
type: "dgps",
brand: ""
}
]
},
{
doctype: "facility",
ri_name: "Santorini Volcano Observatory",
facility_type: "volcano observatory",
network_code: "",
kind: "PLEASE SELECT",
equipment: [
{
type: "Chemical and thermal monitoring station",
brand: ""
}
]
}
]
},
{
key: "SAR Interferometry Laboratory",
value: [
{
doctype: "financial",
ri_name: "SAR Interferometry Laboratory"
},
{
doctype: "ri",
ri_name: "SAR Interferometry Laboratory",
ri_type: "Seismic Network",
country: "italy",
wg_main: "2"
},
{
doctype: "facility",
ri_name: "SAR Interferometry Laboratory",
facility_type: "laboratory",
laboratory_research_field: "PLEASE SELECT",
equipment: [
{
type: "station",
brand: ""
},
{
type: "NAS",
brand: ""
},
{
type: "multiprocessor server",
brand: ""
}
]
},
{
doctype: "dataarchive",
ri_name: "SAR Interferometry Laboratory"
}
]
},
{
key: "School of earth sciences, university of manchester - rock deformation laboratory",
value: [
{
doctype: "financial",
ri_name: "School of earth sciences, university of manchester - rock deformation laboratory"
},
{
doctype: "ri",
ri_name: "School of earth sciences, university of manchester - rock deformation laboratory",
ri_type: "analytical and experimental laboratories",
country: "united_kingdom",
wg_main: 6
}
]
},
{
key: "SEGAL",
value: [
{
doctype: "financial",
ri_name: "SEGAL"
},
{
doctype: "ri",
ri_name: "SEGAL",
ri_type: "Seismic Network",
country: "portugal",
wg_main: "4"
},
{
doctype: "facility",
ri_name: "SEGAL",
facility_type: "seismic_net",
network_code: "",
stations: [ ],
kind: "PLEASE SELECT"
}
]
},
{
key: "Sicilian active volcanoes Volcanologic Monitoring",
value: [
{
doctype: "financial",
ri_name: "Sicilian active volcanoes Volcanologic Monitoring"
},
{
doctype: "ri",
ri_name: "Sicilian active volcanoes Volcanologic Monitoring",
ri_type: "Seismic Network",
country: "italy",
wg_main: "2"
},
{
doctype: "facility",
ri_name: "Sicilian active volcanoes Volcanologic Monitoring",
facility_type: "volcaninc gas and eruptions monitoring system",
network_code: "",
kind: "PLEASE SELECT",
equipment: [ ]
},
{
doctype: "dataarchive",
ri_name: "Sicilian active volcanoes Volcanologic Monitoring"
}
]
},
{
key: "Space Geodesy",
value: [
{
doctype: "financial",
ri_name: "Space Geodesy"
},
{
doctype: "ri",
ri_name: "Space Geodesy",
ri_type: "PLEASE SELECT",
country: "sweden",
wg_main: "4"
}
]
},
{
key: "SPAIN Geodesy",
value: [
{
doctype: "financial",
ri_name: "SPAIN Geodesy"
},
{
doctype: "ri",
ri_name: "SPAIN Geodesy",
ri_type: "PLEASE SELECT",
country: "spain",
wg_main: "4"
}
]
},
{
key: "Spatial geodesy 1",
value: [
{
doctype: "financial",
ri_name: "Spatial geodesy 1"
},
{
doctype: "ri",
ri_name: "Spatial geodesy 1",
ri_type: "PLEASE SELECT",
country: "spain",
wg_main: "4"
}
]
},
{
key: "Spatial geodesy 2",
value: [
{
doctype: "financial",
ri_name: "Spatial geodesy 2"
},
{
doctype: "ri",
ri_name: "Spatial geodesy 2",
ri_type: "PLEASE SELECT",
country: "spain",
wg_main: "4"
}
]
},
{
key: "Stiftelsen NORSAR",
value: [
{
doctype: "financial",
ri_name: "Stiftelsen NORSAR"
},
{
doctype: "facility",
ri_name: "Stiftelsen NORSAR",
facility_type: "seismic_net",
network_code: "",
kind: "PLEASE SELECT",
equipment: [ ]
},
{
doctype: "ri",
ri_name: "Stiftelsen NORSAR",
ri_type: "Seismic Network",
country: "norway",
wg_main: "1"
},
{
doctype: "datacentre",
ri_name: "Stiftelsen NORSAR"
}
]
},
{
key: "SURLARI NATIONAL GEOMAGNETIC OBSERVATORY (1)",
value: [
{
doctype: "ri",
ri_name: "SURLARI NATIONAL GEOMAGNETIC OBSERVATORY (1)",
ri_type: "GIS and Database",
country: "romania",
wg_main: 3
},
{
doctype: "financial",
ri_name: "SURLARI NATIONAL GEOMAGNETIC OBSERVATORY (1)"
}
]
},
{
key: "SURLARI NATIONAL GEOMAGNETIC OBSERVATORY (2)",
value: [
{
doctype: "ri",
ri_name: "SURLARI NATIONAL GEOMAGNETIC OBSERVATORY (2)",
ri_type: "SURLARI NATIONAL GEOMAGNETIC OBSERVATORY",
country: "romania",
wg_main: 5
},
{
doctype: "financial",
ri_name: "SURLARI NATIONAL GEOMAGNETIC OBSERVATORY (2)"
}
]
},
{
key: "Sweden Unknown 001",
value: [
{
doctype: "financial",
ri_name: "Sweden Unknown 001"
},
{
doctype: "ri",
ri_name: "Sweden Unknown 001",
ri_type: "PLEASE SELECT",
country: "sweden",
wg_main: "4"
}
]
},
{
key: "Sweden unknown 002",
value: [
{
doctype: "ri",
ri_name: "Sweden unknown 002",
ri_type: "Groundwater monitoring network",
country: "sweden",
wg_main: 5
},
{
doctype: "financial",
ri_name: "Sweden unknown 002"
}
]
},
{
key: "SWEPOS",
value: [
{
doctype: "financial",
ri_name: "SWEPOS"
},
{
doctype: "ri",
ri_name: "SWEPOS",
ri_type: "PLEASE SELECT",
country: "sweden",
wg_main: "4"
}
]
},
{
key: "Swisstopo AGNES",
value: [
{
doctype: "financial",
ri_name: "Swisstopo AGNES"
},
{
doctype: "ri",
ri_name: "Swisstopo AGNES",
ri_type: "PLEASE SELECT",
country: "switzerland",
wg_main: "4"
}
]
},
{
key: "Technological educational institute of Crete - EUROSEISTEST, laboratory of soil mechanics AND foundations engineering",
value: [
{
doctype: "financial",
ri_name: "Technological educational institute of Crete - EUROSEISTEST, laboratory of soil mechanics AND foundations engineering"
},
{
doctype: "ri",
ri_name: "Technological educational institute of Crete - EUROSEISTEST, laboratory of soil mechanics AND foundations engineering",
ri_type: "analytical and experimental laboratories",
country: "greece",
wg_main: 6
}
]
},
{
key: "Technological Educational Institute of Crete - Experimental Laboratories",
value: [
{
doctype: "ri",
ri_name: "Technological Educational Institute of Crete - Experimental Laboratories",
ri_type: "Laboratory",
country: "greece",
wg_main: "6"
},
{
doctype: "facility",
ri_name: "Technological Educational Institute of Crete - Experimental Laboratories",
facility_type: "laboratory",
laboratory_research_field: "rock physics",
equipment: [
{
type: "uniaxial press",
brand: ""
},
{
type: "high accuracy electrometer",
brand: "KEITHLEY 6517A"
},
{
type: "precision load cell",
brand: "Sensotec"
}
]
}
]
},
{
key: "Technological educational institute of Crete-LGS-TEICR, rock physics, laboratory of geophysics AND seismology",
value: [
{
doctype: "financial",
ri_name: "Technological educational institute of Crete-LGS-TEICR, rock physics, laboratory of geophysics AND seismology"
},
{
doctype: "ri",
ri_name: "Technological educational institute of Crete-LGS-TEICR, rock physics, laboratory of geophysics AND seismology",
ri_type: "analytical and experimental laboratories",
country: "greece",
wg_main: 6
}
]
},
{
key: "Turkey National seismology network 01",
value: [
{
doctype: "financial",
ri_name: "Turkey National seismology network 01"
},
{
doctype: "facility",
ri_name: "Turkey National seismology network 01",
facility_type: "seismic_net",
kind: "permanent",
equipment: [
{
type: "broadband",
brand: ""
},
{
type: "shortperiod",
brand: ""
}
]
},
{
doctype: "ri",
ri_name: "Turkey National seismology network 01",
ri_type: "National seismology network",
country: "turkey",
wg_main: "/"
}
]
},
{
key: "Turkey National seismology network 02",
value: [
{
doctype: "financial",
ri_name: "Turkey National seismology network 02"
},
{
doctype: "ri",
ri_name: "Turkey National seismology network 02",
ri_type: "National seismology network",
country: "turkey",
wg_main: "/"
},
{
doctype: "facility",
ri_name: "Turkey National seismology network 02",
facility_type: "seismic_net",
kind: "permanent",
equipment: [
{
type: "broadband",
brand: ""
},
{
type: "shortperiod",
brand: ""
}
]
}
]
},
{
key: "Turkey Regional seismology weak motion",
value: [
{
doctype: "financial",
ri_name: "Turkey Regional seismology weak motion"
},
{
doctype: "ri",
ri_name: "Turkey Regional seismology weak motion",
ri_type: "Regional seismology weak motion",
country: "turkey",
wg_main: "/"
},
{
doctype: "facility",
ri_name: "Turkey Regional seismology weak motion",
facility_type: "seismic_net",
kind: "permanent",
equipment: [
{
type: "broadband",
brand: ""
}
]
}
]
},
{
key: "Turkey Unknown",
value: [
{
doctype: "financial",
ri_name: "Turkey Unknown"
},
{
doctype: "ri",
ri_name: "Turkey Unknown",
ri_type: "PLEASE SELECT",
country: "turkey",
wg_main: "4"
}
]
},
{
key: "UAB Geological databases",
value: [
{
doctype: "financial",
ri_name: "UAB Geological databases"
},
{
doctype: "ri",
ri_name: "UAB Geological databases",
ri_type: "geological databases",
country: "spain",
wg_main: 3
}
]
},
{
key: "UAS - Groundwater Unit",
value: [
{
doctype: "ri",
ri_name: "UAS - Groundwater Unit",
ri_type: "Groundwater Research (chemical, physical and geophysical)",
country: "portugal",
wg_main: 5
},
{
doctype: "financial",
ri_name: "UAS - Groundwater Unit"
}
]
},
{
key: "UB (Univ. Barcelone), geological-geophysical facilities (laboratories)",
value: [
{
doctype: "financial",
ri_name: "UB (Univ. Barcelone), geological-geophysical facilities (laboratories)"
},
{
doctype: "ri",
ri_name: "UB (Univ. Barcelone), geological-geophysical facilities (laboratories)",
ri_type: "analytical and experimental laboratories",
country: "spain",
wg_main: 6
}
]
},
{
key: "UCM - Seismotectonics and seismic hazards",
value: [
{
doctype: "financial",
ri_name: "UCM - Seismotectonics and seismic hazards"
},
{
doctype: "ri",
ri_name: "UCM - Seismotectonics and seismic hazards",
ri_type: "PLEASE SELECT",
country: "spain",
wg_main: "1"
},
{
doctype: "facility",
ri_name: "UCM - Seismotectonics and seismic hazards",
facility_type: "seismic_net",
network_code: "",
kind: "PLEASE SELECT",
equipment: [
{
type: "broadband",
brand: ""
},
{
type: "shortperiod",
brand: ""
},
{
type: "accelerometer",
brand: ""
}
]
},
{
doctype: "datacentre",
ri_name: "UCM - Seismotectonics and seismic hazards"
}
]
},
{
key: "UiB - Norwegian National Seismic Network (NNSN)",
value: [
{
doctype: "financial",
ri_name: "UiB - Norwegian National Seismic Network (NNSN)"
},
{
doctype: "ri",
ri_name: "UiB - Norwegian National Seismic Network (NNSN)",
ri_type: "Seismic Network",
country: "norway",
wg_main: "1"
},
{
doctype: "datacentre",
ri_name: "UiB - Norwegian National Seismic Network (NNSN)"
},
{
doctype: "facility",
ri_name: "UiB - Norwegian National Seismic Network (NNSN)",
facility_type: "seismic_net",
network_code: "",
stations: [ ],
kind: "Regional"
}
]
},
{
key: "UiO - University of Oslo, Department of Geosciences",
value: [
{
doctype: "ri",
ri_name: "UiO - University of Oslo, Department of Geosciences",
ri_type: "Other",
country: "norway",
wg_main: "1"
}
]
},
{
key: "UK - Volcanoes",
value: [
{
doctype: "ri",
ri_name: "UK - Volcanoes",
ri_type: "Seismic Network",
country: "united_kingdom",
wg_main: "2"
},
{
doctype: "financial",
ri_name: "UK - Volcanoes"
}
]
},
{
key: "UK National Geomagnetic Service",
value: [
{
doctype: "ri",
ri_name: "UK National Geomagnetic Service",
ri_type: "Distributed (Geomagnetic observatory network)",
country: "united_kingdom",
wg_main: 5
},
{
doctype: "financial",
ri_name: "UK National Geomagnetic Service"
}
]
},
{
key: "University Amsterdam (VU) - Experimental and Analytical Laboratories",
value: [
{
doctype: "facility",
ri_name: "University Amsterdam (VU) - Experimental and Analytical Laboratories",
facility_type: "laboratory",
laboratory_research_field: "rock physics",
equipment: [
{
type: "mineral separators",
brand: "Carpco, Fritsch Pulverisette"
},
{
type: "centrifuges",
brand: "Liquid Overflow Centrifuge LOC-10, LOC-50, LOC-100, LOC-500"
},
{
type: "geological-technical laboratory",
brand: ""
}
]
},
{
doctype: "facility",
ri_name: "University Amsterdam (VU) - Experimental and Analytical Laboratories",
facility_type: "laboratory",
laboratory_research_field: "analytical",
equipment: [
{
type: "rare gas mass spectrometer",
brand: ""
},
{
type: "rare gas mass spectrometer",
brand: ""
}
]
},
{
doctype: "ri",
ri_name: "University Amsterdam (VU) - Experimental and Analytical Laboratories",
ri_type: "Laboratory",
country: "netherlands",
wg_main: "6"
},
{
doctype: "facility",
ri_name: "University Amsterdam (VU) - Experimental and Analytical Laboratories",
facility_type: "laboratory",
laboratory_research_field: "experimental petrology and volcanology",
equipment: [
{
type: "piston cylinder",
brand: "End-loaded, Boyd and England type "
},
{
type: "Quickpress piston cylinder",
brand: "Depths of the Earth Co."
},
{
type: "multi anvil",
brand: "800 ton press, Walker-type module "
},
{
type: "gas mixing furnace",
brand: "GERO 1700Ã‚Â°C "
}
]
},
{
doctype: "facility",
ri_name: "University Amsterdam (VU) - Experimental and Analytical Laboratories",
facility_type: "laboratory",
laboratory_research_field: "analytical",
equipment: [
{
type: "thermal ionisation mass spectrometer (TIMS)",
brand: "ThermoFischer Scientific Triton-Plus"
},
{
type: "electron microprobe (EPM)",
brand: "JEOL JXA8800M"
},
{
type: "field emission scanning electron microscope (FE-SEM) ",
brand: "JEOL JSM-6301F"
},
{
type: "microscopes",
brand: "Zeiss, Leitz, Leica, Linkam, Chaixmeca"
}
]
},
{
doctype: "facility",
ri_name: "University Amsterdam (VU) - Experimental and Analytical Laboratories",
facility_type: "laboratory",
laboratory_research_field: "analytical",
equipment: [
{
type: "U-Th/He Mass spectrometers with Nd YAG laser",
brand: ""
},
{
type: "inductively coupled plasma-mass spectrometery (ICP-MS)",
brand: ""
}
]
}
]
},
{
key: "University College London - rock and ice physics laboratories, laboratory, university college london",
value: [
{
doctype: "financial",
ri_name: "University College London - rock and ice physics laboratories, laboratory, university college london"
},
{
doctype: "ri",
ri_name: "University College London - rock and ice physics laboratories, laboratory, university college london",
ri_type: "analytical and experimental laboratories",
country: "united_kingdom",
wg_main: 6
}
]
},
{
key: "University College London (UCL) - Experimental and Analytical Laboratories",
value: [
{
doctype: "facility",
ri_name: "University College London (UCL) - Experimental and Analytical Laboratories",
facility_type: "laboratory",
laboratory_research_field: "rock physics",
equipment: [
{
type: "triaxial rock deformation apparata",
brand: ""
},
{
type: "loading frame",
brand: ""
},
{
type: "permeameter",
brand: ""
},
{
type: "magnetic susceptibility bridge",
brand: ""
},
{
type: "triaxial ice deformation apparatus",
brand: ""
},
{
type: "biaxial ice deformation and velocity tomography",
brand: ""
},
{
type: "rock sample preparation",
brand: ""
}
]
},
{
doctype: "ri",
ri_name: "University College London (UCL) - Experimental and Analytical Laboratories",
ri_type: "Laboratory",
country: "united_kingdom",
wg_main: "6"
},
{
doctype: "facility",
ri_name: "University College London (UCL) - Experimental and Analytical Laboratories",
facility_type: "laboratory",
laboratory_research_field: "analytical",
equipment: [
{
type: "scanning electron microscope (SEM)",
brand: "JEOL JSM-6480LV"
},
{
type: "profilometer",
brand: "Proscan 2000 surface profilometer"
}
]
}
]
},
{
key: "University of Almeria - Applied geophysics University of Almeria",
value: [
{
doctype: "financial",
ri_name: "University of Almeria - Applied geophysics University of Almeria"
},
{
doctype: "ri",
ri_name: "University of Almeria - Applied geophysics University of Almeria",
ri_type: "PLEASE SELECT",
country: "spain",
wg_main: "1"
},
{
doctype: "facility",
ri_name: "University of Almeria - Applied geophysics University of Almeria",
facility_type: "seismic_net",
network_code: "",
kind: "PLEASE SELECT",
equipment: [
{
type: "broadband",
brand: ""
},
{
type: "shortperiod",
brand: ""
},
{
type: "accelerometer",
brand: ""
}
]
},
{
doctype: "datacentre",
ri_name: "University of Almeria - Applied geophysics University of Almeria"
}
]
},
{
key: "University of Cadiz, experimental laboratory on  low-temperature thermochronology",
value: [
{
doctype: "financial",
ri_name: "University of Cadiz, experimental laboratory on  low-temperature thermochronology"
},
{
doctype: "ri",
ri_name: "University of Cadiz, experimental laboratory on  low-temperature thermochronology",
ri_type: "analytical and experimental laboratories",
country: "spain",
wg_main: 6
}
]
},
{
key: "University of Copenhagen - DanSeis 01",
value: [
{
doctype: "financial",
ri_name: "University of Copenhagen - DanSeis 01"
},
{
doctype: "ri",
ri_name: "University of Copenhagen - DanSeis 01",
ri_type: "PLEASE SELECT",
country: "denmark",
wg_main: "1"
}
]
},
{
key: "University of Copenhagen - DanSeis 02",
value: [
{
doctype: "financial",
ri_name: "University of Copenhagen - DanSeis 02"
},
{
doctype: "ri",
ri_name: "University of Copenhagen - DanSeis 02",
ri_type: "PLEASE SELECT",
country: "denmark",
wg_main: "1"
}
]
},
{
key: "University of Edinburgh - Experimental and Analytical Laboratories",
value: [
{
doctype: "ri",
ri_name: "University of Edinburgh - Experimental and Analytical Laboratories",
ri_type: "Laboratory",
country: "united_kingdom",
wg_main: "6"
},
{
doctype: "facility",
ri_name: "University of Edinburgh - Experimental and Analytical Laboratories",
facility_type: "laboratory",
laboratory_research_field: "analytical",
equipment: [
{
type: "in-line HPLC modules",
brand: ""
},
{
type: "X-ray CT unit",
brand: ""
}
]
},
{
doctype: "facility",
ri_name: "University of Edinburgh - Experimental and Analytical Laboratories",
facility_type: "laboratory",
laboratory_research_field: "experimental petrology and volcanology",
equipment: [
{
type: "multi anvil",
brand: "Walker HP cell"
},
{
type: "piston cylinders",
brand: ""
},
{
type: "gas vessels",
brand: ""
},
{
type: "chamber furnace",
brand: ""
},
{
type: "rock deformation press",
brand: ""
}
]
}
]
},
{
key: "University of Granada - Analytical Laboratories",
value: [
{
doctype: "ri",
ri_name: "University of Granada - Analytical Laboratories",
ri_type: "Laboratory",
country: "spain",
wg_main: "6"
},
{
doctype: "facility",
ri_name: "University of Granada - Analytical Laboratories",
facility_type: "laboratory",
laboratory_research_field: "analytical",
equipment: [
{
type: "fission tracks",
brand: ""
},
{
type: "secondary ion mass spectrometry (SIMS)",
brand: "SHRIMP"
}
]
}
]
},
{
key: "University of Leicester - Seis-UK",
value: [
{
doctype: "financial",
ri_name: "University of Leicester - Seis-UK"
},
{
doctype: "ri",
ri_name: "University of Leicester - Seis-UK",
ri_type: "PLEASE SELECT",
country: "united_kingdom",
wg_main: "1"
},
{
doctype: "facility",
ri_name: "University of Leicester - Seis-UK",
facility_type: "seismic_net",
network_code: "",
kind: "PLEASE SELECT",
equipment: [
{
type: "broadband",
brand: ""
},
{
type: "shortperiod",
brand: ""
}
]
},
{
doctype: "datacentre",
ri_name: "University of Leicester - Seis-UK"
}
]
},
{
key: "University of Liverpool - Experimental and Analytical Laboratories",
value: [
{
doctype: "facility",
ri_name: "University of Liverpool - Experimental and Analytical Laboratories",
facility_type: "laboratory",
laboratory_research_field: "analytical",
equipment: [
{
type: "nitrogen absorption surface area analyser",
brand: ""
},
{
type: "crystal probe",
brand: "CamScan X500 "
},
{
type: "field emission-scanning electron microscope (FE-SEM)",
brand: ""
},
{
type: "scanning electron microscope (SEM)",
brand: "Philips XL30 "
}
]
},
{
doctype: "facility",
ri_name: "University of Liverpool - Experimental and Analytical Laboratories",
facility_type: "laboratory",
laboratory_research_field: "rock physics",
equipment: [
{
type: "triaxial deformation apparata",
brand: ""
},
{
type: "hydrostatic fluid flow apparatus",
brand: ""
},
{
type: "piston cylinder",
brand: "Ã¢â‚¬ËœGriggsÃ¢â‚¬â„¢ type"
},
{
type: "channel acoustic emission recorders",
brand: "ASC Richter system"
},
{
type: "pycnometer",
brand: ""
}
]
},
{
doctype: "ri",
ri_name: "University of Liverpool - Experimental and Analytical Laboratories",
ri_type: "Laboratory",
country: "united_kingdom",
wg_main: "6"
}
]
},
{
key: "University of liverpool - rock physics laboratory, rock deformation laboratory",
value: [
{
doctype: "financial",
ri_name: "University of liverpool - rock physics laboratory, rock deformation laboratory"
},
{
doctype: "ri",
ri_name: "University of liverpool - rock physics laboratory, rock deformation laboratory",
ri_type: "analytical and experimental laboratories",
country: "united_kingdom",
wg_main: 6
}
]
},
{
key: "University of Manchester - Experimental and Analytical Laboratories",
value: [
{
doctype: "facility",
ri_name: "University of Manchester - Experimental and Analytical Laboratories",
facility_type: "laboratory",
laboratory_research_field: "rock physics",
equipment: [
{
type: "Paterson gas medium machine",
brand: ""
},
{
type: "triaxial press",
brand: ""
},
{
type: "hydrostatic rig",
brand: ""
},
{
type: "deformation machines",
brand: "NimonicÃ¢â‚¬â„¢ "
},
{
type: "soil testing equipment",
brand: ""
},
{
type: "pycnometer",
brand: ""
}
]
},
{
doctype: "facility",
ri_name: "University of Manchester - Experimental and Analytical Laboratories",
facility_type: "laboratory",
laboratory_research_field: "analytical",
equipment: [
{
type: "scanning electron microscope (SEM)",
brand: ""
},
{
type: "transmission electron microscope (TEM)",
brand: ""
},
{
type: "optic microscope",
brand: ""
}
]
},
{
doctype: "ri",
ri_name: "University of Manchester - Experimental and Analytical Laboratories",
ri_type: "Laboratory",
country: "united_kingdom",
wg_main: "6"
}
]
},
{
key: "University of Patras - Seismological Laboratories (UISL)",
value: [
{
doctype: "financial",
ri_name: "University of Patras - Seismological Laboratories (UISL)"
},
{
doctype: "facility",
ri_name: "University of Patras - Seismological Laboratories (UISL)",
facility_type: "seismic_net",
network_code: "",
kind: "PLEASE SELECT",
equipment: [
{
type: "broadband",
brand: ""
},
{
type: "shortperiod",
brand: ""
}
]
},
{
doctype: "datacentre",
ri_name: "University of Patras - Seismological Laboratories (UISL)"
},
{
doctype: "ri",
ri_name: "University of Patras - Seismological Laboratories (UISL)",
ri_type: "PLEASE SELECT",
country: "greece",
wg_main: "1"
}
]
},
{
key: "University of Tessaloniki - AUTH - Greece AUTH Department of Geophysics",
value: [
{
doctype: "financial",
ri_name: "University of Tessaloniki - AUTH - Greece AUTH Department of Geophysics"
},
{
doctype: "ri",
ri_name: "University of Tessaloniki - AUTH - Greece AUTH Department of Geophysics",
ri_type: "PLEASE SELECT",
country: "greece",
wg_main: "1"
}
]
},
{
key: "University of Tessaloniki - AUTH - Greece unknown 002",
value: [
{
doctype: "financial",
ri_name: "University of Tessaloniki - AUTH - Greece unknown 002"
},
{
doctype: "ri",
ri_name: "University of Tessaloniki - AUTH - Greece unknown 002",
ri_type: "PLEASE SELECT",
country: "greece",
wg_main: "1"
}
]
},
{
key: "University Twente",
value: [
{
doctype: "financial",
ri_name: "University Twente"
},
{
doctype: "ri",
ri_name: "University Twente",
ri_type: "research university",
country: "netherlands",
wg_main: 8
}
]
},
{
key: "Uppsala University - Experimental and Analytical Laboratories",
value: [
{
doctype: "facility",
ri_name: "Uppsala University - Experimental and Analytical Laboratories",
facility_type: "laboratory",
laboratory_research_field: "analytical",
equipment: [
{
type: "field emission-electron microprobe (FE-EMP)",
brand: "Jeol 8000"
},
{
type: "Raman spectroscopy",
brand: ""
}
]
},
{
doctype: "ri",
ri_name: "Uppsala University - Experimental and Analytical Laboratories",
ri_type: "Laboratory",
country: "sweden",
wg_main: "6"
},
{
doctype: "facility",
ri_name: "Uppsala University - Experimental and Analytical Laboratories",
facility_type: "laboratory",
laboratory_research_field: "experimental petrology and volcanology",
equipment: [
{
type: "hydrothermal autoclave laboratory",
brand: ""
},
{
type: "diamond anvil cell (DAC)",
brand: ""
}
]
}
]
},
{
key: "Uppsala University - SNSN",
value: [
{
doctype: "financial",
ri_name: "Uppsala University - SNSN"
},
{
doctype: "facility",
ri_name: "Uppsala University - SNSN",
facility_type: "seismic_net",
network_code: "",
kind: "PLEASE SELECT",
equipment: [
{
type: "broadband",
brand: ""
}
]
},
{
doctype: "ri",
ri_name: "Uppsala University - SNSN",
ri_type: "PLEASE SELECT",
country: "sweden",
wg_main: "1"
},
{
doctype: "facility",
ri_name: "Uppsala University - SNSN",
facility_type: "seismic_net",
network_code: "",
kind: "PLEASE SELECT",
equipment: [
{
type: "broadband",
brand: ""
}
]
},
{
doctype: "datacentre",
ri_name: "Uppsala University - SNSN"
}
]
},
{
key: "Utrecht University - Experimental and Analytical Laboratories",
value: [
{
doctype: "facility",
ri_name: "Utrecht University - Experimental and Analytical Laboratories",
facility_type: "laboratory",
laboratory_research_field: "experimental petrology and volcanology",
equipment: [
{
type: "triaxial gas apparatus",
brand: "Instron 100kN digitally controlled loading frame with internally heated, volume compensated, 1GPa argon gas triaxial pressure vessel for rock deformation at high pressures and temperatures."
},
{
type: "controlled atmosphere furnace with electrical impedance spectroscopy (EIS)",
brand: ""
},
{
type: "triaxial rock testing machine ",
brand: "Heard"
},
{
type: "loading frame",
brand: "stron 8862 100kN digitally controlled loading frame with High Pressure/Temperature Compaction cell (oedometer)"
},
{
type: "HPT rotary shear rock friction testing machine",
brand: "Instron 1362/8800 digitally controlled 100kN loading frame with inbuilt high pressure (water fluid medium), internally heated, rotary shear assembly and servodrive."
},
{
type: "dilatometer with pump system",
brand: ""
},
{
type: "Instron 8562 100kN loading frame and 1-D compaction vessel",
brand: "Instron"
},
{
type: "triaxial testing machine with direct shear fault friction option",
brand: "Instron 1362/8800 plus Ã¢â‚¬Å“ShuttleÃ¢â‚¬Â "
},
{
type: "impedance analyser and dielectric interface",
brand: "Solartron 1260A impedance analyser plus 1296A dielectric interface for dielectric properties of materials via impedance spectroscopy."
},
{
type: "HPT hydrothermal reaction vessels",
brand: "Tuttle type"
}
]
},
{
doctype: "facility",
ri_name: "Utrecht University - Experimental and Analytical Laboratories",
facility_type: "laboratory",
laboratory_research_field: "paleomagnetism",
equipment: [
{
type: "superconducting rock magnetometer",
brand: "2G Enterprises DC-SQUID, Model 755"
},
{
type: "thermal demagnetizers",
brand: "ASC"
},
{
type: "superconducting rock magnetometer",
brand: "2G Enterprises DC-SQUID magnetometer, Model 760"
},
{
type: "microMAG",
brand: "Princeton AGFM, Model 2900-AGM"
},
{
type: "magnetically shielded room",
brand: ""
},
{
type: "susceptibility meters",
brand: "AGICO KLY-2, KLY-3S, MFK1-FA"
},
{
type: "thermal demagnetizer",
brand: "custom made"
},
{
type: "Bartington magnetic susceptometer",
brand: "MS2B (+ MS2F field probe)"
},
{
type: "demagnetization coil",
brand: "custom made"
},
{
type: "pulse field magnetizer",
brand: "PM4 custom made"
},
{
type: "spinner magnetometers",
brand: "AGICO JR-5A, JR-6"
},
{
type: "ultrasensitive horizontal translation Curie balance",
brand: "custom made"
},
{
type: "rock preparation room",
brand: ""
},
{
type: "Bartington 3-d fluxgate sensor",
brand: "03MCES100"
},
{
type: "chemical lab",
brand: ""
},
{
type: "handheld XRF analyzer",
brand: "Niton XL3 with 50 kV x-ray tube"
}
]
},
{
doctype: "facility",
ri_name: "Utrecht University - Experimental and Analytical Laboratories",
facility_type: "laboratory",
laboratory_research_field: "analytical",
equipment: [
{
type: "laser ablation-inductively coupled plasma-mass spectrometry (LA-ICP-MS)",
brand: ""
},
{
type: "FTIR spectroscopy with in-situ high pressure reaction cell",
brand: "JASCO FT/IR 470 + Fourier transform Infrared spectrometer with IRT-30-16E infrared microscope (UU in-situ high pressure reaction cell)"
},
{
type: "microscope",
brand: "Leica DMRX"
},
{
type: "focused ion beam scanning electron microscope (FIB-SEM)",
brand: "FEI Nova NanoLab"
},
{
type: "scanning electron microscope (SEM)",
brand: "FEI XL30"
},
{
type: "transmission electron microscope (TEM)",
brand: "FEI Technai 20 "
},
{
type: "nano-secondary ion mass spectrometry (Nano-SIMS)",
brand: "Cameca 50L"
}
]
},
{
doctype: "ri",
ri_name: "Utrecht University - Experimental and Analytical Laboratories",
ri_type: "Laboratory",
country: "netherlands",
wg_main: "6"
},
{
doctype: "facility",
ri_name: "Utrecht University - Experimental and Analytical Laboratories",
facility_type: "laboratory",
laboratory_research_field: "tectonic modeling",
equipment: [
{
type: "X-ray computed tomographic scanner (CT-scan)",
brand: "Philips, Tomoscan LX"
},
{
type: "laser scanners",
brand: "Optix 400, Mephisto CX"
},
{
type: "squeeze boxes with stepping motors",
brand: "self made"
},
{
type: "coni-cylindrical viscometer",
brand: "in house manifactured"
},
{
type: "picnometers",
brand: ""
},
{
type: "freezers",
brand: "Bosch; in house manufactured"
},
{
type: "dry stoves",
brand: "Memmert; Heraeus"
},
{
type: "balance",
brand: "Mettler PC 4400"
}
]
}
]
},
{
key: "UU - high pressure temperature (HPT) laboratory",
value: [
{
doctype: "ri",
ri_name: "UU - high pressure temperature (HPT) laboratory",
ri_type: "analytical and experimental laboratories",
country: "netherlands",
wg_main: 6
},
{
doctype: "financial",
ri_name: "UU - high pressure temperature (HPT) laboratory"
}
]
},
{
key: "UU - microbeam laboratory",
value: [
{
doctype: "ri",
ri_name: "UU - microbeam laboratory",
ri_type: "analytical and experimental laboratories",
country: "netherlands",
wg_main: 6
},
{
doctype: "financial",
ri_name: "UU - microbeam laboratory"
}
]
},
{
key: "UU , paleomagnetic laboratory Fort Hoofddijk",
value: [
{
doctype: "ri",
ri_name: "UU , paleomagnetic laboratory Fort Hoofddijk",
ri_type: "analytical and experimental laboratories",
country: "netherlands",
wg_main: 6
},
{
doctype: "financial",
ri_name: "UU , paleomagnetic laboratory Fort Hoofddijk"
}
]
},
{
key: "UU, laser ablation inductively coupled plasma mass spectrometry laboratory",
value: [
{
doctype: "ri",
ri_name: "UU, laser ablation inductively coupled plasma mass spectrometry laboratory",
ri_type: "analytical and experimental laboratories",
country: "netherlands",
wg_main: 6
},
{
doctype: "financial",
ri_name: "UU, laser ablation inductively coupled plasma mass spectrometry laboratory"
}
]
},
{
key: "VESOG",
value: [
{
doctype: "financial",
ri_name: "VESOG"
},
{
doctype: "ri",
ri_name: "VESOG",
ri_type: "PLEASE SELECT",
country: "czech_republic",
wg_main: "4"
}
]
},
{
key: "Volcanologic and Seismological Observatories",
value: [
{
doctype: "financial",
ri_name: "Volcanologic and Seismological Observatories"
},
{
doctype: "ri",
ri_name: "Volcanologic and Seismological Observatories",
ri_type: "PLEASE SELECT",
country: "france",
wg_main: "2"
},
{
doctype: "facility",
ri_name: "Volcanologic and Seismological Observatories",
facility_type: "seismic_net",
network_code: "",
kind: "PLEASE SELECT",
equipment: [
{
type: "broadband",
brand: ""
},
{
type: "shortperiod",
brand: ""
},
{
type: "accelerometer",
brand: ""
},
{
type: "i",
brand: ""
},
{
type: "GPS",
brand: ""
}
]
},
{
doctype: "datacentre",
ri_name: "Volcanologic and Seismological Observatories"
}
]
},
{
key: "Vrije Universiteit Amsterdam - TecLab, tectonic laboratory",
value: [
{
doctype: "ri",
ri_name: "Vrije Universiteit Amsterdam - TecLab, tectonic laboratory",
ri_type: "analytical and experimental laboratories",
country: "netherlands",
wg_main: 6
},
{
doctype: "financial",
ri_name: "Vrije Universiteit Amsterdam - TecLab, tectonic laboratory"
}
]
},
{
key: "VUA - argon geochronology laboratory",
value: [
{
doctype: "ri",
ri_name: "VUA - argon geochronology laboratory",
ri_type: "analytical and experimental laboratories",
country: "netherlands",
wg_main: 6
},
{
doctype: "financial",
ri_name: "VUA - argon geochronology laboratory"
}
]
},
{
key: "VUA - experimental petrology laboratory",
value: [
{
doctype: "ri",
ri_name: "VUA - experimental petrology laboratory",
ri_type: "analytical and experimental laboratories",
country: "netherlands",
wg_main: 6
},
{
doctype: "financial",
ri_name: "VUA - experimental petrology laboratory"
}
]
},
{
key: "VUA - geochemical laboratory",
value: [
{
doctype: "ri",
ri_name: "VUA - geochemical laboratory",
ri_type: "Seismic Network",
country: "netherlands",
wg_main: 6
},
{
doctype: "financial",
ri_name: "VUA - geochemical laboratory"
}
]
},
{
key: "VUA - Geochemical Laboratory - Microanalysis",
value: [
{
doctype: "ri",
ri_name: "VUA - Geochemical Laboratory - Microanalysis",
ri_type: "analytical and experimental laboratories",
country: "netherlands",
wg_main: 6
},
{
doctype: "financial",
ri_name: "VUA - Geochemical Laboratory - Microanalysis"
}
]
},
{
key: "VUA - Geological Technical Laboratory",
value: [
{
doctype: "ri",
ri_name: "VUA - Geological Technical Laboratory",
ri_type: "analytical and experimental laboratories",
country: "netherlands",
wg_main: 6
},
{
doctype: "financial",
ri_name: "VUA - Geological Technical Laboratory"
}
]
},
{
key: "VUA - isotope geochemistry laboratory",
value: [
{
doctype: "ri",
ri_name: "VUA - isotope geochemistry laboratory",
ri_type: "analytical and experimental laboratories",
country: "netherlands",
wg_main: 6
},
{
doctype: "financial",
ri_name: "VUA - isotope geochemistry laboratory"
}
]
},
{
key: "VUA - mineral separation laboratory",
value: [
{
doctype: "ri",
ri_name: "VUA - mineral separation laboratory",
ri_type: "analytical and experimental laboratories",
country: "netherlands",
wg_main: 6
},
{
doctype: "financial",
ri_name: "VUA - mineral separation laboratory"
}
]
},
{
key: "Wire line diamond core drilling rig",
value: [
{
doctype: "ri",
ri_name: "Wire line diamond core drilling rig",
ri_type: "Seismic Network",
country: "sweden",
wg_main: "3"
},
{
doctype: "financial",
ri_name: "Wire line diamond core drilling rig"
}
]
}
]
}


var key="ri_name"    ;

console.log(searchIntoObj(key,obj));
