/*
 * <dsCode> Inc. (c) 2019. This copyright is based on the Apache License 2.0. Please contact David Sutton for use of this software.
 */

const reqUUID = 'xxxxxxxx-xxxx-5xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    var r = Math.random() * 16 | 0, v = c === 'x' ? r : r & 0x3 | 0x8;
    return v.toString(16);
});


var $userId = JSON.parse(decodeURIComponent(document.cookie).substring(5))['UserName']; //Extract out the username from the cookie file
//var $userId = "<?php echo $theUserName ?>";
var d = new Date();
var y = d.getFullYear();
var m = d.getMonth();
m++;
d = d.getDate();
var ymd = y + "-" + m + "-" + d;
var theLineItemUUID = "";
var theLineItemUUIDPast = "";
var ztheData = webix.ajax().get("/labs2/php/api_methods/SELECTz.php?tableName=maintRequest&columnNames=maintreq_UUID,maintreq_reqID,maintreq_reqName,maintreq_dept,maintreq_dateSubmit,maintreq_dateNeed,maintreq_ordered,maintreq_vendor,maintreq_orderNum,maintreq_manager,maintreq_authorization,maintreq_managerDate,maintreq_authorizationDate,maintreq_status&selectColumn=maintreq_status&selectData=0&operator=>&dataName=data&select=1");
var ztheDataPast = webix.ajax().get("/labs2/php/api_methods/SELECTz.php?tableName=maintRequest&columnNames=maintreq_UUID,maintreq_reqID,maintreq_reqName,maintreq_dept,maintreq_dateSubmit,maintreq_dateNeed,maintreq_ordered,maintreq_vendor,maintreq_orderNum,maintreq_manager,maintreq_authorization,maintreq_managerDate,maintreq_authorizationDate,maintreq_status&selectColumn=maintreq_status&selectData=0&dataName=data&select=1");
var ztheUsers = webix.ajax().get("/labs2/php/api_methods/SELECTz.php?tableName=users&columnNames=users_displayName%20AS%20value&dataName=data&select=5");
var ztheDeptments = webix.ajax().get("/labs2/php/api_methods/SELECTz.php?tableName=vl_departments&columnNames=dept_name%20AS%20value&dataName=data&select=5");
var ztheReqRowData = webix.ajax().get("/labs2/php/api_methods/SELECTz.php?tableName=maintRequestRows&columnNames=maintreqR_UUID,maintreqR_reqUUID,maintreqR_itemName,maintreqR_partNumber,maintreqR_unitQty,maintreqR_qty,maintreqR_costUnit,maintreqR_cost,maintreqR_orderType,maintreqR_reason,maintreqR_eta,maintreqR_status&selectColumn=maintreqR_reqUUID&selectData=NULL&dataName=data&select=1");
webix.ajax().post("/labs2/php/api_methods/log.txt", {id: 100});


var tabbar = {
    view: "tabbar", id: 'tabbar', /*value: 'createReq',*/ multiview: true, options: [
        {value: 'Create Request', id: 'createReq'},
        {value: 'View Request', id: 'viewReq'},
        {value: 'Past Request', id: 'pastReq'}
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
                        {id: "maintreq_dateSubmit", header: "Date Submitted", sort: "date", adjust: "header"},
                        {id: "maintreq_reqID", header: "Requisition", sort: "string", adjust: "data"},
                        {id: "maintreq_reqName", header: "Requester", sort: "string", adjust: true},
                        {id: "maintreq_vendor", header: "Vendor", sort: "string", adjust: true, batch: 10},
                        {id: "maintreq_UUID", header: "UUID", sort: "string", adjust: "data", batch: 30},
                        {id: "maintreq_dept", header: "Dept", sort: "string", adjust: true, batch: 20},
                        {id: "maintreq_dateNeed", header: "Date Needed", sort: "string", adjust: true, batch: 20},
                        {id: "maintreq_ordered", header: "Order Date", sort: "string", adjust: true, batch: 20},
                        {id: "maintreq_orderNum", header: "Order #", sort: "string", adjust: true, batch: 20},
                        {id: "maintreq_manager", header: "Manager", sort: "string", adjust: true, batch: 20},
                        {
                            id: "maintreq_authorization",
                            header: "Authorization",
                            sort: "string",
                            adjust: true,
                            batch: 20
                        },
                        {id: "maintreq_managerDate", header: "MGR Date", sort: "date", adjust: true, batch: 20},
                        {id: "maintreq_authorizationDate", header: "AUTH Date", sort: "date", adjust: true, batch: 20},
                        {id: "maintreq_status", header: "Status", sort: "int", adjust: "header", batch: 30}
                    ],
                    select: true,
                    data: ztheData,
                    //url: "/labs2/php/api_methods/SELECTz.php?tableName=maintRequest&columnNames=maintreq_UUID,maintreq_reqID,maintreq_reqName,maintreq_dept,maintreq_dateSubmit,maintreq_dateNeed,maintreq_ordered,maintreq_vendor,maintreq_orderNum,maintreq_manager,maintreq_authorization,maintreq_managerDate,maintreq_authorizationDate,maintreq_status&selectColumn=maintreq_status&selectData=0&operator=>&dataName=data&select=1"
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
                                                    value: "maintreq_reID",
                                                    id: "maintreq_reqIDA"
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
                                                    value: "maintreq_reqName",
                                                    id: "maintreq_reqNameA"
                                                }, {
                                                    view: "combo",
                                                    value: "maintreq_reqName",
                                                    name: "maintreq_reqName",
                                                    id: "maintreq_reqNameA1",
                                                    borderless: true,
                                                    hidden: true,
                                                    suggest: ztheUsers //"/labs2/php/api_methods/SELECTz.php?tableName=users&columnNames=users_displayName%20AS%20value&dataName=data&select=5"
                                                }, {
                                                    view: "text",
                                                    value: "maintreq_UUID",
                                                    name: "maintreq_UUID",
                                                    id: "maintreq_UUIDA1",
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
                                                }, {view: "label", value: "maintreq_dept", id: "maintreq_deptA"}, {
                                                    view: "combo",
                                                    value: "maintreq_dept",
                                                    name: "maintreq_dept",
                                                    id: "maintreq_deptA1",
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
                                                    value: "maintreq_dateSubmit",
                                                    id: "maintreq_dateSubmitA"
                                                }, {
                                                    view: "datepicker",
                                                    value: "maintreq_dateSubmit",
                                                    name: "maintreq_dateSubmit",
                                                    id: "maintreq_dateSubmitA1",
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
                                                    value: "maintreq_dateNeed",
                                                    id: "maintreq_dateNeedA"
                                                }, {
                                                    view: "datepicker",
                                                    value: "maintreq_dateNeed",
                                                    name: "maintreq_dateNeed",
                                                    id: "maintreq_dateNeedA1",
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
                                                    value: "maintreq_vendor",
                                                    id: "maintreq_vendorA"
                                                }, {
                                                    view: "text",
                                                    value: "maintreq_vendor",
                                                    name: "maintreq_vendor",
                                                    id: "maintreq_vendorA1",
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
                                                    value: "maintreq_orderNum",
                                                    id: "maintreq_orderNumA"
                                                }, {
                                                    view: "text",
                                                    value: "maintreq_orderNum",
                                                    name: "maintreq_orderNum",
                                                    id: "maintreq_orderNumA1",
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
                                                    value: "maintreq_ordered",
                                                    id: "maintreq_orderedA"
                                                }, {
                                                    view: "datepicker",
                                                    value: "maintreq_ordered",
                                                    name: "maintreq_ordered",
                                                    id: "maintreq_orderedA1",
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
                                    {
                                        view: "toolbar", height: 35, elements: [

                                            //pulldown menu
                                            {
                                                view: "select",
                                                label: "Show",
                                                value: 10,
                                                labelWidth: 65,
                                                width: 150,
                                                options: [
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
                                            {
                                                view: "button",
                                                id: "addNewReqRow",
                                                width: 50,
                                                type: "icon",
                                                icon: "fas fa-plus-square",
                                                tooltip: "Add a new item"
                                            },
                                            {
                                                view: "button",
                                                id: "refreshRowPanelButton",
                                                width: 50,
                                                type: "icon",
                                                icon: "wxi-sync",
                                                tooltip: "Reload"
                                            },
                                        ]
                                    },
                                    {
                                        view: "form", elements: [
                                            {
                                                view: "datatable",
                                                id: "orderLineItems",
                                                select: true,
                                                visibleBatch: 100,
                                                columns: [
                                                    {
                                                        id: "maintreqR_itemName",
                                                        name: "maintreqR_itemNameA",
                                                        header: "Item Disc.",
                                                        sort: "string",
                                                        adjust: true,
                                                        editor: "text"
                                                    },
                                                    {
                                                        id: "maintreqR_partNumber",
                                                        name: "maintreqR_partNumberA",
                                                        header: "Part No.",
                                                        sort: "string",
                                                        adjust: true,
                                                        editor: "text"
                                                    },
                                                    {
                                                        id: "maintreqR_unitQty",
                                                        name: "maintreqR_unitQtyA",
                                                        header: "Unit Qty",
                                                        sort: "string",
                                                        adjust: true,
                                                        editor: "text",
                                                        batch: 100
                                                    },
                                                    {
                                                        id: "maintreqR_qty",
                                                        name: "maintreqR_qtyA",
                                                        header: "Qty",
                                                        sort: "string",
                                                        adjust: true,
                                                        editor: "text",
                                                        batch: 100
                                                    },
                                                    {
                                                        id: "maintreqR_costUnit",
                                                        name: "maintreqR_costUnitA",
                                                        header: "Unit Cost",
                                                        sort: "string",
                                                        adjust: true,
                                                        editor: "text",
                                                        batch: 100
                                                    },
                                                    {
                                                        id: "maintreqR_cost",
                                                        name: "maintreqR_costA",
                                                        header: "Cost",
                                                        sort: "string",
                                                        adjust: true,
                                                        editor: "text",
                                                        batch: 100
                                                    },
                                                    {
                                                        id: "maintreqR_orderType",
                                                        name: "maintreqR_orderTypeA",
                                                        header: "Order Type",
                                                        sort: "string",
                                                        adjust: true,
                                                        editor: "text",
                                                        batch: 100
                                                    },
                                                    {
                                                        id: "maintreqR_reason",
                                                        name: "maintreqR_reasonA",
                                                        header: "Reasons",
                                                        sort: "string",
                                                        adjust: true,
                                                        editor: "text",
                                                        batch: 100
                                                    },
                                                    {
                                                        id: "maintreqR_UUID",
                                                        header: "UUID",
                                                        sort: "string",
                                                        adjust: true,
                                                        batch: 101
                                                    },
                                                    {
                                                        id: "",
                                                        template: "<button class='des_BasicIconButton3' onclick='saveEditedReqRow()'><i class='fas fa-archive'></i></button>",
                                                        css: "padding_less",
                                                        width: 70
                                                    },
                                                    {
                                                        id: "",
                                                        template: "<button class='des_BasicIconButton2' onclick='deleteReqRow()'><i class='fas fa-trash'></i></button>",
                                                        css: "padding_less",
                                                        width: 70
                                                    }
                                                ],
                                                editable: true,
                                                editaction: "custom",

                                                on: {
                                                    "onItemClick": function (id) {
                                                        this.editRow(id);
                                                        this.focusEditor(id);
                                                    }
                                                },

                                                // Need to load a blank record set //
                                                //url: "/labs2/php/api_methods/SELECTz.php?tableName=maintRequestRows&columnNames=maintreqR_UUID,maintreqR_reqUUID,maintreqR_itemName,maintreqR_partNumber,maintreqR_unitQty,maintreqR_qty,maintreqR_costUnit,maintreqR_cost,maintreqR_orderType,maintreqR_reason,maintreqR_eta,maintreqR_status&selectColumn=maintreqR_reqUUID&selectData=NULL&dataName=data&select=1"
                                                data: ztheReqRowData
                                            }
                                        ]
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
                            id: "authorizr",
                            body: {
                                rows: [
                                    {
                                        cols: [{
                                            view: "label",
                                            label: "Manager:",
                                            width: "150",
                                            css: {"font-weight": "bold"}
                                        }, {view: "label", value: "maintreq_manager", id: "maintreq_managerA"}, {
                                            view: "button",
                                            id: "reqManagerApproval",
                                            width: "50",
                                            type: "icon",
                                            icon: "fas fa-check",
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
                                        }, {view: "label", value: "maintreq_managerDate", id: "maintreq_managerDateA"}]
                                    },
                                    {
                                        cols: [{
                                            view: "label",
                                            label: "Authorization:",
                                            width: "150",
                                            css: {"font-weight": "bold"}
                                        }, {
                                            view: "label",
                                            value: "maintreq_authorization",
                                            id: "maintreq_authorizationA"
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
                                            value: "maintreq_authorizationDate",
                                            id: "maintreq_authorizationDateA"
                                        },
                                            {
                                                view: "button",
                                                id: "reqManagerDelete",
                                                width: "50",
                                                type: "icon",
                                                icon: "fas fa-trash",
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
                                            value: "maintreq_status",
                                            id: "maintreq_statusA",
                                            hidden: true
                                        }, {
                                            view: "icon",
                                            id: "maintreq_statusIcon",
                                            width: "50",
                                            type: "icon",
                                            icon: "fas fa-check-square",
                                            tooltip: "Status: OK",
                                            align: "left",
                                            css: {"background": "#00ff00"},
                                            hidden: true
                                        }, {
                                            view: "icon",
                                            id: "maintreq_statusIconWarning",
                                            width: "50",
                                            type: "icon",
                                            icon: "fas fa-exclamation-triangle",
                                            tooltip: "Status: Not Approved",
                                            align: "left",
                                            css: {"background": "#ffa500"},
                                            hidden: true
                                        }, {
                                            view: "icon",
                                            id: "maintreq_statusIconDone",
                                            width: "50",
                                            type: "icon",
                                            icon: "fas fa-award",
                                            tooltip: "Status: DONE",
                                            align: "left",
                                            css: {"background": "#0099ff"},
                                            hidden: true
                                        }, {
                                            view: "icon",
                                            id: "maintreq_statusIconManager",
                                            type: "icon",
                                            icon: "fas fa-check-double",
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
                                            tooltip: "Change Status to Compvared"
                                        }]
                                    }, // button for active req to be past
                                    {
                                        cols: [{
                                            view: "label",
                                            label: "UUID:",
                                            width: "150",
                                            css: {"font-weight": "bold"},
                                            hidden: true
                                        }, {view: "label", value: "maintreq_UUID", id: "maintreq_UUIDA", hidden: true}]
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
                        {id: "maintreq_dateSubmit", header: "Date Submitted", sort: "date", adjust: "header"},
                        {id: "maintreq_reqID", header: "Requisition", sort: "string", adjust: "data"},
                        {id: "maintreq_reqName", header: "Requester", sort: "string", adjust: true},
                        {id: "maintreq_vendor", header: "Vendor", sort: "string", adjust: true, batch: 100},
                        {id: "maintreq_UUID", header: "UUID", sort: "string", adjust: "data", batch: 300},
                        {id: "maintreq_dept", header: "Dept", sort: "string", adjust: true, batch: 200},
                        {id: "maintreq_dateNeed", header: "Date Needed", sort: "date", adjust: true, batch: 200},
                        {id: "maintreq_ordered", header: "Order Date", sort: "date", adjust: true, batch: 200},
                        {id: "maintreq_orderNum", header: "Order #", sort: "string", adjust: true, batch: 200},
                        {id: "maintreq_manager", header: "Manager", sort: "string", adjust: true, batch: 200},
                        {
                            id: "maintreq_authorization",
                            header: "Authorization",
                            sort: "string",
                            adjust: true,
                            batch: 200
                        },
                        {id: "maintreq_managerDate", header: "MGR Date", sort: "date", adjust: true, batch: 200},
                        {id: "maintreq_authorizationDate", header: "AUTH Date", sort: "date", adjust: true, batch: 200},
                        {id: "maintreq_status", header: "Status", sort: "int", adjust: "header", batch: 300}
                    ],
                    select: true,
                    //url: "/labs2/php/api_methods/SELECTz.php?tableName=maintRequest&columnNames=maintreq_UUID,maintreq_reqID,maintreq_reqName,maintreq_dept,maintreq_dateSubmit,maintreq_dateNeed,maintreq_ordered,maintreq_vendor,maintreq_orderNum,maintreq_manager,maintreq_authorization,maintreq_managerDate,maintreq_authorizationDate,maintreq_status&selectColumn=maintreq_status&selectData=0&dataName=data&select=1"
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
                                            }, {view: "label", value: "maintreq_reID", id: "maintreq_reqIDP"}]
                                        },
                                        {
                                            cols: [{
                                                view: "label",
                                                label: "Emp Name:",
                                                width: "150",
                                                css: {"font-weight": "bold"}
                                            }, {view: "label", value: "maintreq_reqName", id: "maintreq_reqNameP"}]
                                        },
                                        {
                                            cols: [{
                                                view: "label",
                                                label: "Dept:",
                                                width: "150",
                                                css: {"font-weight": "bold"}
                                            }, {view: "label", value: "maintreq_dept", id: "maintreq_deptP"}]
                                        },
                                        {
                                            cols: [{
                                                view: "label",
                                                label: "Date Submitted:",
                                                width: "150",
                                                css: {"font-weight": "bold"}
                                            }, {
                                                view: "label",
                                                value: "maintreq_dateSubmit",
                                                id: "maintreq_dateSubmitP"
                                            }]
                                        },
                                        {
                                            cols: [{
                                                view: "label",
                                                label: "Date Needed:",
                                                width: "150",
                                                css: {"font-weight": "bold"}
                                            }, {view: "label", value: "maintreq_dateNeed", id: "maintreq_dateNeedP"}]
                                        },
                                        {
                                            cols: [{
                                                view: "label",
                                                label: "Vendor:",
                                                width: "150",
                                                css: {"font-weight": "bold"}
                                            }, {view: "label", value: "maintreq_vendor", id: "maintreq_vendorP"}]
                                        },
                                        {
                                            cols: [{
                                                view: "label",
                                                label: "Order #:",
                                                width: "150",
                                                css: {"font-weight": "bold"}
                                            }, {view: "label", value: "maintreq_orderNum", id: "maintreq_orderNumP"}]
                                        },
                                        {
                                            cols: [{
                                                view: "label",
                                                label: "Date Ordered:",
                                                width: "150",
                                                css: {"font-weight": "bold"}
                                            }, {view: "label", value: "maintreq_ordered", id: "maintreq_orderedP"}]
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
                                                    id: "maintreqR_itemName",
                                                    header: "Item Disc.",
                                                    sort: "string",
                                                    adjust: true
                                                },
                                                {
                                                    id: "maintreqR_partNumber",
                                                    header: "Part No.",
                                                    sort: "string",
                                                    adjust: true
                                                },
                                                {
                                                    id: "maintreqR_unitQty",
                                                    header: "Unit Qty",
                                                    sort: "string",
                                                    adjust: true
                                                },
                                                {id: "maintreqR_qty", header: "Qty", sort: "string", adjust: true},
                                                {
                                                    id: "maintreqR_costUnit",
                                                    header: "Unit Cost",
                                                    sort: "string",
                                                    adjust: true
                                                },
                                                {id: "maintreqR_cost", header: "Cost", sort: "string", adjust: true},
                                                {
                                                    id: "maintreqR_orderType",
                                                    header: "Order Type",
                                                    sort: "string",
                                                    adjust: true
                                                },
                                                {id: "maintreqR_reason", header: "Reason", sort: "string", adjust: true}
                                            ],
                                            //url: "/labs2/php/api_methods/SELECTz.php?tableName=maintRequestRows&columnNames=maintreqR_UUID,maintreqR_reqUUID,maintreqR_itemName,maintreqR_partNumber,maintreqR_unitQty,maintreqR_qty,maintreqR_costUnit,maintreqR_cost,maintreqR_orderType,maintreqR_reason,maintreqR_eta,maintreqR_status&selectColumn=maintreqR_reqUUID&selectData=NULL&dataName=data&select=1"
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
                                            }, {view: "label", value: "maintreq_manager", id: "maintreq_managerP"}]
                                        },
                                        {
                                            cols: [{
                                                view: "label",
                                                label: "MGR Date:",
                                                width: "150",
                                                css: {"font-weight": "bold"}
                                            }, {
                                                view: "label",
                                                value: "maintreq_managerDate",
                                                id: "maintreq_managerDateP"
                                            }]
                                        },
                                        {
                                            cols: [{
                                                view: "label",
                                                label: "Authorization:",
                                                width: "150",
                                                css: {"font-weight": "bold"}
                                            }, {
                                                view: "label",
                                                value: "maintreq_authorization",
                                                id: "maintreq_authorizationP"
                                            }]
                                        },
                                        {
                                            cols: [{
                                                view: "label",
                                                label: "AUTH Date:",
                                                width: "150",
                                                css: {"font-weight": "bold"}
                                            }, {
                                                view: "label",
                                                value: "maintreq_authorizationDate",
                                                id: "maintreq_authorizationDateP"
                                            },
                                                {
                                                    view: "button",
                                                    id: "reqPastManagerDelete",
                                                    width: "50",
                                                    type: "icon",
                                                    icon: "fas fa-trash",
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
                                                id: "maintreq_statusIconDoneP",
                                                width: "50",
                                                type: "icon",
                                                icon: "fas fa-award",
                                                tooltip: "Status: DONE",
                                                align: "left",
                                                css: {"background": "DodgerBlue"},
                                                hidden: true
                                            }, {
                                                view: "label",
                                                value: "maintreq_status",
                                                id: "maintreq_statusP",
                                                hidden: true
                                            }, {
                                                view: "icon",
                                                id: "maintreq_statusIconP",
                                                width: "50",
                                                type: "icon",
                                                icon: "fas fa-thumbs-up",
                                                tooltip: "Status: OK",
                                                align: "left",
                                                css: {"background": "#00ff00"},
                                                hidden: true
                                            }, {
                                                view: "icon",
                                                id: "maintreq_statusIconWarningP",
                                                width: "50",
                                                type: "icon",
                                                icon: "fas fa-exclamation-triangle",
                                                tooltip: "Status: Not Approved",
                                                align: "left",
                                                css: {"background": "#ffa500"},
                                                hidden: true
                                            },
                                                {
                                                    view: "icon",
                                                    id: "maintreq_statusIconManagerP",
                                                    type: "icon",
                                                    icon: "fas fa-check",
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
                                            }, {
                                                view: "label",
                                                value: "maintreq_UUID",
                                                id: "maintreq_UUIDP",
                                                hidden: true
                                            }]
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
        {view: "text", width: "400", id: "maintreq_reqID", label: "Req Name", labelWidth: 150},
        {
            view: "combo",
            width: "400",
            id: "maintreq_name",
            label: "Requester's Name",
            labelWidth: 150,
            //suggest: ztheUsersCreate
            suggest: "/labs2/php/api_methods/SELECTz.php?tableName=users&columnNames=users_displayName%20AS%20value&dataName=data&select=5"
        },
        {
            view: "combo",
            width: "400",
            id: "maintreq_dept",
            label: "Department",
            labelWidth: 150,
            //suggest: ztheDeptmentsCreate
            suggest: "/labs2/php/api_methods/SELECTz.php?tableName=vl_departments&columnNames=dept_name%20AS%20value&dataName=data&select=5"
        },
        {view: "text", width: "400", id: "maintreq_vend", label: "Vendor", labelWidth: 150},
        {view: "text", width: "400", id: "maintreq_ordr", label: "Order Number", labelWidth: 150},
        {
            view: "datepicker",
            width: "400",
            id: "maintreq_subm",
            format: "%Y-%m-%d",
            stringResult: true,
            label: "Date Submited",
            labelWidth: 150
        },
        {
            view: "datepicker",
            width: "400",
            id: "maintreq_need",
            format: "%Y-%m-%d",
            stringResult: true,
            label: "Date Needed",
            labelWidth: 150
        },
        {template: "", height: 38},
        {view: "text", width: "100", id: "invoice_UUID", hidden: true, value: reqUUID},
        {view: "button", id: "maintreq_save", label: "Save", align: 'left', width: "75", click: "saveTheInvoice"},
        {
            view: "button",
            id: "maintreq_update",
            label: "Update",
            align: 'left',
            width: "75",
            click: "updateTheInvoice",
            hidden: true
        },
        {},
        {
            view: "datatable",
            id: "lineItemList",
            autoheight: true,
            select: true,
            scrollable: true,
            editable: true,
            editaction: "custom",
            columns:
                [
                    {id: "maintreqR_itemName", header: "Item Disc.", sort: "string", adjust: true},
                    {id: "maintreqR_partNumber", header: "Part No.", sort: "string", adjust: true},
                    {id: "maintreqR_unitQty", header: "Unit Qty", sort: "string", adjust: true},
                    {id: "maintreqR_qty", header: "Qty", sort: "string", adjust: true},
                    {id: "maintreqR_costUnit", header: "Unit Cost", sort: "string", adjust: true},
                    {id: "maintreqR_cost", header: "Cost", sort: "string", adjust: true},
                    {id: "maintreqR_orderType", header: "Order Type", sort: "string", adjust: true},
                    {id: "maintreqR_reason", header: "Reason", sort: "string", adjust: true},
                    {id: "maintreqR_UUID", header: "", hidden: true},
                    {
                        id: "",
                        template: "<button class='des_BasicIconButton des_BasicIconButton1' onclick='saveEditedReqRow()'><i class='fas fa-save'></i></button>",
                        css: "padding_less",
                        width: 70
                    },
                    {
                        id: "",
                        template: "<button class='des_BasicIconButton des_BasicIconButton2' onclick='deleteReqRow()'><i class='fas fa-trash-alt'></i></button>",
                        css: "padding_less",
                        width: 70
                    }
                    //{id: "maintreqR_deleteButton", header:"Delete", checkValue:'on', uncheckValue:'off', template:"{common.checkbox()}", width:65}
                ],
            on: {
                "onItemClick": function (id) {
                    this.editRow(id);
                    this.focusEditor(id);
                }
            },
            //data: '[{"maintreqR_UUID":"1234567890","maintreqR_reqUUID":"068159d5-6b67-4e2a-ac74-31a0f284666f","maintreqR_itemName":"This is a Test","maintreqR_partNumber":"938ryqh9wuodqnoq 9qeh","maintreqR_unitQty":"2","maintreqR_qty":"1","maintreqR_costUnit":"999.99","maintreqR_cost":"9999.99","maintreqR_orderType":"","maintreqR_reason":"Because I really want it","maintreqR_eta":null,"maintreqR_status":"1"}]'
            url: "/labs2/php/api_methods/SELECTz.php?tableName=maintRequestRows&columnNames=maintreqR_UUID,maintreqR_reqUUID,maintreqR_itemName,maintreqR_partNumber,maintreqR_unitQty,maintreqR_qty,maintreqR_costUnit,maintreqR_cost,maintreqR_orderType,maintreqR_reason,maintreqR_eta,maintreqR_status&selectColumn=maintreqR_reqUUID&selectData=" + reqUUID + "&dataName=data&select=1"
        },
        {
            cols: [
                {view: "text", placeholder: "Item Disc.", width: 150, id: "maintreqR_itemNameX"},
                {view: "text", placeholder: "Part#", width: 150, id: "maintreqR_partNumberX"},
                {
                    view: "text",
                    placeholder: "1",
                    width: 40,
                    id: "maintreqR_unitQtyX",
                    validate: webix.rules.isNumber,
                    required: true
                },
                {
                    view: "text",
                    placeholder: "Qty",
                    width: 60,
                    id: "maintreqR_qtyX",
                    validate: webix.rules.isNumber,
                    required: true
                },
                {view: "text", placeholder: "Unit Cost", width: 100, id: "maintreqR_costUnitX"},
                {view: "text", placeholder: "Cost", width: 100, id: "maintreqR_costX"},
                {
                    view: "select",
                    placeholder: "Order Type",
                    width: 150,
                    id: "maintreqR_orderTypeX",
                    value: 0,
                    options:
                        [{"id": "Supply", "value": "Supply"},
                            {"id": "Reagent", "value": "Reagent"},
                            {"id": "Standard", "value": "Standard"},
                            {"id": "Solvent", "value": "Solvent"},
                            {"id": "", "value": ""}
                        ]
                },
                {view: "text", placeholder: "Reason", width: 150, id: "maintreqR_reasonX"},
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
        {view: "button", value: "Remove selected", click: removeRowData}
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

    head: {
        view: "toolbar", margin: -4, cols: [
            {view: "label", label: "Maintance Request"},
            {
                view: "icon", icon: "wxi-close", click: function () {
                    $$('InventoryIndex').close();
                }
            }
        ]
    },
    body: {
        rows: [tabbar, data]
    }

}).show();


//////////////////////////////////////////////////////////// Page Controller Logic ////////////////////////////////////////////////////////////

////// Function captures the form data and creates a URL to be sent to the insert.php api. ////////////////////////////////////////////////////////////////
function saveTheInvoice() {
    var reqUUID = $$("invoice_UUID").getValue();
    var reqreqID = $$("maintreq_reqID").getValue();
    var reqName = $$("maintreq_name").getText();
    var reqDept = $$("maintreq_dept").getText();
    var reqDateSubmit = $$("maintreq_subm").getValue();       //this work only for the muultiselect element. I did not find it to work with the multicombo
    var reqNeeded = $$("maintreq_need").getValue();
    var reqOrder = "1970-01-01 00:00";
    var reqVendor = $$("maintreq_vend").getValue();  //getText gets the actual date formatted field contents
    var reqOrderNum = $$("maintreq_ordr").getValue();
    var reqManager = "NULL";
    var reqAuthor = "NULL";
    var reqManagerDate = "1970-01-01 00:00";
    var reqAuthorDate = "1970-01-01 00:00";

    var reqStatus = 3;

    //var creationDat = webix.Date.dateToStr("%Y-%m-%d");     //these next two line create a date format to
    //var creationDate = creationDat(new Date());             //save in the db as to when the record was created.


////////////////// Form Submit to DB //////////////////
    var theSubmitDataRAW = '{"success":true,"data":[{"maintreq_UUID":"' + reqUUID + '", "maintreq_reqID":"' + reqreqID + '", "maintreq_reqName":"' + reqName + '", "maintreq_dept":"' + reqDept + '", "maintreq_dateSubmit":"' + reqDateSubmit + '", "maintreq_dateNeed":"' + reqNeeded + '", "maintreq_ordered":"' + reqOrder + '", "maintreq_vendor":"' + reqVendor + '", "maintreq_orderNum":"' + reqOrderNum + '", "maintreq_manager":"' + reqManager + '", "maintreq_authorization":"' + reqAuthor + '", "maintreq_managerDate":"' + reqManagerDate + '", "maintreq_authorizationDate":"' + reqAuthorDate + '", "maintreq_status":"' + reqStatus + '"}]}';
    //var theSubmitDataRAW = '{"success":true,"data":[{"maintreq_UUID":"' + reqUUID + '", "maintreq_reqID":"' + reqreqID + '"}]}';

    webix.ajax("/labs2/php/api_methods/INSERT.php?tableName=maintRequest&JSONdata=" + theSubmitDataRAW);
    console.log("JSON DATA being sent to the server " + theSubmitDataRAW); //just a debug code
    $$("maintreq_update").show();
    $$("maintreq_save").hide();
    webix.message({text: "Saved"}); //Optional UI to display that something happened
}

////// Function captures the form data and creates a URL to be sent to the insert.php api. ////////////////////////////////////////////////////////////////
function updateTheInvoice() {
    var reqUUID = $$("invoice_UUID").getValue();
    var reqreqID = $$("maintreq_reqID").getValue();
    var reqName = $$("maintreq_name").getText();
    var reqDept = $$("maintreq_dept").getText();
    var reqDateSubmit = $$("maintreq_subm").getValue();       //this work only for the muultiselect element. I did not find it to work with the multicombo
    var reqNeeded = $$("maintreq_need").getValue();
    var reqOrder = "1970-01-01 00:00";
    var reqVendor = $$("maintreq_vend").getValue();  //getText gets the actual date formatted field contents
    var reqOrderNum = $$("maintreq_ordr").getValue();

    //var creationDat = webix.Date.dateToStr("%Y-%m-%d");     //these next two line create a date format to
    //var creationDate = creationDat(new Date());             //save in the db as to when the record was created.


////////////////// Form Submit to DB //////////////////
    var theSubmitDataRAW = '{"maintreq_reqID":"' + reqreqID + '", "maintreq_reqName":"' + reqName + '", "maintreq_dept":"' + reqDept + '", "maintreq_dateSubmit":"' + reqDateSubmit + '", "maintreq_dateNeed":"' + reqNeeded + '", "maintreq_ordered":"' + reqOrder + '", "maintreq_vendor":"' + reqVendor + '", "maintreq_orderNum":"' + reqOrderNum + '"}';

    webix.ajax("/labs2/php/api_methods/UPDATEz.php?tableName=maintRequest&JSONdata=" + theSubmitDataRAW + "&theWhereColumn=maintreq_UUID&theUUID=" + reqUUID);
    console.log("JSON DATA being sent to the server for update " + theSubmitDataRAW); //just a debug code
    webix.message({text: "Saved"}); //Optional UI to display that something happened
}

////// Logic for the filter on the test descriptions list /////////////////////
$$("list_input").attachEvent("onTimedKeyPress", function () {
    var value = this.getValue().toLowerCase();
    $$("activeReqs").filter(function (obj) {
        return obj.maintreq_reqName.toLowerCase().indexOf(value) === 0;
    })
});


////// Logic for the filter on the past descriptions list /////////////////////
$$("past_list_input").attachEvent("onTimedKeyPress", function () {
    var value = this.getValue().toLowerCase();
    $$("pastReqs").filter(function (obj) {
        return obj.maintreq_reqName.toLowerCase().indexOf(value) === 0;
    })
});
///////////////////////Test /////////////////////////////
const form = $$('myform');
const list = $$('activeReqs');

form.bind(list);


////////////////// Click on Active Item //////////////////

$$('activeReqs').attachEvent("onAfterSelect", function (id) {
    var value = this.getItem(id).maintreq_UUID;
    $$("maintreq_UUIDA").setValue(value);
    theLineItemUUID = value;
    //console.log(theLineItemUUID);

    $$("maintreq_reqIDA").setValue(this.getItem(id).maintreq_reqID);

    $$("maintreq_reqNameA").setValue(this.getItem(id).maintreq_reqName);

    $$("maintreq_deptA").setValue(this.getItem(id).maintreq_dept);

    $$("maintreq_dateSubmitA").setValue(this.getItem(id).maintreq_dateSubmit);

    $$("maintreq_dateNeedA").setValue(this.getItem(id).maintreq_dateNeed);

    $$("maintreq_orderedA").setValue(this.getItem(id).maintreq_ordered);

    $$("maintreq_vendorA").setValue(this.getItem(id).maintreq_vendor);

    $$("maintreq_orderNumA").setValue(this.getItem(id).maintreq_orderNum);

    $$("maintreq_managerA").setValue(this.getItem(id).maintreq_manager);

    $$("maintreq_authorizationA").setValue(this.getItem(id).maintreq_authorization);

    $$("maintreq_managerDateA").setValue(this.getItem(id).maintreq_managerDate);

    $$("maintreq_authorizationDateA").setValue(this.getItem(id).maintreq_authorizationDate);

    $$("maintreq_statusA").setValue(this.getItem(id).maintreq_status);

    var showLineItems = "/labs2/php/api_methods/SELECTz.php?tableName=maintRequestRows&columnNames=maintreqR_UUID,maintreqR_reqUUID,maintreqR_itemName,maintreqR_partNumber,maintreqR_unitQty,maintreqR_qty,maintreqR_costUnit,maintreqR_cost,maintreqR_orderType,maintreqR_reason,maintreqR_eta,maintreqR_status&selectColumn=maintreqR_reqUUID&selectData=" + theLineItemUUID + "&dataName=data&select=1";
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

    var value = this.getItem(id).maintreq_UUID;
    $$("maintreq_UUIDP").setValue(value);
    theLineItemUUIDPast = value;

//    console.log(theLineItemUUIDPast);

    $$("maintreq_reqIDP").setValue(this.getItem(id).maintreq_reqID);

    $$("maintreq_reqNameP").setValue(this.getItem(id).maintreq_reqName);

    $$("maintreq_deptP").setValue(this.getItem(id).maintreq_dept);

    $$("maintreq_dateSubmitP").setValue(this.getItem(id).maintreq_dateSubmit);

    $$("maintreq_dateNeedP").setValue(this.getItem(id).maintreq_dateNeed);

    $$("maintreq_orderedP").setValue(this.getItem(id).maintreq_ordered);

    $$("maintreq_vendorP").setValue(this.getItem(id).maintreq_vendor);

    $$("maintreq_orderNumP").setValue(this.getItem(id).maintreq_orderNum);

    $$("maintreq_managerP").setValue(this.getItem(id).maintreq_manager);

    $$("maintreq_authorizationP").setValue(this.getItem(id).maintreq_authorization);

    $$("maintreq_managerDateP").setValue(this.getItem(id).maintreq_managerDate);

    $$("maintreq_authorizationDateP").setValue(this.getItem(id).maintreq_authorizationDate);

    $$("maintreq_statusP").setValue(this.getItem(id).maintreq_status);

    var showLineItemsPast = "/labs2/php/api_methods/SELECTz.php?tableName=maintRequestRows&columnNames=maintreqR_UUID,maintreqR_reqUUID,maintreqR_itemName,maintreqR_partNumber,maintreqR_unitQty,maintreqR_qty,maintreqR_costUnit,maintreqR_cost,maintreqR_orderType,maintreqR_reason,maintreqR_eta,maintreqR_status&selectColumn=maintreqR_reqUUID&selectData=" + theLineItemUUIDPast + "&dataName=data&select=1";
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

    var reqRUUID = 'xxxxxxxx-xxxx-6xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = Math.random() * 16 | 0, v = c === 'x' ? r : r & 0x3 | 0x8;
        return v.toString(16);
    });

    var bb = reqUUID;
    var cc = $$("maintreqR_itemNameX").getValue();
    var dd = $$("maintreqR_partNumberX").getValue();
    var ee = $$("maintreqR_unitQtyX").getValue();
    var ff = $$("maintreqR_qtyX").getValue();
    var gg = $$("maintreqR_costUnitX").getValue();
    var hh = $$("maintreqR_costX").getValue();
    var ii = $$("maintreqR_orderTypeX").getValue();
    var jj = $$("maintreqR_reasonX").getValue();
    var kk = "NULL";
    var ll = 1;

    ////////////////// Form Submit to DB //////////////////
    var theSubmitDataRAW2 = '{"success":true,"data":[{"maintreqR_UUID":"' + reqRUUID + '", "maintreqR_reqUUID":"' + bb + '", "maintreqR_itemName":"' + cc + '", "maintreqR_partNumber":"' + dd + '", "maintreqR_unitQty":"' + ee + '", "maintreqR_qty":"' + ff + '", "maintreqR_costUnit":"' + gg + '", "maintreqR_cost":"' + hh + '", "maintreqR_orderType":"' + ii + '", "maintreqR_reason":"' + jj + '", "maintreqR_eta":"' + kk + '", "maintreqR_status":"' + ll + '"}]}';

    webix.ajax("/labs2/php/api_methods/INSERT.php?tableName=maintRequestRows&JSONdata=" + theSubmitDataRAW2);
    console.log("JSON DATA being sent to the server " + theSubmitDataRAW2); //just a debug code
    webix.message({text: "Saved"}); //Optional UI to display that something happened
    window.setTimeout(refreshTheInvoiceLineButton, 1000);
    webix.message({text: "Reloading..."});

});

function refreshTheInvoiceLineButton() {
    var loadLineItems = "/labs2/php/api_methods/SELECTz.php?tableName=maintRequestRows&columnNames=maintreqR_UUID,maintreqR_reqUUID,maintreqR_itemName,maintreqR_partNumber,maintreqR_unitQty,maintreqR_qty,maintreqR_costUnit,maintreqR_cost,maintreqR_orderType,maintreqR_reason,maintreqR_eta,maintreqR_status&selectColumn=maintreqR_reqUUID&selectData=" + reqUUID + "&dataName=data&select=1";
    $$("lineItemList").clearAll();
    $$("lineItemList").load(loadLineItems);
    webix.message({text: "Loaded"});
}


/////////////////// Editor script for  Editing Save //////////////////
$$("reqEditSave").attachEvent("onItemClick", function () {

    var reqUUIDL = $$("maintreq_UUIDA1").getValue();
    //var reqName = $$("maintreq_reqNameA1").getText();
    //var reqDept = $$("maintreq_deptA1").getText();
    var reqSubmitDate = $$("maintreq_dateSubmitA1").getText();
    var reqDateNeed = $$("maintreq_dateNeedA1").getText();
    var reqVendor = $$("maintreq_vendorA1").getValue();
    var reqOrderNum = $$("maintreq_orderNumA1").getValue();
    var reqOrderedDate = $$("maintreq_orderedA1").getText();

    var updateReqForm = '{"maintreq_dateSubmit":"' + reqSubmitDate + '","maintreq_dateNeed":"' + reqDateNeed + '","maintreq_vendor":"' + reqVendor + '","maintreq_orderNum":"' + reqOrderNum + '","maintreq_ordered":"' + reqOrderedDate + '"}';

//    var updateReqForm = '{"maintreq_reqName":"' + reqName +'","maintreq_dept":"' + reqDept +'","maintreq_dateSubmit":"' + reqSubmitDate +'","maintreq_dateNeed":"' + reqDateNeed +'","maintreq_vendor":"' + reqVendor  +'","maintreq_orderNum":"' + reqOrderNum +'","maintreq_ordered":"' + reqOrderedDate +'"}';
    webix.ajax("/labs2/php/api_methods/UPDATEz.php?tableName=maintRequest&JSONdata=" + updateReqForm + "&theWhereColumn=maintreq_UUID&theUUID=" + reqUUIDL);
    console.log("JSON DATA being sent to the server " + updateReqForm + " and this data to the db under this id " + reqUUID); //just a debug code
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
    //var theSubmitDataManager = '{"maintreq_manager":"' + $userId + '","maintreq_managerDate":"' + ymd + '","maintreq_status":"2"}';
    webix.ajax("/labs2/php/api_methods/DELETE.php?tableName=maintRequest&columnNames=maintreq_UUID&id=" + theLineItemUUID);
    webix.ajax("/labs2/php/api_methods/DELETE.php?tableName=maintRequestRows&columnNames=maintreqR_reqUUID&id=" + theLineItemUUID);
    console.log("This data is being DeleteD " + theLineItemUUID); //just a debug code
    webix.message({text: "Saved"}); //Optional UI to display that something happened
    window.setTimeout(refreshPanel, 1000);
    webix.message({text: "Reloading..."});
});

/////////////////// Checkbox script for Manager Approval //////////////////
$$("reqManagerApproval").attachEvent("onItemClick", function () {


    //webix.message({text: $userId});
    //webix.message({text: theLineItemUUID});
    var theSubmitDataManager = '{"maintreq_manager":"' + $userId + '","maintreq_managerDate":"' + ymd + '","maintreq_status":"2"}';
    webix.ajax("/labs2/php/api_methods/UPDATEz.php?tableName=maintRequest&JSONdata=" + theSubmitDataManager + "&theWhereColumn=maintreq_UUID&theUUID=" + theLineItemUUID);
    console.log("JSON DATA being sent to the server " + theSubmitDataManager + " and this data to the db "); //just a debug code
    webix.message({text: "Saved"}); //Optional UI to display that something happened
    window.setTimeout(refreshPanel, 1000);
    webix.message({text: "Reloading..."});
});

/////////////////// Checkbox script for Authorized Approval //////////////////
$$("reqAuthorizedApproval").attachEvent("onItemClick", function () {

    var theSubmitDataAuthor = '{"maintreq_authorization":"' + $userId + '","maintreq_authorizationDate":"' + ymd + '","maintreq_status":"1"}';
    webix.ajax("/labs2/php/api_methods/UPDATEz.php?tableName=maintRequest&JSONdata=" + theSubmitDataAuthor + "&theWhereColumn=maintreq_UUID&theUUID=" + theLineItemUUID);
    console.log("JSON DATA being sent to the server " + theSubmitDataAuthor + " and this data to the db "); //just a debug code
    window.setTimeout(refreshPanel, 1000);


    webix.message({text: "Saved"}); //Optional UI to display that something happened
});

/////////////////// Checkbox script for making past req active //////////////////
$$("reqMakeActive").attachEvent("onItemClick", function () {

    var theSubmitDataStatus1 = '{"maintreq_authorization":"NULL","maintreq_authorizationDate":"1970-01-01","maintreq_status":"3"}';
    webix.ajax("/labs2/php/api_methods/UPDATEz.php?tableName=maintRequest&JSONdata=" + theSubmitDataStatus1 + "&theWhereColumn=maintreq_UUID&theUUID=" + theLineItemUUIDPast);
    window.setTimeout(refreshPanel, 1000);

    webix.message({text: "Saved"}); //Optional UI to display that something happened
});

/////////////////// Checkbox script for making active req past //////////////////
$$("reqMakePast").attachEvent("onItemClick", function () {

    var theSubmitDataStatus0 = '{"maintreq_status":"0"}';
    webix.ajax("/labs2/php/api_methods/UPDATEz.php?tableName=maintRequest&JSONdata=" + theSubmitDataStatus0 + "&theWhereColumn=maintreq_UUID&theUUID=" + theLineItemUUID);
    console.log("/labs2/php/api_methods/UPDATEz.php?tableName=maintRequest&JSONdata=" + theSubmitDataStatus0 + "&theWhereColumn=maintreq_UUID&theUUID=" + theLineItemUUID);
    window.setTimeout(refreshPanel, 1000);

    webix.message({text: "Saved"});
});

////////////////////////////////// Logic to set ui elements for managers to be seen //////////////////////////////////
webix.ajax().get("/labs2/php/api_methods/SELECTz.php?tableName=users&columnNames=users_manager%20AS%20value&selectColumn=users_name&selectData=" + $userId + "&dataName=data&select=1", function (text) {
    var managerLevel = JSON.stringify(text);
    console.log(managerLevel);
    if (managerLevel.search("1") !== -1) {
        $$("reqManagerApproval").show();
        $$("reqManagerDelete").show();
        $$("reqPastManagerDelete").show();
    }

});
webix.ajax().get("/labs2/php/api_methods/SELECTz.php?tableName=users&columnNames=users_authorized%20AS%20value&selectColumn=users_name&selectData=" + $userId + "&dataName=data&select=1", function (text) {
    var authorizorLevel = JSON.stringify(text);
    console.log(authorizorLevel);
    if (authorizorLevel.search("0") !== -1) {
        $$("reqAuthorizedApproval").show();
        $$("reqManagerDelete").show();
        $$("reqPastManagerDelete").show();
    }

});

////////////// Status Icon Switcher Actives///////////////////////
$$("activeReqs").attachEvent("onItemClick", function () {
    var statusIcon = $$("maintreq_statusA").getValue();
    // 1 is done
    if (statusIcon === "1") {
        $$("maintreq_statusIcon").show();
        $$("maintreq_statusIconWarning").hide();
        $$("maintreq_statusIconDone").hide();
        $$("maintreq_statusIconManager").hide();
        // 3 is base status
        // 2 is Manager Done
    } else if (statusIcon === "2") {
        $$("maintreq_statusIcon").hide();
        $$("maintreq_statusIconWarning").show();
        $$("maintreq_statusIconDone").hide();
        $$("maintreq_statusIconManager").show();
    } else if (statusIcon === "3") {
        $$("maintreq_statusIcon").hide();
        $$("maintreq_statusIconWarning").show();
        $$("maintreq_statusIconDone").hide();
        $$("maintreq_statusIconManager").hide();
        // 0 is past
    } else if (statusIcon === "0") {
        $$("maintreq_statusIcon").hide();
        $$("maintreq_statusIconWarning").hide();
        $$("maintreq_statusIconDone").show();
        $$("maintreq_statusIconManager").hide();
    }


});

////////////// Status Icon Switcher Past///////////////////////
$$("pastReqs").attachEvent("onItemClick", function () {
    var statusIcon = $$("maintreq_statusP").getValue();
    if (statusIcon === "1") {
        $$("maintreq_statusIconP").show();
        $$("maintreq_statusIconWarningP").hide();
        $$("maintreq_statusIconDoneP").hide();
        $$("maintreq_statusIconManagerP").hide();
    } else if (statusIcon === "3") {
        $$("maintreq_statusIconP").hide();
        $$("maintreq_statusIconWarningP").show();
        $$("maintreq_statusIconDoneP").hide();
        $$("maintreq_statusIconManagerP").show();
    } else if (statusIcon === "2") {
        $$("maintreq_statusIconP").hide();
        $$("maintreq_statusIconWarningP").show();
        $$("maintreq_statusIconDoneP").hide();
        $$("maintreq_statusIconManagerP").hide();
    } else if (statusIcon === "0") {
        $$("maintreq_statusIconP").hide();
        $$("maintreq_statusIconWarningP").hide();
        $$("maintreq_statusIconDoneP").show();
        $$("maintreq_statusIconManagerP").hide();
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
    var refresher = "/labs2/php/api_methods/SELECTz.php?tableName=maintRequest&columnNames=maintreq_UUID,maintreq_reqID,maintreq_reqName,maintreq_dept,maintreq_dateSubmit,maintreq_dateNeed,maintreq_ordered,maintreq_vendor,maintreq_orderNum,maintreq_manager,maintreq_authorization,maintreq_managerDate,maintreq_authorizationDate,maintreq_status&selectColumn=maintreq_status&selectData=0&operator=>&dataName=data&select=1";
    var refresher0 = "/labs2/php/api_methods/SELECTz.php?tableName=maintRequest&columnNames=maintreq_UUID,maintreq_reqID,maintreq_reqName,maintreq_dept,maintreq_dateSubmit,maintreq_dateNeed,maintreq_ordered,maintreq_vendor,maintreq_orderNum,maintreq_manager,maintreq_authorization,maintreq_managerDate,maintreq_authorizationDate,maintreq_status&selectColumn=maintreq_status&selectData=0&dataName=data&select=1";
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

    //$$("maintreq_reqNameA").hide();
    //$$("maintreq_deptA").hide();
    $$("maintreq_dateSubmitA").hide();
    $$("maintreq_dateNeedA").hide();
    $$("maintreq_vendorA").hide();
    $$("maintreq_orderNumA").hide();
    $$("maintreq_orderedA").hide();

    //$$("maintreq_reqNameA1").show();
    //$$("maintreq_deptA1").show();
    $$("maintreq_dateSubmitA1").show();
    $$("maintreq_dateNeedA1").show();
    $$("maintreq_vendorA1").show();
    $$("maintreq_orderNumA1").show();
    $$("maintreq_orderedA1").show();

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

    $$("maintreq_reqNameA").show();
    $$("maintreq_deptA").show();
    $$("maintreq_dateSubmitA").show();
    $$("maintreq_dateNeedA").show();
    $$("maintreq_vendorA").show();
    $$("maintreq_orderNumA").show();
    $$("maintreq_orderedA").show();

    $$("maintreq_reqNameA1").hide();
    $$("maintreq_deptA1").hide();
    $$("maintreq_dateSubmitA1").hide();
    $$("maintreq_dateNeedA1").hide();
    $$("maintreq_vendorA1").hide();
    $$("maintreq_orderNumA1").hide();
    $$("maintreq_orderedA1").hide();
}

/////////////////////////// Delete a row in the ReqRow ///////////////////////////
function deleteReqRow() {
    if (!$$("orderLineItems").getSelectedId()) {
        webix.message("No item is selected!");
        return;
    }
    var lineSelector = $$("orderLineItems").getSelectedId();
    var lineSelectedText = $$("orderLineItems").getText(lineSelector, "maintreqR_UUID");
    console.log("Deleted the ReqRow " + lineSelectedText);
    webix.ajax().get("/labs2/php/api_methods/DELETE.php?tableName=maintRequestRows&columnNames=maintreqR_UUID&id=" + lineSelectedText);
    webix.message("Row Deleted");
    $$("orderLineItems").remove($$("orderLineItems").getSelectedId());
}

/////////////////////////// *******  REQ ROW SCRIPTS  ******* ///////////////////////////
//                                                                                     //
///////////////////////////     ///////////////////////////   ///////////////////////////


/////////////////////////// Add a new row ///////////////////////////
$$("addNewReqRow").attachEvent("onItemClick", function () {
    maintreqR_reqUUID = $$("maintreq_UUIDA1").getValue();

    reqRowUUID = 'xxxxxxxx-xxxx-6xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = Math.random() * 16 | 0, v = c === 'x' ? r : r & 0x3 | 0x8;
        return v.toString(16);
    });
    theSubmitDataRAW = '{"success":true,"data":[{"maintreqR_UUID":"' + reqRowUUID + '", "maintreqR_reqUUID":"' + maintreqR_reqUUID + '", "maintreqR_itemName":"NULL", "maintreqR_partNumber":"NULL", "maintreqR_unitQty":"0", "maintreqR_qty":"0", "maintreqR_costUnit":"0", "maintreqR_cost":"0", "maintreqR_orderType":"NULL", "maintreqR_reason":"NULL", "maintreqR_eta":"NULL", "maintreqR_status":"1"}]}';
    webix.ajax("/labs2/php/api_methods/INSERT.php?tableName=maintRequestRows&JSONdata=" + theSubmitDataRAW);
    $$("orderLineItems").add({maintreqR_UUID: reqRowUUID});


    theSubmitDataManager = '{"maintreq_authorization":"NULL","maintreq_authorizationDate":"1970-01-01","maintreq_status":"2"}';
    webix.ajax("/labs2/php/api_methods/UPDATEz.php?tableName=maintRequest&JSONdata=" + theSubmitDataManager + "&theWhereColumn=maintreq_UUID&theUUID=" + maintreqR_reqUUID);
    window.setTimeout(refreshPanel, 1000);
    console.log("The new row has an id of " + reqRowUUID + " parent id " + maintreqR_reqUUID);
    webix.message("New Row Added");
});


////////////////////////// Preedit controller for the following function ////////////
function saveEditedReqRow() {
    saveEditedReqRowMain();
}

///////  ----- Need to make this section above and below more generic //////


/////////////////////////// Edit/Save a row in the ReqRow ///////////////////////////
function saveEditedReqRowMain() {
    if (!$$("orderLineItems").getSelectedId()) {
        webix.message("No item is selected!");
        return;
    }
    var lineSelector = $$("orderLineItems").getSelectedId();
    var lineSelectedText = $$("orderLineItems").getText(lineSelector, "maintreqR_UUID");
    var maintreqR_itemNameA = $$("orderLineItems").getText(lineSelector, "maintreqR_itemName");
    var maintreqR_partNumberA = $$("orderLineItems").getText(lineSelector, "maintreqR_partNumber");
    var maintreqR_unitQtyA = $$("orderLineItems").getText(lineSelector, "maintreqR_unitQty");
    var maintreqR_qtyA = $$("orderLineItems").getText(lineSelector, "maintreqR_qty");
    var maintreqR_costUnitA = $$("orderLineItems").getText(lineSelector, "maintreqR_costUnit");
    var maintreqR_costA = $$("orderLineItems").getText(lineSelector, "maintreqR_cost");
    var maintreqR_orderTypeA = $$("orderLineItems").getText(lineSelector, "maintreqR_orderType");
    var maintreqR_reasonA = $$("orderLineItems").getText(lineSelector, "maintreqR_reason");

    var theSubmitDataRAW = '{"maintreqR_itemName":"' + maintreqR_itemNameA + '", "maintreqR_partNumber":"' + maintreqR_partNumberA + '", "maintreqR_unitQty":"' + maintreqR_unitQtyA + '", "maintreqR_qty":"' + maintreqR_qtyA + '", "maintreqR_costUnit":"' + maintreqR_costUnitA + '", "maintreqR_cost":"' + maintreqR_costA + '", "maintreqR_orderType":"' + maintreqR_orderTypeA + '", "maintreqR_reason":"' + maintreqR_reasonA + '"}';

    console.log("Saved the ReqRow " + lineSelectedText);
    console.log("Here is the changed row data " + theSubmitDataRAW);

    webix.ajax().get("/labs2/php/api_methods/UPDATEz.php?tableName=maintRequestRows&JSONdata=" + theSubmitDataRAW + "&theWhereColumn=maintreqR_UUID&theUUID=" + lineSelectedText);
    webix.message("Saved");
}

/////////////////////////// delete a row on the create datatable ///////////////////////////
function removeRowData() {
    if (!$$("lineItemList").getSelectedId()) {
        webix.message("No item is selected!");
        return;
    }
    var lineSelector = $$("lineItemList").getSelectedId();
    var lineSelectedText = $$("lineItemList").getText(lineSelector, "maintreqR_UUID");
    console.log("Here's what we deleted " + lineSelectedText);
    webix.ajax().get("/labs2/php/api_methods/DELETE.php?tableName=maintRequestRows&columnNames=maintreqR_UUID&id=" + lineSelectedText);
    webix.message("Data Deleted");
    $$("lineItemList").remove($$("lineItemList").getSelectedId());
}

function dupTheRecord() {

}

//////////////////////////////////////////////////////////// END OF Page Controller Logic  ////////////////////////////////////////////////////////////