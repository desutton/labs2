/*
 * <dsCode> Inc. (c) 2020. This copyright is based on the Apache License 2.0. Please contact David Sutton for use of this software.
 */

///////////////////////////////////////////////////////////////////////////////
///                          START OF Global Vars                           ///
var gv_customerName = "Digital eSolutions";

const theUUID = Math.trunc(Math.random() * 100000000000).toString();
console.log(theUUID);

var qr = new QRious({
    element: document.getElementById('qr'),
    value: 'Custom value',
    size: 100,
    padding: null
});

///                           END OF Global VARS                            ///
///////////////////////////////////////////////////////////////////////////////


///////////////////////////////////////////////////////////////////////////////
///                          START OF UI Vars                               ///

const uigTopSection = {
    rows: [
        {
            view: "toolbar", cols: [
                {view: "label", label: "Sample Submission"}
            ], height: 49
        },
        {label: gv_customerName, view: "label", align: "center"},
        {
            height: 200,
            cols: [
                {
                    rows: [
                        {label: "Contact Info", view: "label", labelPosition: "top", align: "center"},
                        {
                            cols: [
                                {placeholder: "First Name", view: "text"},
                                {placeholder: "Last Name", view: "text"}
                            ]
                        },
                        {placeholder: "Dept", view: "text"},
                        {placeholder: "Email", view: "text"},
                        {placeholder: "Phone", view: "text"}
                    ]
                },
                {
                    rows: [
                        {label: "Lab Tech (Optional)", view: "label", labelPosition: "top", align: "center"},
                        {
                            cols: [{placeholder: "First Name", view: "text", labelAlign: "right"},
                                {placeholder: "Last Name", view: "text", labelAlign: "right"}
                            ]
                        },
                        {placeholder: "Dept", view: "text", labelAlign: "left"},
                        {placeholder: "Email", view: "text", labelAlign: "left"}
                    ]
                }
            ]
        }
    ]
};

const uigSampleSubmissionDatagrid = {
    view: "toolbar",
    height: 400,
    cols: [
        {
            rows: [
                {view: "label", label: "Sample Information", height: 31},
                {
                    url: "",
                    columns: [
                        {
                            id: "title",
                            header: "Active Ingredients",
                            fillspace: true,
                            sort: "string",
                            hidden: false
                        },
                        {
                            id: "year",
                            header: "Lot Numbers",
                            sort: "string",
                            fillspace: false,
                            hidden: false
                        },
                        {
                            id: "votes",
                            header: "Test(s) Required",
                            sort: "string",
                            fillspace: false,
                            hidden: false
                        },
                        {
                            id: "rating",
                            header: "Storage",
                            sort: "string",
                            fillspace: false,
                            hidden: false
                        },
                        {
                            id: "rank",
                            header: "Batch Size",
                            sort: "string",
                            fillspace: false,
                            hidden: false
                        },
                        {
                            id: "category",
                            header: "Time Points",
                            sort: "string",
                            fillspace: false,
                            hidden: false
                        },
                        {id: "title", header: "Comments", fillspace: false, hidden: false},
                        {id: "rank", header: "Amount Sent", fillspace: false, hidden: false}
                    ],
                    view: "datatable",
                    height: 0
                }
            ]
        }
    ]
};

const uigBillingForm = {
    view: "form",
    id: "uiPaymentForm",
    autoheight: true,
    rules: {
        "email": webix.rules.isEmail
    },
    rows: [
        {
            view: "text",
            placeholder: "Email for Accounting",
            name: "email",
            inputWidth: 450,
            invalidMessage: "Incorrect e-mail address"
        },
        {
            view: "radio",
            id: "uiPaymentType",
            width: 450,
            height: 15,
            labelPosition: "top",
            label: "Payment Type",
            //value: "One",
            options: [
                "Charge CC",
                "Invoice",
                "Check Enclosed"
            ]
        },
        {
            view: "radio",
            id: "uiMethodOfPayment",
            height: 15,
            width: 450,
            labelPosition: "top",
            label: "Method of Payment",
            hidden: true,
            //value: "One",
            options: [
                "MasterCard",
                " VISA",
                " AMEX"
            ]
        },
        {
            width: 1000,
            cols: [
                {
                    view: "text",
                    id: "uiCardName",
                    width: 355,
                    inputWidth: 350,
                    placeholder: "Name on the Card",
                    hidden: true
                },
                {
                    view: "text",
                    id: "uiCardNumber",
                    //height: 30,
                    width: 255,
                    inputWidth: 250,
                    placeholder: "Credit Card Number",
                    hidden: true
                },
                {
                    view: "datepicker",
                    id: "uiExpirationDate",
                    //height: 30,
                    width: 155,
                    inputWidth: 150,
                    placeholder: "Exp Date",
                    hidden: true
                },
                {
                    view: "text",
                    id: "uiCCVNumber",
                    //height: 30,
                    width: 55,
                    inputWidth: 50,
                    placeholder: "CCV",
                    hidden: true
                },
                {
                    view: "text",
                    id: "uiInvoiceNumber",
                    //height: 30,
                    inputWidth: 250,
                    placeholder: "Invoice Number",
                    hidden: true
                }
            ]
        },
        {
            view: "button",
            css: "webix_primary",
            label: "Print Packing Slip",
            height: 35,
            click: function () {
                var form = this.getParentView();
                if (form.validate()) {
                    webix.alert("Correct data!")
                }
            }
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
        width: 1325,
        autoheight: true,
        autowidth: true,
        left: 1,
        move: true,
        autofit: true,
        resize: true,
        scrollable: true,

        body: {
            rows: [
                uigTopSection,
                uigSampleSubmissionDatagrid,
                {
                    cols: [
                        {
                            rows: [
                                {
                                    view: "template",
                                    template: "CIAL has a policy of not charging for the majority of reference standards or specialty items needed to perform various tests. <i style='color:red;'>Periodically, we are requested to test a sample or active which is very expensive and rarely seen. In such cases we will contact the customer and request help to share in the cost.</i> Please consult CompoundersLab.com for pricing - Click on “Services” then “Pricing List Download” link. Payment can be made when samples are sent. Payment is due when reports are released and can be paid via Invoice or Credit Card. If payment is not received in 35 days after reports are released, a late charge of 10% will be added to the total amount.",
                                    height: 125
                                },
                                uigBillingForm
                            ]
                        },
                        {
                            width: 220,
                            rows: [
                                {
                                    view: "template",
                                    template: "You can place any widget here..",
                                    role: "placeholder"
                                },
                                {type: "upcA", value: theUUID, view: "barcode", minWidth: 100, height: 100},
                                {
                                    view: "template",
                                    template: theUUID + "  <b>You can place any widget here..</b>",
                                    role: "placeholder"
                                }
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

///**************** UI Control Logic for uiPaymentType *********************///
$$('uiPaymentType').attachEvent("onChange", function (newv) {

    if (newv === 'Charge CC') {
        $$("uiCardName").show();
        $$("uiMethodOfPayment").show();
        $$("uiCardNumber").show();
        $$("uiExpirationDate").show();
        $$("uiCCVNumber").show();
        $$("uiInvoiceNumber").hide();
    } else if (newv === 'Invoice') {
        $$("uiInvoiceNumber").show();
        $$("uiCardName").hide();
        $$("uiMethodOfPayment").hide();
        $$("uiCardNumber").hide();
        $$("uiExpirationDate").hide();
        $$("uiCCVNumber").hide();
    } else if (newv === 'Check Enclosed') {
        $$("uiCardName").hide();
        $$("uiMethodOfPayment").hide();
        $$("uiCardNumber").hide();
        $$("uiExpirationDate").hide();
        $$("uiCCVNumber").hide();
        $$("uiInvoiceNumber").hide();
    } else {
        $$("uiCardName").hide();
        $$("uiMethodOfPayment").hide();
        $$("uiCardNumber").hide();
        $$("uiExpirationDate").hide();
        $$("uiCCVNumber").hide();
        $$("uiInvoiceNumber").hide();
    }
});

///////////////////////////////////////////////////////////////////////////////

