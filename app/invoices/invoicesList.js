/*
 * <dsCode> Inc. (c) 2016. This copyright is based on the Apache License 2.0. Please contact David Sutton for use of this software.
 */

/**
 * Created by sutton on 3/17/16.
 */
webix.ui({
    view:"window",
    id:"invoiceList",
    height:500,
    width:850,
    move:true,
    head: "Invoice List",
    body: {
            cols:[
                {
            view:"treetable",
            columns:[
                { id:"invoice.invoice_UUID",	header:"", css:{"text-align":"right"},  	width:100},
                { id:"customers.cust_company",	header:["Customer"], template:"{common.treetable()} #cust_company#" , width:350},
                { id:"invoice_invoiceNumber",	header:["Invoice #",{content:"textFilter"}],	width:200}
            ],
            filterMode:{
                level:false,
                showSubItems:false
            },
                    select:"row",
            autoheight:true,
            autowidth:true,
        data:[
            //{"id":"7","invoice_invoiceNumber":"Dc 20150828g","value":"Diamondback Drugs"},{"id":"7","invoice_invoiceNumber":"Dc 2015819e","value":"Diamondback Drugs"}
            {"invoice.invoice_UUID":1, "cust_company":"Diamondback Drug", data:[{"invoice.invoice_UUID":2, "cust_company":"Diamondback Drug", "invoice_invoiceNumber":"B-123",data:[{"invoice.invoice_UUID":3, "cust_company":"Diamondback Drug","invoice_invoiceNumber":"Ba-123"}]},{"invoice.invoice_UUID":4, "cust_company":"Diamondback Drug","invoice_invoiceNumber":"B-234"}]}
        // url: "http://localhost/labs2/php/api_methods/SELECTz.php?tableName=invoice&columnNames=invoice_UUID,invoice_invoiceNumber,invoice_totalDue,invoice_paid,customers.cust_company%20AS%20value,customers.cust_UUID%20AS%20id&joinTable=customers&joinColumn=invoice_2custUUID&joinValue=customers.cust_id&sortby=customers.cust_company&sort=ASC&dataName=data&select=7"
        ]
                    },
                {
                    view:"text",
                    width:350,
                    height:50,
                    id:"invoice_custNumber"
                }
            ]
    }

}).show();