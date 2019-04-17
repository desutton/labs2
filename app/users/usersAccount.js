/*
 * <dsCode> Inc. (c) 2019. This copyright is based on the Apache License 2.0. Please contact David Sutton for use of this software.
 */

var $useruuid = 'xxxxxxxx-xxxx-5xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    var r = Math.random() * 16 | 0, v = c === 'x' ? r : r & 0x3 | 0x8;
    return v.toString(16);
});

var $userId = JSON.parse(decodeURIComponent(document.cookie).substring(5))['UserName']; //Extract out the username from the cookie file


var tabbar = {
    view: "toolbar",
    id: "userProfileSettingsToolbar",
    elements: [
        //{view: "button", value: "Add", width: 70, click: "add_row"},
        {view: "button", value: "Delete", width: 70, click: "delete_row"},
        {view: "button", value: "Modify", width: 70, click: "update_row"},
        {view: "button", value: "Reset", width: 85, click: "refresh_row"}
    ]
};

var editor = {
    view: "form",
    id: "userDetail",
    datatype: "json",
    elements: [
        {
            view: "text",
            name: "users_UUID",
            id: "users_UUID",
            label: "UUID",
            labelPosition: "top",
            labelWidth: "100",
            width: "220",
            hidden: true
        },
        {
            view: "text",
            name: "users_firstname",
            id: "users_firstname",
            label: "First Name",
            labelPosition: "top",
            labelWidth: "100",
            width: "220"
        },
        {
            view: "text",
            name: "users_lastname",
            id: "users_lastname",
            label: "Last Name",
            labelPosition: "top",
            labelWidth: "100",
            width: "220"
        },
        {
            view: "text",
            name: "users_name",
            id: "users_name",
            label: "User Name",
            labelPosition: "top",
            labelWidth: "100",
            width: "220"
        },
        {
            view: "text",
            name: "users_displayName",
            id: "users_displayName",
            label: "Display Name",
            labelPosition: "top",
            labelWidth: "100",
            width: "220"
        },
        {
            view: "text",
            name: "users_employeeId",
            id: "users_employeeId",
            label: "Employee No.",
            labelPosition: "top",
            labelWidth: "100",
            width: "220",
            readonly: true
        },
        {
            view: "text",
            name: "users_pass",
            id: "users_pass",
            label: "Password",
            labelPosition: "top",
            labelWidth: "100",
            width: "220",
            type: "password"
        }
    ]
};


webix.ui({

    view: "window",
    id: "userMain",
    width: 1325,
    height: 800,
    // autoheight: true,
    left: 1,
    move: true,

    head: "User Profile",
    body: {
        rows: [tabbar, editor]
    }

}).show();

$$("userDetail").load(function () {
    webix.message("Data loaded");
    window.setTimeout(refresh_row, 100);
});

function delete_row() {
    console.log("close window");
    webix.message({text: "Deleted"}); //Optional UI to display that something happened
    window.setTimeout(refresh_row, 1000);
}

function update_row() {
    var firstname = $$("users_firstname").getValue();
    var lastname = $$("users_lastname").getValue();
    var username = $$("users_name").getValue();
    var displayname = $$("users_displayName").getValue();
    var employeeid = $$("users_employeeId").getValue();
    var userpass = $$("users_pass").getValue();
    var useruuid = $$("users_UUID").getValue();
    var dataSumit2Users = '{"users_firstname":"' + firstname + '", "users_lastname":"' + lastname + '", "users_name":"' + username + '", "users_displayName":"' + displayname + '", "users_employeeId":"' + employeeid + '", "users_pass":"' + userpass + '"}';
    webix.ajax("/labs2/php/api_methods/UPDATEz.php?tableName=users&JSONdata=" + dataSumit2Users + "&theWhereColumn=users_UUID&theUUID=" + useruuid);
//    console.log("JSON DATA being sent to the server " + theSubmitDataRAW2); //just a debug code
    webix.message({text: "Saved"}); //Optional UI to display that something happened
    window.setTimeout(refresh_row, 1000);
}

function refresh_row() {
    //console.log("hello");
    webix.message({text: "Reloading..."});
    webix.ajax().get("/labs2/php/api_methods/SELECTz.php?tableName=users&columnNames=users_firstname,users_lastname,users_name,users_displayName,users_pass,users_employeeID,users_UUID&selectColumn=users_name&selectData=" + $userId + "&dataName=data&select=1", function (text, data) {
        var userAuthor = text;
        userAuthor = userAuthor.replace('[', "");
        userAuthor = userAuthor.replace(']', "");
        userAuthor = JSON.parse(userAuthor);
        $$('users_firstname').setValue(userAuthor.users_firstname);
        $$('users_lastname').setValue(userAuthor.users_lastname);
        $$('users_name').setValue(userAuthor.users_name);
        $$('users_displayName').setValue(userAuthor.users_displayName);
        $$('users_employeeId').setValue(userAuthor.users_employeeID);
        $$('users_pass').setValue(userAuthor.users_pass);
        $$('users_UUID').setValue(userAuthor.users_UUID);
    });
}

function add_row() {
    var firstname = $$("users_firstname").getValue();
    var lastname = $$("users_lastname").getValue();
    var username = $$("users_name").getValue();
    var displayname = $$("users_displayName").getValue();
    var employeeid = $$("users_employeeId").getValue();
    var userpass = $$("users_pass").getValue();
    var dataSumit2Users = '{"success":true,"data":[{"users_UUID":"' + $useruuid + '", "users_firstname":"' + firstname + '", "users_lastname":"' + lastname + '", "users_name":"' + username + '", "users_displayName":"' + displayname + '", "users_employeeId":"' + employeeid + '", "users_pass":"' + userpass + '"}]}';
    webix.ajax("/labs2/php/api_methods/INSERT.php?tableName=requisitionRows&JSONdata=" + dataSumit2Users);
//    console.log("JSON DATA being sent to the server " + theSubmitDataRAW2); //just a debug code
    webix.message({text: "Saved"}); //Optional UI to display that something happened
    window.setTimeout(refresh_row, 1000);
}