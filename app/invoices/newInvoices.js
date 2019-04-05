/*
 * <dsCode> Inc. (c) 2016. This copyright is based on the Apache License 2.0. Please contact David Sutton for use of this software.
 */

var invoiceTypes = [
    {id: 1, value: "Invoice"},
    {id: 2, value: "Credit Card"}
];

var invoiceUUID = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    var r = Math.random() * 16 | 0, v = c == 'x' ? r : r & 0x3 | 0x8;
    return v.toString(16);
});
var custUUID = "12345678-0000-0000-000000000000";
//var custUUID = "3f561f5e-e3cf-4c51-9dd6-9d51045a214b";

//var theData = [{"prices_id":"1","prices_UUID":"1","prices_testDescription":"Test","prices_unitPrice":"10"}];

webix.ui({

    view: "window",
    id: "NewInvoice",
    //height:"3000",
    width: 450,
    height: 1024,
    move: true,

    head: "Create New Invoice",
    body: {
        rows: [
            {
                view: "form",
                id: "newInvoiceForm",
                datatype: "json",

                elements: [
                    //{view:"text", name:"invoice_UUID", label:"UUID", value:invoiceUUID, width:"350"},
                    {
                        view: "combo",
                        name: "invoice_2custName",
                        id: "invoice_2custName",
                        label: "Customer",
                        value: "CIAL",
                        labelWidth: "100",
                        width: "350",
                        suggest: "/labs2/php/api_methods/SELECTz.php?tableName=customers&columnNames=cust_UUID%20AS%20id,cust_company%20AS%20value,cust_invoiceKind,cust_customerNumber&dataName=data&select=6"
                    },
                    {
                        view: "label",
                        name: "custInvoiceKind",
                        id: "custInvoiceKind",
                        align: "center"
                    },
                    {
                        view: "combo",
                        name: "invoice_type",
                        id: "invoice_type",
                        label: "Invoice Type",
                        labelWidth: "100",
                        width: "250",
                        suggest: invoiceTypes
                    },
                    //on:{"onChange":function(newv){var custUUID = newv; console.log("Customer changed:"+custUUID);}}},
                    {
                        rows: [
                            {
                                //view: "multicombo",
                                view: "multiselect",
                                name: "invoice_lotNumber",
                                id: "invoice_lotNumber",
                                label: "Cust Lot #:",
                                width: "350",
                                labelWidth: "100",
                                //value: "1",
                                suggest: "/labs2/php/api_methods/SELECTz.php?tableName=methodProperties&columnNames=methodP_UUID%20AS%20id,methodP_custLotNumber%20AS%20value&selectColumn=methodP_2customer&selectData=" + custUUID + "&dataName=data&select=1"
                            },
                            {
                                view: "text",
                                name: "custNumber",
                                id: "custNumber",
                                label: "Customer #",
                                value: "",
                                readonly: true,
                                labelWidth: "100",
                                width: "200"
                            }

                        ]
                    },
                    {
                        view: "fieldset", label: "Invoice Info", body: {
                        rows: [
                            {
                                view: "datepicker",
                                name: "invoice_invoiceDate",
                                id: "invoice_invoiceDate",
                                label: 'Invoice Date',
                                width: "350",
                                labelWidth: "100",
                                format: "%Y-%m-%d",
                                timepicker: true,
                                date: new Date(2016, 1, 1)
                            },
                            {
                                view: "text",
                                name: "invoice_invoiceNumber",
                                id: "invoice_invoiceNumber",
                                label: "Invoice No.",
                                width: "350",
                                labelWidth: "100"
                            }
                        ]
                    }
                    },
                    {
                        view: "fieldset", label: "Receive Info", body: {
                        rows: [
                            {
                                view: "datepicker",
                                name: "invoice_receivedDate",
                                id: "invoice_receivedDate",
                                label: 'Received Date',
                                width: "350",
                                labelWidth: "100",
                                format: "%Y-%m-%d",
                                timepicker: true,
                                date: new Date(2016, 1, 1)
                            },
                            {
                                view: "text",
                                name: "invoice_orderNumber",
                                id: "invoice_orderNumber",
                                label: "Order No.",
                                width: "350",
                                labelWidth: "100"
                            }
                        ]
                    }
                    },
                    {
                        view: "fieldset", label: "Card Info", body: {
                        rows: [
                            {
                                view: "text",
                                name: "invoice_custPORequestor",
                                id: "invoice_custPORequestor",
                                label: "Name/PO #",
                                width: "350",
                                labelWidth: "100"
                            },
                            {
                                view: "text",
                                name: "invoice_ccNumber",
                                id: "invoice_ccNumber",
                                label: "CC No.",
                                width: "350",
                                labelWidth: "100"
                            },
                            {
                                view: "text",
                                name: "invoice_NameOnCard",
                                id: "invoice_NameOnCard",
                                label: "Name on Card",
                                width: "350",
                                labelWidth: "100"
                            }
                        ]
                    }
                    },
                    {
                        view: "datatable",
                        name: "invoiceTests",
                        id: "invoiceTests",
                        select: true,
                        drag: true,
                        resizeColumn: true,
                        resizeRow: true,
                        //math: true,
                        editable:true,
                        //editor:"text",
                        editaction:"dblclick",
                        //autowidth:true,

                        columns:[
                            {id:"prices_qty",header:"QTY",width:50, editor:"text"},
                            {id:"prices_testDescription", header:"Descrp",fillspace:true},
                            {id:"prices_unitPrice", header:"Price", width:60},
                            {id:"invoice_exPrice", header:"Ext Price",width:70, editor:"text"}
                        ],
                        externalData:list2grid,
                        scheme:{
                            $change:calck_c
                        }


                    },

                    {view: "button", label: "Save", width: "100", click: "find_trackingLots"}
                ]
            }

        ]
    }


}).show();


webix.ui({
    view: "window",
    id: "NewInvoiceTests",
    width: 550,
    height: 500,
    move: true,
    left: 475,

    head: "Select Invoice Tests",
    body: {
        rows: [
            {
                height: 35,
                view: "toolbar",
                elements: [
                    {view: "text", id: "list_input", label: "Filter list by description", css: "fltr", labelWidth: 170}
                ]
            },
            {
                view: "list",
                name: "invoiceDecript",
                id: "invoiceDecript",
                template: "#prices_testDescription# - #prices_unitPrice#",
                select: true,
                drag: true,
                //url: "http://localhost/php/api_methods/SELECT.php?tableName=prices&columnNames=prices_id%20AS%20id,prices_testDescription%20AS%20value&dataName=data&select=5"
                url: "/labs2/php/api_methods/SELECTz.php?tableName=prices&columnNames=prices_id,prices_UUID,prices_testDescription,prices_unitPrice&dataName=data&select=5"

            },
            {
                view: "text",
                value: "To add to the invoice please drag from the list above to the left"
            }
        ]
    }
}).show();


//////////////////////////////////////////////////////////// Page Controller Logic ////////////////////////////////////////////////////////////

$$("invoice_2custName").attachEvent("onChange", function (newv) {
    var custUUID = newv;
    webix.ajax().get("/labs2/php/api_methods/SELECTz.php?tableName=methodProperties&columnNames=methodP_UUID%20AS%20id,methodP_custLotNumber%20AS%20value&selectColumn=methodP_2customer&selectData=" + custUUID + "&dataName=data&select=1", function (text, data) {
        var new_options = data.json();

        var list = $$("invoice_lotNumber").getPopup().getList();
        list.clearAll();
        list.parse(new_options);
    });
    webix.ajax().get("/labs2/php/api_methods/SELECT.php?tableName=customers&columnNames=cust_UUID%20AS%20id,cust_customerNumber%20AS%20value,cust_invoiceKind&selectData=" + custUUID + "&selectColumn=cust_UUID&dataName=data&select=1", function (text, data) {
        var returnedJSON_c = JSON.parse(text);
        var custNumberValue = returnedJSON_c['data'][0]['value'];
        var custInvoiceKind = returnedJSON_c['data'][0]['cust_invoiceKind'];
        $$("custNumber").setValue(custNumberValue);
        $$("custInvoiceKind").setValue('This customer is setup for: <b>' + custInvoiceKind + '</b>');
        $$("invoice_type").setValue(custInvoiceKind);
    });
    console.log("Customer changed:" + custUUID);
});


////// Logic for making the data into invoice numbers //////////////////////////////////////////////////////////////////////////////
$$('newInvoiceForm').setValues({invoice_UUID: invoiceUUID}, {invoice_custNumber: custNumber}, {invoice_2custUUID: custUUID});
console.log("Invoice:" + invoiceUUID + "   Customer:" + custUUID);//just a debug code


/////// Logic to build the Invoice Number and Order Number /////////////////////////////////////////////////////////////////////////
$$("invoice_invoiceDate").attachEvent("onChange", function (newy) {
    var invoiceDate = new Date(newy);
    var custNumber = $$("custNumber").getValue();
    $$("invoice_invoiceNumber").setValue(custNumber +" "+ invoiceDate.getFullYear() + ('0' + (invoiceDate.getMonth() + 1)).slice(-2) + ('0' + invoiceDate.getDate()).slice(-2));
});
$$("invoice_receivedDate").attachEvent("onChange", function (newx) {
    var receivedDate = new Date(newx);
    var custNumber = $$("custNumber").getValue();
    $$('invoice_orderNumber').setValue(custNumber +" "+ receivedDate.getFullYear() + ('0' + (receivedDate.getMonth() + 1)).slice(-2) + ('0' + receivedDate.getDate()).slice(-2));
});
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

////// Logic for the filter on the test descriptions list /////////////////////
$$("list_input").attachEvent("onTimedKeyPress", function () {
    var value = this.getValue().toLowerCase();
    $$("invoiceDecript").filter(function (obj) {
        return obj.prices_testDescription.toLowerCase().indexOf(value) == 0;
    })
});
//////////////////////////////////////////////////////////////////////////////


/////// Detect what is in the Tests List ////////////////////////////
function list2grid(data, id){

    price_descript = data.value || data.prices_testDescription;
    price_unit = data.value || data.prices_unitPrice;
    price_UUID = data.value || data.prices_UUID;

    console.log("This got moved "+price_descript+" with a price of "+price_unit+" and an id of "+price_UUID);
    return data;
}
/**************** Calc the datagrids test prices ********************/
function calck_c(obj){
    obj.invoice_exPrice = obj.prices_qty*1*obj.prices_unitPrice*1;
};
 /************* *****************************************************/
 
////// Function captures the form data and creates a URL to be sent to the insert.php api. ////////////////////////////////////////////////////////////////
function find_trackingLots() {
    var customerID = $$("invoice_2custName").getValue();
    var customer = $$("invoice_2custName").getText();
    var invoiceDate = $$("invoice_invoiceDate").getText();  //getText gets the actual date formatted field contents
    var recieveDate = $$("invoice_receivedDate").getText(); //a getValue gets the RAW date data.
    var lotNumbs = $$("invoice_lotNumber").getText();       //this work only for the muultiselect element. I did not find it to work with the multicombo
    var invoiceType = $$("invoice_type").getText();
    var invoiceNo = $$("invoice_invoiceNumber").getValue();
    var recieveNo = $$("invoice_orderNumber").getValue();
    var nameOnCard = $$("invoice_NameOnCard").getValue();
    var ccNumb = $$("invoice_ccNumber").getValue();
    var poNmae = $$("invoice_custPORequestor").getValue();
    var custNumber = $$("custNumber").getValue();
    var theStatus = "On"; //this value is legacy to FMPro

    var creationDat = webix.Date.dateToStr("%Y-%m-%d");     //these next two line create a date format to
    var creationDate = creationDat(new Date());             //save in the db as to when the record was created.

    var theSubmitDataRAW = '{"success":true,"data":[{"invoice_UUID":"' + invoiceUUID + '", "invoice_2custUUID":"' + customerID + '","invoice_2custName":"' + customer + '", "invoice_custPORequestor":"' + poNmae + '", "invoice_orderNumber":"' + recieveNo + '", "invoice_lotNumber":"' + lotNumbs + '", "invoice_invoiceNumber":"' + invoiceNo + '", "invoice_invoiceDate":"' + invoiceDate + '", "invoice_receivedDate":"' + recieveDate + '", "invoice_ccNumber":"' + ccNumb + '", "invoice_type":"' + invoiceType + '","invoice_NameOnCard":"' + nameOnCard + '","invoice_custNumber":"' + custNumber + '","invoice_status":"' + theStatus + '","invoice_createDate":"' + creationDate + '"}]}';
    webix.ajax("/labs2/php/api_methods/INSERT.php?tableName=invoice&JSONdata=" + theSubmitDataRAW);
    console.log("JSON DATA being sent to the server " + invoiceUUID); //just a debug code
    webix.message({text: "Saved"}); //Optional UI to display that something happened
    window.setTimeout(partB, 1000); //Need to wait for the SQL to save the data to the database
}
function partB() {
    //location.href = ("./newInvoice2.php?invoiceUUID=" + invoiceUUID); //load the next page and send the UUID along.
    webix.message({text: "Ok"});
}