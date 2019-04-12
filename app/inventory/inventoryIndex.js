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


var tabbar = {
    view: "tabbar", id: 'tabbar', /*value: 'createReq',*/ multiview: true, options: [
        {value: 'Create Requisition', id: 'createReq'},
        {value: 'View Requisition', id: 'viewReq'},
        {value: 'Past Requisition', id: 'pastReq'}
    ]
};


var activePanelView = {
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
                    url: "/labs2/php/api_methods/SELECTz.php?tableName=requisitions&columnNames=req_UUID,req_reqID,req_reqName,req_dept,req_dateSubmit,req_dateNeed,req_ordered,req_vendor,req_orderNum,req_manager,req_authorization,req_managerDate,req_authorizationDate,req_status&selectColumn=req_status&selectData=0&operator=>&dataName=data&select=1"
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
                                                    suggest: "/labs2/php/api_methods/SELECTz.php?tableName=users&columnNames=users_displayName%20AS%20value&dataName=data&select=5"
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
                                                    suggest: "/labs2/php/api_methods/SELECTz.php?tableName=vl_departments&columnNames=dept_name%20AS%20value&dataName=data&select=5"
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
                                    {
                                        view: "datatable",
                                        id: "orderLineItems",
                                        select: true,
                                        columns: [
                                            {id: "reqR_itemName", header: "Item Disc.", sort: "string", adjust: true},
                                            {id: "reqR_partNumber", header: "Part No.", sort: "string", adjust: true},
                                            {id: "reqR_unitQty", header: "Unit Qty", sort: "string", adjust: true},
                                            {id: "reqR_qty", header: "Qty", sort: "string", adjust: true},
                                            {id: "reqR_costUnit", header: "Unit Cost", sort: "string", adjust: true},
                                            {id: "reqR_cost", header: "Cost", sort: "string", adjust: true},
                                            {id: "reqR_orderType", header: "Order Type", sort: "string", adjust: true},
                                            {id: "reqR_reason", header: "Reason", sort: "string", adjust: true}
                                        ],
                                        /* Need to load a blank record set */
                                        url: "/labs2/php/api_methods/SELECTz.php?tableName=requisitionRows&columnNames=reqR_UUID,reqR_reqUUID,reqR_itemName,reqR_partNumber,reqR_unitQty,reqR_qty,reqR_costUnit,reqR_cost,reqR_orderType,reqR_reason,reqR_eta,reqR_status&selectColumn=reqR_reqUUID&selectData=NULL&dataName=data&select=1"
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


var pastPanelView = {
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
                    url: "/labs2/php/api_methods/SELECTz.php?tableName=requisitions&columnNames=req_UUID,req_reqID,req_reqName,req_dept,req_dateSubmit,req_dateNeed,req_ordered,req_vendor,req_orderNum,req_manager,req_authorization,req_managerDate,req_authorizationDate,req_status&selectColumn=req_status&selectData=0&dataName=data&select=1"
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
                                            url: "/labs2/php/api_methods/SELECTz.php?tableName=requisitionRows&columnNames=reqR_UUID,reqR_reqUUID,reqR_itemName,reqR_partNumber,reqR_unitQty,reqR_qty,reqR_costUnit,reqR_cost,reqR_orderType,reqR_reason,reqR_eta,reqR_status&selectColumn=reqR_reqUUID&selectData=NULL&dataName=data&select=1"
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

var createPanelView = {
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
        {view: "text", width: "100", id: "invoice_UUID", hidden: true, value: reqUUID},
        {view: "button", label: "Save", align: 'left', width: "75", click: "saveTheInvoice"},
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
                        [{"id": 1, "value": "Supply"},
                            {"id": 2, "value": "Reagent"},
                            {"id": 3, "value": "Standard"},
                            {"id": 4, "value": "Solvent"},
                            {"id": 0, "value": ""}
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
        }
    ]

};

var data = {cells: [createPanelView, activePanelView, pastPanelView]};

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
    var reqUUID = $$("invoice_UUID").getValue();
    var reqreqID = $$("req_reqID").getValue();
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

    var reqStatus = 3;

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
///////////////////////Test /////////////////////////////
var form = $$('myform');
var list = $$('activeReqs');

form.bind(list);


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



////// Function captures the Line Item form data and creates a URL to be sent to the insert.php api. ////////////////////////////////////////////////////////////////
$$("saveTheInvoiceLineButton").attachEvent("onItemClick", function () {
    //saveTheInvoiceLine() {

    var reqRUUID = 'xxxxxxxx-xxxx-6xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = Math.random() * 16 | 0, v = c === 'x' ? r : r & 0x3 | 0x8;
        return v.toString(16);
    });

    var bb = reqUUID;
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
//    console.log("JSON DATA being sent to the server " + theSubmitDataRAW2); //just a debug code
    webix.message({text: "Saved"}); //Optional UI to display that something happened
    window.setTimeout(refreshTheInvoiceLineButton, 1000);
    webix.message({text: "Reloading..."});

});

function refreshTheInvoiceLineButton() {
    var loadLineItems = "/labs2/php/api_methods/SELECTz.php?tableName=requisitionRows&columnNames=reqR_UUID,reqR_reqUUID,reqR_itemName,reqR_partNumber,reqR_unitQty,reqR_qty,reqR_costUnit,reqR_cost,reqR_orderType,reqR_reason,reqR_eta,reqR_status&selectColumn=reqR_reqUUID&selectData=" + reqUUID + "&dataName=data&select=1";
    $$("lineItemList").clearAll();
    $$("lineItemList").load(loadLineItems);
    webix.message({text: "Loaded"});
};


/////////////////// Editor script for  Editing Save //////////////////
$$("reqEditSave").attachEvent("onItemClick", function () {

    var reqUUIDL = $$("req_UUIDA1").getValue();
    var reqName = $$("req_reqNameA1").getText();
    var reqDept = $$("req_deptA1").getText();
    var reqSubmitDate = $$("req_dateSubmitA1").getText();
    var reqDateNeed = $$("req_dateNeedA1").getText();
    var reqVendor = $$("req_vendorA1").getValue();
    var reqOrderNum = $$("req_orderNumA1").getValue();
    var reqOrderedDate = $$("req_orderedA1").getText();

    var updateReqForm = '{"req_dateSubmit":"' + reqSubmitDate + '","req_dateNeed":"' + reqDateNeed + '","req_vendor":"' + reqVendor + '","req_orderNum":"' + reqOrderNum + '","req_ordered":"' + reqOrderedDate + '"}';

//    var updateReqForm = '{"req_reqName":"' + reqName +'","req_dept":"' + reqDept +'","req_dateSubmit":"' + reqSubmitDate +'","req_dateNeed":"' + reqDateNeed +'","req_vendor":"' + reqVendor  +'","req_orderNum":"' + reqOrderNum +'","req_ordered":"' + reqOrderedDate +'"}';
    webix.ajax("/labs2/php/api_methods/UPDATEz.php?tableName=requisitions&JSONdata=" + updateReqForm + "&theWhereColumn=req_UUID&theUUID=" + reqUUIDL);
    //console.log("JSON DATA being sent to the server " + updateReqForm +" and this data to the db under this id "+ reqUUID); //just a debug code
    webix.message({text: "Saved"}); //Optional UI to display that something happened
    window.setTimeout(refreshPanel, 1000);
    window.setTimeout(editModeOff, 10);
    $$("myform").refresh();
    webix.message({text: "Reloading..."});
});


/////////////////// Checkbox script for Manager Approval //////////////////
$$("reqManagerApproval").attachEvent("onItemClick", function () {


    //webix.message({text: $userId});
    //webix.message({text: theLineItemUUID});
    var theSubmitDataManager = '{"req_manager":"' + $userId + '","req_managerDate":"' + ymd + '","req_status":"2"}';
    webix.ajax("/labs2/php/api_methods/UPDATEz.php?tableName=requisitions&JSONdata=" + theSubmitDataManager + "&theWhereColumn=req_UUID&theUUID=" + theLineItemUUID);
//console.log("JSON DATA being sent to the server " + theSubmitDataManager +" and this data to the db "+ temp); //just a debug code
    webix.message({text: "Saved"}); //Optional UI to display that something happened
    window.setTimeout(refreshPanel, 1000);
    webix.message({text: "Reloading..."});
});

/////////////////// Checkbox script for Authorized Approval //////////////////
$$("reqAuthorizedApproval").attachEvent("onItemClick", function () {

    var theSubmitDataAuthor = '{"req_authorization":"' + $userId + '","req_authorizationDate":"' + ymd + '","req_status":"1"}';
    webix.ajax("/labs2/php/api_methods/UPDATEz.php?tableName=requisitions&JSONdata=" + theSubmitDataAuthor + "&theWhereColumn=req_UUID&theUUID=" + theLineItemUUID);
    //console.log("JSON DATA being sent to the server " + theSubmitDataManager +" and this data to the db "+ temp); //just a debug code
    window.setTimeout(refreshPanel, 1000);


    webix.message({text: "Saved"}); //Optional UI to display that something happened
});

/////////////////// Checkbox script for making past req active //////////////////
$$("reqMakeActive").attachEvent("onItemClick", function () {

    var theSubmitDataStatus1 = '{"req_status":"3"}';
    webix.ajax("/labs2/php/api_methods/UPDATEz.php?tableName=requisitions&JSONdata=" + theSubmitDataStatus1 + "&theWhereColumn=req_UUID&theUUID=" + theLineItemUUIDPast);
    window.setTimeout(refreshPanel, 1000);

    webix.message({text: "Saved"}); //Optional UI to display that something happened
});

/////////////////// Checkbox script for making active req past //////////////////
$$("reqMakePast").attachEvent("onItemClick", function () {

    var theSubmitDataStatus0 = '{"req_status":"0"}';
    webix.ajax("/labs2/php/api_methods/UPDATEz.php?tableName=requisitions&JSONdata=" + theSubmitDataStatus0 + "&theWhereColumn=req_UUID&theUUID=" + theLineItemUUID);
    //console.log("/labs2/php/api_methods/UPDATEz.php?tableName=requisitions&JSONdata=" + theSubmitDataStatus0 + "&theWhereColumn=req_UUID&theUUID="+ theLineItemUUID);
    window.setTimeout(refreshPanel, 1000);

    webix.message({text: "Saved"});
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

////////////// Status Icon Switcher Actives///////////////////////
$$("activeReqs").attachEvent("onItemClick", function () {
    var statusIcon = $$("req_statusA").getValue();
    if (statusIcon == 1) {
        $$("req_statusIcon").show();
        $$("req_statusIconWarning").hide();
        $$("req_statusIconDone").hide();
        $$("req_statusIconManager").hide();
    } else if (statusIcon == 3) {
        $$("req_statusIcon").hide();
        $$("req_statusIconWarning").show();
        $$("req_statusIconDone").hide();
        $$("req_statusIconManager").hide();
    } else if (statusIcon == 2) {
        $$("req_statusIcon").hide();
        $$("req_statusIconWarning").show();
        $$("req_statusIconDone").hide();
        $$("req_statusIconManager").show();
    } else if (statusIcon == 0) {
        $$("req_statusIcon").hide();
        $$("req_statusIconWarning").hide();
        $$("req_statusIconDone").show();
        $$("req_statusIconManager").hide();
    }


});

////////////// Status Icon Switcher Past///////////////////////
$$("pastReqs").attachEvent("onItemClick", function () {
    var statusIcon = $$("req_statusP").getValue();
    if (statusIcon == 1) {
        $$("req_statusIconP").show();
        $$("req_statusIconWarningP").hide();
        $$("req_statusIconDoneP").hide();
        $$("req_statusIconManagerP").hide();
    } else if (statusIcon == 3) {
        $$("req_statusIconP").hide();
        $$("req_statusIconWarningP").show();
        $$("req_statusIconDoneP").hide();
        $$("req_statusIconManagerP").show();
    } else if (statusIcon == 2) {
        $$("req_statusIconP").hide();
        $$("req_statusIconWarningP").show();
        $$("req_statusIconDoneP").hide();
        $$("req_statusIconManagerP").hide();
    } else if (statusIcon == 0) {
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
$$("refreshPanelButtonPast").attachEvent("onItemClick", function () {
    window.setTimeout(refreshPanel, 1000);
    webix.message({text: "Reloading..."});
});

//////////////////////////// Function that does the work to refresh the UI elements after db transactions ////////////////////////////////////
function refreshPanel() {
    var refresher = "/labs2/php/api_methods/SELECTz.php?tableName=requisitions&columnNames=req_UUID,req_reqID,req_reqName,req_dept,req_dateSubmit,req_dateNeed,req_ordered,req_vendor,req_orderNum,req_manager,req_authorization,req_managerDate,req_authorizationDate,req_status&selectColumn=req_status&selectData=0&operator=>&dataName=data&select=1";
    var refresher0 = "/labs2/php/api_methods/SELECTz.php?tableName=requisitions&columnNames=req_UUID,req_reqID,req_reqName,req_dept,req_dateSubmit,req_dateNeed,req_ordered,req_vendor,req_orderNum,req_manager,req_authorization,req_managerDate,req_authorizationDate,req_status&selectColumn=req_status&selectData=0&dataName=data&select=1";
    $$("activeReqs").clearAll();
    $$("pastReqs").clearAll();
    $$("activeReqs").load(refresher);
    $$("pastReqs").load(refresher0);
    $$("authorizr").refresh();
    $$("authorizrP").refresh();
    $$("statusActive").refresh();
};

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
};

//////////////////////////////////////////////////////////// END OF Page Controller Logic  ////////////////////////////////////////////////////////////