/*
 * <dsCode> Inc. (c) 2019. This copyright is based on the Apache License 2.0. Please contact David Sutton for use of this software.
 */

var $userId = JSON.parse(decodeURIComponent(document.cookie).substring(5))['UserName']; //Extract out the username from the cookie file

var topbar = {
    template: "",
    autowidth: true,
    autoheight: true,
    cols: [
        {view: "label", label: "Hi " + $userId, width: 400},
        {view: "button", value: "Add", width: 70, click: "add_row"},
        {view: "button", value: "Delete", width: 70, click: "delete_row"},
        {view: "button", value: "Modify", width: 70, click: "update_row"},
        {
            view: "button", value: "Reset", width: 85, click: function () {
                showForm("editWindow")
            }
        },//"refresh_row"},
        {
            view: "button", value: "Close", width: 70, click: function () {
                $$('UserList').close();
            }
        },
        {
            view: "button",
            width: 300, value: 'Click to show a popup with a form',
            click: function () {
                showForm("editWindow", this.$view)
            }
        },
        {view: "text", id: "value", value: "Selected Data"} //Add today
    ]
};
var usersTable = {
    view: "datatable",
    id: "usersTable",
    autowidth: true,
    autoheight: true,
    //editable: true,
    //editaction: "dblclick",
    navigation: true,
    select: "row",
    columns: [
        {id: "users_UUID", header: "uuid", width: 100, name: "users_UUID", hidden: true},
        {
            id: "users_firstname",
            header: "First Name",
            name: "users_firstname",
            width: 100,
            sort: "string",
            editor: "text"
        },
        {id: "users_lastname", header: "Last Name", name: "users_lastname", width: 100, sort: "string", editor: "text"},
        {
            id: "users_displayName",
            header: "Display Name",
            name: "users_displayName",
            width: 100,
            sort: "string",
            editor: "text"
        },
        {id: "users_name", header: "User ID", name: "users_name", width: 100, sort: "string", editor: "text"},
        {
            id: "users_pass",
            header: "Password",
            name: "users_pass",
            width: 100,
            editor: "password",
            format: function (value) {
                return value.replace(/./g, '*');
            }
        },
        {
            id: "users_employeeId",
            header: "Employee #",
            name: "users_employeeId",
            width: 100,
            sort: "int",
            editor: "text"
        },
        {id: "users_2accessLevel", header: "Access #", name: "users_2accessLevel", width: 100, editor: "text"},
        {id: "users_2group", header: "Group", name: "users_2group", width: 100, sort: "int", editor: "text"},
        {id: "users_managerID", header: "Boss", name: "users_managerID", width: 100, editor: "text"},
        {
            id: "users_manager",
            header: "Manager",
            name: "users_manager",
            width: 100,
            sort: "string",
            editor: "select",
            options: ["Yes", "No"]
        },
        {
            id: "users_authorized",
            header: "Authorized",
            name: "users_authorized",
            width: 100,
            sort: "string",
            editor: "select",
            options: ["Yes", "No"]
        },
        {id: "users_status", header: "Status", sort: "string", width: 100}
    ],
    url: "/labs2/php/api_methods/SELECTz.php?tableName=users&columnNames=users_id,users_UUID,users_firstname,users_lastname,users_name,users_employeeId,users_pass,users_2group,users_2accessLevel,users_displayName,users_manager,users_managerID,users_authorized,users_status&dataName=data&select=5"
};

var form = {
    view: "form",
    //borderless:true,
    elements: [
        {view: "text", id: "users_UUID1", header: "uuid", name: "users_UUID1", width: 100, hidden: true},
        {
            view: "text",
            id: "users_firstname1",
            header: "First Name",
            name: "users_firstname1",
            width: 100,
            sort: "string",
            editor: "text"
        },
        {
            view: "text",
            id: "users_lastname1",
            header: "Last Name",
            name: "users_lastname1",
            width: 100,
            sort: "string",
            editor: "text"
        },
        {
            view: "text",
            id: "users_displayName1",
            header: "Display Name",
            name: "users_displayName1",
            width: 100,
            sort: "string",
            editor: "text"
        },
        {
            view: "text",
            id: "users_name1",
            header: "User ID",
            name: "users_name1",
            width: 100,
            sort: "string",
            editor: "text"
        },
        {view: "text", id: "users_pass1", header: "Password", name: "users_pass1", width: 100, editor: "text"},
        {
            view: "text",
            id: "users_employeeId1",
            header: "Employee #",
            name: "users_employeeId1",
            width: 100,
            sort: "int",
            editor: "text"
        },
        {
            view: "text",
            id: "users_2accessLevel1",
            header: "Access #",
            name: "users_2accessLevel1",
            width: 100,
            editor: "text"
        },
        {
            view: "text",
            id: "users_2group1",
            header: "Group",
            name: "users_2group1",
            width: 100,
            sort: "int",
            editor: "text"
        },
        {view: "text", id: "users_managerID1", header: "Boss", name: "users_managerID1", width: 100, editor: "text"},
        {
            view: "text",
            id: "users_manager1",
            header: "Manager",
            name: "users_manager1",
            width: 100,
            sort: "string",
            editor: "select",
            options: ["Yes", "No"]
        },
        {
            view: "text",
            id: "users_authorized1",
            header: "Authorized",
            name: "users_authorized1",
            width: 100,
            sort: "string",
            editor: "select",
            options: ["Yes", "No"]
        },
        {view: "text", id: "users_status1", header: "Status", sort: "string", width: 100}
    ],
    elementsConfig: {
        labelPosition: "left",
    }
};

webix.ui({
    view: "window",
    id: "editWindow",
    autowidth: true,
    autoheight: true,
    position: "center",
    modal: true,
    head: "User's data",
    body: webix.copy(form)
});


var editor = {
    id: "editorForm",
    cols: [
        {view: "text", label: "", width: 101, name: "users_firstname", id: "users_firstname1"},
        {view: "text", label: "", width: 101, name: "users_lastname", id: "users_lastname1"},
        {view: "text", label: "", width: 101, name: "users_displayName", id: "users_displayName1"},
        {view: "text", label: "", width: 101, name: "users_name", id: "users_name1"},
        {view: "text", label: "", width: 101, name: "users_pass", id: "users_pass1"},
        {view: "text", label: "", width: 101, name: "users_employeeId", id: "users_employeeId1"},
        {view: "text", label: "", width: 101, name: "users_2accessLevel", id: "users_2accessLevel1"},
        {view: "text", label: "", width: 101, name: "users_2group", id: "users_2group1"},
        {view: "text", label: "", width: 101, name: "users_managerID", id: "users_managerID1"},
        {view: "text", label: "", width: 101, name: "users_manager", id: "users_manager1"},
        {view: "text", label: "", width: 101, name: "users_authorized", id: "users_authorized1"},
        // {view: "text", label: "", width: 101, name: "users_status", id: "users_status1"},
        {view: "text", label: "", width: 101, name: "users_UUID", id: "users_UUID1", hidden: true}
    ]
};

webix.ui({

    view: "window",
    id: "UserList",
    width: 1325,
    autoheight: true,
    left: 1,
    move: true,
    resize: true,
    head: "Users",
    body: {
        rows: [topbar, usersTable, {view: "label", label: "Edit", align: "center"}, editor]
    }

}).show();


/*$$('usersTable').attachEvent("onAfterSelect", function (id) {
    var useruuid = this.getItem (id).users_UUID;
    //var useruuid = $$("users_UUID").setValue(value);
    console.log("Selected record: " + useruuid);
    var firstname = this.getItem (id).users_firstname; //$$("users_firstname").setValue(this.getItem(id).users_firstname);
    var lastname = this.getItem (id).users_lastname; //$$("users_lastname").setValue(this.getItem(id).users_lastname);
    var displayname = this.getItem (id).users_displayName; //$$("users_displayName").setValue(this.getItem(id).users_displayName);
    var username = this.getItem (id).users_name; //$$("users_name").setValue(this.getItem(id).users_name);
    var userpass = this.getItem (id).users_pass; //$$("users_pass").setValue(this.getItem(id).users_pass);
    var employeeid = this.getItem (id).users_employeeId; //$$("users_employeeId").setValue(this.getItem(id).users_employeeId);
    var accesslevel = this.getItem (id).users_2accessLevel; //$$("users_2accessLevel").setValue(this.getItem(id).users_2accessLevel);
    var usergroup = this.getItem (id).users_2group; //$$("users_2group").setValue(this.getItem(id).users_2group);
    var usermanageid = this.getItem (id).users_managerID; //$$("users_managerID").setValue(this.getItem(id).users_managerID);
    var usermanager = this.getItem (id).users_manager; //$$("users_manager").setValue(this.getItem(id).users_manager);
    var userauthorized = this.getItem (id).users_authorized; //$$("users_authorized").setValue(this.getItem(id).users_authorized);
    var dataRow = useruuid+" "+firstname+" "+lastname+" "+displayname+" "+username+" "+userpass+" "+employeeid+" "+accesslevel+" "+usergroup+" "+usermanageid+" "+usermanager+" "+userauthorized;
    console.log("Selected record: " + dataRow);
    return useruuid, firstname, lastname, displayname, username, userpass, employeeid, accesslevel, usergroup, usermanageid, usermanager, userauthorized;
}); */

///////
$$('usersTable').attachEvent("onAfterSelect", function (id) {
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

});
///////

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

    var useruuid = $$("users_UUID1").getValue(); //.setValue(this.getItem(id).users_UUID);
    var firstname = $$("users_firstname1").getValue(); //setValue(this.getItem(id).users_firstname);
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
    var dataSumit2Users = '{"users_firstname":"' + firstname + '", "users_lastname":"' + lastname + '", "users_name":"' + username + '", "users_displayName":"' + displayname + '", "users_employeeId":"' + employeeid + '", "users_pass":"' + userpass + '", "users_2accessLevel":"' + accesslevel + '", "users_2group":"' + usergroup + '", "users_managerID":"' + usermanageid + '", "users_manager":"' + usermanager + '", "users_authorized":"' + userauthorized + '"}';
    webix.ajax("/labs2/php/api_methods/UPDATEz.php?tableName=users&JSONdata=" + dataSumit2Users + "&theWhereColumn=users_UUID&theUUID=" + useruuid);
    console.log("JSON DATA being sent to the server " + dataSumit2Users); //just a debug code
    webix.message({text: "Saved"}); //Optional UI to display that something happened
    window.setTimeout(refresh_row, 1000);
}

/////////////////////////// Refresh the Table ///////////////////////////
function refresh_row() {
    //console.log("Refresh usersTable");
    webix.message({text: "Reloading..."});
    var refresher = "/labs2/php/api_methods/SELECTz.php?tableName=users&columnNames=users_id,users_UUID,users_firstname,users_lastname,users_name,users_employeeId,users_pass,users_2group,users_2accessLevel,users_displayName,users_manager,users_managerID,users_authorized&dataName=data&select=5";
    $$("usersTable").clearAll();
    $$("usersTable").load(refresher);
    $$('usersTable').unselect();

}

/////////////////////////// Add data to the table ///////////////////////////
function add_row() {
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
    var dataSumit2Users = '{"success":true,"data":[{"users_UUID":"' + $useruuid + '", "users_firstname":"' + firstname + '", "users_lastname":"' + lastname + '", "users_name":"' + username + '", "users_displayName":"' + displayname + '", "users_employeeId":"' + employeeid + '", "users_pass":"' + userpass + '", "users_2accessLevel":"' + accesslevel + '", "users_2group":"' + usergroup + '", "users_managerID":"' + usermanageid + '", "users_manager":"' + usermanager + '", "users_authorized":"' + userauthorized + '"}]}';
    webix.ajax("/labs2/php/api_methods/INSERT.php?tableName=users&JSONdata=" + dataSumit2Users);
    //console.log("JSON DATA being sent to the server " + dataSumit2Users); //just a debug code
    webix.message({text: "Saved"}); //Optional UI to display that something happened
    window.setTimeout(refresh_row, 1000);
}

//////////////////////////// Checkboxes - Not used ///////////////////////////
function statusCheckbox(obj, common, value) {
    if (value)
        return "<div class='webix_table_checkbox checked'> Active </div>";
    else
        return "<div class='webix_table_checkbox notchecked'> Disabled </div>";
};

function showForm(winId, node) {
    $$(winId).getBody().clear();
    $$(winId).show(node);
    $$(winId).getBody().focus();
}