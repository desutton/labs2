/*
 * <dsCode> Inc. (c) 2019. This copyright is based on the Apache License 2.0. Please contact David Sutton for use of this software.
 */

var $userId = JSON.parse(decodeURIComponent(document.cookie).substring(5))['UserName']; //Extract out the username from the cookie file

var userGroups = [{id: "0", value: "Admin"}, {id: "1", value: "Potency"}, {id: "2", value: "Micro"}, {
    id: "3",
    value: "Tech"
}, {id: "4", value: "Office"}];
var userAccess = [{id: "0", value: "Admin"}, {id: "1", value: "Manager"}, {id: "2", value: "Power User"}, {
    id: "3",
    value: "User"
}, {id: "4", value: "Guest"}];
var userManager = [{id: "1", value: "Ron"}, {id: "2", value: "Nancy"}, {id: "3", value: "Marc"}, {
    id: "4",
    value: "David"
}, {id: "5", value: "Other"}];
var userYesNo = [{id: "0", value: "No"}, {id: "1", value: "Yes"}];
var userStatus = [{id: "0", value: "Disable"}, {id: "1", value: "Active"}];
var usersURL = "/labs2/php/api_methods/SELECTz.php?tableName=users&columnNames=users_id,users_UUID,users_firstname,users_lastname,users_name,users_employeeId,users_pass,users_displayName,users_manager,users_authorized,users_status,users_2group,users_2accessLevel,users_managerID&dataName=data&select=5";


var topbar = {
    template: "",
    autowidth: true,
    autoheight: true,
    cols: [
        {view: "label", label: "Hi " + $userId, width: 400},
        {view: "button", value: "Add", width: 70, click: "add_row", id: "addRow"},
        {view: "button", value: "Save", width: 70, click: "save_row", id: "saveRow"},
        {view: "button", value: "Delete", width: 70, click: "delete_row"},
        {view: "button", value: "Modify", width: 70, click: "update_row"},
        {view: "button", value: "Reset", width: 85, click: "refresh_row"},
        {
            view: "button", value: "Close", width: 70, click: function () {
                $$('UserList').close();
            }
        }
    ]
};

var data = {
    view: "datatable",
    id: "usersTable",
    autowidth: true,
    autoheight: true,
    editable: false,
    columns: [
        {id: "users_employeeId", header: "Employee #", width: 100, editor: "text"},
        {id: "users_UUID", header: "uuid", width: 100, hidden: true},
        {id: "users_firstname", header: "First Name", width: 100, editor: "text"},
        {id: "users_lastname", header: "Last Name", width: 100, editor: "text"},
        {id: "users_displayName", header: "Display Name", width: 100, editor: "text"},
        {id: "users_name", header: "User ID", width: 100, editor: "text"},
        {
            id: "users_pass", header: "Password", width: 100, editor: "password", format: function (value) {
                return value.replace(/./g, '*');
            }
        },
        {id: "users_2accessLevel", header: "Access", width: 100, editor: "text", collection: userAccess},
        {id: "users_2group", header: "Group", width: 100, editor: "text", collection: userGroups},
        {id: "users_managerID", header: "Boss", width: 100, editor: "text", collection: userManager},
        {id: "users_manager", header: "Manager", width: 100, editor: "text", collection: userYesNo},
        {id: "users_authorized", header: "Authorized", width: 100, editor: "text", collection: userYesNo},
        {id: "users_status", header: "Status", width: 100, editor: "text", collection: userStatus}
    ],
    select: "row",

    //url: "/labs2/php/api_methods/SELECTz.php?tableName=users&columnNames=users_id,users_UUID,users_firstname,users_lastname,users_name,users_employeeId,users_pass,users_displayName,users_manager,users_authorized,users_status,%28IF%28users_2group=0%2C%27Admin%27%2CIF%28users_2group=1%2C%27Potency%27%2CIF%28users_2group=2%2C%27Microbiology%27%2CIF%28users_2group=3%2C%27Tech%27%2C%27Office%27%29%29%29%29%29AS%20users_2group,%28IF%28users_2accessLevel=0%2C%27Admin%27%2CIF%28users_2accessLevel=1%2C%27Manager%27%2CIF%28users_2accessLevel=2%2C%27Power%20User%27%2CIF%28users_2accessLevel=3%2C%27User%27%2C%27Guest%27%29%29%29%29%29AS%20users_2accessLevel,%28IF%28users_managerID=1%2C%27Ron%27%2CIF%28users_managerID=2%2C%27Nancy%27%2CIF%28users_managerID=3%2C%27Marc%27%2CIF%28users_managerID=4%2C%27David%27%2C%27Other%27%29%29%29%29%29AS%20users_managerID&dataName=data&select=5"
    url: usersURL //"/labs2/php/api_methods/SELECTz.php?tableName=users&columnNames=users_id,users_UUID,users_firstname,users_lastname,users_name,users_employeeId,users_pass,users_displayName,users_manager,users_authorized,users_status,users_2group,users_2accessLevel,users_managerID&dataName=data&select=5"

};

var editor = {
    id: "editorForm",
    rows: [
        {view: "label", label: "Edit", align: "center"},

        {
            cols: [
                {view: "text", label: "", width: 101, name: "users_employeeId", id: "users_employeeId1"},
                {view: "text", label: "", width: 101, name: "users_firstname", id: "users_firstname1"},
                {view: "text", label: "", width: 101, name: "users_lastname", id: "users_lastname1"},
                {view: "text", label: "", width: 101, name: "users_displayName", id: "users_displayName1"},
                {view: "text", label: "", width: 101, name: "users_name", id: "users_name1"},
                {view: "text", label: "", width: 101, name: "users_pass", id: "users_pass1"},
                {
                    view: "combo",
                    label: "",
                    width: 101,
                    name: "users_2accessLevel",
                    id: "users_2accessLevel1",
                    options: userAccess
                    //options: [{id: "0", value: "Admin"},{id: "1", value: "Manager"},{id: "2", value: "Power User"},{id: "3", value: "User"},{id: "4", value: "Guest"}]
                },
                {
                    view: "combo",
                    label: "",
                    width: 101,
                    name: "users_2group",
                    id: "users_2group1",
                    //collection: userGroups
                    options: userGroups//[{id: "0", value: "Admin"}, {id: "1", value: "Potency"}, {id: "2", value: "Micro"}, {id: "3", value: "Tech"}, {id: "4", value: "Office"}]
                },
                {
                    view: "combo",
                    label: "",
                    width: 101,
                    name: "users_managerID",
                    id: "users_managerID1",
                    options: userManager
                    //options: [{id: "1", value: "Ron"}, {id: "2", value: "Nancy"}, {id: "3", value: "Marc"}, {id: "4", value: "David"}, {id: "5", value: "Other"}]
                },
                {
                    view: "combo",
                    label: "",
                    width: 101,
                    name: "users_manager",
                    id: "users_manager1",
                    options: userYesNo
                    //options: [{id: "0", value: "No"}, {id: "1", value: "Yes"}]
                },
                {
                    view: "combo",
                    label: "",
                    width: 101,
                    name: "users_authorized",
                    id: "users_authorized1",
                    options: userYesNo
                    //options: [{id: "0", value: "No"}, {id: "1", value: "Yes"}]
                },
                {
                    view: "combo",
                    label: "",
                    width: 101,
                    name: "users_status",
                    id: "users_status1",
                    options: userStatus
                    //options: [{id: "0", value: "Disable"}, {id: "1", value: "Active"}]
                },
                {view: "text", label: "", width: 101, name: "users_UUID", id: "users_UUID1", hidden: true}
            ]
        }],
};


webix.ui({

    view: "window",
    id: "UserList",
    width: 1325,
    autoheight: true,
    left: 1,
    move: true,
    resize: true,

    head: {
        view: "toolbar", margin: -4, cols: [
            {view: "label", label: "Users"},
            {
                view: "icon", icon: "wxi-close", click: function () {
                    $$('UserList').close();
                }
            }
        ]
    },
    body: {
        rows: [topbar, data, editor]
    }

}).show();


$$("editorForm").hide();
$$("saveRow").hide();

$$('usersTable').attachEvent("onAfterSelect", function (id) {
    $$("editorForm").show();
    $$("addRow").hide();
    var value = this.getItem(id).users_UUID;
    $$("users_UUID1").setValue(value);
    console.log("Selected record: " + value);
    $$("users_firstname1").setValue(this.getItem(id).users_firstname);
    $$("users_lastname1").setValue(this.getItem(id).users_lastname);
    $$("users_displayName1").setValue(this.getItem(id).users_displayName);
    $$("users_name1").setValue(this.getItem(id).users_name);
    $$("users_pass1").setValue(this.getItem(id).users_pass);
    $$("users_employeeId1").setValue(this.getItem(id).users_employeeId);
    $$("users_2accessLevel1").setValue(this.getItem(id).users_2accessLevel);
    $$("users_2group1").setValue(this.getItem(id).users_2group);
    $$("users_managerID1").setValue(this.getItem(id).users_managerID);
    $$("users_manager1").setValue(this.getItem(id).users_manager);
    $$("users_authorized1").setValue(this.getItem(id).users_authorized);
    $$("users_status1").setValue(this.getItem(id).users_status);

});


/////////////////////////// Delete the row of data ///////////////////////////
function delete_row() {
    console.log("DELETED RECORD");
    var userid = $$("users_UUID1").getValue();
    webix.ajax("/labs2/php/api_methods/DELETE.php?tableName=users&columnNames=users_UUID&id=" + userid);
    webix.message({text: "Deleted"}); //Optional UI to display that something happened
    console.log("Deleted record: " + userid);
    window.setTimeout(refresh_row, 1000);
}

/////////////////////////// Update the data from the table ///////////////////////////
function update_row() {
    var useruuid = $$("users_UUID1").getValue();
    var firstname = $$("users_firstname1").getValue();
    var lastname = $$("users_lastname1").getValue();
    var username = $$("users_name1").getValue();
    var displayname = $$("users_displayName1").getValue();
    var employeeid = $$("users_employeeId1").getValue();
    var userpass = $$("users_pass1").getValue();
    var accesslevel = $$("users_2accessLevel1").getValue();
    var usergroup = $$("users_2group1").getValue();
    console.log("Here's what I see" + usergroup);
    var usermanageid = $$("users_managerID1").getValue();
    var usermanager = $$("users_manager1").getValue();
    var userauthorized = $$("users_authorized1").getValue();
    var userstatus = $$("users_status1").getValue();

    /* switch(usergroup){
        case "Admin":
            usergroup = 0;
            break;
        case "Potency":
                usergroup = 1;
            break;
        case "Microbiology":
                usergroup = 2;
            break;
        case "Tech":
                usergroup = 3;
            break;
        default:
            usergroup = 4;
    }

    switch(usermanageid){
        case "Ron":
            usermanageid = 1;
            break;
        case "Nancy":
            usermanageid = 2;
            break;
        case "Marc":
            usermanageid = 3;
            break;
        case "David":
            usermanageid = 4;
            break;
        default:
            usermanageid = 5;
    }
    switch(accesslevel){
        case "Admin":
            accesslevel = 0;
            break;
        case "Manager":
            accesslevel = 1;
            break;
        case "Power User":
            accesslevel = 2;
            break;
        case "User":
            accesslevel = 3;
            break;
        default:
            accesslevel = 4;
    }*/

    var dataSumit2Users = '{"users_firstname":"' + firstname + '", "users_lastname":"' + lastname + '", "users_name":"' + username + '", "users_displayName":"' + displayname + '", "users_employeeId":"' + employeeid + '", "users_pass":"' + userpass + '", "users_2accessLevel":"' + accesslevel + '", "users_2group":"' + usergroup + '", "users_managerID":"' + usermanageid + '", "users_manager":"' + usermanager + '", "users_authorized":"' + userauthorized + '", "users_status":"' + userstatus + '"}';
    webix.ajax("/labs2/php/api_methods/UPDATEz.php?tableName=users&JSONdata=" + dataSumit2Users + "&theWhereColumn=users_UUID&theUUID=" + useruuid);
    console.log("JSON DATA being sent to the server " + dataSumit2Users); //just a debug code
    webix.message({text: "Saved"}); //Optional UI to display that something happened
    $$("editorForm").hide();
    window.setTimeout(refresh_row, 1000);

}

/////////////////////////// Refresh the Table ///////////////////////////
function refresh_row() {
    //console.log("Refresh usersTable");
    webix.message({text: "Reloading..."});
    var refresher = usersURL; //"/labs2/php/api_methods/SELECTz.php?tableName=users&columnNames=users_id,users_UUID,users_firstname,users_lastname,users_name,users_employeeId,users_pass,users_displayName,users_manager,users_authorized,users_status,%28IF%28users_2group=0%2C%27Admin%27%2CIF%28users_2group=1%2C%27Potency%27%2CIF%28users_2group=2%2C%27Microbiology%27%2CIF%28users_2group=3%2C%27Tech%27%2C%27Office%27%29%29%29%29%29AS%20users_2group,%28IF%28users_2accessLevel=0%2C%27Admin%27%2CIF%28users_2accessLevel=1%2C%27Manager%27%2CIF%28users_2accessLevel=2%2C%27Power%20User%27%2CIF%28users_2accessLevel=3%2C%27User%27%2C%27Guest%27%29%29%29%29%29AS%20users_2accessLevel,%28IF%28users_managerID=1%2C%27Ron%27%2CIF%28users_managerID=2%2C%27Nancy%27%2CIF%28users_managerID=3%2C%27Marc%27%2CIF%28users_managerID=4%2C%27David%27%2C%27Other%27%29%29%29%29%29AS%20users_managerID&dataName=data&select=5";
    $$("usersTable").clearAll();
    $$("usersTable").load(refresher);
    $$('usersTable').unselect();
    $$('editorForm').hide();
    $$("saveRow").hide();
    $$("addRow").show();

}

/////////////////////////// Add data to the table ///////////////////////////
function save_row() {
    var $useruuid = 'xxxxxxxx-xxxx-5xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = Math.random() * 16 | 0, v = c === 'x' ? r : r & 0x3 | 0x8;
        return v.toString(16);
    });
    //var useruuid = $$("users_UUID").getValue();
    var firstname = $$("users_firstname1").getValue();
    var lastname = $$("users_lastname1").getValue();
    var username = $$("users_name1").getValue();
    var displayname = $$("users_displayName1").getValue();
    var employeeid = $$("users_employeeId1").getValue();
    var userpass = $$("users_pass1").getValue();
    var accesslevel = $$("users_2accessLevel1").getValue();
    var usergroup = $$("users_2group1").getValue();
    var usermanageid = $$("users_managerID1").getValue();
    var usermanager = $$("users_manager1").getValue();
    var userauthorized = $$("users_authorized1").getValue();
    var userstatus = $$("users_status1").getValue();
    var dataSumit2Users = '{"success":true,"data":[{"users_UUID":"' + $useruuid + '", "users_firstname":"' + firstname + '", "users_lastname":"' + lastname + '", "users_name":"' + username + '", "users_displayName":"' + displayname + '", "users_employeeId":"' + employeeid + '", "users_pass":"' + userpass + '", "users_2accessLevel":"' + accesslevel + '", "users_2group":"' + usergroup + '", "users_managerID":"' + usermanageid + '", "users_manager":"' + usermanager + '", "users_authorized":"' + userauthorized + '", "users_status":"' + userstatus + '"}]}';
    webix.ajax("/labs2/php/api_methods/INSERT.php?tableName=users&JSONdata=" + dataSumit2Users);
    //console.log("JSON DATA being sent to the server " + dataSumit2Users); //just a debug code
    webix.message({text: "Saved"}); //Optional UI to display that something happened
    window.setTimeout(refresh_row, 1000);
}

/////////////////////////// Show Add Fields to the UI ///////////////////////////
function add_row() {
    $$("editorForm").show();
    $$("addRow").hide();
    $$("saveRow").show();
}