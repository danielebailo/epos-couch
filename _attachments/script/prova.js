var ogg = {
        k1:"v1",
        k2:{
            k3:"v3",
            k4:"v4"
            },
        k5:["v5","v6","v7"],
        k8:[
            {k9:"v9",
            k10:"v10",
            k3:"vv3",
            k11:[
                {k3:"vvv3"}
                ]
        }
        ]
    };


var attributes=ogg;

function recGetVal(searchKey, Obj){
    var retVal = [];
    for (var key in  Obj){

        //passo n: array
        if(_.isArray(Obj[key])){
            for (var Elem in Obj[key]){
                var myvalue = recGetVal(searchKey, Obj[key][Elem]);
                retVal=_.union(retVal,myvalue);
                }
            }
        


        //passo n: oggetto 
        else if(_.isObject(Obj[key])){
            var myvalue = recGetVal(searchKey, Obj[key]);
            retVal=_.union(retVal,myvalue);
            }

        //passo base (semplice coppia kay/val
        else if ( !_.isObject(Obj[key]) && !_.isArray (Obj[key])){
            if (!_.isUndefined(Obj[key])){
                if (searchKey == key){
                    retVal.push(Obj[key]);
                    }
                }
            }
        }

    return retVal;
}


function recursiveGet(key){
            var self=this;
            var retVals=[];
            _.each(attributes, function(fieldValue, fieldKey){
                if(_.isObject(fieldValue)){ //takes both objects and arrays
                    var newModel = new ResearchUnit(fieldValue);
                    var ret=newModel.recursiveGet(key);
                    if(!_.isUndefined(ret) && !_.isNull(ret) && !_.isNaN(ret)){
                            retVals.push(ret.pop());
                        }
                    }
                });

            //if at this step the val is not a key:value object, then do not push it
            var val=attributes[key];
            if(!_.isUndefined(val) && !_.isNull(val) && !_.isNaN(val)){
                retVals.push(val);
                }
            
            //step 0, e
            if (!_.isEmpty(retVals)){
                return retVals;
                }
            }

var chiave="k3";
console.log(recGetVal(chiave,ogg));
console.log(recursiveGet(chiave));


var ciao =[];
//~ console.log(ciao.concat([5]));
