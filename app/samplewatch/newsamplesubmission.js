/*
 * <dsCode> Inc. (c) 2020. This copyright is based on the Apache License 2.0. Please contact David Sutton for use of this software.
 */

webix.ui(
    {
        "rows": [
            {
                "view": "toolbar", "css": "webix_dark", "padding": {"right": 10, "left": 10},
                "elements": [
                    {"view": "label", "label": "Submissions"}
                ]
            },
            {
                "type": "wide",
                "cols": [
                    {
                        "width": 217,
                        "rows": [
                            {"label": "Folders", "view": "label", "height": 30},
                            {"view": "sidebar", "url": "", "width": 0},
                            {"label": "Features", "view": "label", "height": 30},
                            {"url": "", "view": "sidebar", "width": 0}
                        ]
                    },
                    {
                        "rows": [
                            {
                                "view": "datatable",
                                "columns": [
                                    {
                                        "id": "title",
                                        "header": "Lot Number",
                                        "fillspace": true,
                                        "sort": "string",
                                        "adjust": "data",
                                        "hidden": false
                                    },
                                    {
                                        "id": "votes",
                                        "header": "Tracking Number",
                                        "sort": "string",
                                        "adjust": "header",
                                        "fillspace": true,
                                        "hidden": false
                                    },
                                    {
                                        "id": "year",
                                        "header": "Received Date",
                                        "sort": "date",
                                        "fillspace": false,
                                        "hidden": false
                                    },
                                    {"id": "id", "header": "Test Type", "fillspace": false, "hidden": false},
                                    {
                                        "id": "rating",
                                        "header": "Status",
                                        "sort": "string",
                                        "fillspace": false,
                                        "hidden": false
                                    }
                                ],
                                "select": true,
                                "scrollX": false,
                                "url": "",
                                "yCount": 10
                            },
                            {
                                "view": "form",
                                "minHeight": 380,
                                "autoheight": false,
                                "elements": [
                                    {
                                        "css": "webix_dark",
                                        "view": "toolbar",
                                        "height": 44,
                                        "cols": [
                                            {"view": "label", "label": "Detail"}
                                        ]
                                    },
                                    {
                                        "height": 168,
                                        "cols": [
                                            {
                                                "rows": [
                                                    {"label": "Lot Number", "view": "text", "height": 0},
                                                    {"label": "Status", "view": "text", "height": 0},
                                                    {"label": "Received", "view": "text", "height": 0},
                                                    {"label": "Tested", "view": "text", "height": 0},
                                                    {"label": "Reported", "view": "text", "height": 0},
                                                    {"label": "Test Type", "view": "text", "height": 0}
                                                ],
                                                "width": 300
                                            },
                                            {"view": "textarea", "label": "Notes", "width": 0, "labelAlign": "right"}
                                        ]
                                    },
                                    {
                                        "view": "button",
                                        "value": "Print Report",
                                        "css": "webix_primary",
                                        "align": "center",
                                        "inputWidth": 200,
                                        "height": 38
                                    }
                                ]
                            }
                        ]
                    }
                ]
            }
        ]
    }
).show();