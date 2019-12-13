/*
 * <dsCode> Inc. (c) 2019. This copyright is based on the Apache License 2.0. Please contact David Sutton for use of this software.
 */

const archiveID = 'xxxxxxxx-xxxx-5xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function uuid(c) {
    var r = Math.random() * 16 | 0, v = c === 'x' ? r : r & 0x3 | 0x8;
    return v.toString(16);
});
//var allArchiveData = webix.ajax().get("/labs2/php/api_methods/SELECTz.php?tableName=JobLines&columnNames=Items.id,Items.partNumber,Items.storage_temperature_id,JobLines.qaApprovedDate&joinTable=Items&joinColumn=JobLines.item_id&joinValue=Items.id&selectColumn=JobLines.status_id&operator=&selectData=17&sortby=Items.partNumber&db_name=1&dataName=data&select=8");
const allArchiveDataQuery = "/labs2/php/api_methods/SELECTz.php?columnNames=Items.id,Items.partNumber,Items.storage_temperature_id,JobLines.qaApprovedDate,ActiveIngredients.name,ActiveIngredients.hazardousMaterial,ActiveIngredients.controlledSubstance,JobLines.status_id,JobLines.id%20AS%20JobLine_id&tableName=JobLines%20JOIN%20Items%20ON%20JobLines.item_id%20%3D%20Items.id%20%20JOIN%20JobLineTests%20ON%20JobLineTests.job_line_id%20%3D%20JobLines.id%20%20JOIN%20ActiveIngredients%20ON%20JobLineTests.active_ingredient_id%20%3D%20ActiveIngredients.id%20WHERE%20JobLines.status_id%3D%204%20or%20JobLines.status_id%3D%205%20or%20JobLines.status_id%3D%206%20or%20JobLines.status_id%3D%208%20or%20JobLines.status_id%3D%2010%20or%20JobLines.status_id%3D%2014%20or%20JobLines.status_id%3D%2016%20or%20JobLines.status_id%3D%2017%20%20%20%20ORDER%20BY%20Items.partNumber%20ASC&limit=3000&db_name=LABSPRD&dataName=data&select=3";
const coaArchiveDataQuery = "/labs2/php/api_methods/SELECTz.php?columnNames=Items.id,Items.partNumber,Items.storage_temperature_id,JobLines.qaApprovedDate,ActiveIngredients.name,ActiveIngredients.hazardousMaterial,ActiveIngredients.controlledSubstance,JobLines.status_id,JobLines.id%20AS%20JobLine_id&tableName=JobLines%20JOIN%20Items%20ON%20JobLines.item_id%20%3D%20Items.id%20%20JOIN%20JobLineTests%20ON%20JobLineTests.job_line_id%20%3D%20JobLines.id%20JOIN%20ActiveIngredients%20ON%20JobLineTests.active_ingredient_id%20%3D%20ActiveIngredients.id%20WHERE%20JobLines.status_id%3D17%20ORDER%20BY%20Items.partNumber%20ASC&limit=1000&db_name=LABSPRD&dataName=data&select=3";
const waitArchiveDataQuery = "/labs2/php/api_methods/SELECTz.php?columnNames=Items.id,Items.partNumber,Items.storage_temperature_id,JobLines.qaApprovedDate,ActiveIngredients.name,ActiveIngredients.hazardousMaterial,ActiveIngredients.controlledSubstance,JobLines.status_id,JobLines.id%20AS%20JobLine_id&tableName=%20JobLines%20JOIN%20Items%20ON%20JobLines.item_id%20%3D%20Items.id%20%20JOIN%20JobLineTests%20ON%20JobLineTests.job_line_id%20%3D%20JobLines.id%20JOIN%20ActiveIngredients%20ON%20JobLineTests.active_ingredient_id%20%3D%20ActiveIngredients.id%20WHERE%20JobLines.status_id%3D%204%20or%20JobLines.status_id%3D%205%20or%20JobLines.status_id%3D%206%20or%20JobLines.status_id%3D%208%20or%20JobLines.status_id%3D%2010%20or%20JobLines.status_id%3D%2014%20or%20JobLines.status_id%3D%2015%20or%20JobLines.status_id%3D%2016%20ORDER%20BY%20Items.partNumber%20ASC&limit=1000&db_name=LABSPRD&dataName=data&select=3";
const ssArchiveDataQuery = "/labs2/php/api_methods/SELECTz.php?columnNames=Items.id,Items.partNumber,Items.storage_temperature_id,JobLines.updated_at,ActiveIngredients.name,ActiveIngredients.hazardousMaterial,ActiveIngredients.controlledSubstance,JobLines.status_id,JobLines.id%20AS%20JobLine_id&tableName=JobLines%20JOIN%20Items%20ON%20JobLines.item_id%20%3D%20Items.id%20%20JOIN%20JobLineTests%20ON%20JobLineTests.job_line_id%20%3D%20JobLines.id%20JOIN%20ActiveIngredients%20ON%20JobLineTests.active_ingredient_id%20%3D%20ActiveIngredients.id%20WHERE%20JobLines.status_id%3D14%20ORDER%20BY%20Items.partNumber%20ASC&limit=1000&db_name=LABSPRD&dataName=data&select=3";
//const oldArchiveDataQuery = "/labs2/php/api_methods/SELECTz.php?columnNames=Items.id,Items.partNumber,Items.storage_temperature_id,JobLines.qaApprovedDate,ActiveIngredients.name,ActiveIngredients.hazardousMaterial,ActiveIngredients.controlledSubstance,JobLines.status_id,JobLines.id%20AS%20JobLine_id&tableName=JobLines%20JOIN%20Items%20ON%20JobLines.item_id%20%3D%20Items.id%20%20JOIN%20JobLineTests%20ON%20JobLineTests.job_line_id%20%3D%20JobLines.id%20JOIN%20ActiveIngredients%20ON%20JobLineTests.active_ingredient_id%20%3D%20ActiveIngredients.id%20WHERE%20JobLines.status_id%3D19%20ORDER%20BY%20Items.partNumber%20ASC&limit=1000&db_name=LABSPRD&dataName=data&select=3";
const oldArchiveDataQuery = "/labs2/php/api_methods/SELECTz.php?columnNames=archives_id,archives_UUID,archives_trackingNumber,archives_ai,archives_boxID,archives_bagID,archives_comment,archives_items_id,archives_jobLine_id,archives_previousStatus,archives_controlled,archives_hazard,archives_status&tableName=archives&limit=1000&db_name=labs&dataName=data&select=3";

var allArchiveData = webix.ajax().get(allArchiveDataQuery);
var coaArchiveData = webix.ajax().get(coaArchiveDataQuery);
var waitArchiveData = webix.ajax().get(waitArchiveDataQuery);
var ssArchiveData = webix.ajax().get(ssArchiveDataQuery);
var oldArchiveData = webix.ajax().get(oldArchiveDataQuery);

// Collections
var storageTemp = [{id: "1", value: "Room Temp"}, {id: "2", value: "Frozen"}, {
    id: "3",
    value: "Refrigerated"
}, {id: "4", value: "Accelerated"}, {id: "5", value: "98.6F"}];
var archiveBoxName = [{id: "1", value: "Jan"}, {id: "2", value: "Feb"}, {id: "3", value: "Mar"}, {
    id: "4",
    value: "Apr"
}, {id: "5", value: "May"}, {id: "6", value: "Jun"}, {id: "7", value: "Jul"}, {id: "8", value: "Aug"}, {
    id: "9",
    value: "Sep"
}, {id: "10", value: "Oct"}, {id: "11", value: "Nov"}, {id: "12", value: "Dec"}];
//var archiveBoxName = [{value: "Jan"},{value: "Feb"},{value: "Mar"},{value: "Apr"},{value: "May"},{value: "Jun"},{value: "Jul"},{value: "Aug"},{value: "Sep"},{value: "Oct"},{value: "Nov"},{value: "Dec"}];
var archiveBagName = [{id: "1", value: "Bag 1"}, {id: "2", value: "Bag 2"}, {id: "3", value: "Bag 3"}, {
    id: "4",
    value: "Bag 4"
}, {id: "5", value: "Bag 5"}, {id: "6", value: "Bag 6"}, {id: "7", value: "Bag 7"}, {id: "8", value: "Bag 8"}, {
    id: "9",
    value: "Bag 9"
}, {id: "10", value: "Bag10"}];

// Tab bar control
var tabbar = {
    view: "tabbar", id: 'tabbar', /*value: 'createReq',*/ multiview: true, options: [
        {value: 'All', id: 'allArchives', icon: "fas fa-layer-group"},
        {value: 'CoA', id: 'coaArchives', icon: "fas fa-award"},
        {value: 'Waiting', id: 'waitArchives', icon: "fas fa-clock"},
        {value: 'Stabilities', id: 'ssArchives', icon: "fas fa-thermometer-half"},
        {value: 'Past', id: 'oldArchives', icon: "fas fa-lock"}
    ]
};

const allPanelView = {
    id: "allArchives",
    height: "700",
    rows: [
        {
            cols: [
                {
                    view: "combo", label: "Show", value: 1, labelWidth: 65, width: 150, options: [
                        {id: 1, value: "Main"},
                        {id: 5, value: "All"},
                        {id: 10, value: "Debug"}
                    ],
                    on: {
                        onChange: function (changeAllView) {
                            showBatchAll(changeAllView);
                        }
                    }
                } /*,
                {
                    // Filter-bar tracking num
                    view: "text",
                    id: "all_list_input",
                    label: "Filter list by tracking number",
                    css: "fltr",
                    labelWidth: 200
                }*/

            ]
        },
        {
            cols: [
                {
                    view: "form", id: "allArchiveForm", elements: [
                        {
                            view: "datatable",
                            id: "allArchiveViewDatatable",
                            visibleBatch: 1,
                            select: true,
                            editable: true,
                            autowidth: true,
                            data: allArchiveData,
                            on: {
                                onSelectChange: function () {
                                    var text = "Selected: " + this.getSelectedId(true).join();   //////****** FIX THIS **********//////
                                }
                            },
                            columns: [
                                {
                                    id: "cb1",
                                    name: "CB1",
                                    header: {content: "masterCheckbox"},
                                    checkValue: 'on',
                                    uncheckValue: 'off',
                                    template: "{common.checkbox()}",
                                    batch: 1,
                                    width: 30
                                },
                                {
                                    id: "id",
                                    header: "ID",
                                    sort: "string",
                                    adjust: "data",
                                    name: "archive_idALL",
                                    batch: 1,
                                },
                                {
                                    id: "partNumber",
                                    header: ["Tracking Number", {content: "textFilter"}],
                                    sort: "string",
                                    adjust: "data",
                                    name: "archives_trackingNumberALL",
                                    template: function (obj) {
                                        if (obj.controlledSubstance == 1)
                                            return "<span style='color:blue;font-weight:bold;'>" + obj.partNumber + "</span>";
                                        else if (obj.hazardousMaterial == 1)
                                            return "<span style='color:red;font-weight:bold;'>" + obj.partNumber + "</span>";
                                        else
                                            return "<b>" + obj.partNumber + "</b>";
                                    }
                                },
                                {
                                    id: "storage_temperature_id",
                                    header: "Temp",
                                    sort: "string",
                                    adjust: "data",
                                    batch: 1,
                                    collection: storageTemp
                                },
                                {
                                    id: "JobLine_id",
                                    name: "archive_items_idALL",
                                    header: "Items ID",
                                    sort: "string",
                                    batch: 10,
                                    adjust: "data",
                                },
                                {
                                    id: "qaApprovedDate",
                                    header: ["COA Date", {content: "textFilter"}],
                                    sort: "date",
                                    adjust: "data",
                                    batch: 1,
                                    format: webix.Date.dateToStr("%m-%d-%Y")
                                },
                                {
                                    header: "Active Ingredient Name",
                                    id: "name",
                                    adjust: "header",
                                    sort: "string",
                                    name: "archive_aiALL",
                                    batch: 5,
                                    template: function (obj) {
                                        if (obj.controlledSubstance == 1)
                                            return "<span style='color:blue;font-weight:bold;'>" + obj.name + "</span>";
                                        else if (obj.hazardousMaterial == 1)
                                            return "<span style='color:red;font-weight:bold;'>" + obj.name + "</span>";
                                        else
                                            return "<b>" + obj.name + "</b>";
                                    }
                                },
                                {
                                    id: "archives_boxID",
                                    header: "Monthly Boxes",
                                    name: "archives_boxIDALL",
                                    adjust: "header",
                                    editor: "combo",
                                    batch: 1,
                                    collection: archiveBoxName
                                },
                                {
                                    id: "archives_bagID",
                                    header: "Numbered Bags",
                                    name: "archives_bagIDALL",
                                    adjust: "header",
                                    editor: "combo",
                                    batch: 1,
                                    collection: archiveBagName
                                },
                                {
                                    id: "archives_comments",
                                    header: "Comment",
                                    name: "archives_commentALL",
                                    adjust: "header",
                                    batch: 5,
                                    editor: "text"
                                },
                                {
                                    view: "label",
                                    id: "JobLine_id",
                                    header: "JobLine_id",
                                    name: "archives_jobLine_idALLMULTI",
                                    batch: 10
                                },
                                {
                                    view: "label",
                                    id: "id",
                                    header: "item_id",
                                    name: "archive_items_idALLMULTI",
                                    batch: 10
                                },
                                {
                                    view: "label",
                                    id: "status_id",
                                    header: "status_id",
                                    name: "archives_statusALLMULTI",
                                    batch: 10
                                },
                                {
                                    view: "text",
                                    id: "archives_UUIDALLMULTI",
                                    hearder: "UUID",
                                    batch: 10,
                                    value: archiveID
                                },
                                {
                                    view: "label",
                                    id: "hazardousMaterial",
                                    header: "Hazardous",
                                    name: "archives_controlledALLMULTI",
                                    batch: 10
                                },
                                {
                                    view: "label",
                                    id: "controlledSubstance",
                                    header: "Controlled",
                                    name: "archives_hazardALLMULTI",
                                    batch: 10
                                },
                                {
                                    id: "",
                                    template: "<button class='des_BasicIconButton3' onclick='saveEditedArchiveRowForALL()'><i class='fas fa-archive'></i></button>",
                                    css: "padding_less"
                                }
                            ]

                        }
                    ]
                },
                {view: "resizer"},
                // Form on the right side of the screen used to save multi JobLines based on what is checked on the checkboxes in the UI
                {
                    view: "form",
                    id: "allArchiveViewForm",
                    height: "650",
                    width: "250",
                    elements: [
                        {
                            view: "combo",
                            id: "archives_boxIDALLMULTI",
                            label: "Box",
                            options: archiveBoxName,
                            disabled: true
                        },
                        {
                            view: "combo",
                            id: "archives_bagIDALLMULTI",
                            label: "Bag",
                            options: archiveBagName,
                            disabled: true
                        },
                        {
                            view: "text",
                            id: "archives_commentALLMULTI",
                            label: "Comments",
                            labelPosition: "top",
                            height: 150,
                            disabled: true
                        },

                        {
                            view: "button",
                            id: "archiveAllMULTI_save",
                            label: "Save",
                            align: 'left',
                            click: "saveTheArchiveAll",
                            disabled: true
                        },

                    ]
                }

            ]
        }
    ]
};
const coaPanelView = {
    id: 'coaArchives',
    height: "700",
    rows: [
        {
            cols: [
                {
                    view: "select", label: "Show", value: 1, labelWidth: 65, width: 150, options: [
                        {id: 1, value: "Main"},
                        {id: 5, value: "All"},
                        {id: 10, value: "Debug"}
                    ],
                    on: {
                        onChange: function (changeCOAView) {
                            showBatchcoa(changeCOAView);
                        }
                    }
                }/*,
                {
                    // Filter-bar tracking num
                    view: "text",
                    id: "list_input1",
                    label: "Filter list by tracking number",
                    css: "fltr",
                    labelWidth: 200
                }*/,

            ]
        },
        {
            cols: [
                {
                    view: "form", id: "coaArchiveForm", elements: [
                        {
                            view: "datatable",
                            id: "coaArchiveViewDatatable",
                            visibleBatch: 1,
                            select: true,
                            editable: true,
                            autowidth: true,
                            data: coaArchiveData,
                            columns: [
                                {
                                    id: "cb1",
                                    name: "CB1_COA",
                                    header: {content: "masterCheckbox"},
                                    checkValue: 'on',
                                    uncheckValue: 'off',
                                    template: "{common.checkbox()}",
                                    batch: 1,
                                    width: 30
                                },
                                {
                                    id: "id",
                                    header: "ID",
                                    sort: "string",
                                    adjust: "data",
                                    name: "archive_idCOA",
                                    batch: 1,
                                },
                                {
                                    id: "partNumber",
                                    header: ["Tracking Number", {content: "textFilter"}],
                                    sort: "string",
                                    adjust: "data",
                                    name: "archives_trackingNumberCOA",
                                    template: function (obj) {
                                        if (obj.controlledSubstance == 1)
                                            return "<span style='color:blue;font-weight:bold;'>" + obj.partNumber + "</span>";
                                        else if (obj.hazardousMaterial == 1)
                                            return "<span style='color:red;font-weight:bold;'>" + obj.partNumber + "</span>";
                                        else
                                            return "<b>" + obj.partNumber + "</b>";
                                    }
                                },
                                {
                                    id: "storage_temperature_id",
                                    header: "Temp",
                                    sort: "string",
                                    adjust: "data",
                                    batch: 1,
                                    collection: storageTemp
                                },
                                {
                                    id: "JobLine_id",
                                    name: "archive_items_idCOA",
                                    header: "Items ID",
                                    sort: "string",
                                    batch: 10,
                                    adjust: "data",
                                },
                                {
                                    id: "qaApprovedDate",
                                    header: ["COA Date", {content: "textFilter"}],
                                    sort: "date",
                                    adjust: "data",
                                    batch: 1,
                                    format: webix.Date.dateToStr("%m-%d-%Y")
                                },
                                {
                                    header: "Active Ingredient Name",
                                    id: "name",
                                    adjust: "header",
                                    sort: "string",
                                    name: "archive_aiCOA",
                                    batch: 5,
                                    template: function (obj) {
                                        if (obj.controlledSubstance == 1)
                                            return "<span style='color:blue;font-weight:bold;'>" + obj.name + "</span>";
                                        else if (obj.hazardousMaterial == 1)
                                            return "<span style='color:red;font-weight:bold;'>" + obj.name + "</span>";
                                        else
                                            return "<b>" + obj.name + "</b>";
                                    }
                                },
                                {
                                    id: "archives_boxID",
                                    header: "- Boxes  &#92;/ -",
                                    name: "archives_boxIDCOA",
                                    adjust: "header",
                                    editor: "combo",
                                    batch: 1,
                                    collection: archiveBoxName
                                },
                                {
                                    id: "archives_bagID",
                                    header: "- Bags  &#92;/ -",
                                    name: "archives_bagIDCOA",
                                    adjust: "header",
                                    editor: "combo",
                                    batch: 1,
                                    collection: archiveBagName
                                },
                                {
                                    id: "archives_comments",
                                    header: "Comment",
                                    name: "archives_commentCOA",
                                    adjust: "header",
                                    batch: 5,
                                    editor: "text"
                                },
                                {
                                    view: "label",
                                    id: "JobLine_id",
                                    header: "JobLine_id",
                                    name: "archives_jobLine_idCOA",
                                    batch: 10
                                },
                                {view: "label", id: "id", header: "item_id", name: "archive_items_idCOA", batch: 10},
                                {
                                    view: "label",
                                    id: "status_id",
                                    header: "status_id",
                                    name: "archives_statusCOA",
                                    batch: 10
                                },
                                {
                                    view: "text",
                                    id: "archives_UUIDALLMULTI",
                                    hearder: "UUID",
                                    batch: 10,
                                    value: archiveID
                                },
                                {
                                    id: "",
                                    template: "<button class='des_BasicIconButton3' onclick='saveEditedArchiveRowForCOA()'><i class='fas fa-archive'></i></button>",
                                    css: "padding_less"
                                }
                            ]

                        }
                    ]
                },
                {view: "resizer"},
                // Form on the right side of the screen used to save multi JobLines based on what is checked on the checkboxes in the UI
                {
                    view: "form",
                    id: "coaArchiveViewForm",
                    height: "650",
                    width: "250",
                    elements: [
                        {
                            view: "combo",
                            id: "archives_boxIDCOAMULTI",
                            label: "Box",
                            options: archiveBoxName,
                            disabled: true
                        },
                        {
                            view: "combo",
                            id: "archives_bagIDCOAMULTI",
                            label: "Bag",
                            options: archiveBagName,
                            disabled: true
                        },
                        {
                            view: "text",
                            id: "archives_commentCOAMULTI",
                            label: "Comments",
                            labelPosition: "top",
                            height: 150,
                            disabled: true
                        },

                        {
                            view: "button",
                            id: "archiveCOAMULTI_save",
                            label: "Save",
                            align: 'left',
                            click: "saveTheArchiveCOA",
                            disabled: true
                        },

                    ]
                }

            ]
        }
    ]
};
const waitingPanelView = {
    id: 'waitArchives',
    height: "700",
    rows: [
        {
            cols: [
                {
                    view: "select", label: "Show", value: 1, labelWidth: 65, width: 150, options: [
                        {id: 1, value: "Main"},
                        {id: 5, value: "All"},
                        {id: 10, value: "Debug"}
                    ],
                    on: {
                        onChange: function (changeWaitView) {
                            showBatchwait(changeWaitView);
                        }
                    }
                }/*,
                {
                    // Filter-bar tracking num
                    view: "text",
                    id: "list_input2",
                    label: "Filter list by tracking number",
                    css: "fltr",
                    labelWidth: 200
                }*/,

            ]
        },
        {
            cols: [
                {
                    view: "form", id: "waitArchiveForm", elements: [
                        {
                            view: "datatable",
                            id: "waitArchiveViewDatatable",
                            visibleBatch: 1,
                            //width:"1000",
                            select: true,
                            editable: true,
                            autowidth: true,
                            data: waitArchiveData,
                            columns: [
                                {
                                    id: "cb1",
                                    name: "CB1",
                                    header: {content: "masterCheckbox"},
                                    checkValue: 'on',
                                    uncheckValue: 'off',
                                    template: "{common.checkbox()}",
                                    batch: 1,
                                    width: 30
                                },
                                {
                                    id: "id",
                                    header: "ID",
                                    sort: "string",
                                    adjust: "data",
                                    name: "archive_idWAIT",
                                    batch: 1,
                                },
                                {
                                    id: "partNumber",
                                    header: ["Tracking Number", {content: "textFilter"}],
                                    sort: "string",
                                    adjust: "data",
                                    name: "archives_trackingNumberWAIT",
                                    template: function (obj) {
                                        if (obj.controlledSubstance == 1)
                                            return "<span style='color:blue;font-weight:bold;'>" + obj.partNumber + "</span>";
                                        else if (obj.hazardousMaterial == 1)
                                            return "<span style='color:red;font-weight:bold;'>" + obj.partNumber + "</span>";
                                        else
                                            return "<b>" + obj.partNumber + "</b>";
                                    }
                                },
                                {
                                    id: "storage_temperature_id",
                                    header: "Temp",
                                    sort: "string",
                                    adjust: "data",
                                    batch: 1,
                                    collection: storageTemp
                                },
                                {
                                    id: "JobLine_id",
                                    name: "archive_items_idWAIT",
                                    header: "Items ID",
                                    sort: "string",
                                    batch: 10,
                                    adjust: "data",
                                },
                                {
                                    id: "qaApprovedDate",
                                    header: ["COA Date", {content: "textFilter"}],
                                    sort: "date",
                                    adjust: "data",
                                    batch: 1,
                                    format: webix.Date.dateToStr("%m-%d-%Y")
                                },
                                {
                                    header: "Active Ingredient Name",
                                    id: "name",
                                    adjust: "header",
                                    sort: "string",
                                    name: "archive_aiWAIT",
                                    batch: 5,
                                    template: function (obj) {
                                        if (obj.controlledSubstance == 1)
                                            return "<span style='color:blue;font-weight:bold;'>" + obj.name + "</span>";
                                        else if (obj.hazardousMaterial == 1)
                                            return "<span style='color:red;font-weight:bold;'>" + obj.name + "</span>";
                                        else
                                            return "<b>" + obj.name + "</b>";
                                    }
                                },
                                {
                                    id: "archives_boxID",
                                    header: "- Boxes  &#92;/ -",
                                    name: "archives_boxIDWAIT",
                                    adjust: "header",
                                    editor: "combo",
                                    batch: 1,
                                    collection: archiveBoxName
                                },
                                {
                                    id: "archives_bagID",
                                    header: "- Bags  &#92;/ -",
                                    name: "archives_bagIDWAIT",
                                    adjust: "header",
                                    editor: "combo",
                                    batch: 1,
                                    collection: archiveBagName
                                },
                                {
                                    id: "archives_comments",
                                    header: "Comment",
                                    name: "archives_commentWAIT",
                                    adjust: "header",
                                    batch: 5,
                                    editor: "text"
                                },
                                {
                                    view: "label",
                                    id: "JobLine_id",
                                    header: "JobLine_id",
                                    name: "archives_jobLine_idWAITMULTI",
                                    batch: 10
                                },
                                {
                                    view: "label",
                                    id: "id",
                                    header: "item_id",
                                    name: "archive_items_idWAITMULTI",
                                    batch: 10
                                },
                                {
                                    view: "label",
                                    id: "status_id",
                                    header: "status_id",
                                    name: "archives_statusWAITMULTI",
                                    batch: 10
                                },
                                {
                                    view: "text",
                                    id: "archives_UUIDWAITMULTI",
                                    hearder: "UUID",
                                    batch: 10,
                                    value: archiveID
                                },
                                {
                                    id: "",
                                    template: "<button class='des_BasicIconButton3' onclick='saveEditedArchiveRowForWAIT()'><i class='fas fa-archive'></i></button>",
                                    css: "padding_less"
                                }
                            ]

                        }
                    ]
                },
                {view: "resizer"},
                // Form on the right side of the screen used to save multi JobLines based on what is checked on the checkboxes in the UI
                {
                    view: "form",
                    id: "waitArchiveViewForm",
                    height: "650",
                    width: "250",
                    elements: [
                        {
                            view: "combo",
                            id: "archives_boxIDWAITMULTI",
                            label: "Box",
                            options: archiveBoxName,
                            disabled: true
                        },
                        {
                            view: "combo",
                            id: "archives_bagIDWAITMULTI",
                            label: "Bag",
                            options: archiveBagName,
                            disabled: true
                        },
                        {
                            view: "text",
                            id: "archives_commentWAITMULTI",
                            label: "Comments",
                            labelPosition: "top",
                            height: 150,
                            disabled: true
                        },

                        {
                            view: "button",
                            id: "archiveWAITMULTI_save",
                            label: "Save",
                            align: 'left',
                            click: "saveTheArchiveWAIT",
                            disabled: true
                        },

                    ]
                }

            ]
        }
    ]
};
const ssPanelView = {
    id: 'ssArchives', height: "700",
    rows: [
        {
            cols: [
                {
                    view: "select", label: "Show", value: 1, labelWidth: 65, width: 150, options: [
                        {id: 1, value: "Main"},
                        {id: 5, value: "All"},
                        {id: 10, value: "Debug"}
                    ],
                    on: {
                        onChange: function (changeSSView) {
                            showBatchss(changeSSView);
                        }
                    }
                }/*,
                {
                    // Filter-bar tracking num
                    view: "text",
                    id: "list_input3",
                    label: "Filter list by tracking number",
                    css: "fltr",
                    labelWidth: 200
                }*/,

            ]
        },
        {
            cols: [
                {
                    view: "form", id: "ssArchiveForm", elements: [
                        {
                            view: "datatable",
                            id: "ssArchiveViewDatatable",
                            visibleBatch: 1,
                            //width:"1000",
                            select: true,
                            editable: true,
                            autowidth: true,
                            data: ssArchiveData,
                            columns: [
                                {
                                    id: "cb1",
                                    name: "CB1",
                                    header: {content: "masterCheckbox"},
                                    checkValue: 'on',
                                    uncheckValue: 'off',
                                    template: "{common.checkbox()}",
                                    batch: 1,
                                    width: 30
                                },
                                {
                                    id: "id",
                                    header: "ID",
                                    sort: "string",
                                    adjust: "data",
                                    name: "archive_idSS",
                                    batch: 1,
                                },
                                {
                                    id: "partNumber",
                                    header: ["Tracking Number", {content: "textFilter"}],
                                    sort: "string",
                                    adjust: "data",
                                    name: "archives_trackingNumberSS",
                                    template: function (obj) {
                                        if (obj.controlledSubstance == 1)
                                            return "<span style='color:blue;font-weight:bold;'>" + obj.partNumber + "</span>";
                                        else if (obj.hazardousMaterial == 1)
                                            return "<span style='color:red;font-weight:bold;'>" + obj.partNumber + "</span>";
                                        else
                                            return "<b>" + obj.partNumber + "</b>";
                                    }
                                },
                                {
                                    id: "storage_temperature_id",
                                    header: "Temp",
                                    sort: "string",
                                    adjust: "data",
                                    batch: 1,
                                    collection: storageTemp
                                },
                                {
                                    id: "JobLine_id",
                                    name: "archive_items_idSS",
                                    header: "Items ID",
                                    sort: "string",
                                    batch: 10,
                                    adjust: "data",
                                },
                                {
                                    id: "qaApprovedDate",
                                    header: ["COA Date", {content: "textFilter"}],
                                    sort: "date",
                                    adjust: "data",
                                    batch: 1,
                                    format: webix.Date.dateToStr("%m-%d-%Y")
                                },
                                {
                                    header: "Active Ingredient Name",
                                    id: "name",
                                    adjust: "header",
                                    sort: "string",
                                    name: "archive_aiSS",
                                    batch: 5,
                                    template: function (obj) {
                                        if (obj.controlledSubstance == 1)
                                            return "<span style='color:blue;font-weight:bold;'>" + obj.name + "</span>";
                                        else if (obj.hazardousMaterial == 1)
                                            return "<span style='color:red;font-weight:bold;'>" + obj.name + "</span>";
                                        else
                                            return "<b>" + obj.name + "</b>";
                                    }
                                },
                                {
                                    id: "archives_boxID",
                                    header: "- Boxes  &#92;/ -",
                                    name: "archives_boxIDSS",
                                    adjust: "header",
                                    editor: "combo",
                                    batch: 1,
                                    collection: archiveBoxName
                                },
                                {
                                    id: "archives_bagID",
                                    header: "- Bags  &#92;/ -",
                                    name: "archives_bagIDSS",
                                    adjust: "header",
                                    editor: "combo",
                                    batch: 1,
                                    collection: archiveBagName
                                },
                                {
                                    id: "archives_comments",
                                    header: "Comment",
                                    name: "archives_commentSS",
                                    adjust: "header",
                                    batch: 5,
                                    editor: "text"
                                },
                                {
                                    view: "label",
                                    id: "JobLine_id",
                                    header: "JobLine_id",
                                    name: "archives_jobLine_idSSMULTI",
                                    batch: 10
                                },
                                {
                                    view: "label",
                                    id: "id",
                                    header: "item_id",
                                    name: "archive_items_idSSMULTI",
                                    batch: 10
                                },
                                {
                                    view: "label",
                                    id: "status_id",
                                    header: "status_id",
                                    name: "archives_statusSSMULTI",
                                    batch: 10
                                },
                                {
                                    view: "text",
                                    id: "archives_UUIDSSMULTI",
                                    hearder: "UUID",
                                    batch: 10,
                                    value: archiveID
                                },
                                {
                                    id: "",
                                    template: "<button class='des_BasicIconButton3' onclick='saveEditedArchiveRowForSS()'><i class='fas fa-archive'></i></button>",
                                    css: "padding_less"
                                }
                            ]

                        }
                    ]
                },
                {view: "resizer"},
                // Form on the right side of the screen used to save multi JobLines based on what is checked on the checkboxes in the UI
                {
                    view: "form",
                    id: "ssArchiveViewForm",
                    height: "650",
                    width: "250",
                    elements: [
                        {
                            view: "combo",
                            id: "archives_boxIDSSMULTI",
                            label: "Box",
                            options: archiveBoxName,
                            disabled: true
                        },
                        {
                            view: "combo",
                            id: "archives_bagIDSSMULTI",
                            label: "Bag",
                            options: archiveBagName,
                            disabled: true
                        },
                        {
                            view: "text",
                            id: "archives_commentSSMULTI",
                            label: "Comments",
                            labelPosition: "top",
                            height: 150,
                            disabled: true
                        },

                        {
                            view: "button",
                            id: "archiveSSMULTI_save",
                            label: "Save",
                            align: 'left',
                            click: "saveTheArchiveSS",
                            disabled: true
                        },

                    ]
                }

            ]
        }
    ]
};
const oldPanelView = {
    id: 'oldArchives', height: "700",
    rows: [
        {
            cols: [
                {
                    view: "combo", label: "Show", value: 1, labelWidth: 65, width: 150, options: [
                        {id: 1, value: "Main"},
                        {id: 10, value: "Debug"}
                    ],
                    on: {
                        onChange: function (changeOldView) {
                            showBatchOld(changeOldView);
                        }
                    }
                }

            ]
        },
        {
            cols: [
                /* {
                     view: "text",
                     id: "list_input4",
                     label: "Filter list by tracking number",
                     css: "fltr",
                     labelWidth: 200
                 },*/
                {
                    view: "datatable",
                    id: "oldArchivesViewDatatable",
                    visibleBatch: 1,
                    select: true,
                    autowidth: true,
                    data: oldArchiveData,
                    editable: true,
                    columns: [

                        {id: "archives_id", header: "ID", sort: "string", adjust: "data"},
                        {
                            id: "archives_trackingNumber",
                            header: "Tracking Number",
                            sort: "string",
                            adjust: "data",
                            template: function (obj) {
                                if (obj.archives_controlled == 1)
                                    return "<span style='color:blue;'>" + obj.archives_trackingNumber + "</span>";
                                else if (obj.archives_hazard == 1)
                                    return "<span style='color:red;'>" + obj.archives_trackingNumber + "</span>";
                                else
                                    return "<span style='color:gray;'>" + obj.archives_trackingNumber + "</span>";
                            }
                        },
                        {
                            id: "archives_boxID",
                            header: "Monthly Box",
                            sort: "string",
                            adjust: "header",
                            value: "archives_boxID",
                            editor: "combo",
                            collection: archiveBoxName
                        },
                        {
                            id: "archives_bagID",
                            header: "Numbered Bag",
                            sort: "string",
                            adjust: "header",
                            value: "archives_boxID",
                            editor: "combo",
                            collection: archiveBagName
                        },
                        {
                            id: "archives_comment",
                            header: "Comments",
                            sort: "string",
                            adjust: "header",
                            editor: "text",
                            batch: 1
                        },
                        {id: "archives_items_id", header: "items_id", sort: "string", adjust: "header", batch: 10},
                        {id: "archives_jobLine_id", header: "jobline_id", sort: "string", adjust: "header", batch: 10},
                        {
                            id: "archives_previousStatus",
                            header: "Previous Status",
                            sort: "string",
                            adjust: "header",
                            batch: 10
                        },
                        {id: "archives_UUID", header: "UUID", sort: "string", adjust: "string", batch: 10},
                        {
                            id: "",
                            template: "<button class='des_BasicIconButton3' onclick='saveEditedArchiveRowForOLD()'><i class='fas fa-archive'></i></button>",
                            css: "padding_less"
                        },
                        {
                            id: "",
                            template: "<button class='des_BasicIconButton2' onclick='deleteEditedArchiveRowForOLD()'><i class='fas fa-trash'></i></button>",
                            css: "padding_less"
                        }

                    ]
                },
                {view: "resizer"},
                // Form on the right side of the screen used to save multi JobLines based on what is checked on the checkboxes in the UI
                {
                    view: "form",
                    id: "oldArchiveViewForm",
                    height: "650",
                    width: "250",
                    elements: [
                        {view: "label", id: "archives_UUID", label: "UUID#", hidden: true},
                        {view: "combo", id: "archives_boxID", label: "Box", options: archiveBoxName, disabled: true},
                        {view: "combo", id: "archives_bagID", label: "Bag", options: archiveBagName, disabled: true},
                        {
                            view: "text",
                            id: "archives_comment",
                            label: "Comments",
                            labelPosition: "top",
                            height: 150,
                            disabled: true
                        },

                        {
                            view: "button",
                            id: "archiveOLDMULTI_save",
                            label: "Save",
                            align: 'left',
                            click: "saveTheArchiveOLD",
                            disabled: true
                        }

                    ]
                }
            ]
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
            {view: "icon", icon: "fas fa-archive"},
            {view: "label", label: "Inventory Archives"},
            {
                view: "icon", icon: "fas fa-times", click: function () {
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

//////////////////////////////////// Filter Text in a datagrid //////////////////////// This code has been deprecated ////////////////////////
/*////// Logic for the filter on the test descriptions list /////////////////////
$$("all_list_input").attachEvent("onTimedKeyPress", function() {
    var value = this.getValue().toLowerCase();
    $$("allArchiveViewDatatable").filter(function (obj) {
        return obj.partNumber.toLowerCase().indexOf(value) === 0;
    })
});
$$("list_input1").attachEvent("onTimedKeyPress", function () {
    var value = this.getValue().toLowerCase();
    $$("coaArchiveViewDatatable").filter(function (obj) {
        return obj.partNumber.toLowerCase().indexOf(value) === 0;
    })
});
$$("list_input2").attachEvent("onTimedKeyPress", function () {
    var value = this.getValue().toLowerCase();
    $$("waitArchiveViewDatatable").filter(function (obj) {
        return obj.partNumber.toLowerCase().indexOf(value) === 0;
    })
});
$$("list_input3").attachEvent("onTimedKeyPress", function () {
    var value = this.getValue().toLowerCase();
    $$("ssArchiveViewDatatable").filter(function (obj) {
        return obj.partNumber.toLowerCase().indexOf(value) === 0;
    })
});
$$("list_input4").attachEvent("onTimedKeyPress", function () {
    var value = this.getValue().toLowerCase();
    $$("oldArchivesViewDatatable").filter(function (obj) {
        return obj.partNumber.toLowerCase().indexOf(value) === 0;
    })
});
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// */


///////////////////////////////////////////////// ** Detect what row has been selected in the UI ** //////////////////////////////////
////// Datagrid selection is bound to the form panel ///////////////////////////
$$("allArchiveViewDatatable").attachEvent("onAfterSelect", function (id) {
    $$("allArchiveViewForm").setValues(this.getItem(id));
});
///////////////////////////////////////////////////////////////////////////////
////// Datagrid selection and binding to form panel ///////////////////////////
$$("coaArchiveViewDatatable").attachEvent("onAfterSelect", function (id) {
    $$("coaArchiveViewForm").setValues(this.getItem(id));
});
///////////////////////////////////////////////////////////////////////////////
////// Datagrid selection and binding to form panel ///////////////////////////
$$("waitArchiveViewDatatable").attachEvent("onAfterSelect", function (id) {
    $$("waitArchiveViewForm").setValues(this.getItem(id));
});
///////////////////////////////////////////////////////////////////////////////
////// Datagrid selection and binding to form panel ///////////////////////////
$$("ssArchiveViewDatatable").attachEvent("onAfterSelect", function (id) {
    $$("ssArchiveViewForm").setValues(this.getItem(id));
});
////// Datagrid selection and binding to form panel ///////////////////////////
$$("oldArchivesViewDatatable").attachEvent("onAfterSelect", function (id) {
    $$("oldArchiveViewForm").setValues(this.getItem(id));
    $$("archives_UUID").setValue(this.getItem(id).archives_UUID);
    $$("archives_boxID").setValue(this.getItem(id).archives_boxID);
    $$("archives_bagID").setValue(this.getItem(id).archives_bagID);
    $$("archives_comment").setValue(this.getItem(id).archives_comment);

});
///////////////////////////////////////////////////////////////////////////////

///////////////////////////////////////////////////////// Batch tag selector  ////////////////////////////////////////////////////////
//// This code will select what BATCH value will be shown based on what value is selected in the select/combo menu                ////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

////////////////// Change the Batch in ALL //////////////////
function showBatchAll(changeAllView) {
    $$("allArchiveViewDatatable").showColumnBatch(changeAllView);
}

///////////////// Change the Batch in COA //////////////////
function showBatchcoa(changeCOAView) {
    $$("coaArchiveViewDatatable").showColumnBatch(changeCOAView);
}

////////////////// Change the Batch Data in SS //////////////////
function showBatchss(changeSSView) {
    $$("ssArchiveViewDatatable").showColumnBatch(changeSSView);
}

////////////////// Change the Batch Data in waiting //////////////////
function showBatchwait(changeWaitView) {
    $$("waitArchiveViewDatatable").showColumnBatch(changeWaitView);
}

////////////////// Change the Batch Data in waiting //////////////////
function showBatchOld(changeOldView) {
    $$("oldArchivesViewDatatable").showColumnBatch(changeOldView);
}

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//// The following will save the box and bag data into the labs db table archive and change the status_id field in the JobLine table ////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

////////////////// Save the datagrid row data in the ALL tab ////////////////////////////
function saveEditedArchiveRowForALL() {
    var text = 1;
    if (!$$("allArchiveViewDatatable").getSelectedId()) {              // Checks if you've selected anything
        webix.message("Please select a row next time");              // Nope you didn't
        return;

    } else if (text === null) {                                          // Checks if you've edited anything
        webix.message("You did't change anything, silly!");              // Nope you didn't
        return;
    }
//// Collect the data from the datagrid
    var lineSelector = $$("allArchiveViewDatatable").getSelectedId(); // You need this to id which line your editing.
    var lineSelectorBox = $$("allArchiveViewDatatable").getItem(lineSelector).archives_boxID;  // the following grab the data in the datagrid and save it to a var
    var lineSelectorBag = $$("allArchiveViewDatatable").getItem(lineSelector).archives_bagID;
    var lineSelectorTracking = $$("allArchiveViewDatatable").getItem(lineSelector).partNumber;
    var lineSelectorActive = $$("allArchiveViewDatatable").getItem(lineSelector).name;
    var lineSelectorComments = $$("allArchiveViewDatatable").getText(lineSelector, "archives_comments");
    var lineSelectorItems_id = $$("allArchiveViewDatatable").getText(lineSelector, "id");
    var lineSelectorJobLine_id = $$("allArchiveViewDatatable").getText(lineSelector, "JobLine_id");
    var lineSelectorHazardous = $$("allArchiveViewDatatable").getText(lineSelector, "hazardousMaterial");
    var lineSelectorControlled = $$("allArchiveViewDatatable").getText(lineSelector, "controlledSubstance");
    var lineSelectorPreviousStatus = $$("allArchiveViewDatatable").getText(lineSelector, "status_id");
    var lineSelectorStatusId = 19; // Change the status in the LABPRD.JobLine.status_id
//// Send the collected data to the DataTransport
    buildJSONDataTransport(lineSelector, lineSelectorBox, lineSelectorBag, lineSelectorTracking, lineSelectorActive, lineSelectorComments, lineSelectorItems_id, lineSelectorJobLine_id, lineSelectorStatusId, lineSelectorHazardous, lineSelectorControlled, lineSelectorPreviousStatus);
}

/////////////////////////////////////////////////////////////////////////////////////////
////////////////// Save the datagrid row data in the ALL tab ////////////////////////////
function saveEditedArchiveRowForCOA(text) {
    if (!$$("coaArchiveViewDatatable").getSelectedId()) {              // Checks if you've selected anything
        webix.message("Please select a row next time");              // Nope you didn't
        return;

    } else if (text === null) {                                          // Checks if you've edited anything
        webix.message("You did't change anything, silly!");              // Nope you didn't
        return;
    }
//// Collect the data from the datagrid
    var lineSelector = $$("coaArchiveViewDatatable").getSelectedId(); // You need this to id which line your editing.
    var lineSelectorBox = $$("coaArchiveViewDatatable").getText(lineSelector, "archives_boxID");  // the following grab the data in the datagrid and save it to a var
    var lineSelectorBag = $$("coaArchiveViewDatatable").getText(lineSelector, "archives_bagID");
    var lineSelectorTracking = $$("coaArchiveViewDatatable").getText(lineSelector, "partNumber");
    var lineSelectorActive = $$("coaArchiveViewDatatable").getText(lineSelector, "name");
    var lineSelectorComments = $$("coaArchiveViewDatatable").getText(lineSelector, "archives_comments");
    var lineSelectorItems_id = $$("coaArchiveViewDatatable").getText(lineSelector, "id");
    var lineSelectorJobLine_id = $$("coaArchiveViewDatatable").getText(lineSelector, "JobLine_id");
    var lineSelectorHazardous = $$("coaArchiveViewDatatable").getText(lineSelector, "hazardousMaterial");
    var lineSelectorControlled = $$("coaArchiveViewDatatable").getText(lineSelector, "controlledSubstance");
    var lineSelectorPreviousStatus = $$("coaArchiveViewDatatable").getText(lineSelector, "status_id");
    var lineSelectorStatusId = 19; // Change the status in the LABPRD.JobLine.status_id
//// Send the collected data to the DataTransport
    buildJSONDataTransport(lineSelector, lineSelectorBox, lineSelectorBag, lineSelectorTracking, lineSelectorActive, lineSelectorComments, lineSelectorItems_id, lineSelectorJobLine_id, lineSelectorStatusId, lineSelectorHazardous, lineSelectorControlled, lineSelectorPreviousStatus);
}

/////////////////////////////////////////////////////////////////////////////////////////
////////////////// Save the datagrid row data in the WAIT tab ////////////////////////////
function saveEditedArchiveRowForWAIT(text) {
    if (!$$("waitArchiveViewDatatable").getSelectedId()) {              // Checks if you've selected anything
        webix.message("Please select a row next time");              // Nope you didn't
        return;

    } else if (text === null) {                                          // Checks if you've edited anything
        webix.message("You did't change anything, silly!");              // Nope you didn't
        return;
    }
//// Collect the data from the datagrid
    var lineSelector = $$("waitArchiveViewDatatable").getSelectedId(); // You need this to id which line your editing.
    var lineSelectorBox = $$("waitArchiveViewDatatable").getText(lineSelector, "archives_boxID");  // the following grab the data in the datagrid and save it to a var
    var lineSelectorBag = $$("waitArchiveViewDatatable").getText(lineSelector, "archives_bagID");
    var lineSelectorTracking = $$("waitArchiveViewDatatable").getText(lineSelector, "partNumber");
    var lineSelectorActive = $$("waitArchiveViewDatatable").getText(lineSelector, "name");
    var lineSelectorComments = $$("waitArchiveViewDatatable").getText(lineSelector, "archives_comments");
    var lineSelectorItems_id = $$("waitArchiveViewDatatable").getText(lineSelector, "id");
    var lineSelectorJobLine_id = $$("waitArchiveViewDatatable").getText(lineSelector, "JobLine_id");
    var lineSelectorHazardous = $$("waitArchiveViewDatatable").getText(lineSelector, "hazardousMaterial");
    var lineSelectorControlled = $$("waitArchiveViewDatatable").getText(lineSelector, "controlledSubstance");
    var lineSelectorPreviousStatus = $$("waitArchiveViewDatatable").getText(lineSelector, "status_id");

    var lineSelectorStatusId = 19; // Change the status in the LABPRD.JobLine.status_id
//// Send the collected data to the DataTransport
    buildJSONDataTransport(lineSelector, lineSelectorBox, lineSelectorBag, lineSelectorTracking, lineSelectorActive, lineSelectorComments, lineSelectorItems_id, lineSelectorJobLine_id, lineSelectorStatusId, lineSelectorHazardous, lineSelectorControlled, lineSelectorPreviousStatus);
}

/////////////////////////////////////////////////////////////////////////////////////////
////////////////// Save the datagrid row data in the SS tab ////////////////////////////
function saveEditedArchiveRowForSS(text) {
    if (!$$("ssArchiveViewDatatable").getSelectedId()) {              // Checks if you've selected anything
        webix.message("Please select a row next time");              // Nope you didn't
        return;

    } else if (text === null) {                                          // Checks if you've edited anything
        webix.message("You did't change anything, silly!");              // Nope you didn't
        return;
    }
//// Collect the data from the datagrid
    var lineSelector = $$("ssArchiveViewDatatable").getSelectedId(); // You need this to id which line your editing.
    var lineSelectorBox = $$("ssArchiveViewDatatable").getText(lineSelector, "archives_boxID");  // the following grab the data in the datagrid and save it to a var
    var lineSelectorBag = $$("ssArchiveViewDatatable").getText(lineSelector, "archives_bagID");
    var lineSelectorTracking = $$("ssArchiveViewDatatable").getText(lineSelector, "partNumber");
    var lineSelectorActive = $$("ssArchiveViewDatatable").getText(lineSelector, "name");
    var lineSelectorComments = $$("ssArchiveViewDatatable").getText(lineSelector, "archives_comments");
    var lineSelectorItems_id = $$("ssArchiveViewDatatable").getText(lineSelector, "id");
    var lineSelectorJobLine_id = $$("ssArchiveViewDatatable").getText(lineSelector, "JobLine_id");
    var lineSelectorHazardous = $$("ssArchiveViewDatatable").getText(lineSelector, "hazardousMaterial");
    var lineSelectorControlled = $$("ssArchiveViewDatatable").getText(lineSelector, "controlledSubstance");
    var lineSelectorPreviousStatus = $$("ssArchiveViewDatatable").getText(lineSelector, "status_id");

    var lineSelectorStatusId = 19; // Change the status in the LABPRD.JobLine.status_id
//// Send the collected data to the DataTransport
    buildJSONDataTransport(lineSelector, lineSelectorBox, lineSelectorBag, lineSelectorTracking, lineSelectorActive, lineSelectorComments, lineSelectorItems_id, lineSelectorJobLine_id, lineSelectorStatusId, lineSelectorHazardous, lineSelectorControlled, lineSelectorPreviousStatus);
}

/////////////////////////////////////////////////////////////////////////////////////////
////////////////// Save the datagrid row data in the OLD tab ////////////////////////////
function saveEditedArchiveRowForOLD(text) {
    if (!$$("oldArchivesViewDatatable").getSelectedId()) {              // Checks if you've selected anything
        webix.message("Please select a row next time");              // Nope you didn't
        return;

    } else if (text === null) {                                          // Checks if you've edited anything
        webix.message("You did't change anything, silly!");              // Nope you didn't
        return;
    }
//// Collect the data from the datagrid
    var lineSelector = $$("oldArchivesViewDatatable").getSelectedId(); // You need this to id which line your editing.
    var lineSelectorBox = $$("oldArchivesViewDatatable").getItem(lineSelector).archives_boxID;  // the following grab the data in the datagrid and save it to a var
    var lineSelectorBag = $$("oldArchivesViewDatatable").getItem(lineSelector).archives_bagID;
    var lineSelectorComments = $$("oldArchivesViewDatatable").getText(lineSelector, "archives_comment");
    var lineSelectorUUID = $$("oldArchivesViewDatatable").getText(lineSelector, "archives_UUID");
//// Send the collected data to the DataTransport
    buildJSONDataTransportUpdate(lineSelector, lineSelectorBox, lineSelectorBag, lineSelectorComments, lineSelectorUUID);
}

/////////////////////////////////////////////////////////////////////////////////////////
////////////////// Delete the datagrid row data in the OLD tab ////////////////////////////
function deleteEditedArchiveRowForOLD(text) {
    if (!$$("oldArchivesViewDatatable").getSelectedId()) {              // Checks if you've selected anything
        webix.message("Please select a row next time");              // Nope you didn't
        return;

    } else if (text === null) {                                          // Checks if you've edited anything
        webix.message("You did't change anything, silly!");              // Nope you didn't
        return;
    }
//// Collect the data from the datagrid
    var lineSelector = $$("oldArchivesViewDatatable").getSelectedId(); // You need this to id which line your editing.
    var lineSelectorUUID = $$("oldArchivesViewDatatable").getText(lineSelector, "archives_UUID");  // the following grab the data in the datagrid and save it to a var
    var lineSelectorPreviousStatus = $$("oldArchivesViewDatatable").getText(lineSelector, "archives_previousStatus");
    var lineSelectorJobLine_id = $$("oldArchivesViewDatatable").getText(lineSelector, "archives_jobLine_id");


    var lineSelectorStatusId = 19; // Change the status in the LABPRD.JobLine.status_id
//// Send the collected data to the DataTransport
    var theSubmitDataForJobLine = '{"status_id":"' + lineSelectorPreviousStatus + '"}';

//// AJAX URL that sends data to the PHP API
    //// ****** WARNING ****** This is an asynchronous transmission. There is no guaranty that the first will complete before the second starts
    webix.ajax().get("/labs2/php/api_methods/UPDATEz.php?db_name=LABSPRD&tableName=JobLines&JSONdata=" + theSubmitDataForJobLine + "&theWhereColumn=id&theUUID=" + lineSelectorJobLine_id);
    webix.ajax().get("/labs2/php/api_methods/DELETE.php?db_name=labs&tableName=archives&columnNames=archives_UUID&id=" + lineSelectorUUID);

    //// Need to update the datagrid with new fresh data
    refreshTheALLDatagrid();
    refreshTheCOADatagrid();
    refreshTheWAITDatagrid();
    refreshTheSSDatagrid();
    refreshTheOLDDatagrid();

}

/////////////////////////////////////////////////////////////////////////////////////////


/////////////////////////////////////////////////////////////////////////////////////////
//// Function to create the JSON data and sends the data to the PHP API for database ////
/////////////////////////////////////////////////////////////////////////////////////////
function buildJSONDataTransport(lineSelector, lineSelectorBox, lineSelectorBag, lineSelectorTracking, lineSelectorActive, lineSelectorComments, lineSelectorItems_id, lineSelectorJobLine_id, lineSelectorStatusId, lineSelectorHazardous, lineSelectorControlled, lineSelectorPreviousStatus) {
//// Build the var for the data JSON data transport to the PHP API
    var theSubmitDataForJobLine = '{"status_id":"' + lineSelectorStatusId + '"}';
    var theSubmitDataRAW = '{"success":true,"data":[{"archives_hazard":"' + lineSelectorHazardous + '","archives_controlled":"' + lineSelectorControlled + '","archives_previousStatus":"' + lineSelectorPreviousStatus + '","archives_UUID":"' + archiveID + '","archives_status":"' + lineSelectorStatusId + '","archives_jobLine_id":"' + lineSelectorJobLine_id + '","archives_items_id":"' + lineSelectorItems_id + '","archives_comment":"' + lineSelectorComments + '","archives_ai":"' + lineSelectorActive + '","archives_trackingNumber":"' + lineSelectorTracking + '","archives_boxID":"' + lineSelectorBox + '", "archives_bagID":"' + lineSelectorBag + '"}]}';
//// Stuff sent to outputs
    webix.message("You added " + lineSelectorTracking + " to " + lineSelectorBox + " and " + lineSelectorBag);  // Let the user know that they clicked on something and the data is processed
    console.log("The following two lines is what data was sent to the server");
    console.log(theSubmitDataRAW);
    console.log("Changed the JobLine id to: " + lineSelector);
//// AJAX URL that sends data to the PHP API
    //// ****** WARNING ****** This is an asynchronous transmission. There is no guaranty that the first will complete before the second starts
    webix.ajax().get("/labs2/php/api_methods/UPDATEz.php?db_name=LABSPRD&tableName=JobLines&JSONdata=" + theSubmitDataForJobLine + "&theWhereColumn=id&theUUID=" + lineSelectorJobLine_id);
    webix.ajax().get("/labs2/php/api_methods/INSERT.php?db_name=labs&tableName=archives&JSONdata=" + theSubmitDataRAW);
//// User conformation that it did something
    webix.message("Saved");
//// Need to update the datagrid with new fresh data
    refreshTheALLDatagrid();
    refreshTheCOADatagrid();
    refreshTheWAITDatagrid();
    refreshTheSSDatagrid();
    refreshTheOLDDatagrid();
}

/////////////////////////////////////////////////////////////////////////////////////////

/////////////////////////////////////////////////////////////////////////////////////////
//// Function to create the JSON data and sends the data to the PHP API for database ////
/////////////////////////////////////////////////////////////////////////////////////////
function buildJSONDataTransportUpdate(lineSelector, lineSelectorBox, lineSelectorBag, lineSelectorComments, lineSelectorUUID) {
//// Build the var for the data JSON data transport to the PHP API
    var theSubmitDataRAW = '{"archives_comment":"' + lineSelectorComments + '","archives_boxID":"' + lineSelectorBox + '", "archives_bagID":"' + lineSelectorBag + '"}';
//// Stuff sent to outputs
    webix.message("You changed to " + lineSelectorBox + " and " + lineSelectorBag);  // Let the user know that they clicked on something and the data is processed
    console.log("The following two lines is what data was sent to the server");
    console.log(theSubmitDataRAW);
//// AJAX URL that sends data to the PHP API
    //// ****** WARNING ****** This is an asynchronous transmission. There is no guaranty that the first will complete before the second starts
    webix.ajax().get("/labs2/php/api_methods/UPDATEz.php?db_name=labs&tableName=archives&JSONdata=" + theSubmitDataRAW + "&theWhereColumn=archives_UUID&theUUID=" + lineSelectorUUID);
//// User conformation that it did something
    webix.message("Saved");
//// Need to update the datagrid with new fresh data
    refreshTheALLDatagrid();
    refreshTheCOADatagrid();
    refreshTheWAITDatagrid();
    refreshTheSSDatagrid();
    refreshTheOLDDatagrid();
}

/////////////////////////////////////////////////////////////////////////////////////////

/////////////////////////////////////////////////////////////////////////////////////////
// Functions for Refreshing the Datagrids                                              //
/////////////////////////////////////////////////////////////////////////////////////////
//// All Datatable
function refreshTheALLDatagrid() {
    $$("allArchiveViewDatatable").clearAll();
    $$("allArchiveViewDatatable").load(allArchiveDataQuery);
    webix.message({text: "Data Updated"});
}

//// COA Datatable
function refreshTheCOADatagrid() {
    $$("coaArchiveViewDatatable").clearAll();
    $$("coaArchiveViewDatatable").load(coaArchiveDataQuery);
    webix.message({text: "Data Updated"});
}

//// WAIT Datatable
function refreshTheWAITDatagrid() {
    $$("waitArchiveViewDatatable").clearAll();
    $$("waitArchiveViewDatatable").load(waitArchiveDataQuery);
    webix.message({text: "Data Updated"});
}

//// SS Datatable
function refreshTheSSDatagrid() {
    $$("ssArchiveViewDatatable").clearAll();
    $$("ssArchiveViewDatatable").load(ssArchiveDataQuery);
    webix.message({text: "Data Updated"});
}

/// Old Datatable
function refreshTheOLDDatagrid() {
    $$("oldArchivesViewDatatable").clearAll();
    $$("oldArchivesViewDatatable").load(oldArchiveDataQuery);
    webix.message({text: "Data Updated"});
}

/////////////////////////////////////////////////////////////////////////////////////////


///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


/*////////////////// Save the the Tracking Numb to the database //////////////////////////
//// Save the data from the different panels base function. Use the below functions to collect the data and prep it for transport
function saveTheArchiveQuery(theSubmitDataRAW) {
    webix.ajax("/labs2/php/api_methods/INSERT.php?tableName=archives&JSONdata=" + theSubmitDataRAW);  //webix call to the ajax url for inserting data via php
    console.log("JSON DATA being sent to the server " + theSubmitDataRAW); //just a debug code to see the JSON sent
    $$("allArchiveViewDatatable").refresh();  // After data is sent we need to refresh the datagrid with the updated info
    webix.message({text: "Saved"}); // UI to display that something happened
    return;
}
//// Change the Tracking Number to status 19 "Finished" in the JobLines table
function saveTheItemsQuery(theSubmitDataUpdate,archiveJobsLineID) {
    webix.ajax("/labs2/php/api_methods/UPDATEz.php?db_name=LABSPRD&tableName=JobLines&JSONdata=" + theSubmitDataUpdate + "&theWhereColumn=id&theUUID=" + archiveJobsLineID);  //webix call to the ajax url for inserting data via php
    console.log("JSON DATA being sent to the server " + theSubmitDataUpdate); //just a debug code to see the JSON sent
    $$("allArchiveViewDatatable").refresh();  // After data is sent we need to refresh the datagrid with the updated info
    webix.message({text: "Saved"}); // UI to display that something happened
    return;
}
*/

//// Save data from the Archive All panel. Use the above functions to transport the data
function saveTheArchiveAll() {
    var archiveUUID = $$("archives_UUIDALL").getValue();  //grab the data from the form field above and set it to the var
    var archiveID = $$("archive_idALL").getValue();
    var archiveTracking = $$("archives_trackingNumberALL").getValue();
    var archiveBox = $$("archives_boxIDALL").getActiveId();   ///Try THIS *************************** <-------
    var archiveBag = $$("archives_bagIDALL").getValue();
    var archiveComments = $$("archives_commentALL").getValue();
    var archiveItemsID = $$("archive_items_idALL").getValue();
    var archiveJobsLineID = $$("archives_jobLine_idALL").getValue();
    var archiveAI = $$("archive_aiALL");
    var archiveStatus = 19; // LION status id of 19 is "archive"
    // Make the data into a JSON string for the php to process and submit to the db
    var theSubmitDataRAW = '{"success":true,"data":[{"archives_UUID":"' + archiveUUID + '", "archives_ai":"' + archiveAI + '", "archives_status":"' + archiveStatus + '", "archives_jobLine_id":"' + archiveJobsLineID + '", "archives_trackingNumber":"' + archiveTracking + '", "archives_items_id":"' + archiveItemsID + '", "archives_boxID":"' + archiveBox + '", "archives_bagID":"' + archiveBag + '", "archives_comment":"' + archiveComments + '"}]}';
    var theSubmitDataUpdate = '{"status_id":"' + archiveStatus + '"}';
    saveTheArchiveQuery(theSubmitDataRAW); // call the function to incorporate the json data in an ajax url to labs db
    saveTheItemsQuery(theSubmitDataUpdate, archiveJobsLineID); // call the function to incorporate the json data in an ajax url to LABSPRD db
}


//// Save multi data row based on checkboxes in the UI      ///////////////// <-- Future Feature to be added
// UPDATE JobLines SET status_id='19' where id="1" or id="2";


///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////