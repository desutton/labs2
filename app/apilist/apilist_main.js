/*
 * <dsCode> Inc. (c) 2016. This copyright is based on the Apache License 2.0. Please contact David Sutton for use of this software.
 */

/**
 * Created by sutton on 5/19/16.
 */
webix.ui({
    view: "window",
    id: "api_list",
    height: 500,
    width: 950,
    move: true,
    head: "API List",
    body: {
        cols: [
            {
                view: "list",
                id: "ailist",
                width: 350,
                select: true,
                template: "#ai_name#",
                data: [{ai_UUID: 1, ai_name: "bello", ai_potencyRange: "1234"}]
                //url: "http://localhost/labs2/php/api_methods/SELECTz.php?tableName=activeIngredient&columnNames=ai_UUID,ai_name&dataName=data&select=5"

            },
            {
                view: "property",
                id: "sets",
                width: 600,
                elements: [
                    {label: "Detail", type: "label"},
                    {label: "AI UUID", type: "text", id: "url"},
                    {label: "Data type", type: "select", options: ["json", "xml", "csv"], id: "type"},
                    {label: "Use JSONP", type: "checkbox", id: "jsonp"}
                ]
            }
        ]

    }

}).show();