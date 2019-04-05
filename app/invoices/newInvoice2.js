/*
 * <dsCode> Inc. (c) 2019. This copyright is based on the Apache License 2.0. Please contact David Sutton for use of this software.
 */

var invoiceUUID = "54da6e0b-2004-4be3-b6e1-ff5e551bf15f";  //(<?php Print($invoiceUUID); ?>");


webix.message({text: "Loaded"});
console.log("Here's what step two got: " + invoiceUUID);

webix.ui({

    view: "window",
    id: "NewInvoice",
    //height:"3000",
    width: "1000",
    move: true,

    head: "Create New Invoice",
    body: {
        rows: [
            {
                view: "form",
                id: "newInvoiceForm2",
                datatype: "json",
                width: "800",
                height: "1000",
                type: "space",
                elements: [{
                    rows: [

                        {
                            view: "text",
                            value: invoiceUUID,
                            name: "invoiceUUID",
                            label: "UUID",
                            readonly: true,
                            width: 360
                        },
                        {
                            cols: [
                                {
                                    template: "",
                                    align: "left"
                                },
                                {
                                    view: "property",
                                    align: "center",
                                    //maxWidth:"80",
                                    //minWidth:"75",
                                    //checkboxRefresh:true,
                                    elements: [
                                        {label: "Customer Info",type: "label"},
                                        {label: "Customer",     type: "text", id: "customerName", value: invoiceUUID},
                                        {label: "Cust #",       type: "text", id: "custNum"},
                                        {label: "Order #",      type: "text", id: "orderNumb"},
                                        {label: "Order Date",   type: "text", id: "orderDate"},
                                        {label: "Invoice #",    type: "text", id: "invoiceNumb"},
                                        {label: "Invoice Date", type: "text", id: "invoiceDate"},
                                        {label: "Lot #",        type: "text", id: "lotNumb"},
                                        {label: "Tests",        type: "label"},
                                        {label: "QYT",          type: "text", id: "qyt"},
                                        {label: "Description",  type: "combo",id: "descript", options: ["json", "xml", "csv"]},
                                        {label: "Price",        type: "text", id: "testPrice"},
                                        {label: "EXT",          type: "text", id: "extTestPrice"},
                                        {label: "Payment",      type: "label"},
                                        {label: "Credit Card",  type: "text", id: "ccard", hidden:false},
                                        {label: "PO #",         type: "text", id: "poNum", hidden:true},
                                        {label: "Name on Card", type: "text", id: "nameOnCard", hidden:false},
                                        {label: "Name on PO",   type: "text", id: "nameOnPO", hidden:true}

                                        // {label: "Date", type: "date", id: "date", format: webix.i18n.dateFormatStr},
                                        //{label: "Use JSONP", type: "checkbox", id: "jsonp"}
                                    ]
                                },
                                {
                                    template: "",
                                    align: "right"
                                }
                            ]
                        }

                    ]
                }
                ]
            }
        ]
    }

}).show();