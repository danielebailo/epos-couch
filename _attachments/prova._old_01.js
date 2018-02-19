




function lo(anything){
    console.log(anything);
    }
    
var list=["ciao", "ci", "dsf", "342", "plplpl"];

var oggetto={kikko:"ciao", kikka:"ciao2", plost:"sadsa"};
    
    _.each(list, function(element, index){
            $("#pipi").append(element+'<br>');
        });

    _.each(oggetto, function(fieldValue, fieldKey){
        $("#popo").append(fieldKey+':'+fieldValue+'<br>');
        });



    //MODEL (attributes are text, order, done)
    window.modello = Backbone.Model.extend({
        defaults: function(){
            },
            
            
        recursiveGet: function(key){
            var self=this;
            var retVals=[];
            _.each(this.attributes, function(fieldValue, fieldKey){
                if(_.isObject(fieldValue)){ //takes both objects and arrays
                    var newModel = new modello(fieldValue);
                    var ret=newModel.recursiveGet(key);
                    if(!_.isUndefined(ret) && !_.isNull(ret) && !_.isNaN(ret)){
                            retVals.push(ret.pop());
                            console.log(ret);
                        }
                    }
                });

            //if at this step the val is not a key:value object, then do not push it
            var val=this.attributes[key];
            if(!_.isUndefined(val) && !_.isNull(val) && !_.isNaN(val)){
                retVals.push(val);
                }
            
            //step 0, returns a simple value
            if (!_.isEmpty(retVals)){
                console.log(retVals);
                return retVals;
                }
            }
        });

var obj1={financial:"56", lista:["l1","l2"], piscia:{financial:"102"}};



var provamodello = new modello(obj1);



var truthval=_.any([1,2,3,4,5,56], function(element){
    return element==3;
    }) ;
    
    console.log(truthval);




$("#backbono").append(JSON.stringify(provamodello.recursiveGet('ri_name')));


var key=[
 {"id":1,"name":"test1","parent_id":null},
 {"id":2,"name":"test2","parent_id":null},
 {"id":3,"name":"test3","parent_id":2},
 {"id":4,"name":"test4","parent_id":2}
];

 function recursRender(key){
            var self=this;
            var retVals="";
            _.each(this.attributes, function(fieldValue, fieldKey){
                if(_.isObject(fieldValue)){ //takes both objects and arrays
                    var newModel = new ResearchUnit(fieldValue);
                    var ret=newModel.recursiveGet(key);
                    if(!_.isUndefined(ret) && !_.isNull(ret) && !_.isNaN(ret)){
                            retVals.push(ret.pop());
                        }
                    }
                });

            //if at this step the val is not a key:value object, then do not push it
            var val=this.attributes[key];
            if(!_.isUndefined(val) && !_.isNull(val) && !_.isNaN(val)){
                retVals.push(val);
                }
            
            //step 0, returns a simple value
            if (!_.isEmpty(retVals)){
                return retVals;
                }
            }


var validkeys=["doctype","ri_name","ri_type","country","wg_main","facility_type","network_code","type","stations","kind","laboratory_research_field","equipment","brand"];  

    for (var key in validkeys){
        console.log(validkeys[key]);
        }
