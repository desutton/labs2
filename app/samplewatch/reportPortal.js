/*
 * <dsCode> Inc. (c) 2020. This copyright is based on the Apache License 2.0. Please contact David Sutton for use of this software.
 */


///////////////////////////////////////////////////////////////////////////////
///                          START OF Global Vars                           ///

var gv_customerName = "Digital eSolutions";
var gv_navMenuList = [{id: "1", value: "Reports"}, {id: "2", value: "New Submission"}, {id: "3", value: "Settings"}];
var gv_custFolders = "/labs2/php/api_methods/SELECTz.php?tableName=customerFolders&columnNames=custFolders_id,custFolders_UUID%20AS%20id,custFolders_folderName%20AS%20value,custFolders_parentFolder&parentid=custFolders_parentFolder&childid=custFolders_id&selectColumn=custFolder_owner&selectData=" + gv_customerName + "&select=100&db_name=labs";
var gv_theCustomerReportList = "/labs2/php/api_methods/SELECTz.php?tableName=customerRecords&columnNames=*&parentid=custRec_parentId&childid=cusRec_id&selectColumn=cusRec_customerName&selectData=" + gv_customerName + "&select=100&db_name=labs";
var gv_theParentFolderNumber = webix.ajax("/labs2/php/api_methods/SELECTz.php?tableName=customerFolders&columnNames=custFolders_id&whereclause=custFolders_parentFolder%3D0%20AND%20custFolder_owner%3D%20'" + gv_customerName + "'&select=9&db_name=labs");
console.log(gv_theParentFolderNumber.custFolders_id); //This isn't working. It's not a JSON array I think.


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
    yCount: 10,
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
    drag: "move",
    url: gv_custFolders


};

const uigFolderMaker = {
    view: "form",
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
        },
        {
            view: "button",
            css: "webix_primary",
            label: "Save"
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
                                {view: "sidebar", data: gv_navMenuList, width: 0}
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

//******************** Datagrid Filter            *******************//
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

//******************** New Folder Maker *************************************//
function uiNewFolder() {
    var $useruuid = 'xxxxxxxx-xxxx-5xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = Math.random() * 16 | 0, v = c === 'x' ? r : r & 0x3 | 0x8;
        return v.toString(16);
    });
    var folderName = $$("uiFolderName").getValue();
    var parentFolder = gv_theParentFolderNumber;
    var folderOwner = gv_customerName;
    var newFolderDetails = '{"success":true,"data":[{"custFolders_UUID":"' + $useruuid + '", "custFolders_folderName":"' + folderName + '", "custFolders_parentFolder":"' + parentFolder + '", "custFolder_owner":"' + folderOwner + '"}]}';

    webix.ajax("/labs2/php/api_methods/INSERT.php?tableName=customerFolders&db_name=labs&JSONdata=" + newFolderDetails);
};
///////////////////////////////////////////////////////////////////////////////

/////////// Just an experiment to see how hiding tabs works
$$('btPrintReport').attachEvent("onItemClick", function () {
    $$("tabbar").hideOption("microView");
})

