/*
 * <dsCode> Inc. (c) 2019. This copyright is based on the Apache License 2.0. Please contact David Sutton for use of this software.
 */

var reqUUID = 'xxxxxxxx-xxxx-5xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    var r = Math.random() * 16 | 0, v = c === 'x' ? r : r & 0x3 | 0x8;
    return v.toString(16);
});

//var reqUUIDtest = '8ac8638f-a521-4f47-903a-6ea881e849aa';

var $userId = JSON.parse(decodeURIComponent(document.cookie).substring(5))['UserName']; //Extract out the username from the cookie file
var d = new Date();
var y = d.getFullYear();
var m = d.getMonth();
m++;
d = d.getDate();
var ymd = y + "-" + m + "-" + d;
var theLineItemUUID = "";
var theLineItemUUIDPast = "";


var lineItemList_v = {
    view: "datatable", id: "lineItemList", autoheight: true, select: true, scrollable: true, columns:
        [
            {id: "reqR_itemName", header: "Item Disc.", sort: "string", adjust: true},
            {id: "reqR_partNumber", header: "Part No.", sort: "string", adjust: true},
            {id: "reqR_unitQty", header: "Unit Qty", sort: "string", adjust: true},
            {id: "reqR_qty", header: "Qty", sort: "string", adjust: true},
            {id: "reqR_costUnit", header: "Unit Cost", sort: "string", adjust: true},
            {id: "reqR_cost", header: "Cost", sort: "string", adjust: true},
            {id: "reqR_orderType", header: "Order Type", sort: "string", adjust: true},
            {id: "reqR_reason", header: "Reason", sort: "string", adjust: true}
        ],
    data: '[{"reqR_UUID":"1234567890","reqR_reqUUID":"068159d5-6b67-4e2a-ac74-31a0f284666f","reqR_itemName":"This is a Test","reqR_partNumber":"938ryqh9wuodqnoq 9qeh","reqR_unitQty":"2","reqR_qty":"1","reqR_costUnit":"999.99","reqR_cost":"9999.99","reqR_orderType":"","reqR_reason":"Because I really want it","reqR_eta":null,"reqR_status":"1"}]'
    //url:"/labs2/php/api_methods/SELECTz.php?tableName=requisitionRows&columnNames=reqR_UUID,reqR_reqUUID,reqR_itemName,reqR_partNumber,reqR_unitQty,reqR_qty,reqR_costUnit,reqR_cost,reqR_orderType,reqR_reason,reqR_eta,reqR_status&selectColumn=reqR_reqUUID&selectData="+ reqUUID +"&dataName=data&select=1"
};

var formItemList_v = {
    cols: [
        {view: "text", placeholder: "Item Disc.", width: 150, id: "reqR_itemNameX"},
        {view: "text", placeholder: "Part#", width: 150, id: "reqR_partNumberX"},
        {view: "text", placeholder: "1", width: 40, id: "reqR_unitQtyX"},
        {view: "text", placeholder: "Qty", width: 60, id: "reqR_qtyX"},
        {view: "text", placeholder: "Unit Cost", width: 100, id: "reqR_costUnitX"},
        {view: "text", placeholder: "Cost", width: 100, id: "reqR_costX"},
        {
            view: "select", placeholder: "Order Type", width: 150, id: "reqR_orderTypeX", value: 0, options:
                [{"id": 1, "value": "Supply"},
                    {"id": 2, "value": "Reagent"},
                    {"id": 3, "value": "Standard"}, {"id": 4, "value": "Solvent"},
                    {"id": 0, "value": ""}]
        },
        {view: "text", placeholder: "Reason", width: 150, id: "reqR_reasonX"},
        {
            view: "button",
            placeholder: "Add",
            width: 100,
            height: 25,
            id: "saveTheInvoiceLineButton",
            type: "iconButton",
            icon: "wxi-plus-circle"
        }
    ],
    id: "formItemList"
};

var reqFormEntry_v = {
    rows: [
        {
            view: "combo",
            width: "400",
            id: "req_name",
            label: "Requester's Name",
            labelWidth: 150,
            suggest: "/labs2/php/api_methods/SELECTz.php?tableName=users&columnNames=users_displayName%20AS%20value&dataName=data&select=5"
        },
        {
            view: "combo",
            width: "400",
            id: "req_dept",
            label: "Department",
            labelWidth: 150,
            suggest: "/labs2/php/api_methods/SELECTz.php?tableName=vl_departments&columnNames=dept_name%20AS%20value&dataName=data&select=5"
        },
        {view: "text", width: "400", id: "req_vend", label: "Vendor", labelWidth: 150},
        {view: "text", width: "400", id: "req_ordr", label: "Order Number", labelWidth: 150}
    ]
};
var reqFormEntry2_v = {
    rows: [
        {
            view: "datepicker",
            width: "400",
            id: "req_subm",
            format: "%Y-%m-%d",
            stringResult: true,
            label: "Date Submited",
            labelWidth: 150
        },
        {
            view: "datepicker",
            width: "400",
            id: "req_need",
            format: "%Y-%m-%d",
            stringResult: true,
            label: "Date Needed",
            labelWidth: 150
        },
        {template: "", height: 38},
        {view: "text", width: "100", id: "invoice_UUID", hidden: false, value: reqUUID},
        //{rows: [{view: "button", label: "Save", align: 'left', width: "75", click: "saveTheInvoice"}]}
    ]
};

var tabbar = {
    view: "tabbar", id: 'tabbar', /*value: 'createReq',*/ multiview: true, options: [
        {value: 'Create Requisition', id: 'createReq'},
        {value: 'View Requisition', id: 'viewReq'},
        {value: 'Past Requisition', id: 'pastReq'}
    ]
};


var data = {
    cells: [
        {
            id: "createReq", width: 1375,
            ///////////////
            rows: [
                {
                    view: "combo",
                    width: "400",
                    id: "req_name",
                    label: "Requester's Name",
                    labelWidth: 150,
                    suggest: "/labs2/php/api_methods/SELECTz.php?tableName=users&columnNames=users_displayName%20AS%20value&dataName=data&select=5"
                },
                {
                    view: "combo",
                    width: "400",
                    id: "req_dept",
                    label: "Department",
                    labelWidth: 150,
                    suggest: "/labs2/php/api_methods/SELECTz.php?tableName=vl_departments&columnNames=dept_name%20AS%20value&dataName=data&select=5"
                },
                {view: "text", width: "400", id: "req_vend", label: "Vendor", labelWidth: 150},
                {view: "text", width: "400", id: "req_ordr", label: "Order Number", labelWidth: 150},
                {
                    view: "datepicker",
                    width: "400",
                    id: "req_subm",
                    format: "%Y-%m-%d",
                    stringResult: true,
                    label: "Date Submited",
                    labelWidth: 150
                },
                {
                    view: "datepicker",
                    width: "400",
                    id: "req_need",
                    format: "%Y-%m-%d",
                    stringResult: true,
                    label: "Date Needed",
                    labelWidth: 150
                },
                {template: "", height: 38},
                {view: "text", width: "100", id: "invoice_UUID", hidden: false, value: reqUUID},
                {view: "button", label: "Save", align: 'right', width: "75", click: "saveTheInvoice"},
                {},
                {
                    view: "datatable", id: "lineItemList", autoheight: true, select: true, scrollable: true, columns:
                        [
                            {id: "reqR_itemName", header: "Item Disc.", sort: "string", adjust: true},
                            {id: "reqR_partNumber", header: "Part No.", sort: "string", adjust: true},
                            {id: "reqR_unitQty", header: "Unit Qty", sort: "string", adjust: true},
                            {id: "reqR_qty", header: "Qty", sort: "string", adjust: true},
                            {id: "reqR_costUnit", header: "Unit Cost", sort: "string", adjust: true},
                            {id: "reqR_cost", header: "Cost", sort: "string", adjust: true},
                            {id: "reqR_orderType", header: "Order Type", sort: "string", adjust: true},
                            {id: "reqR_reason", header: "Reason", sort: "string", adjust: true}
                        ],
                    data: '[{"reqR_UUID":"1234567890","reqR_reqUUID":"068159d5-6b67-4e2a-ac74-31a0f284666f","reqR_itemName":"This is a Test","reqR_partNumber":"938ryqh9wuodqnoq 9qeh","reqR_unitQty":"2","reqR_qty":"1","reqR_costUnit":"999.99","reqR_cost":"9999.99","reqR_orderType":"","reqR_reason":"Because I really want it","reqR_eta":null,"reqR_status":"1"}]'
                    //url:"/labs2/php/api_methods/SELECTz.php?tableName=requisitionRows&columnNames=reqR_UUID,reqR_reqUUID,reqR_itemName,reqR_partNumber,reqR_unitQty,reqR_qty,reqR_costUnit,reqR_cost,reqR_orderType,reqR_reason,reqR_eta,reqR_status&selectColumn=reqR_reqUUID&selectData="+ reqUUID +"&dataName=data&select=1"
                },
                {
                    cols: [
                        {view: "text", placeholder: "Item Disc.", width: 150, id: "reqR_itemNameX"},
                        {view: "text", placeholder: "Part#", width: 150, id: "reqR_partNumberX"},
                        {view: "text", placeholder: "1", width: 40, id: "reqR_unitQtyX"},
                        {view: "text", placeholder: "Qty", width: 60, id: "reqR_qtyX"},
                        {view: "text", placeholder: "Unit Cost", width: 100, id: "reqR_costUnitX"},
                        {view: "text", placeholder: "Cost", width: 100, id: "reqR_costX"},
                        {
                            view: "select",
                            placeholder: "Order Type",
                            width: 150,
                            id: "reqR_orderTypeX",
                            value: 0,
                            options:
                                [{"id": 1, "value": "Supply"},
                                    {"id": 2, "value": "Reagent"},
                                    {"id": 3, "value": "Standard"}, {"id": 4, "value": "Solvent"},
                                    {"id": 0, "value": ""}]
                        },
                        {view: "text", placeholder: "Reason", width: 150, id: "reqR_reasonX"},
                        {
                            view: "button",
                            placeholder: "Add",
                            width: 100,
                            height: 25,
                            id: "saveTheInvoiceLineButton",
                            type: "iconButton",
                            icon: "wxi-plus-circle"
                        }
                    ],
                    id: "formItemList"
                }
            ]

            //////////////
        },
        {
            id: "viewReq",
            template: "Place for the form control"
        },
        {
            id: "pastReq",
            template: "About the app"
        }
    ]
};

webix.ui({

    view: "window",
    id: "InventoryIndex",
    width: 1325,
    //height: 775,
    autoheight: true,
    left: 1,
    move: true,
    head: "Requisitions",
    body: {
        rows: [tabbar, data]
    }// close body
}).show();


//////////////////////////////////////////////////////////// Page Controller Logic ////////////////////////////////////////////////////////////

////// Function captures the form data and creates a URL to be sent to the insert.php api. ////////////////////////////////////////////////////////////////
function saveTheInvoice() {
    var reqUUID = $$("invoice_UUID").getValue();
    var reqreqID = "NULL";
    var reqName = $$("req_name").getText();
    var reqDept = $$("req_dept").getText();
    var reqDateSubmit = $$("req_subm").getValue();       //this work only for the muultiselect element. I did not find it to work with the multicombo
    var reqNeeded = $$("req_need").getValue();
    var reqOrder = "1970-01-01 00:00";
    var reqVendor = $$("req_vend").getValue();  //getText gets the actual date formatted field contents
    var reqOrderNum = $$("req_ordr").getValue();
    var reqManager = "NULL";
    var reqAuthor = "NULL";
    var reqManagerDate = "1970-01-01 00:00";
    var reqAuthorDate = "1970-01-01 00:00";

    var reqStatus = 1;

    //var creationDat = webix.Date.dateToStr("%Y-%m-%d");     //these next two line create a date format to
    //var creationDate = creationDat(new Date());             //save in the db as to when the record was created.


////////////////// Form Submit to DB //////////////////
    var theSubmitDataRAW = '{"success":true,"data":[{"req_UUID":"' + reqUUID + '", "req_reqID":"' + reqreqID + '", "req_reqName":"' + reqName + '", "req_dept":"' + reqDept + '", "req_dateSubmit":"' + reqDateSubmit + '", "req_dateNeed":"' + reqNeeded + '", "req_ordered":"' + reqOrder + '", "req_vendor":"' + reqVendor + '", "req_orderNum":"' + reqOrderNum + '", "req_manager":"' + reqManager + '", "req_authorization":"' + reqAuthor + '", "req_managerDate":"' + reqManagerDate + '", "req_authorizationDate":"' + reqAuthorDate + '", "req_status":"' + reqStatus + '"}]}';
    //var theSubmitDataRAW = '{"success":true,"data":[{"req_UUID":"' + reqUUID + '", "req_reqID":"' + reqreqID + '"}]}';

    webix.ajax("/labs2/php/api_methods/INSERT.php?tableName=requisitions&JSONdata=" + theSubmitDataRAW);
//   console.log("JSON DATA being sent to the server " + theSubmitDataRAW); //just a debug code
    webix.message({text: "Saved"}); //Optional UI to display that something happened
}

////// Logic for the filter on the test descriptions list /////////////////////
$$("list_input").attachEvent("onTimedKeyPress", function () {
    var value = this.getValue().toLowerCase();
    $$("activeReqs").filter(function (obj) {
        return obj.req_reqName.toLowerCase().indexOf(value) === 0;
    })
});


////// Logic for the filter on the past descriptions list /////////////////////
$$("past_list_input").attachEvent("onTimedKeyPress", function () {
    var value = this.getValue().toLowerCase();
    $$("pastReqs").filter(function (obj) {
        return obj.req_reqName.toLowerCase().indexOf(value) === 0;
    })
});


////////////////// Click on Active Item //////////////////

$$('activeReqs').attachEvent("onAfterSelect", function (id) {
    var value = this.getItem(id).req_UUID;
    $$("req_UUIDA").setValue(value);
    theLineItemUUID = value;
    //console.log(theLineItemUUID);

    $$("req_reqIDA").setValue(this.getItem(id).req_reqID);

    $$("req_reqNameA").setValue(this.getItem(id).req_reqName);

    $$("req_deptA").setValue(this.getItem(id).req_dept);

    $$("req_dateSubmitA").setValue(this.getItem(id).req_dateSubmit);

    $$("req_dateNeedA").setValue(this.getItem(id).req_dateNeed);

    $$("req_orderedA").setValue(this.getItem(id).req_ordered);

    $$("req_vendorA").setValue(this.getItem(id).req_vendor);

    $$("req_orderNumA").setValue(this.getItem(id).req_orderNum);

    $$("req_managerA").setValue(this.getItem(id).req_manager);

    $$("req_authorizationA").setValue(this.getItem(id).req_authorization);

    $$("req_managerDateA").setValue(this.getItem(id).req_managerDate);

    $$("req_authorizationDateA").setValue(this.getItem(id).req_authorizationDate);

    $$("req_statusA").setValue(this.getItem(id).req_status);

    var showLineItems = "/labs2/php/api_methods/SELECTz.php?tableName=requisitionRows&columnNames=reqR_UUID,reqR_reqUUID,reqR_itemName,reqR_partNumber,reqR_unitQty,reqR_qty,reqR_costUnit,reqR_cost,reqR_orderType,reqR_reason,reqR_eta,reqR_status&selectColumn=reqR_reqUUID&selectData=" + theLineItemUUID + "&dataName=data&select=1";
    $$("orderLineItems").clearAll();
    $$("orderLineItems").load(showLineItems);

});

////////////////// Change the Active Data Table Columns //////////////////

function showActiveBatch(changeActiveView) {
    $$("activeReqs").showColumnBatch(changeActiveView);
}


////////////////// Click on Past Item //////////////////

$$('pastReqs').attachEvent("onAfterSelect", function (id) {

    var value = this.getItem(id).req_UUID;
    $$("req_UUIDP").setValue(value);
    theLineItemUUIDPast = value;

//    console.log(theLineItemUUIDPast);

    $$("req_reqIDP").setValue(this.getItem(id).req_reqID);

    $$("req_reqNameP").setValue(this.getItem(id).req_reqName);

    $$("req_deptP").setValue(this.getItem(id).req_dept);

    $$("req_dateSubmitP").setValue(this.getItem(id).req_dateSubmit);

    $$("req_dateNeedP").setValue(this.getItem(id).req_dateNeed);

    $$("req_orderedP").setValue(this.getItem(id).req_ordered);

    $$("req_vendorP").setValue(this.getItem(id).req_vendor);

    $$("req_orderNumP").setValue(this.getItem(id).req_orderNum);


    $$("req_managerP").setValue(this.getItem(id).req_manager);

    $$("req_authorizationP").setValue(this.getItem(id).req_authorization);

    $$("req_managerDateP").setValue(this.getItem(id).req_managerDate);

    $$("req_authorizationDateP").setValue(this.getItem(id).req_authorizationDate);

    $$("req_statusP").setValue(this.getItem(id).req_status);

    var showLineItemsPast = "/labs2/php/api_methods/SELECTz.php?tableName=requisitionRows&columnNames=reqR_UUID,reqR_reqUUID,reqR_itemName,reqR_partNumber,reqR_unitQty,reqR_qty,reqR_costUnit,reqR_cost,reqR_orderType,reqR_reason,reqR_eta,reqR_status&selectColumn=reqR_reqUUID&selectData=" + theLineItemUUIDPast + "&dataName=data&select=1";
    $$("orderLineItemsPast").clearAll();
    $$("orderLineItemsPast").load(showLineItemsPast);

});

////////////////// Change the Past Data Table Columns //////////////////

function showBatch(changePastView) {
    $$("pastReqs").showColumnBatch(changePastView);
}


////////////////// Change the Past Status to Current Checkbox //////////////////
/*$$("changeReqStatus").attachEvent("onChange", function(newv, oldv){
    webix.message("Value changed from: "+oldv+" to: "+newv);
});
*/

////// Function captures the Line Item form data and creates a URL to be sent to the insert.php api. ////////////////////////////////////////////////////////////////
$$("saveTheInvoiceLineButton").attachEvent("onItemClick", function () {
    //saveTheInvoiceLine() {

    var reqRUUID = 'xxxxxxxx-xxxx-6xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = Math.random() * 16 | 0, v = c === 'x' ? r : r & 0x3 | 0x8;
        return v.toString(16);
    });

    var bb = "068159d5-6b67-4e2a-ac74-31a0f284666f";//reqUUID;
    var cc = $$("reqR_itemNameX").getValue();
    var dd = $$("reqR_partNumberX").getValue();
    var ee = $$("reqR_unitQtyX").getValue();
    var ff = $$("reqR_qtyX").getValue();
    var gg = $$("reqR_costUnitX").getValue();
    var hh = $$("reqR_costX").getValue();
    var ii = $$("reqR_orderTypeX").getValue();
    var jj = $$("reqR_reasonX").getValue();
    var kk = "NULL";
    var ll = 1;

    ////////////////// Form Submit to DB //////////////////
    var theSubmitDataRAW2 = '{"success":true,"data":[{"reqR_UUID":"' + reqRUUID + '", "reqR_reqUUID":"' + bb + '", "reqR_itemName":"' + cc + '", "reqR_partNumber":"' + dd + '", "reqR_unitQty":"' + ee + '", "reqR_qty":"' + ff + '", "reqR_costUnit":"' + gg + '", "reqR_cost":"' + hh + '", "reqR_orderType":"' + ii + '", "reqR_reason":"' + jj + '", "reqR_eta":"' + kk + '", "reqR_status":"' + ll + '"}]}';

    webix.ajax("/labs2/php/api_methods/INSERT.php?tableName=requisitionRows&JSONdata=" + theSubmitDataRAW2);
    console.log("JSON DATA being sent to the server " + theSubmitDataRAW2); //just a debug code

    var loadLineItems = "/labs2/php/api_methods/SELECTz.php?tableName=requisitionRows&columnNames=reqR_UUID,reqR_reqUUID,reqR_itemName,reqR_partNumber,reqR_unitQty,reqR_qty,reqR_costUnit,reqR_cost,reqR_orderType,reqR_reason,reqR_eta,reqR_status&selectColumn=reqR_reqUUID&selectData=" + reqUUID + "&dataName=data&select=1";
    // var loadLineItems = '[{"reqR_UUID":"1234567890","reqR_reqUUID":"068159d5-6b67-4e2a-ac74-31a0f284666f","reqR_itemName":"This is a Test","reqR_partNumber":"938ryqh9wuodqnoq 9qeh","reqR_unitQty":"2","reqR_qty":"1","reqR_costUnit":"999.99","reqR_cost":"9999.99","reqR_orderType":"","reqR_reason":"Because I really want it","reqR_eta":null,"reqR_status":"1"}]';
    $$("lineItemList").clearAll();
    $$("lineItemList").load(loadLineItems, "json");
    $$("lineItemList").clearAll();
    $$("lineItemList").load(loadLineItems);
    $$("lineItemList").refresh();
    $$("lineItemList").refresh();
    webix.message({text: "Saved"}); //Optional UI to display that something happened


});


/////////////////// Checkbox script for Manager Approval //////////////////
$$("reqManagerApproval").attachEvent("onItemClick", function () {


    //webix.message({text: $userId});
    //webix.message({text: theLineItemUUID});


    var theSubmitDataManager = '{"req_manager":"' + $userId + '","req_managerDate":"' + ymd + '"}';
    webix.ajax("/labs2/php/api_methods/UPDATEz.php?tableName=requisitions&JSONdata=" + theSubmitDataManager + "&theWhereColumn=req_UUID&theUUID=" + theLineItemUUID);
    //console.log("JSON DATA being sent to the server " + theSubmitDataManager +" and this data to the db "+ temp); //just a debug code
    var refresher = "/labs2/php/api_methods/SELECTz.php?tableName=requisitions&columnNames=req_UUID,req_reqID,req_reqName,req_dept,req_dateSubmit,req_dateNeed,req_ordered,req_vendor,req_orderNum,req_manager,req_authorization,req_managerDate,req_authorizationDate,req_status&selectColumn=req_status&selectData=1&dataName=data&select=1";
    $$("activeReqs").clearAll();
    $$("activeReqs").load(refresher);
    $$("authorizr").refresh();


    webix.message({text: "Saved"}); //Optional UI to display that something happened
});

/////////////////// Checkbox script for Authorized Approval //////////////////
$$("reqAuthorizedApproval").attachEvent("onItemClick", function () {


    //webix.message({text: $userId});
    //webix.message({text: theLineItemUUID});


    var theSubmitDataAuthor = '{"req_authorization":"' + $userId + '","req_authorizationDate":"' + ymd + '"}';
    webix.ajax("/labs2/php/api_methods/UPDATEz.php?tableName=requisitions&JSONdata=" + theSubmitDataAuthor + "&theWhereColumn=req_UUID&theUUID=" + theLineItemUUID);
    //console.log("JSON DATA being sent to the server " + theSubmitDataManager +" and this data to the db "+ temp); //just a debug code
    var refresher = "/labs2/php/api_methods/SELECTz.php?tableName=requisitions&columnNames=req_UUID,req_reqID,req_reqName,req_dept,req_dateSubmit,req_dateNeed,req_ordered,req_vendor,req_orderNum,req_manager,req_authorization,req_managerDate,req_authorizationDate,req_status&selectColumn=req_status&selectData=1&dataName=data&select=1";
    $$("activeReqs").clearAll();
    $$("activeReqs").load(refresher);
    $$("authorizr").refresh();


    webix.message({text: "Saved"}); //Optional UI to display that something happened
});
/////////////////// Checkbox script for making past req active //////////////////
$$("reqMakeActive").attachEvent("onItemClick", function () {

    var theSubmitDataStatus1 = '{"req_status":"1"}';
    webix.ajax("/labs2/php/api_methods/UPDATEz.php?tableName=requisitions&JSONdata=" + theSubmitDataStatus1 + "&theWhereColumn=req_UUID&theUUID=" + theLineItemUUIDPast);

    var refresher = "/labs2/php/api_methods/SELECTz.php?tableName=requisitions&columnNames=req_UUID,req_reqID,req_reqName,req_dept,req_dateSubmit,req_dateNeed,req_ordered,req_vendor,req_orderNum,req_manager,req_authorization,req_managerDate,req_authorizationDate,req_status&selectColumn=req_status&selectData=1&dataName=data&select=1";
    var refresher0 = "/labs2/php/api_methods/SELECTz.php?tableName=requisitions&columnNames=req_UUID,req_reqID,req_reqName,req_dept,req_dateSubmit,req_dateNeed,req_ordered,req_vendor,req_orderNum,req_manager,req_authorization,req_managerDate,req_authorizationDate,req_status&selectColumn=req_status&selectData=0&dataName=data&select=1";
    $$("activeReqs").clearAll();
    $$("pastReqs").clearAll();
    $$("activeReqs").load(refresher);
    $$("pastReqs").load(refresher0);
    $$("authorizr").refresh();
    $$("authorizrP").refresh();
    $$("statusActive").refresh();

    webix.message({text: "Saved"}); //Optional UI to display that something happened
});

/////////////////// Checkbox script for making active req past //////////////////
$$("reqMakePast").attachEvent("onItemClick", function () {

    var theSubmitDataStatus0 = '{"req_status":"0"}';
    webix.ajax("/labs2/php/api_methods/UPDATEz.php?tableName=requisitions&JSONdata=" + theSubmitDataStatus0 + "&theWhereColumn=req_UUID&theUUID=" + theLineItemUUID);
    //console.log("/labs2/php/api_methods/UPDATEz.php?tableName=requisitions&JSONdata=" + theSubmitDataStatus0 + "&theWhereColumn=req_UUID&theUUID="+ theLineItemUUID);
    var refresher = "/labs2/php/api_methods/SELECTz.php?tableName=requisitions&columnNames=req_UUID,req_reqID,req_reqName,req_dept,req_dateSubmit,req_dateNeed,req_ordered,req_vendor,req_orderNum,req_manager,req_authorization,req_managerDate,req_authorizationDate,req_status&selectColumn=req_status&selectData=1&dataName=data&select=1";
    var refresher0 = "/labs2/php/api_methods/SELECTz.php?tableName=requisitions&columnNames=req_UUID,req_reqID,req_reqName,req_dept,req_dateSubmit,req_dateNeed,req_ordered,req_vendor,req_orderNum,req_manager,req_authorization,req_managerDate,req_authorizationDate,req_status&selectColumn=req_status&selectData=0&dataName=data&select=1";
    $$("activeReqs").clearAll();
    $$("pastReqs").clearAll();
    $$("activeReqs").load(refresher);
    $$("pastReqs").load(refresher0);
    $$("authorizr").refresh();
    $$("authorizrP").refresh();
    $$("statusActive").refresh();

    webix.message({text: "Saved"}); //Optional UI to display that something happened
});

webix.ajax().get("/labs2/php/api_methods/SELECTz.php?tableName=users&columnNames=users_manager%20AS%20value&selectColumn=users_name&selectData=" + $userId + "&dataName=data&select=1", function (text, data) {
    var managerLevel = JSON.stringify(text);
    if (managerLevel.search("Yes") !== -1) {
        $$("reqManagerApproval").show();
    }

});
webix.ajax().get("/labs2/php/api_methods/SELECTz.php?tableName=users&columnNames=users_authorized%20AS%20value&selectColumn=users_name&selectData=" + $userId + "&dataName=data&select=1", function (text, data) {
    var authorizorLevel = JSON.stringify(text);
    if (authorizorLevel.search("Yes") !== -1) {
        $$("reqAuthorizedApproval").show();
    }

});


//if ( authorizorLevel.search("Yes") !== -1){$$("reqAuthorizedApproval").show();}


/////////////////////////////////////////////////////////////////////////////
