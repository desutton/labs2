/*
 * <dsCode> Inc. (c) 2016. This copyright is based on the Apache License 2.0. Please contact David Sutton for use of this software.
 */

/**
 * Created by sutton on 3/17/16.
 */
var myjson = webix.DataDriver.myjson = webix.copy(webix.DataDriver.json);
myjson.child = function (obj) {
    if (obj.$level == 1)
        return obj.status;
    if (obj.$level == 2)
        return obj.vdates;
    if (obj.$level == 3)
        return obj.invoice;
};

webix.ui({
    view: "window",
    id: "invoiceList",
    height: 500,
    width: 950,
    move: true,
    head: "Invoice List",
    body: {
        cols: [
            {
                view: "tree",
                width: "500",
                height: "500",
                /*columns:[
                    { id:"cust_company",	header:["Customer"], template:"{common.treetable()} #cust_company#" , width:350},
                    { id:"invoice_paid", header:["Paid"], template:"{common.treeable()} #invoice_paid#" , width:350},
                    { id:"invoice_invoiceDate",	header:["Date"], template:"{common.treeable()} #invoice_invoiceDate#" , width:350},
                    { id:"invoice_invoiceNumber",	header:["Invoice #"],	width:200}
                   // { id:"invoice_UUID",	header:"", css:{"text-align":"right"},  	width:100}
                ],
                */
                //filterMode:{
                //    level:false,
                //    showSubItems:false
                //},
                //select:"row",
                //autoheight:true,
                //autowidth:true,

                //data:[  ],
                data: [{
                    'value': 'Bacon East Pharmacy',
                    status: [{
                        'value': 'O',
                        vdates: [{
                            'value': '2015-09-16',
                            invoice: [{value: 'Bp 20150916', id: '887A4F0B-2F94-4647-8329-E42FE495403A'}]
                        }]
                    }]
                }],
            ,
            //url: "http://localhost/labs2/php/api_methods/treeselect.php?select=1",
            //url:"http://localhost/labs2/php/api_methods/SELECTz.php?select=7",
            // url:"http://localhost/labs2/php/api_methods/SELECTz.php?tableName=invoice&columnNames=invoice_UUID,invoice_invoiceNumber,invoice_totalDue,invoice_paid,customers.cust_company%20AS%20value,customers.cust_UUID%20AS%20id&joinTable=customers&joinColumn=invoice_2custUUID&joinValue=customers.cust_id&sortby=customers.cust_company&sort=ASC&dataName=data&select=7",
            //url: "./data.json",

            datatype
:
"myjson"
},
{
    view:"text",
        width
:
    350,
        height
:
    50,
        id
:
    "invoice_custNumber"
}
]
}

}).
show();