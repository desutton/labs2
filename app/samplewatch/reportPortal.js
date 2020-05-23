/*
 * <dsCode> Inc. (c) 2020. This copyright is based on the Apache License 2.0. Please contact David Sutton for use of this software.
 */


///////////////////////////////////////////////////////////////////////////////
///                          START OF Global Vars                           ///

var gv_theUserName = JSON.parse(decodeURIComponent(document.cookie).substring(5))['UserName'];
var gv_customerName = sessionStorage.getItem('users_company');
var gv_theCustomerParentFolder = sessionStorage.getItem('users_2group');
//var gv_currentStatus = {id: "150", value: "Reporting"}; //<-- No long being used
var gv_custFolders = "/labs2/php/api_methods/SELECTz.php?tableName=customerFolders&columnNames=custFolders_UUID%20AS%20id,custFolders_folderName%20AS%20value,custFolders_parentFolder&parentid=custFolders_parentFolder&childid=id&selectColumn=custFolder_owner&selectData=" + gv_customerName + "&select=100&db_name=labs&bracket=0";
var gv_theCustomerReportList = "/labs2/php/api_methods/SELECTz.php?tableName=customerRecords&columnNames=*&parentid=custRec_parentId&childid=cusRec_id&selectColumn=cusRec_customerName&selectData=" + gv_customerName + "&select=100&db_name=labs&bracket=0";

///                        END OF Global VARS                               ///
///////////////////////////////////////////////////////////////////////////////


///////////////////////////////////////////////////////////////////////////////
///                          START OF UI Vars                               ///

const uigSubmissionPanel = {
    view: "treetable",
    id: "customerRecordList",
    //select: "row",
    scrollX: false,
    select: true,
    multiselect: "level",
    drag: "move",
    filterMode: {
        level: false,
        showSubItems: false
    },
    url: gv_theCustomerReportList,
    //data:custJSON,
    yCount: 10,
    on: {
        onBeforeDragIn: function (context, ev) {
            if (!context.target || context.target.header) return false;	//block dnd on top level and for headers
            //block dnd in leaf items
            if (!this.getItem(context.target).$count) return false;
        }
    },
    columns: [
        {
            id: "cusRec_lotNumber",
            header: ["Lot Number", {content: "textFilter"}],
            fillspace: true,
            sort: "string",
            adjust: "data",
            hidden: false,
            template: "{common.treetable()} #cusRec_lotNumber#"
        },
        {
            id: "cusRec_ai",
            header: ["Active Ingredient", {content: "textFilter"}],
            sort: "string",
            adjust: "data",
            fillspace: true,
            hidden: false
        }, {
            id: "cusRec_trackingNumber",
            header: ["Tracking Number", {content: "textFilter"}],
            sort: "string",
            adjust: "data",
            fillspace: true,
            hidden: false
        },
        {
            id: "cusRec_recievedDate",
            header: "Received Date",
            sort: "date",
            fillspace: true,
            hidden: false,
            format: webix.Date.dateToStr("%M-%d-%Y %g:%i %a")
        },
        {
            id: "cusRec_reportDate",
            header: "Report Date",
            sort: "date",
            fillspace: true,
            hidden: false,
            format: webix.Date.dateToStr("%M-%d-%Y")
        },
        {id: "cusRec_tests", header: "Test Type", fillspace: false, hidden: false},
        {
            id: "cusRec_uiStatus",
            header: "Status",
            sort: "string",
            fillspace: false,
            hidden: false
        },
        {id: "cusRec_UUID", hidden: true}
    ]
};

const uigDetailPanel = {
    view: "form",
    id: "receivingView",
    minHeight: 380,
    autoheight: false,
    elements: [
        {
            css: "webix_dark",
            view: "toolbar",
            height: 44,
            cols: [
                {view: "label", label: "Detail"}
            ]
        },
        {
            height: 175,
            cols: [
                {
                    rows: [
                        {
                            cols: [{view: "label", label: "Lot Number"}, {
                                id: "cusRec_lotNumber",
                                view: "label",
                                value: "cusRec_lotNumber"
                            }]
                        },
                        {cols: [{view: "label", label: "Tracking No."}, {id: "cusRec_trackingNumber", view: "label"}]},
                        {
                            cols: [{view: "label", label: "Received Date"}, {
                                id: "cusRec_recievedDate",
                                view: "label",
                                format: webix.Date.dateToStr("%M-%d-%Y")
                            }]
                        },
                        {
                            cols: [{view: "label", label: "Report Date"}, {
                                id: "cusRec_reportDate",
                                view: "label",
                                format: webix.Date.dateToStr("%M-%d-%Y")
                            }]
                        },
                        {cols: [{view: "label", label: "Reported By"}, {id: "cusRec_reportedUser", view: "label"}]},
                        {cols: [{view: "label", label: "Test"}, {id: "cusRec_tests", view: "label"}]}
                    ],
                    width: 300
                },
                {view: "textarea", label: "Notes", id: "cusRec_notes", labelAlign: "right"}
            ]
        },
        {
            view: "button",
            id: "btPrintReport",
            value: "Print Report",
            css: "webix_primary",
            align: "center",
            inputWidth: 200,
            height: 38
        }
    ]
};

const uigPOTPanel = {
    template: "Hello Potency",
    id: "potView",
    minHeight: 380,
    autoheight: false

};

const uigMICROPanel = {
    template: "Hello Micro",
    id: "microView",
    minHeight: 380,
    autoheight: false,

};

const uigSpChemPanel = {
    template: "Hello Special Chem",
    id: "chemView",
    minHeight: 380,
    autoheight: false

};

const uigBillingPanel = {
    template: "Hello Billing",
    id: "billView",
    minHeight: 380,
    autoheight: false

};

const uiTrendingPanel = {
    template: "Hello Trending",
    id: "trendView",
    minHeight: 380,
    autoheight: false

};

const uiDataDetail = {
    cells: [
        uigDetailPanel,
        uigMICROPanel,
        uigPOTPanel,
        uigSpChemPanel,
        uigBillingPanel,
        uiTrendingPanel
    ]
};

const uigDetailTabbar = {
    view: "tabbar", id: "tabbar", multiview: true, options: [
        {value: '<span class="fas fa-truck"></span>Receiving', id: 'receivingView'},
        {value: '<span class="fas fa-bug"></span> Microbiology', id: 'microView'},
        {value: '<span class="fas fa-flask"></span> Potency', id: 'potView'},
        {value: '<span class="fas fa-microscope"></span> Special Chem', id: 'chemView'},
        {value: '<span class="fas fa-dollar-sign"></span>Billing', id: 'billView'},
        {value: '<span class="fas fa-chart-line"></span> Trending', id: 'trendView'}
    ]
};

const uigFolderList = {
    view: "tree",
    id: "uiFolderList",
    width: 0,
    activeTitle: false,
    select: true,
    multiselect: "level",
    drag: true,  //<-- This needs to be on
    onContext: {},
    url: gv_custFolders,
    externalData: sample2folder,    //<---- Added this


};

const uigFolderMaker = {
    view: "form",
    id: "uigFolderMaker",
    hidden: true,
    rows: [
        {
            cols: [
                {
                    view: "text",
                    name: "uiFolderName",
                    id: "uiFolderName",
                    placeholder: "Untitled Folder",
                    inputWidth: 125
                },
                {
                    view: "button",
                    type: "icon",
                    icon: "fas fa-folder-plus",
                    id: "uiNewFolder",
                    autoHeight: true,
                    width: 50,
                    align: "center",
                    click: "uiNewFolder"
                }
            ]
        }
    ]
};

const uigParentFolderID = {
    view: "text",
    id: "gv_theParentFolderID",
    //value:"gv_theParentFolderID",
    hidden: true
};

const uigSidebarBullet = {
    view: "bullet",
    id: "uigSidebarBullet",
    labelHeight: 40,
    layout: "y",
    minRange: 0,
    maxRange: 100,
    value: 0,
    bands: [
        {value: 100, color: "#b4e5fb"},
        {value: 80, color: "#55c2f3"},
        {value: 30, color: "#1997dc"}
    ],
    label: "Progress Overview",
    placeholder: "Percent Complete",
    //marker:70,
    stroke: 8,
    scale: {
        step: 10
    }
};

const uigPrintableReport = {

    "id": 1590178576694,
    "rows": [
        {"view": "template", "template": "You can place any widget here..", "role": "placeholder"},
        {
            "url": "demo->5e5d4869630d1f0012f03828",
            "columns": [
                {"id": "title", "header": "Test Date", "sort": "string"},
                {"id": "year", "header": "Test", "sort": "string"},
                {"id": "votes", "header": "Test Method", "sort": "string"},
                {"id": "rating", "header": "Acceptance Criteria", "sort": "string"},
                {"id": "rank", "header": "Results", "sort": "string"},
                {"id": "category", "header": "Pass/Fail", "sort": "string"}
            ],
            "view": "datatable",
            "id": 1590178576803
        },
        {
            "url": "demo->5e5d4869630d1f0012f03828",
            "columns": [
                {"id": "title", "header": "Title", "sort": "string"},
                {"id": "year", "header": "Year", "sort": "string"},
                {"id": "votes", "header": "Votes", "sort": "string"},
                {"id": "rating", "header": "Rating", "sort": "string"},
                {"id": "rank", "header": "Rank", "sort": "string"},
                {"id": "category", "header": "Category", "sort": "string"},
                {"id": "category", "header": "% Label Claim", "sort": "string"},
                {"id": "category", "header": "% Label Claim", "sort": "string"}
            ],
            "view": "datatable"
        },
        {
            "url": "demo->5e5d4869630d1f0012f03828",
            "columns": [
                {"id": "title", "header": "Test Date", "sort": "string"},
                {"id": "year", "header": "Test", "sort": "string"},
                {"id": "votes", "header": "Test Method", "sort": "string"},
                {"id": "rating", "header": " Acceptance Criteria", "sort": "string"},
                {"id": "rank", "header": "Results", "sort": "string"},
                {"id": "category", "header": "Pass/Fail", "sort": "string"}
            ],
            "view": "datatable"
        }
    ]

};

///                        END OF UI VARS                                   ///
///////////////////////////////////////////////////////////////////////////////


//***************************************************************************//
//                                                                           //
//                               UI CONTROL                                  //
//                                                                           //
//***************************************************************************//
webix.ui(
    {
        view: "window",
        id: "CustomerPortal",
        width: 1325,
        autoheight: true,
        left: 1,
        move: true,
        head: {
            view: "toolbar", margin: -4, cols: [
                {view: "icon", icon: "fas fa-prescription"},
                {view: "label", label: "CUSTOMER DASHBOARD", css: {"font-weight": "bold"}},
                {view: "label", id: "gv_theCustomerName", label: gv_customerName},
                //{view: "label", id:"gv_theCustomerNames", label: gv_theUserName},
                {
                    view: "icon", icon: "fas fa-times", click: function () {
                        $$('CustomerPortal').close();
                    }
                }
            ]
        },
        body: {
            rows: [
                {
                    view: "toolbar", css: "webix_dark", padding: {"right": 10, "left": 10},
                    elements: [
                        {view: "label", label: "Submissions"}
                    ]
                },
                {
                    type: "wide",
                    cols: [
                        {
                            width: 217, rows: [
                                uigFolderList,
                                uigFolderMaker,
                                uigParentFolderID,
                                uigSidebarBullet
                            ]
                        },
                        {
                            rows: [
                                uigSubmissionPanel,
                                uigDetailTabbar,
                                uiDataDetail
                            ]
                        }
                    ]
                }
            ]
        }
    }
).show();

webix.ui({
    view: "contextmenu",
    id: "uig_folderListContextMenu",
    data: ["Add", "Rename", "Delete", {$template: "Separator"}, "Cancel"],
    on: {
        onItemClick: function (id) {
            var context = this.getContext();
            var list = context.obj;
            var listId = context.id;
            if (this.getItem(id).value === "Add") {
                webix.message("Added item: <i>" + list.getItem(listId).value + "</i><br/>" + list.getItem(listId).id + "</i>");
                $$("uigFolderMaker").show();
                $$("uiFolderName").setValue("");
                $$("gv_theParentFolderID").setValue("");
            } else if (this.getItem(id).value === "Rename") {
                webix.message("Rename item: <i>" + list.getItem(listId).value + "</i>");
                $$("uigFolderMaker").show();

            } else if (this.getItem(id).value === "Delete") {
                webix.message("Delete item: <i>" + list.getItem(listId).value + "</i>");// Delete item: <i>"+list.getItem(listId).id+"</i>");
                var theKey = list.getItem(listId).id;
                console.log("DELETED Folder " + theKey);
                webix.ajax().post("/labs2/php/api_methods/DELETE.php?db_name=labs&tableName=customerFolders&columnNames=custFolders_UUID&id=" + theKey);
                refresh_row();
                //open(list.getItem(listId).id);
            } else if (this.getItem(id).value === "Cancel") {
                webix.message("Info item: <i>" + list.getItem(listId).value + "</i><br/>" + list.getItem(listId).id + "</i>");
                $$("uigFolderMaker").hide();
                $$("uiFolderName").setValue("");
                $$("gv_theParentFolderID").setValue("");
            }
            //webix.message("List item: <i>"+list.getItem(listId).value+"</i>");// <br/>Context menu item: <i>"+this.getItem(id).value+"</i>");
        }
    }
});

//***************************************************************************//
//                                                                           //
//                               PAGE LOGIC                                  //
//                                                                           //
//***************************************************************************//

//******************** Datagrid Click to Update Form Logic ******************//

$$('customerRecordList').attachEvent("onAfterSelect", function (id) {
    var value = this.getItem(id).cusRec_lotNumber;
    $$("cusRec_lotNumber").setValue(value);

    $$("cusRec_trackingNumber").setValue(this.getItem(id).cusRec_trackingNumber);
    $$("cusRec_recievedDate").setValue(this.getItem(id).cusRec_recievedDate);
    $$("cusRec_reportDate").setValue(this.getItem(id).cusRec_reportDate);
    $$("cusRec_reportedUser").setValue(this.getItem(id).cusRec_reportedUser);
    $$("cusRec_tests").setValue(this.getItem(id).cusRec_tests);
    $$("cusRec_notes").setValue(this.getItem(id).cusRec_notes);
});
///////////////////////////////////////////////////////////////////////////////

//******************** Datagrid Filter by Folder ****************************//
$$('uiFolderList').attachEvent("onItemClick", function (id) {
    var value = this.getItem(id).id;
    if (value === 'root') {
        $$("customerRecordList").filter()
    } else {
        $$("customerRecordList").filter(function (obj) {
            return obj.cusRec_folder.indexOf(value) !== -1;
        })
    }
});
///////////////////////////////////////////////////////////////////////////////

//******************** New&Modify Folder Form Logic *************************//
function uiNewFolder() {
    var folderName = $$("uiFolderName").getValue();
    var parentFolder = gv_theCustomerParentFolder;
    var folderOwner = gv_customerName;
    var $useruuid = $$("gv_theParentFolderID").getValue();
    var newFolderDetails;
    if ($useruuid === "") {
        $useruuid = 'xxxxxxxx-xxxx-5xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            var r = Math.random() * 16 | 0, v = c === 'x' ? r : r & 0x3 | 0x8;
            return v.toString(16);
        });
        newFolderDetails = '{"success":true,"data":[{"custFolders_UUID":"' + $useruuid + '", "custFolders_folderName":"' + folderName + '", "custFolders_parentFolder":"' + parentFolder + '", "custFolder_owner":"' + folderOwner + '"}]}';

        webix.ajax("/labs2/php/api_methods/INSERT.php?tableName=customerFolders&db_name=labs&JSONdata=" + newFolderDetails + "");
    } else {
        newFolderDetails = '{"custFolders_folderName":"' + folderName + '"}';

        webix.ajax("/labs2/php/api_methods/UPDATEz.php?tableName=customerFolders&db_name=labs&theWhereColumn=custFolders_UUID&theUUID=" + $useruuid + "&JSONdata=" + newFolderDetails + "");
    }
    refresh_row();
};

function refresh_row() {
    console.log("Refreshing Folder List");
    $$("uiFolderList").clearAll();
    $$("uiFolderList").load(gv_custFolders);
    //$$("uiFolderList").refresh();
    $$("uiFolderName").setValue("");
    webix.message({text: "Reloading..."});
    $$("uigFolderMaker").hide();

};
///////////////////////////////////////////////////////////////////////////////

//******************** ContextMenu Bind *************************************//
$$("uig_folderListContextMenu").attachTo($$("uiFolderList"));
///////////////////////////////////////////////////////////////////////////////

//******************** ReName Folder Bind **********************************//
$$('uiFolderList').attachEvent("onAfterSelect", function (id) {
    var theValue = this.getItem(id).value;
    var theIDofTheValue = this.getItem(id).id;
    $$("uiFolderName").setValue(theValue);
    $$("gv_theParentFolderID").setValue(theIDofTheValue)
});
///////////////////////////////////////////////////////////////////////////////

//******************** Datagrid Status Value For Bullet *********************//
$$('customerRecordList').attachEvent("onAfterSelect", function (id) {
    var theStatus = this.getItem(id).cusRec_status;
    var theStatusText = this.getItem(id).cusRec_uiStatus;
    var theStatusCalc = (theStatus * 1);     //(((170 - theStatus) / 170) - 1) * -100;
    $$("uigSidebarBullet").setValue(theStatusCalc);
});
///////////////////////////////////////////////////////////////////////////////


//******************** Datagrid MoveElement **********************************//
function sample2folder(data, id) {
    data.value = data.value || data.cusRec_UUID;  //<-- THIS FUNCTION WORKS BUT NOT THE RIGHT WAY
    webix.message(data.value);
    return data;
}

/*$$('customerRecordList').attachEvent("onDragOut", function (context,native_event) {
    webix.message("hello"+ context.start);
});*/
///////////////////////////////////////////////////////////////////////////////


/////////// Just an experiment to see how hiding tabs works
$$('btPrintReport').attachEvent("onItemClick", function () {
    $$("tabbar").hideOption("microView");
});