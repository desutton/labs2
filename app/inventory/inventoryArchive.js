/*
 * <dsCode> Inc. (c) 2019. This copyright is based on the Apache License 2.0. Please contact David Sutton for use of this software.
 */

//var allArchiveData = webix.ajax().get("/labs2/php/api_methods/SELECTz.php?tableName=JobLines&columnNames=Items.id,Items.partNumber,Items.storage_temperature_id,JobLines.qaApprovedDate&joinTable=Items&joinColumn=JobLines.item_id&joinValue=Items.id&selectColumn=LABSPRD.JobLines.status_id&operator=&selectData=17&sortby=Items.partNumber&db_name=1&dataName=data&select=8");
var allArchiveData = webix.ajax().get("/labs2/php/api_methods/SELECTz.php?columnNames=Items.id,Items.partNumber,Items.storage_temperature_id,JobLines.qaApprovedDate,ActiveIngredients.name,ActiveIngredients.hazardousMaterial,ActiveIngredients.controlledSubstance,JobLines.status_id&tableName=JobLines%20JOIN%20Items%20ON%20JobLines.item_id%20%3D%20Items.id%20%20JOIN%20JobLineTests%20ON%20JobLineTests.job_line_id%20%3D%20JobLines.id%20JOIN%20ActiveIngredients%20ON%20JobLineTests.active_ingredient_id%20%3D%20ActiveIngredients.id%20WHERE%20LABSPRD.JobLines.status_id%3D4%20or%205%20or%206%20or%208%20or%2010%20or%2014%20or%2015%20or%2016%20or%2017%20ORDER%20BY%20Items.partNumber%20ASC&limit=1000&db_name=LABSPRD&dataName=data&select=3");
;
var coaArchiveData = webix.ajax().get("/labs2/php/api_methods/SELECTz.php?columnNames=Items.id,Items.partNumber,Items.storage_temperature_id,JobLines.qaApprovedDate,ActiveIngredients.name,ActiveIngredients.hazardousMaterial,ActiveIngredients.controlledSubstance,JobLines.status_id&tableName=JobLines%20JOIN%20Items%20ON%20JobLines.item_id%20%3D%20Items.id%20%20JOIN%20JobLineTests%20ON%20JobLineTests.job_line_id%20%3D%20JobLines.id%20JOIN%20ActiveIngredients%20ON%20JobLineTests.active_ingredient_id%20%3D%20ActiveIngredients.id%20WHERE%20LABSPRD.JobLines.status_id%3D17%20ORDER%20BY%20Items.partNumber%20ASC&limit=1000&db_name=LABSPRD&dataName=data&select=3");
var waitArchiveData = webix.ajax().get("/labs2/php/api_methods/SELECTz.php?columnNames=Items.id,Items.partNumber,Items.storage_temperature_id,JobLines.qaApprovedDate,ActiveIngredients.name,ActiveIngredients.hazardousMaterial,ActiveIngredients.controlledSubstance,JobLines.status_id&tableName=%20JobLines%20JOIN%20Items%20ON%20JobLines.item_id%20%3D%20Items.id%20%20JOIN%20JobLineTests%20ON%20JobLineTests.job_line_id%20%3D%20JobLines.id%20JOIN%20ActiveIngredients%20ON%20JobLineTests.active_ingredient_id%20%3D%20ActiveIngredients.id%20WHERE%20LABSPRD.JobLines.status_id%3D4%20or%205%20or%206%20or%208%20or%2010%20or%2014%20or%2015%20or%2016%20ORDER%20BY%20Items.partNumber%20ASC&limit=1000&db_name=LABSPRD&dataName=data&select=3");
var ssArchiveData = webix.ajax().get("/labs2/php/api_methods/SELECTz.php?columnNames=Items.id,Items.partNumber,Items.storage_temperature_id,JobLines.updated_at,ActiveIngredients.name,ActiveIngredients.hazardousMaterial,ActiveIngredients.controlledSubstance,JobLines.status_id&tableName=JobLines%20JOIN%20Items%20ON%20JobLines.item_id%20%3D%20Items.id%20%20JOIN%20JobLineTests%20ON%20JobLineTests.job_line_id%20%3D%20JobLines.id%20JOIN%20ActiveIngredients%20ON%20JobLineTests.active_ingredient_id%20%3D%20ActiveIngredients.id%20WHERE%20LABSPRD.JobLines.status_id%3D14%20ORDER%20BY%20Items.partNumber%20ASC&limit=1000&db_name=LABSPRD&dataName=data&select=3");
var oldArchiveData = webix.ajax().get("/labs2/php/api_methods/SELECTz.php?columnNames=Items.id,Items.partNumber,Items.storage_temperature_id,JobLines.qaApprovedDate,ActiveIngredients.name,ActiveIngredients.hazardousMaterial,ActiveIngredients.controlledSubstance,JobLines.status_id&tableName=JobLines%20JOIN%20Items%20ON%20JobLines.item_id%20%3D%20Items.id%20%20JOIN%20JobLineTests%20ON%20JobLineTests.job_line_id%20%3D%20JobLines.id%20JOIN%20ActiveIngredients%20ON%20JobLineTests.active_ingredient_id%20%3D%20ActiveIngredients.id%20WHERE%20LABSPRD.JobLines.status_id%3D18%20ORDER%20BY%20Items.partNumber%20ASC&limit=1000&db_name=LABSPRD&dataName=data&select=3");

// Collections
var storageTemp = [{id: "1", value: "Room Temp"}, {id: "2", value: "Frozen"}, {
    id: "3",
    value: "Refrigerated"
}, {id: "4", value: "Accelerated"}, {id: "5", value: "98.6F"}];


var tabbar = {
    view: "tabbar", id: 'tabbar', /*value: 'createReq',*/ multiview: true, options: [
        {value: 'All', id: 'allArchives'},
        {value: 'CoA', id: 'coaArchives'},
        {value: 'Waiting', id: 'waitArchives'},
        {value: 'Stabilities', id: 'ssArchives'},
        {value: 'Past', id: 'oldArchives'}
    ]
};

const allPanelView = {
    id: "allArchives",
    height: "700",
    rows: [
        {
            view: "text",
            id: "list_input",
            label: "Filter list by tracking number",
            css: "fltr",
            labelWidth: 200
        },
        {
            view: "datatable",
            id: "allArchiveViewDatatable",
            visibleBatch: 10,
            columns: [
                {
                    id: "cb1",
                    header: {content: "masterCheckbox"},
                    checkValue: 'on',
                    uncheckValue: 'off',
                    template: "{common.checkbox()}",
                    width: 30
                },
                {id: "id", header: "ID", sort: "string", adjust: "data"},
                {
                    id: "partNumber",
                    header: "Tracking Number",
                    sort: "string",
                    adjust: "data",
                    template: function (obj) {
                        if (obj.controlledSubstance == 1)
                            return "<span style='color:blue;'>" + obj.partNumber + "</span>";
                        else if (obj.hazardousMaterial == 1)
                            return "<span style='color:red;'>" + obj.partNumber + "</span>";
                        else
                            return "<span style='color:gray;'>" + obj.partNumber + "</span>";
                    }
                },
                {id: "storage_temperature_id", header: "Temp", sort: "string", adjust: "data", collection: storageTemp},
                {
                    id: "qaApprovedDate",
                    header: "COA Date",
                    sort: "date",
                    adjust: "data",
                    format: webix.Date.dateToStr("%m-%d-%Y")
                },
            ],
            select: true,
            data: allArchiveData
        }
    ]
};
const coaPanelView = {
    id: 'coaArchives',
    height: "700",
    rows: [
        {
            view: "text",
            id: "list_input1",
            label: "Filter list by tracking number",
            css: "fltr",
            labelWidth: 200
        },
        {
            view: "datatable",
            id: "coaArchivesViewDatatable",
            visibleBatch: 10,
            columns: [
                {
                    id: "cb1",
                    header: {content: "masterCheckbox"},
                    checkValue: 'on',
                    uncheckValue: 'off',
                    template: "{common.checkbox()}",
                    width: 30
                },
                {id: "id", header: "ID", sort: "string", adjust: "data"},
                {
                    id: "partNumber",
                    header: "Tracking Number",
                    sort: "string",
                    adjust: "data",
                    template: function (obj) {
                        if (obj.controlledSubstance == 1)
                            return "<span style='color:blue;'>" + obj.partNumber + "</span>";
                        else if (obj.hazardousMaterial == 1)
                            return "<span style='color:red;'>" + obj.partNumber + "</span>";
                        else
                            return "<span style='color:gray;'>" + obj.partNumber + "</span>";
                    }
                },
                {id: "storage_temperature_id", header: "Temp", sort: "string", adjust: "data", collection: storageTemp},
                {
                    id: "qaApprovedDate",
                    header: "COA Date",
                    sort: "date",
                    adjust: "data",
                    format: webix.Date.dateToStr("%m-%d-%Y")
                },
            ],
            select: true,
            data: coaArchiveData
        }
    ]
};
const waitingPanelView = {
    id: 'waitArchives',
    height: "700",
    rows: [
        {
            view: "text",
            id: "list_input2",
            label: "Filter list by tracking number",
            css: "fltr",
            labelWidth: 200
        },
        {
            view: "datatable",
            id: "waitingArchivesViewDatatable",
            visibleBatch: 10,
            columns: [
                {
                    id: "cb1",
                    header: {content: "masterCheckbox"},
                    checkValue: 'on',
                    uncheckValue: 'off',
                    template: "{common.checkbox()}",
                    width: 30
                },
                {id: "id", header: "ID", sort: "string", adjust: "data"},
                {
                    id: "partNumber",
                    header: "Tracking Number",
                    sort: "string",
                    adjust: "data",
                    template: function (obj) {
                        if (obj.controlledSubstance == 1)
                            return "<span style='color:blue;'>" + obj.partNumber + "</span>";
                        else if (obj.hazardousMaterial == 1)
                            return "<span style='color:red;'>" + obj.partNumber + "</span>";
                        else
                            return "<span style='color:gray;'>" + obj.partNumber + "</span>";
                    }
                },
                {id: "storage_temperature_id", header: "Temp", sort: "string", adjust: "data", collection: storageTemp},
                {
                    id: "qaApprovedDate",
                    header: "COA Date",
                    sort: "date",
                    adjust: "data",
                    format: webix.Date.dateToStr("%m-%d-%Y")
                },
            ],
            select: true,
            data: waitArchiveData
        }
    ]
};
const ssPanelView = {
    id: 'ssArchives', height: "700",
    rows: [
        {
            view: "text",
            id: "list_input3",
            label: "Filter list by tracking number",
            css: "fltr",
            labelWidth: 200
        },
        {
            view: "datatable",
            id: "ssArchivesViewDatatable",
            visibleBatch: 10,
            columns: [
                {
                    id: "cb1",
                    header: {content: "masterCheckbox"},
                    checkValue: 'on',
                    uncheckValue: 'off',
                    template: "{common.checkbox()}",
                    width: 30
                },
                {id: "id", header: "ID", sort: "string", adjust: "data"},
                {
                    id: "partNumber",
                    header: "Tracking Number",
                    sort: "string",
                    adjust: "data",
                    template: function (obj) {
                        if (obj.controlledSubstance == 1)
                            return "<span style='color:blue;'>" + obj.partNumber + "</span>";
                        else if (obj.hazardousMaterial == 1)
                            return "<span style='color:red;'>" + obj.partNumber + "</span>";
                        else
                            return "<span style='color:gray;'>" + obj.partNumber + "</span>";
                    }
                },
                {id: "storage_temperature_id", header: "Temp", sort: "string", adjust: "data", collection: storageTemp},
                {
                    id: "updated_at",
                    header: "Last Update",
                    sort: "date",
                    adjust: "data",
                    format: webix.Date.dateToStr("%m-%d-%Y")
                },
            ],
            select: true,
            data: ssArchiveData
        }
    ]
};
const oldPanelView = {
    id: 'oldArchives', height: "700",
    rows: [
        {
            view: "text",
            id: "list_input4",
            label: "Filter list by tracking number",
            css: "fltr",
            labelWidth: 200
        },
        {
            view: "datatable",
            id: "oldArchivesViewDatatable",
            visibleBatch: 10,
            columns: [
                {
                    id: "cb1",
                    header: {content: "masterCheckbox"},
                    checkValue: 'on',
                    uncheckValue: 'off',
                    template: "{common.checkbox()}",
                    width: 30
                },
                {id: "id", header: "ID", sort: "string", adjust: "data"},
                {
                    id: "partNumber",
                    header: "Tracking Number",
                    sort: "string",
                    adjust: "data",
                    template: function (obj) {
                        if (obj.controlledSubstance == 1)
                            return "<span style='color:blue;'>" + obj.partNumber + "</span>";
                        else if (obj.hazardousMaterial == 1)
                            return "<span style='color:red;'>" + obj.partNumber + "</span>";
                        else
                            return "<span style='color:gray;'>" + obj.partNumber + "</span>";
                    }
                },
                {id: "storage_temperature_id", header: "Temp", sort: "string", adjust: "data", collection: storageTemp},
                {
                    id: "qaApprovedDate",
                    header: "COA Date",
                    sort: "date",
                    adjust: "data",
                    format: webix.Date.dateToStr("%m-%d-%Y")
                },
            ],
            select: true,
            data: oldArchiveData
        }
    ]
};


var data = {cells: [allPanelView, coaPanelView, waitingPanelView, ssPanelView, oldPanelView]};

webix.ui({

    view: "window",
    id: "InventoryArchive",
    width: 1325,
    autoheight: true,
    left: 1,
    move: true,

    head: {
        view: "toolbar", margin: -4, cols: [
            {view: "label", label: "Inventory Archives"},
            {
                view: "icon", icon: "wxi-close", click: function () {
                    $$('InventoryArchive').close();
                }
            }
        ]
    },
    body: {
        rows: [tabbar, data]
    }

}).show();


//////////////////////////////////////////////////////////// Page Controller Logic ////////////////////////////////////////////////////////////

////// Logic for the filter on the test descriptions list /////////////////////

$$("list_input").attachEvent("onTimedKeyPress", function () {
    var value = this.getValue().toLowerCase();
    $$("allArchiveViewDatatable").filter(function (obj) {
        return obj.partNumber.toLowerCase().indexOf(value) === 0;
    })
});

$$("list_input1").attachEvent("onTimedKeyPress", function () {
    var value = this.getValue().toLowerCase();
    $$("coaArchivesViewDatatable").filter(function (obj) {
        return obj.partNumber.toLowerCase().indexOf(value) === 0;
    })
});

$$("list_input2").attachEvent("onTimedKeyPress", function () {
    var value = this.getValue().toLowerCase();
    $$("waitingArchivesViewDatatable").filter(function (obj) {
        return obj.partNumber.toLowerCase().indexOf(value) === 0;
    })
});

$$("list_input3").attachEvent("onTimedKeyPress", function () {
    var value = this.getValue().toLowerCase();
    $$("ssArchivesViewDatatable").filter(function (obj) {
        return obj.partNumber.toLowerCase().indexOf(value) === 0;
    })
});