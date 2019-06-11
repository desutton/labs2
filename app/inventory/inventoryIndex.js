/*
 * <dsCode> Inc. (c) 2019. This copyright is based on the Apache License 2.0. Please contact David Sutton for use of this software.
 */

const reqUUID = 'xxxxxxxx-xxxx-5xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    let r = Math.random() * 16 | 0, v = c === 'x' ? r : r & 0x3 | 0x8;
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
var ztheData = webix.ajax().get("/labs2/php/api_methods/SELECTz.php?tableName=requisitions&columnNames=req_UUID,req_reqID,req_reqName,req_dept,req_dateSubmit,req_dateNeed,req_ordered,req_vendor,req_orderNum,req_manager,req_authorization,req_managerDate,req_authorizationDate,req_status&selectColumn=req_status&selectData=0&operator=>&dataName=data&select=1");
var ztheDataPast = webix.ajax().get("/labs2/php/api_methods/SELECTz.php?tableName=requisitions&columnNames=req_UUID,req_reqID,req_reqName,req_dept,req_dateSubmit,req_dateNeed,req_ordered,req_vendor,req_orderNum,req_manager,req_authorization,req_managerDate,req_authorizationDate,req_status&selectColumn=req_status&selectData=0&dataName=data&select=1");
var ztheUsers = webix.ajax().get("/labs2/php/api_methods/SELECTz.php?tableName=users&columnNames=users_displayName%20AS%20value&dataName=data&select=5");
var ztheDeptments = webix.ajax().get("/labs2/php/api_methods/SELECTz.php?tableName=vl_departments&columnNames=dept_name%20AS%20value&dataName=data&select=5");
var ztheReqRowData = webix.ajax().get("/labs2/php/api_methods/SELECTz.php?tableName=requisitionRows&columnNames=reqR_UUID,reqR_reqUUID,reqR_itemName,reqR_partNumber,reqR_unitQty,reqR_qty,reqR_costUnit,reqR_cost,reqR_orderType,reqR_reason,reqR_eta,reqR_status&selectColumn=reqR_reqUUID&selectData=NULL&dataName=data&select=1");
webix.ajax().post("/labs2/php/api_methods/log.txt", {id:100});
var tabbar = {
    view: "tabbar", id: 'tabbar', /*value: 'createReq',*/ multiview: true, options: [
        {value: 'Create Requisition', id: 'createReq'},
        {value: 'View Requisition', id: 'viewReq'},
        {value: 'Past Requisition', id: 'pastReq'}
    ]
};


const activePanelView = {
    id: "viewReq",
    height: "700",
    cols: [
        {
            rows: [
                {
                    height: 35,
                    view: "toolbar",
                    elements: [
                        {
                            view: "text",
                            id: "list_input",
                            label: "Filter list by employee name",
                            css: "fltr",
                            labelWidth: 200
                        },
                        //pulldown menu
                        {
                            view: "select", label: "Show", value: 10, labelWidth: 65, width: 150, options: [
                                {id: 10, value: "Main"},
                                {id: 20, value: "All"},
                                {id: 30, value: "Debug"}
                            ],
                            on: {
                                onChange: function (changeActiveView) {
                                    showActiveBatch(changeActiveView);
                                }
                            } //copied element from Webix website
                        },// end of pulldown menu
                        {view: "button", id: "refreshPanelButton", width: "50", type: "icon", icon: "wxi-sync"}
                    ]
                },
                {
                    view: "datatable",
                    id: "activeReqs",
                    visibleBatch: 10,
                    columns: [
                        {id: "req_dateSubmit", header: "Date Submitted", sort: "date", adjust: "header"},
                        {id: "req_reqID", header: "Requisition", sort: "string", adjust: "data"},
                        {id: "req_reqName", header: "Requester", sort: "string", adjust: true},
                        {id: "req_vendor", header: "Vendor", sort: "string", adjust: true, batch: 10},
                        {id: "req_UUID", header: "UUID", sort: "string", adjust: "data", batch: 30},
                        {id: "req_dept", header: "Dept", sort: "string", adjust: true, batch: 20},
                        {id: "req_dateNeed", header: "Date Needed", sort: "string", adjust: true, batch: 20},
                        {id: "req_ordered", header: "Order Date", sort: "string", adjust: true, batch: 20},
                        {id: "req_orderNum", header: "Order #", sort: "string", adjust: true, batch: 20},
                        {id: "req_manager", header: "Manager", sort: "string", adjust: true, batch: 20},
                        {id: "req_authorization", header: "Authorization", sort: "string", adjust: true, batch: 20},
                        {id: "req_managerDate", header: "MGR Date", sort: "date", adjust: true, batch: 20},
                        {id: "req_authorizationDate", header: "AUTH Date", sort: "date", adjust: true, batch: 20},
                        {id: "req_status", header: "Status", sort: "int", adjust: "header", batch: 30}
                    ],
                    select: true,
                    data: ztheData,
                    //url: "/labs2/php/api_methods/SELECTz.php?tableName=requisitions&columnNames=req_UUID,req_reqID,req_reqName,req_dept,req_dateSubmit,req_dateNeed,req_ordered,req_vendor,req_orderNum,req_manager,req_authorization,req_managerDate,req_authorizationDate,req_status&selectColumn=req_status&selectData=0&operator=>&dataName=data&select=1"
                }
            ]
        },
        {
            width: "600",
            rows: [
                {
                    view: "accordion",
                    id: "theActiveReqsAccord",
                    //height: "500",
                    multi: "mixed", rows: [
                        {view: "resizer"},
                        {
                            view: "accordionitem", header: "Order Details", collapsed: false, headerHeight: 50, body: {
                                rows: [
                                    {
                                        id: "myform",
                                        view: "form",
                                        elements: [
                                            {
                                                cols: [{
                                                    view: "label",
                                                    label: "Req Name:",
                                                    width: "150",
                                                    css: {"font-weight": "bold"}
                                                }, {
                                                    view: "label",
                                                    value: "req_reID",
                                                    id: "req_reqIDA"
                                                }, {
                                                    view: "button",
                                                    id: "reqEdit",
                                                    width: "50",
                                                    type: "icon",
                                                    icon: "fas fa-edit",
                                                    tooltip: "Edit",
                                                    hidden: false
                                                }, {
                                                    view: "button",
                                                    id: "reqEditOff",
                                                    width: "50",
                                                    type: "icon",
                                                    icon: "fas fa-times",
                                                    tooltip: "Cancel Edit",
                                                    hidden: true
                                                }]
                                            },
                                            {
                                                cols: [{
                                                    view: "label",
                                                    label: "Emp Name:",
                                                    width: "150",
                                                    css: {"font-weight": "bold"}
                                                }, {
                                                    view: "label",
                                                    value: "req_reqName",
                                                    id: "req_reqNameA"
                                                }, {
                                                    view: "combo",
                                                    value: "req_reqName",
                                                    name: "req_reqName",
                                                    id: "req_reqNameA1",
                                                    borderless: true,
                                                    hidden: true,
                                                    suggest: ztheUsers //"/labs2/php/api_methods/SELECTz.php?tableName=users&columnNames=users_displayName%20AS%20value&dataName=data&select=5"
                                                }, {
                                                    view: "text",
                                                    value: "req_UUID",
                                                    name: "req_UUID",
                                                    id: "req_UUIDA1",
                                                    borderless: true,
                                                    hidden: true
                                                }]
                                            },
                                            {
                                                cols: [{
                                                    view: "label",
                                                    label: "Dept:",
                                                    width: "150",
                                                    css: {"font-weight": "bold"}
                                                }, {view: "label", value: "req_dept", id: "req_deptA"}, {
                                                    view: "combo",
                                                    value: "req_dept",
                                                    name: "req_dept",
                                                    id: "req_deptA1",
                                                    borderless: true,
                                                    hidden: true,
                                                    suggest: ztheDeptments //"/labs2/php/api_methods/SELECTz.php?tableName=vl_departments&columnNames=dept_name%20AS%20value&dataName=data&select=5"
                                                }]
                                            },
                                            {
                                                cols: [{
                                                    view: "label",
                                                    label: "Date Submitted:",
                                                    width: "150",
                                                    css: {"font-weight": "bold"}
                                                }, {
                                                    view: "label",
                                                    value: "req_dateSubmit",
                                                    id: "req_dateSubmitA"
                                                }, {
                                                    view: "datepicker",
                                                    value: "req_dateSubmit",
                                                    name: "req_dateSubmit",
                                                    id: "req_dateSubmitA1",
                                                    borderless: true,
                                                    hidden: true,
                                                    format: "%Y-%m-%d"
                                                }]
                                            },
                                            {
                                                cols: [{
                                                    view: "label",
                                                    label: "Date Needed:",
                                                    width: "150",
                                                    css: {"font-weight": "bold"}
                                                }, {
                                                    view: "label",
                                                    value: "req_dateNeed",
                                                    id: "req_dateNeedA"
                                                }, {
                                                    view: "datepicker",
                                                    value: "req_dateNeed",
                                                    name: "req_dateNeed",
                                                    id: "req_dateNeedA1",
                                                    borderless: true,
                                                    hidden: true,
                                                    format: "%Y-%m-%d"
                                                }]
                                            },
                                            {
                                                cols: [{
                                                    view: "label",
                                                    label: "Vendor:",
                                                    width: "150",
                                                    css: {"font-weight": "bold"}
                                                }, {
                                                    view: "label",
                                                    value: "req_vendor",
                                                    id: "req_vendorA"
                                                }, {
                                                    view: "text",
                                                    value: "req_vendor",
                                                    name: "req_vendor",
                                                    id: "req_vendorA1",
                                                    borderless: true,
                                                    hidden: true
                                                }]
                                            },
                                            {
                                                cols: [{
                                                    view: "label",
                                                    label: "Order #:",
                                                    width: "150",
                                                    css: {"font-weight": "bold"}
                                                }, {
                                                    view: "label",
                                                    value: "req_orderNum",
                                                    id: "req_orderNumA"
                                                }, {
                                                    view: "text",
                                                    value: "req_orderNum",
                                                    name: "req_orderNum",
                                                    id: "req_orderNumA1",
                                                    borderless: true,
                                                    hidden: true
                                                }]
                                            },
                                            {
                                                cols: [{
                                                    view: "label",
                                                    label: "Date Ordered:",
                                                    width: "150",
                                                    css: {"font-weight": "bold"}
                                                }, {
                                                    view: "label",
                                                    value: "req_ordered",
                                                    id: "req_orderedA"
                                                }, {
                                                    view: "datepicker",
                                                    value: "req_ordered",
                                                    name: "req_ordered",
                                                    id: "req_orderedA1",
                                                    borderless: true,
                                                    hidden: true,
                                                    format: "%Y-%m-%d"
                                                }, {
                                                    view: "button",
                                                    id: "reqEditSave",
                                                    width: "50",
                                                    type: "icon",
                                                    icon: "fas fa-check",
                                                    tooltip: "Save Changes",
                                                    hidden: true
                                                }]
                                            }
                                        ]
                                    }
                                ]
                            }
                        },
                        {view: "resizer"},
                        {
                            view: "accordionitem",
                            header: "Order Line Items",
                            collapsed: true,
                            headerHeight: 50,
                            body: {

                                rows: [
                                    {view:"toolbar", height:35, elements:[

                                            //pulldown menu
                                            {
                                                view: "select", label: "Show", value: 10, labelWidth: 65, width: 150,  options: [
                                                    {id: 100, value: "Main"},
                                                    {id: 101, value: "Debug"}
                                                ],
                                                on: {
                                                    onChange: function (changeActiveView) {
                                                        showActiveBatchRows(changeActiveView);
                                                    }
                                                } //copied element from Webix website
                                            },// end of pulldown menu
                                            {width: 335},
                                            {view: "button", id:"addNewReqRow", width:50, type:"icon", icon:"far fa-plus-square", tooltip:"Add a new item"},
                                            {view: "button", id: "refreshRowPanelButton", width:50, type: "icon", icon: "wxi-sync", tooltip:"Reload"},
                                            ]},
                                    {view: "form", elements:[
                                            {view: "datatable",
                                        id: "orderLineItems",
                                        select: true,
                                        visibleBatch: 100,
                                        columns: [
                                            {id: "reqR_itemName", name:"reqR_itemNameA", header: "Item Disc.", sort: "string", adjust: true, editor: "text"},
                                            {id: "reqR_partNumber", name:"reqR_partNumberA", header: "Part No.", sort: "string", adjust: true, editor: "text"},
                                            {id: "reqR_unitQty", name:"reqR_unitQtyA", header: "Unit Qty", sort: "string", adjust: true, editor: "text", batch: 100},
                                            {id: "reqR_qty", name:"reqR_qtyA", header: "Qty", sort: "string", adjust: true, editor: "text", batch: 100},
                                            {id: "reqR_costUnit", name:"reqR_costUnitA", header: "Unit Cost", sort: "string", adjust: true, editor: "text", batch: 100},
                                            {id: "reqR_cost", name:"reqR_costA", header: "Cost", sort: "string", adjust: true, editor: "text", batch: 100},
                                            {id: "reqR_orderType", name:"reqR_orderTypeA", header: "Order Type", sort: "string", adjust: true, editor: "text", batch: 100},
                                            {id: "reqR_reason", name:"reqR_reasonA", header: "Reasons", sort: "string", adjust: true, editor: "text", batch: 100},
                                            {id: "reqR_UUID", header: "UUID", sort: "string", adjust: true, batch: 101},
                                            {id:"", template:"<button class='des_BasicIconButton des_BasicIconButton1' onclick='saveEditedReqRow()'><i class='fas fa-save'></i></button>", css:"padding_less", width:70 },
                                            {id:"", template:"<button class='des_BasicIconButton des_BasicIconButton2' onclick='deleteReqRow()'><i class='fas fa-trash-alt'></i></button>", css:"padding_less", width:70 }
                                        ],
                                        editable:true,
                                        editaction:"custom",

                                        on:{
                                            "onItemClick":function(id){
                                                this.editRow(id);
                                                this.focusEditor(id);
                                            }
                                        },

                                        // Need to load a blank record set //
                                        //url: "/labs2/php/api_methods/SELECTz.php?tableName=requisitionRows&columnNames=reqR_UUID,reqR_reqUUID,reqR_itemName,reqR_partNumber,reqR_unitQty,reqR_qty,reqR_costUnit,reqR_cost,reqR_orderType,reqR_reason,reqR_eta,reqR_status&selectColumn=reqR_reqUUID&selectData=NULL&dataName=data&select=1"
                                        data: ztheReqRowData
                                    }
                                        ]}
                                    ]
                            }
                        },
                        {view: "resizer"},
                        {
                            view: "accordionitem",
                            header: "Authorizations",
                            collapsed: true,
                            headerHeight: 50,
                            id: "authorizr",
                            body: {
                                rows: [
                                    {
                                        cols: [{
                                            view: "label",
                                            label: "Manager:",
                                            width: "150",
                                            css: {"font-weight": "bold"}
                                        }, {view: "label", value: "req_manager", id: "req_managerA"}, {
                                            view: "button",
                                            id: "reqManagerApproval",
                                            width: "50",
                                            type: "icon",
                                            icon: "far fa-check",
                                            tooltip: "Manager Approval",
                                            hidden: true
                                        }]
                                    }, // button for Manager approval
                                    {
                                        cols: [{
                                            view: "label",
                                            label: "MGR Date:",
                                            width: "150",
                                            css: {"font-weight": "bold"}
                                        }, {view: "label", value: "req_managerDate", id: "req_managerDateA"}]
                                    },
                                    {
                                        cols: [{
                                            view: "label",
                                            label: "Authorization:",
                                            width: "150",
                                            css: {"font-weight": "bold"}
                                        }, {
                                            view: "label",
                                            value: "req_authorization",
                                            id: "req_authorizationA"
                                        }, {
                                            view: "button",
                                            id: "reqAuthorizedApproval",
                                            width: "50",
                                            type: "icon",
                                            icon: "fas fa-check-double",
                                            tooltip: "Authorized Approval",
                                            hidden: true
                                        }]
                                    }, // button for Authorized approval
                                    {
                                        cols: [{
                                            view: "label",
                                            label: "AUTH Date:",
                                            width: "150",
                                            css: {"font-weight": "bold"}
                                        }, {
                                            view: "label",
                                            value: "req_authorizationDate",
                                            id: "req_authorizationDateA"
                                        },
                                            {
                                                view: "button",
                                                id: "reqManagerDelete",
                                                width: "50",
                                                type: "icon",
                                                icon: "far fa-trash",
                                                tooltip: "Manager Delete",
                                                hidden: true
                                            }]
                                    }
                                ]
                            }
                        },
                        {view: "resizer"},
                        {
                            view: "accordionitem",
                            header: "Status",
                            collapsed: true,
                            headerHeight: 50,
                            id: "statusActive",
                            body: {
                                rows: [
                                    {
                                        cols: [{
                                            view: "label",
                                            label: "Status:",
                                            width: "150",
                                            css: {"font-weight": "bold"}
                                        }, {
                                            view: "label",
                                            width: "15",
                                            value: "req_status",
                                            id: "req_statusA",
                                            hidden: true
                                        }, {
                                            view: "icon",
                                            id: "req_statusIcon",
                                            width: "50",
                                            type: "icon",
                                            icon: "far fa-thumbs-up",
                                            tooltip: "Status: OK",
                                            align: "left",
                                            css: {"background": "#00ff00"},
                                            hidden: true
                                        }, {
                                            view: "icon",
                                            id: "req_statusIconWarning",
                                            width: "50",
                                            type: "icon",
                                            icon: "far fa-exclamation-triangle",
                                            tooltip: "Status: Not Approved",
                                            align: "left",
                                            css: {"background": "#ffa500"},
                                            hidden: true
                                        }, {
                                            view: "icon",
                                            id: "req_statusIconDone",
                                            width: "50",
                                            type: "icon",
                                            icon: "far fa-award",
                                            tooltip: "Status: DONE",
                                            align: "left",
                                            css: {"background": "#0099ff"},
                                            hidden: true
                                        }, {
                                            view: "icon",
                                            id: "req_statusIconManager",
                                            type: "icon",
                                            icon: "far fa-check",
                                            tooltop: "Manager Approved",
                                            align: "left",
                                            css: {"background": "#00ff00"},
                                            hidden: true
                                        }, {}, {
                                            view: "button",
                                            id: "reqMakePast",
                                            width: "50",
                                            type: "icon",
                                            align: "right",
                                            icon: "fas fa-lock-open",
                                            tooltip: "Change Status to Completed"
                                        }]
                                    }, // button for active req to be past
                                    {
                                        cols: [{
                                            view: "label",
                                            label: "UUID:",
                                            width: "150",
                                            css: {"font-weight": "bold"},
                                            hidden: true
                                        }, {view: "label", value: "req_UUID", id: "req_UUIDA", hidden: true}]
                                    }
                                ]
                            }
                        }


                    ]
                }

            ]
        }
    ]
};


const pastPanelView = {
    id: "pastReq",
    height: "700",
    cols: [
        {
            rows: [
                {
                    height: 35,
                    view: "toolbar",
                    elements: [
                        {
                            view: "text",
                            id: "past_list_input",
                            label: "Filter list by employee name",
                            css: "fltr",
                            labelWidth: 200
                        },
                        {
                            view: "select", label: "Show", value: 1, labelWidth: 65, width: 150, options: [
                                {id: 100, value: "Main"},
                                {id: 200, value: "All"},
                                {id: 300, value: "Debug"}
                            ],
                            on: {
                                onChange: function (changePastView) {
                                    showBatch(changePastView);
                                }
                            }
                        }, //copied element from Webix website
                        {view: "button", id: "refreshPanelButtonPast", width: "50", type: "icon", icon: "wxi-sync"}
                    ]
                },
                {
                    view: "datatable",
                    id: "pastReqs",
                    visibleBatch: 1,
                    columns: [
                        {id: "req_dateSubmit", header: "Date Submitted", sort: "date", adjust: "header"},
                        {id: "req_reqID", header: "Requisition", sort: "string", adjust: "data"},
                        {id: "req_reqName", header: "Requester", sort: "string", adjust: true},
                        {id: "req_vendor", header: "Vendor", sort: "string", adjust: true, batch: 100},
                        {id: "req_UUID", header: "UUID", sort: "string", adjust: "data", batch: 300},
                        {id: "req_dept", header: "Dept", sort: "string", adjust: true, batch: 200},
                        {id: "req_dateNeed", header: "Date Needed", sort: "date", adjust: true, batch: 200},
                        {id: "req_ordered", header: "Order Date", sort: "date", adjust: true, batch: 200},
                        {id: "req_orderNum", header: "Order #", sort: "string", adjust: true, batch: 200},
                        {id: "req_manager", header: "Manager", sort: "string", adjust: true, batch: 200},
                        {id: "req_authorization", header: "Authorization", sort: "string", adjust: true, batch: 200},
                        {id: "req_managerDate", header: "MGR Date", sort: "date", adjust: true, batch: 200},
                        {id: "req_authorizationDate", header: "AUTH Date", sort: "date", adjust: true, batch: 200},
                        {id: "req_status", header: "Status", sort: "int", adjust: "header", batch: 300}
                    ],
                    select: true,
                    //url: "/labs2/php/api_methods/SELECTz.php?tableName=requisitions&columnNames=req_UUID,req_reqID,req_reqName,req_dept,req_dateSubmit,req_dateNeed,req_ordered,req_vendor,req_orderNum,req_manager,req_authorization,req_managerDate,req_authorizationDate,req_status&selectColumn=req_status&selectData=0&dataName=data&select=1"
                    data: ztheDataPast
                }
            ]
        },
        {
            view: "scrollview", width: "600", scroll: "x",
            body: {
                rows: [
                    {
                        view: "accordion",
                        id: "thePastReqsAccordion",
                        width: "600",
                        multi: "mixed", rows: [
                            {view: "resizer"},
                            {
                                view: "accordionitem",
                                header: "Order Details",
                                collapsed: false,
                                headerHeight: 50,
                                body: {
                                    rows: [
                                        {
                                            cols: [{
                                                view: "label",
                                                label: "Req Name:",
                                                width: "150",
                                                css: {"font-weight": "bold"}
                                            }, {view: "label", value: "req_reID", id: "req_reqIDP"}]
                                        },
                                        {
                                            cols: [{
                                                view: "label",
                                                label: "Emp Name:",
                                                width: "150",
                                                css: {"font-weight": "bold"}
                                            }, {view: "label", value: "req_reqName", id: "req_reqNameP"}]
                                        },
                                        {
                                            cols: [{
                                                view: "label",
                                                label: "Dept:",
                                                width: "150",
                                                css: {"font-weight": "bold"}
                                            }, {view: "label", value: "req_dept", id: "req_deptP"}]
                                        },
                                        {
                                            cols: [{
                                                view: "label",
                                                label: "Date Submitted:",
                                                width: "150",
                                                css: {"font-weight": "bold"}
                                            }, {view: "label", value: "req_dateSubmit", id: "req_dateSubmitP"}]
                                        },
                                        {
                                            cols: [{
                                                view: "label",
                                                label: "Date Needed:",
                                                width: "150",
                                                css: {"font-weight": "bold"}
                                            }, {view: "label", value: "req_dateNeed", id: "req_dateNeedP"}]
                                        },
                                        {
                                            cols: [{
                                                view: "label",
                                                label: "Vendor:",
                                                width: "150",
                                                css: {"font-weight": "bold"}
                                            }, {view: "label", value: "req_vendor", id: "req_vendorP"}]
                                        },
                                        {
                                            cols: [{
                                                view: "label",
                                                label: "Order #:",
                                                width: "150",
                                                css: {"font-weight": "bold"}
                                            }, {view: "label", value: "req_orderNum", id: "req_orderNumP"}]
                                        },
                                        {
                                            cols: [{
                                                view: "label",
                                                label: "Date Ordered:",
                                                width: "150",
                                                css: {"font-weight": "bold"}
                                            }, {view: "label", value: "req_ordered", id: "req_orderedP"}]
                                        }
                                    ]
                                }
                            },
                            {view: "resizer"},
                            {
                                view: "accordionitem",
                                header: "Order Line Items",
                                collapsed: true,
                                headerHeight: 50,
                                body: {
                                    rows: [
                                        {
                                            view: "datatable",
                                            id: "orderLineItemsPast",
                                            //height:"200",
                                            select: true,
                                            //scroll: true,
                                            columns: [
                                                {
                                                    id: "reqR_itemName",
                                                    header: "Item Disc.",
                                                    sort: "string",
                                                    adjust: true
                                                },
                                                {
                                                    id: "reqR_partNumber",
                                                    header: "Part No.",
                                                    sort: "string",
                                                    adjust: true
                                                },
                                                {id: "reqR_unitQty", header: "Unit Qty", sort: "string", adjust: true},
                                                {id: "reqR_qty", header: "Qty", sort: "string", adjust: true},
                                                {
                                                    id: "reqR_costUnit",
                                                    header: "Unit Cost",
                                                    sort: "string",
                                                    adjust: true
                                                },
                                                {id: "reqR_cost", header: "Cost", sort: "string", adjust: true},
                                                {
                                                    id: "reqR_orderType",
                                                    header: "Order Type",
                                                    sort: "string",
                                                    adjust: true
                                                },
                                                {id: "reqR_reason", header: "Reason", sort: "string", adjust: true}
                                            ],
                                            //url: "/labs2/php/api_methods/SELECTz.php?tableName=requisitionRows&columnNames=reqR_UUID,reqR_reqUUID,reqR_itemName,reqR_partNumber,reqR_unitQty,reqR_qty,reqR_costUnit,reqR_cost,reqR_orderType,reqR_reason,reqR_eta,reqR_status&selectColumn=reqR_reqUUID&selectData=NULL&dataName=data&select=1"
                                            data: ztheReqRowData
                                        }
                                    ]
                                }
                            },
                            {view: "resizer"},
                            {
                                view: "accordionitem",
                                header: "Authorizations",
                                collapsed: true,
                                headerHeight: 50,
                                id: "authorizrP",
                                body: {
                                    rows: [
                                        {
                                            cols: [{
                                                view: "label",
                                                label: "Manager:",
                                                width: "150",
                                                css: {"font-weight": "bold"}
                                            }, {view: "label", value: "req_manager", id: "req_managerP"}]
                                        },
                                        {
                                            cols: [{
                                                view: "label",
                                                label: "MGR Date:",
                                                width: "150",
                                                css: {"font-weight": "bold"}
                                            }, {view: "label", value: "req_managerDate", id: "req_managerDateP"}]
                                        },
                                        {
                                            cols: [{
                                                view: "label",
                                                label: "Authorization:",
                                                width: "150",
                                                css: {"font-weight": "bold"}
                                            }, {view: "label", value: "req_authorization", id: "req_authorizationP"}]
                                        },
                                        {
                                            cols: [{
                                                view: "label",
                                                label: "AUTH Date:",
                                                width: "150",
                                                css: {"font-weight": "bold"}
                                            }, {
                                                view: "label",
                                                value: "req_authorizationDate",
                                                id: "req_authorizationDateP"
                                            },
                                                {
                                                    view: "button",
                                                    id: "reqPastManagerDelete",
                                                    width: "50",
                                                    type: "icon",
                                                    icon: "far fa-trash",
                                                    tooltip: "Manager Delete",
                                                    hidden: true
                                                }]
                                        }
                                    ]
                                }
                            },
                            {view: "resizer"},
                            {
                                view: "accordionitem",
                                header: "Status",
                                collapsed: true,
                                headerHeight: 50,
                                id: "statusP",
                                body: {
                                    rows: [
                                        {
                                            cols: [{
                                                view: "label",
                                                label: "Status:",
                                                width: "150",
                                                css: {"font-weight": "bold"}
                                            }, {
                                                view: "icon",
                                                id: "req_statusIconDoneP",
                                                width: "50",
                                                type: "icon",
                                                icon: "far fa-award",
                                                tooltip: "Status: DONE",
                                                align: "left",
                                                css: {"background": "DodgerBlue"},
                                                hidden: true
                                            }, {
                                                view: "label",
                                                value: "req_status",
                                                id: "req_statusP",
                                                hidden: true
                                            }, {
                                                view: "icon",
                                                id: "req_statusIconP",
                                                width: "50",
                                                type: "icon",
                                                icon: "far fa-thumbs-up",
                                                tooltip: "Status: OK",
                                                align: "left",
                                                css: {"background": "#00ff00"},
                                                hidden: true
                                            }, {
                                                view: "icon",
                                                id: "req_statusIconWarningP",
                                                width: "50",
                                                type: "icon",
                                                icon: "far fa-exclamation-triangle",
                                                tooltip: "Status: Not Approved",
                                                align: "left",
                                                css: {"background": "#ffa500"},
                                                hidden: true
                                            },
                                                {
                                                    view: "icon",
                                                    id: "req_statusIconManagerP",
                                                    type: "icon",
                                                    icon: "far fa-check",
                                                    tooltop: "Manager Approved",
                                                    align: "left",
                                                    css: {"background": "#00ff00"},
                                                    hidden: true
                                                }]
                                        },
                                        {
                                            cols: [{template: ""}, {
                                                view: "button",
                                                id: "reqMakeActive",
                                                width: "50",
                                                type: "icon",
                                                icon: "fas fa-lock"
                                            }]
                                        }, // button for making the req active again
                                        {
                                            cols: [{
                                                view: "label",
                                                label: "UUID:",
                                                width: "150",
                                                css: {"font-weight": "bold"},
                                                hidden: true
                                            }, {view: "label", value: "req_UUID", id: "req_UUIDP", hidden: true}]
                                        }
                                    ]
                                }
                            }


                        ]
                    }

                ]
            }
        }
    ]
};

const createPanelView = {
    id: "createReq", width: 1375,
    ///////////////
    rows: [
        {view: "text", width: "400", id: "req_reqID", label: "Req Name", labelWidth: 150},
        {
            view: "combo",
            width: "400",
            id: "req_name",
            label: "Requester's Name",
            labelWidth: 150,
            //suggest: ztheUsersCreate
            suggest:"/labs2/php/api_methods/SELECTz.php?tableName=users&columnNames=users_displayName%20AS%20value&dataName=data&select=5"
        },
        {
            view: "combo",
            width: "400",
            id: "req_dept",
            label: "Department",
            labelWidth: 150,
            //suggest: ztheDeptmentsCreate
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
        {view: "text", width: "100", id: "invoice_UUID", hidden: true, value: reqUUID},
        {view: "button", id: "req_save", label: "Save", align: 'left', width: "75", click: "saveTheInvoice"},
        {view: "button", id: "req_update", label: "Update", align: 'left', width: "75", click: "updateTheInvoice", hidden: true},
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
                    {id: "reqR_reason", header: "Reason", sort: "string", adjust: true} ,
                    {id: "reqR_UUID", header:"", hidden:true}
                    //{id: "reqR_deleteButton", header:"Delete", checkValue:'on', uncheckValue:'off', template:"{common.checkbox()}", width:65}
                ],
            //data: '[{"reqR_UUID":"1234567890","reqR_reqUUID":"068159d5-6b67-4e2a-ac74-31a0f284666f","reqR_itemName":"This is a Test","reqR_partNumber":"938ryqh9wuodqnoq 9qeh","reqR_unitQty":"2","reqR_qty":"1","reqR_costUnit":"999.99","reqR_cost":"9999.99","reqR_orderType":"","reqR_reason":"Because I really want it","reqR_eta":null,"reqR_status":"1"}]'
            url: "/labs2/php/api_methods/SELECTz.php?tableName=requisitionRows&columnNames=reqR_UUID,reqR_reqUUID,reqR_itemName,reqR_partNumber,reqR_unitQty,reqR_qty,reqR_costUnit,reqR_cost,reqR_orderType,reqR_reason,reqR_eta,reqR_status&selectColumn=reqR_reqUUID&selectData=" + reqUUID + "&dataName=data&select=1"
        },
        {
            cols: [
                {view: "text", placeholder: "Item Disc.", width: 150, id: "reqR_itemNameX"},
                {view: "text", placeholder: "Part#", width: 150, id: "reqR_partNumberX"},
                {
                    view: "text",
                    placeholder: "1",
                    width: 40,
                    id: "reqR_unitQtyX",
                    validate: webix.rules.isNumber,
                    required: true
                },
                {
                    view: "text",
                    placeholder: "Qty",
                    width: 60,
                    id: "reqR_qtyX",
                    validate: webix.rules.isNumber,
                    required: true
                },
                {view: "text", placeholder: "Unit Cost", width: 100, id: "reqR_costUnitX"},
                {view: "text", placeholder: "Cost", width: 100, id: "reqR_costX"},
                {
                    view: "select", placeholder: "Order Type", width: 150, id: "reqR_orderTypeX", value: 0, options:
                        [{"id": "Supply", "value": "Supply"},
                            {"id": "Reagent", "value": "Reagent"},
                            {"id": "Standard", "value": "Standard"},
                            {"id": "Solvent", "value": "Solvent"},
                            {"id": "", "value": ""}
                        ]
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
        },
        { view:"button", value:"Remove selected", click:removeRowData}
    ]

};

const data = {cells: [createPanelView, activePanelView, pastPanelView]};

webix.ui({

    view: "window",
    id: "InventoryIndex",
    width: 1325,
    autoheight: true,
    left: 1,
    move: true,

    head: "Requisitions",
    body: {
        rows: [tabbar, data]
    }

}).show();


//////////////////////////////////////////////////////////// Page Controller Logic ////////////////////////////////////////////////////////////

////// Function captures the form data and creates a URL to be sent to the insert.php api. ////////////////////////////////////////////////////////////////
function saveTheInvoice() {
    let reqUUID = $$("invoice_UUID").getValue();
    let reqreqID = $$("req_reqID").getValue();
    let reqName = $$("req_name").getText();
    let reqDept = $$("req_dept").getText();
    let reqDateSubmit = $$("req_subm").getValue();       //this work only for the muultiselect element. I did not find it to work with the multicombo
    let reqNeeded = $$("req_need").getValue();
    let reqOrder = "1970-01-01 00:00";
    let reqVendor = $$("req_vend").getValue();  //getText gets the actual date formatted field contents
    let reqOrderNum = $$("req_ordr").getValue();
    let reqManager = "NULL";
    let reqAuthor = "NULL";
    let reqManagerDate = "1970-01-01 00:00";
    let reqAuthorDate = "1970-01-01 00:00";

    let reqStatus = 3;

    //var creationDat = webix.Date.dateToStr("%Y-%m-%d");     //these next two line create a date format to
    //var creationDate = creationDat(new Date());             //save in the db as to when the record was created.


////////////////// Form Submit to DB //////////////////
    let theSubmitDataRAW = '{"success":true,"data":[{"req_UUID":"' + reqUUID + '", "req_reqID":"' + reqreqID + '", "req_reqName":"' + reqName + '", "req_dept":"' + reqDept + '", "req_dateSubmit":"' + reqDateSubmit + '", "req_dateNeed":"' + reqNeeded + '", "req_ordered":"' + reqOrder + '", "req_vendor":"' + reqVendor + '", "req_orderNum":"' + reqOrderNum + '", "req_manager":"' + reqManager + '", "req_authorization":"' + reqAuthor + '", "req_managerDate":"' + reqManagerDate + '", "req_authorizationDate":"' + reqAuthorDate + '", "req_status":"' + reqStatus + '"}]}';
    //var theSubmitDataRAW = '{"success":true,"data":[{"req_UUID":"' + reqUUID + '", "req_reqID":"' + reqreqID + '"}]}';

    webix.ajax("/labs2/php/api_methods/INSERT.php?tableName=requisitions&JSONdata=" + theSubmitDataRAW);
    console.log("JSON DATA being sent to the server " + theSubmitDataRAW); //just a debug code
    $$("req_update").show();
    $$("req_save").hide();
    webix.message({text: "Saved"}); //Optional UI to display that something happened
}
////// Function captures the form data and creates a URL to be sent to the insert.php api. ////////////////////////////////////////////////////////////////
function updateTheInvoice() {
    let reqUUID = $$("invoice_UUID").getValue();
    let reqreqID = $$("req_reqID").getValue();
    let reqName = $$("req_name").getText();
    let reqDept = $$("req_dept").getText();
    let reqDateSubmit = $$("req_subm").getValue();       //this work only for the muultiselect element. I did not find it to work with the multicombo
    let reqNeeded = $$("req_need").getValue();
    let reqOrder = "1970-01-01 00:00";
    let reqVendor = $$("req_vend").getValue();  //getText gets the actual date formatted field contents
    let reqOrderNum = $$("req_ordr").getValue();

    //var creationDat = webix.Date.dateToStr("%Y-%m-%d");     //these next two line create a date format to
    //var creationDate = creationDat(new Date());             //save in the db as to when the record was created.


////////////////// Form Submit to DB //////////////////
    let theSubmitDataRAW = '{"req_reqID":"' + reqreqID + '", "req_reqName":"' + reqName + '", "req_dept":"' + reqDept + '", "req_dateSubmit":"' + reqDateSubmit + '", "req_dateNeed":"' + reqNeeded + '", "req_ordered":"' + reqOrder + '", "req_vendor":"' + reqVendor + '", "req_orderNum":"' + reqOrderNum +'"}';

    webix.ajax("/labs2/php/api_methods/UPDATEz.php?tableName=requisitions&JSONdata=" + theSubmitDataRAW + "&theWhereColumn=req_UUID&theUUID=" + reqUUID);
    console.log("JSON DATA being sent to the server for update " + theSubmitDataRAW); //just a debug code
    webix.message({text: "Saved"}); //Optional UI to display that something happened
}

////// Logic for the filter on the test descriptions list /////////////////////
$$("list_input").attachEvent("onTimedKeyPress", function () {
    let value = this.getValue().toLowerCase();
    $$("activeReqs").filter(function (obj) {
        return obj.req_reqName.toLowerCase().indexOf(value) === 0;
    })
});


////// Logic for the filter on the past descriptions list /////////////////////
$$("past_list_input").attachEvent("onTimedKeyPress", function () {
    let value = this.getValue().toLowerCase();
    $$("pastReqs").filter(function (obj) {
        return obj.req_reqName.toLowerCase().indexOf(value) === 0;
    })
});
///////////////////////Test /////////////////////////////
const form = $$('myform');
const list = $$('activeReqs');

form.bind(list);


////////////////// Click on Active Item //////////////////

$$('activeReqs').attachEvent("onAfterSelect", function (id) {
    let value = this.getItem(id).req_UUID;
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

    let showLineItems = "/labs2/php/api_methods/SELECTz.php?tableName=requisitionRows&columnNames=reqR_UUID,reqR_reqUUID,reqR_itemName,reqR_partNumber,reqR_unitQty,reqR_qty,reqR_costUnit,reqR_cost,reqR_orderType,reqR_reason,reqR_eta,reqR_status&selectColumn=reqR_reqUUID&selectData=" + theLineItemUUID + "&dataName=data&select=1";
    $$("orderLineItems").clearAll();
    $$("orderLineItems").load(showLineItems);


});

////////////////// Change the Active Data Table Columns //////////////////

function showActiveBatch(changeActiveView) {
    $$("activeReqs").showColumnBatch(changeActiveView);
}
function showActiveBatchRows(changeActiveView) {
    $$("orderLineItems").showColumnBatch(changeActiveView);
}


////////////////// Click on Past Item //////////////////

$$('pastReqs').attachEvent("onAfterSelect", function (id) {

    let value = this.getItem(id).req_UUID;
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

    let showLineItemsPast = "/labs2/php/api_methods/SELECTz.php?tableName=requisitionRows&columnNames=reqR_UUID,reqR_reqUUID,reqR_itemName,reqR_partNumber,reqR_unitQty,reqR_qty,reqR_costUnit,reqR_cost,reqR_orderType,reqR_reason,reqR_eta,reqR_status&selectColumn=reqR_reqUUID&selectData=" + theLineItemUUIDPast + "&dataName=data&select=1";
    $$("orderLineItemsPast").clearAll();
    $$("orderLineItemsPast").load(showLineItemsPast);

});

////////////////// Change the Past Data Table Columns //////////////////

function showBatch(changePastView) {
    $$("pastReqs").showColumnBatch(changePastView);
}



////// Function captures the Line Item form data and creates a URL to be sent to the insert.php api. ////////////////////////////////////////////////////////////////
$$("saveTheInvoiceLineButton").attachEvent("onItemClick", function () {
    //saveTheInvoiceLine() {

    let reqRUUID = 'xxxxxxxx-xxxx-6xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        let r = Math.random() * 16 | 0, v = c === 'x' ? r : r & 0x3 | 0x8;
        return v.toString(16);
    });

    let bb = reqUUID;
    let cc = $$("reqR_itemNameX").getValue();
    let dd = $$("reqR_partNumberX").getValue();
    let ee = $$("reqR_unitQtyX").getValue();
    let ff = $$("reqR_qtyX").getValue();
    let gg = $$("reqR_costUnitX").getValue();
    let hh = $$("reqR_costX").getValue();
    let ii = $$("reqR_orderTypeX").getValue();
    let jj = $$("reqR_reasonX").getValue();
    let kk = "NULL";
    let ll = 1;

    ////////////////// Form Submit to DB //////////////////
    let theSubmitDataRAW2 = '{"success":true,"data":[{"reqR_UUID":"' + reqRUUID + '", "reqR_reqUUID":"' + bb + '", "reqR_itemName":"' + cc + '", "reqR_partNumber":"' + dd + '", "reqR_unitQty":"' + ee + '", "reqR_qty":"' + ff + '", "reqR_costUnit":"' + gg + '", "reqR_cost":"' + hh + '", "reqR_orderType":"' + ii + '", "reqR_reason":"' + jj + '", "reqR_eta":"' + kk + '", "reqR_status":"' + ll + '"}]}';

    webix.ajax("/labs2/php/api_methods/INSERT.php?tableName=requisitionRows&JSONdata=" + theSubmitDataRAW2);
    console.log("JSON DATA being sent to the server " + theSubmitDataRAW2); //just a debug code
    webix.message({text: "Saved"}); //Optional UI to display that something happened
    window.setTimeout(refreshTheInvoiceLineButton, 1000);
    webix.message({text: "Reloading..."});

});

function refreshTheInvoiceLineButton() {
    let loadLineItems = "/labs2/php/api_methods/SELECTz.php?tableName=requisitionRows&columnNames=reqR_UUID,reqR_reqUUID,reqR_itemName,reqR_partNumber,reqR_unitQty,reqR_qty,reqR_costUnit,reqR_cost,reqR_orderType,reqR_reason,reqR_eta,reqR_status&selectColumn=reqR_reqUUID&selectData=" + reqUUID + "&dataName=data&select=1";
    $$("lineItemList").clearAll();
    $$("lineItemList").load(loadLineItems);
    webix.message({text: "Loaded"});
}


/////////////////// Editor script for  Editing Save //////////////////
$$("reqEditSave").attachEvent("onItemClick", function () {

    let reqUUIDL = $$("req_UUIDA1").getValue();
    //let reqName = $$("req_reqNameA1").getText();
    //let reqDept = $$("req_deptA1").getText();
    let reqSubmitDate = $$("req_dateSubmitA1").getText();
    let reqDateNeed = $$("req_dateNeedA1").getText();
    let reqVendor = $$("req_vendorA1").getValue();
    let reqOrderNum = $$("req_orderNumA1").getValue();
    let reqOrderedDate = $$("req_orderedA1").getText();

    let updateReqForm = '{"req_dateSubmit":"' + reqSubmitDate + '","req_dateNeed":"' + reqDateNeed + '","req_vendor":"' + reqVendor + '","req_orderNum":"' + reqOrderNum + '","req_ordered":"' + reqOrderedDate + '"}';

//    var updateReqForm = '{"req_reqName":"' + reqName +'","req_dept":"' + reqDept +'","req_dateSubmit":"' + reqSubmitDate +'","req_dateNeed":"' + reqDateNeed +'","req_vendor":"' + reqVendor  +'","req_orderNum":"' + reqOrderNum +'","req_ordered":"' + reqOrderedDate +'"}';
    webix.ajax("/labs2/php/api_methods/UPDATEz.php?tableName=requisitions&JSONdata=" + updateReqForm + "&theWhereColumn=req_UUID&theUUID=" + reqUUIDL);
    console.log("JSON DATA being sent to the server " + updateReqForm +" and this data to the db under this id "+ reqUUID); //just a debug code
    webix.message({text: "Saved"}); //Optional UI to display that something happened
    window.setTimeout(refreshPanel, 1000);
    window.setTimeout(editModeOff, 10);
    $$("myform").refresh();
    webix.message({text: "Reloading..."});
});

/////////////////// Checkbox script for Manager Approval //////////////////
$$("reqManagerDelete").attachEvent("onItemClick", function () {


    //webix.message({text: $userId});
    webix.message({text: theLineItemUUID});
    //var theSubmitDataManager = '{"req_manager":"' + $userId + '","req_managerDate":"' + ymd + '","req_status":"2"}';
    webix.ajax("/labs2/php/api_methods/DELETE.php?tableName=requisitions&columnNames=req_UUID&id=" + theLineItemUUID);
    webix.ajax("/labs2/php/api_methods/DELETE.php?tableName=requisitionRows&columnNames=reqR_reqUUID&id=" + theLineItemUUID);
    console.log("This data is being DELETED " + theLineItemUUID ); //just a debug code
    webix.message({text: "Saved"}); //Optional UI to display that something happened
    window.setTimeout(refreshPanel, 1000);
    webix.message({text: "Reloading..."});
});

/////////////////// Checkbox script for Manager Approval //////////////////
$$("reqManagerApproval").attachEvent("onItemClick", function () {


    //webix.message({text: $userId});
    //webix.message({text: theLineItemUUID});
    let theSubmitDataManager = '{"req_manager":"' + $userId + '","req_managerDate":"' + ymd + '","req_status":"2"}';
    webix.ajax("/labs2/php/api_methods/UPDATEz.php?tableName=requisitions&JSONdata=" + theSubmitDataManager + "&theWhereColumn=req_UUID&theUUID=" + theLineItemUUID);
    console.log("JSON DATA being sent to the server " + theSubmitDataManager +" and this data to the db "); //just a debug code
    webix.message({text: "Saved"}); //Optional UI to display that something happened
    window.setTimeout(refreshPanel, 1000);
    webix.message({text: "Reloading..."});
});

/////////////////// Checkbox script for Authorized Approval //////////////////
$$("reqAuthorizedApproval").attachEvent("onItemClick", function () {

    let theSubmitDataAuthor = '{"req_authorization":"' + $userId + '","req_authorizationDate":"' + ymd + '","req_status":"1"}';
    webix.ajax("/labs2/php/api_methods/UPDATEz.php?tableName=requisitions&JSONdata=" + theSubmitDataAuthor + "&theWhereColumn=req_UUID&theUUID=" + theLineItemUUID);
    console.log("JSON DATA being sent to the server " + theSubmitDataAuthor +" and this data to the db "); //just a debug code
    window.setTimeout(refreshPanel, 1000);


    webix.message({text: "Saved"}); //Optional UI to display that something happened
});

/////////////////// Checkbox script for making past req active //////////////////
$$("reqMakeActive").attachEvent("onItemClick", function () {

    let theSubmitDataStatus1 = '{"req_authorization":"NULL","req_authorizationDate":"1970-01-01","req_status":"3"}';
    webix.ajax("/labs2/php/api_methods/UPDATEz.php?tableName=requisitions&JSONdata=" + theSubmitDataStatus1 + "&theWhereColumn=req_UUID&theUUID=" + theLineItemUUIDPast);
    window.setTimeout(refreshPanel, 1000);

    webix.message({text: "Saved"}); //Optional UI to display that something happened
});

/////////////////// Checkbox script for making active req past //////////////////
$$("reqMakePast").attachEvent("onItemClick", function () {

    let theSubmitDataStatus0 = '{"req_status":"0"}';
    webix.ajax("/labs2/php/api_methods/UPDATEz.php?tableName=requisitions&JSONdata=" + theSubmitDataStatus0 + "&theWhereColumn=req_UUID&theUUID=" + theLineItemUUID);
    console.log("/labs2/php/api_methods/UPDATEz.php?tableName=requisitions&JSONdata=" + theSubmitDataStatus0 + "&theWhereColumn=req_UUID&theUUID="+ theLineItemUUID);
    window.setTimeout(refreshPanel, 1000);

    webix.message({text: "Saved"});
});

////////////////////////////////// Logic to set ui elements for managers to be seen //////////////////////////////////
webix.ajax().get("/labs2/php/api_methods/SELECTz.php?tableName=users&columnNames=users_manager%20AS%20value&selectColumn=users_name&selectData=" + $userId + "&dataName=data&select=1", function (text) {
    let managerLevel = JSON.stringify(text);
    if (managerLevel.search("Yes") !== -1) {
        $$("reqManagerApproval").show();
        $$("reqManagerDelete").show();
        $$("reqPastManagerDelete").show();
    }

});
webix.ajax().get("/labs2/php/api_methods/SELECTz.php?tableName=users&columnNames=users_authorized%20AS%20value&selectColumn=users_name&selectData=" + $userId + "&dataName=data&select=1", function (text) {
    let authorizorLevel = JSON.stringify(text);
    if (authorizorLevel.search("Yes") !== -1) {
        $$("reqAuthorizedApproval").show();
        $$("reqManagerDelete").show();
        $$("reqPastManagerDelete").show();
    }

});

////////////// Status Icon Switcher Actives///////////////////////
$$("activeReqs").attachEvent("onItemClick", function () {
    let statusIcon = $$("req_statusA").getValue();
    // 1 is done
    if (statusIcon === "1") {
        $$("req_statusIcon").show();
        $$("req_statusIconWarning").hide();
        $$("req_statusIconDone").hide();
        $$("req_statusIconManager").hide();
        // 3 is base status
        // 2 is Manager Done
    } else if (statusIcon === "2") {
        $$("req_statusIcon").hide();
        $$("req_statusIconWarning").show();
        $$("req_statusIconDone").hide();
        $$("req_statusIconManager").show();
    } else if (statusIcon === "3") {
        $$("req_statusIcon").hide();
        $$("req_statusIconWarning").show();
        $$("req_statusIconDone").hide();
        $$("req_statusIconManager").hide();
        // 0 is past
    } else if (statusIcon === "0") {
        $$("req_statusIcon").hide();
        $$("req_statusIconWarning").hide();
        $$("req_statusIconDone").show();
        $$("req_statusIconManager").hide();
    }


});

////////////// Status Icon Switcher Past///////////////////////
$$("pastReqs").attachEvent("onItemClick", function () {
    let statusIcon = $$("req_statusP").getValue();
    if (statusIcon === "1") {
        $$("req_statusIconP").show();
        $$("req_statusIconWarningP").hide();
        $$("req_statusIconDoneP").hide();
        $$("req_statusIconManagerP").hide();
    } else if (statusIcon === "3") {
        $$("req_statusIconP").hide();
        $$("req_statusIconWarningP").show();
        $$("req_statusIconDoneP").hide();
        $$("req_statusIconManagerP").show();
    } else if (statusIcon === "2") {
        $$("req_statusIconP").hide();
        $$("req_statusIconWarningP").show();
        $$("req_statusIconDoneP").hide();
        $$("req_statusIconManagerP").hide();
    } else if (statusIcon === "0") {
        $$("req_statusIconP").hide();
        $$("req_statusIconWarningP").hide();
        $$("req_statusIconDoneP").show();
        $$("req_statusIconManagerP").hide();
    }


});

///////////////////////////// Reshfresh the datagrid list element ///////////////////
$$("refreshPanelButton").attachEvent("onItemClick", function () {
    window.setTimeout(refreshPanel, 1000);
    webix.message({text: "Reloading..."});
});
$$("refreshRowPanelButton").attachEvent("onItemClick", function () {
    window.setTimeout(refreshPanel, 1000);
    webix.message({text: "Reloading..."});
});
$$("refreshPanelButtonPast").attachEvent("onItemClick", function () {
    window.setTimeout(refreshPanel, 1000);
    webix.message({text: "Reloading..."});
});


//////////////////////////// Function that does the work to refresh the UI elements after db transactions ////////////////////////////////////
function refreshPanel() {
    let refresher = "/labs2/php/api_methods/SELECTz.php?tableName=requisitions&columnNames=req_UUID,req_reqID,req_reqName,req_dept,req_dateSubmit,req_dateNeed,req_ordered,req_vendor,req_orderNum,req_manager,req_authorization,req_managerDate,req_authorizationDate,req_status&selectColumn=req_status&selectData=0&operator=>&dataName=data&select=1";
    let refresher0 = "/labs2/php/api_methods/SELECTz.php?tableName=requisitions&columnNames=req_UUID,req_reqID,req_reqName,req_dept,req_dateSubmit,req_dateNeed,req_ordered,req_vendor,req_orderNum,req_manager,req_authorization,req_managerDate,req_authorizationDate,req_status&selectColumn=req_status&selectData=0&dataName=data&select=1";
    $$("activeReqs").clearAll();
    $$("pastReqs").clearAll();
    $$("activeReqs").load(refresher);
    $$("pastReqs").load(refresher0);
    $$("authorizr").refresh();
    $$("authorizrP").refresh();
    $$("statusActive").refresh();
    $$("orderLineItems").refresh();
}

/////////////////////////// Edit Mode On ///////////////////////////////////////
$$("reqEdit").attachEvent("onItemClick", function () {
    $$("reqEdit").hide();
    $$("reqEditOff").show();
    $$("reqEditSave").show();

    //$$("req_reqNameA").hide();
    //$$("req_deptA").hide();
    $$("req_dateSubmitA").hide();
    $$("req_dateNeedA").hide();
    $$("req_vendorA").hide();
    $$("req_orderNumA").hide();
    $$("req_orderedA").hide();

    //$$("req_reqNameA1").show();
    //$$("req_deptA1").show();
    $$("req_dateSubmitA1").show();
    $$("req_dateNeedA1").show();
    $$("req_vendorA1").show();
    $$("req_orderNumA1").show();
    $$("req_orderedA1").show();

    webix.message({text: "Editing ON"});
});

/////////////////////////// Edit Mode Off ///////////////////////////////////////
$$("reqEditOff").attachEvent("onItemClick", function () {
    window.setTimeout(editModeOff, 10);
    webix.message({text: "Editing OFF"});
});

function editModeOff() {
    $$("reqEdit").show();
    $$("reqEditOff").hide();
    $$("reqEditSave").hide();

    $$("req_reqNameA").show();
    $$("req_deptA").show();
    $$("req_dateSubmitA").show();
    $$("req_dateNeedA").show();
    $$("req_vendorA").show();
    $$("req_orderNumA").show();
    $$("req_orderedA").show();

    $$("req_reqNameA1").hide();
    $$("req_deptA1").hide();
    $$("req_dateSubmitA1").hide();
    $$("req_dateNeedA1").hide();
    $$("req_vendorA1").hide();
    $$("req_orderNumA1").hide();
    $$("req_orderedA1").hide();
}

/////////////////////////// Delete a row in the ReqRow ///////////////////////////
function deleteReqRow() {
    if(!$$("orderLineItems").getSelectedId()){
        webix.message("No item is selected!");
        return;
    }
    let lineSelector= $$("orderLineItems").getSelectedId();
    let lineSelectedText= $$("orderLineItems").getText(lineSelector,"reqR_UUID");
    console.log("Deleted the ReqRow "+ lineSelectedText);
    webix.ajax().get("/labs2/php/api_methods/DELETE.php?tableName=requisitionRows&columnNames=reqR_UUID&id="  + lineSelectedText );
    webix.message("Row Deleted");
    $$("orderLineItems").remove($$("orderLineItems").getSelectedId());
}
/////////////////////////// *******  REQ ROW SCRIPTS  ******* ///////////////////////////
//                                                                                     //
///////////////////////////     ///////////////////////////   ///////////////////////////




/////////////////////////// Add a new row ///////////////////////////
$$("addNewReqRow").attachEvent("onItemClick", function () {
    reqR_reqUUID = $$("req_UUIDA1").getValue();

    reqRowUUID = 'xxxxxxxx-xxxx-6xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        let r = Math.random() * 16 | 0, v = c === 'x' ? r : r & 0x3 | 0x8;
        return v.toString(16);
    });
    theSubmitDataRAW = '{"success":true,"data":[{"reqR_UUID":"' + reqRowUUID + '", "reqR_reqUUID":"' + reqR_reqUUID + '", "reqR_itemName":"NULL", "reqR_partNumber":"NULL", "reqR_unitQty":"0", "reqR_qty":"0", "reqR_costUnit":"0", "reqR_cost":"0", "reqR_orderType":"NULL", "reqR_reason":"NULL", "reqR_eta":"NULL", "reqR_status":"1"}]}';
    webix.ajax("/labs2/php/api_methods/INSERT.php?tableName=requisitionRows&JSONdata=" + theSubmitDataRAW);
    $$("orderLineItems").add({reqR_UUID:reqRowUUID});


    theSubmitDataManager = '{"req_authorization":"NULL","req_authorizationDate":"1970-01-01","req_status":"2"}';
    webix.ajax("/labs2/php/api_methods/UPDATEz.php?tableName=requisitions&JSONdata=" + theSubmitDataManager + "&theWhereColumn=req_UUID&theUUID=" + reqR_reqUUID);
    window.setTimeout(refreshPanel, 1000);
    console.log("The new row has an id of " + reqRowUUID +" parent id "+ reqR_reqUUID);
    webix.message("New Row Added");
});








/////////////////////////// Edit/Save a row in the ReqRow ///////////////////////////
function saveEditedReqRow() {
    if(!$$("orderLineItems").getSelectedId()){
        webix.message("No item is selected!");
        return;
    }
    let lineSelector= $$("orderLineItems").getSelectedId();
    let lineSelectedText= $$("orderLineItems").getText(lineSelector,"reqR_UUID");
    let reqR_itemNameA = $$("orderLineItems").getText(lineSelector,"reqR_itemName");
    let reqR_partNumberA = $$("orderLineItems").getText(lineSelector,"reqR_partNumber");
    let reqR_unitQtyA= $$("orderLineItems").getText(lineSelector,"reqR_unitQty");
    let reqR_qtyA= $$("orderLineItems").getText(lineSelector,"reqR_qty");
    let reqR_costUnitA= $$("orderLineItems").getText(lineSelector,"reqR_costUnit");
    let reqR_costA= $$("orderLineItems").getText(lineSelector,"reqR_cost");
    let reqR_orderTypeA= $$("orderLineItems").getText(lineSelector,"reqR_orderType");
    let reqR_reasonA= $$("orderLineItems").getText(lineSelector,"reqR_reason");

    let theSubmitDataRAW = '{"reqR_itemName":"' + reqR_itemNameA + '", "reqR_partNumber":"' + reqR_partNumberA + '", "reqR_unitQty":"' + reqR_unitQtyA + '", "reqR_qty":"' + reqR_qtyA + '", "reqR_costUnit":"' + reqR_costUnitA + '", "reqR_cost":"' + reqR_costA + '", "reqR_orderType":"' + reqR_orderTypeA + '", "reqR_reason":"' + reqR_reasonA +'"}';

    console.log("Saved the ReqRow "+ lineSelectedText);
    console.log("Here is the changed row data "+ theSubmitDataRAW);

    webix.ajax().get("/labs2/php/api_methods/UPDATEz.php?tableName=requisitionRows&JSONdata="+ theSubmitDataRAW +"&theWhereColumn=reqR_UUID&theUUID=" + lineSelectedText );
    webix.message("Saved");
}

/////////////////////////// Delete a row on the create datatable ///////////////////////////
function removeRowData(){
if(!$$("lineItemList").getSelectedId()){
    webix.message("No item is selected!");
    return;
}
let lineSelector= $$("lineItemList").getSelectedId();
let lineSelectedText= $$("lineItemList").getText(lineSelector,"reqR_UUID");
console.log("Here's what we deleted "+ lineSelectedText);
webix.ajax().get("/labs2/php/api_methods/DELETE.php?tableName=requisitionRows&columnNames=reqR_UUID&id="  + lineSelectedText );
webix.message("Data Deleted");
$$("lineItemList").remove($$("lineItemList").getSelectedId());
}
//////////////////////////////////////////////////////////// END OF Page Controller Logic  ////////////////////////////////////////////////////////////