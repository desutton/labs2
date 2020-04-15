/*
 * <dsCode> Inc. (c) 2020. This copyright is based on the Apache License 2.0. Please contact David Sutton for use of this software.
 */
var navMenuList = [{id: "1", value: "Reports"}, {id: "2", value: "New Submission"}, {id: "3", value: "Settings"}];
var custFolders = [{
    id: "1",
    value: "/",
    open: true,
    data: [{id: "1.1", value: "New Reports"}, {id: "1.2", value: "Old Reports"}]
}];

var custRec = [{
    "cusRec_id": "1",
    "cusRec_UUID": "0",
    "cusRec_lotNumber": "ABC123",
    "cusRec_trackingNumber": "DESTest1.1",
    "cusRec_customerName": "DigitaleSolutions",
    "cusRec_ai": "2 Active Ingredients",
    "data": [{
        "cusRec_id": "18",
        "cusRec_parentID": "1",
        "cusRec_UUID": "0",
        "cusRec_lotNumber": "ABC123",
        "cusRec_trackingNumber": "DESTest1.1",
        "cusRec_customerName": "DigitaleSolutions",
        "cusRec_ai": "ZPac",
        "cusRec_recievedDate": "2020-04-1200:00:00",
        "cusRec_recievedUser": "MHENRY",
        "cusRec_reportDate": "2020-04-1300:00:00",
        "cusRec_reportedUser": "KMARTIN",
        "cusRec_tests": "POT,SIA",
        "cusRec_notes": "Fourscoreandsevenyearsago",
        "cusRec_folder": null,
        "cusRec_uiStatus": "1",
        "cusRec_paymentStatus": "1",
        "cusRec_status": "1"
    }, {"cusRec_lotNumber": "ABC123", "cusRec_ai": "Aspirin"}],
    "cusRec_recievedDate": "2020-04-1200:00:00",
    "cusRec_recievedUser": "MHENRY",
    "cusRec_reportDate": "2020-04-1300:00:00",
    "cusRec_reportedUser": "KMARTIN",
    "cusRec_tests": "POT,SIA",
    "cusRec_notes": "Fourscoreandsevenyearsago",
    "cusRec_folder": null,
    "cusRec_uiStatus": "1",
    "cusRec_paymentStatus": "1",
    "cusRec_status": "1"
}, {
    "cusRec_id": "2",
    "cusRec_UUID": "0",
    "cusRec_lotNumber": "321CBA",
    "cusRec_trackingNumber": "DESTest1.2",
    "cusRec_customerName": "DigitaleSolutions",
    "cusRec_ai": "Amoxicillin",
    "cusRec_recievedDate": "2020-04-1200:00:00",
    "cusRec_recievedUser": "MHENRY",
    "cusRec_reportDate": "2020-04-1200:00:00",
    "cusRec_reportedUser": "LWESTER",
    "cusRec_tests": "FUN",
    "cusRec_notes": "WethePeople...",
    "cusRec_folder": null,
    "cusRec_uiStatus": "1",
    "cusRec_paymentStatus": "1",
    "cusRec_status": "1"
}];


const theCustomerReportList = "/labs2/php/api_methods/SELECTz.php?columnNames=customerRecords.cusRec_id,customerRecords.cusRec_UUID,customerRecords.cusRec_lotNumber,customerRecords.cusRec_trackingNumber,customerRecords.cusRec_customerName,customerRecords.cusRec_ai,customerRecords.cusRec_recievedDate,customerRecords.cusRec_recievedUser,customerRecords.cusRec_reportDate,customerRecords.cusRec_reportedUser,customerRecords.cusRec_tests,customerRecords.cusRec_notes,customerRecords.cusRec_folder,customerRecords.cusRec_uiStatus,customerRecords.cusRec_paymentStatus,customerRecords.cusRec_status&db_name=labs&tableName=customerRecords&dataName=data&select=5";

//UI Elements
const uiSubmissionPanel = {
    view: "treetable",
    id: "customerRecordList",
    select: "row",
    scrollX: false,
    data: custRec,
    //url: theCustomerReportList,
    yCount: 10,
    columns: [
        {
            id: "cusRec_lotNumber",
            header: "Lot Number",
            fillspace: true,
            sort: "string",
            adjust: "data",
            hidden: false,
            template: "{common.treetable()} #cusRec_lotNumber#"
        },
        {
            id: "cusRec_ai",
            header: "Active Ingredient",
            sort: "string",
            adjust: "data",
            fillspace: true,
            hidden: false
        }, {
            id: "cusRec_trackingNumber",
            header: "Tracking Number",
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
            format: webix.Date.dateToStr("%M-%d-%Y")
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
        }
    ]
};
const uiDetailPanel = {
    view: "form",
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
            value: "Print Report",
            css: "webix_primary",
            align: "center",
            inputWidth: 200,
            height: 38
        }
    ]
};

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
                                {view: "tree", data: custFolders, width: 0},
                                {view: "sidebar", data: navMenuList, width: 0}
                            ]
                        },
                        {
                            rows: [
                                uiSubmissionPanel,
                                uiDetailPanel
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