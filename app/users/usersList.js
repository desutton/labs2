/*
 * <dsCode> Inc. (c) 2019. This copyright is based on the Apache License 2.0. Please contact David Sutton for use of this software.
 */

var $userId = JSON.parse(decodeURIComponent(document.cookie).substring(5))['UserName']; //Extract out the username from the cookie file

var topbar = {template: "Hi " + $userId};
var data = {
    view: "datatable",
    id: "usersTable",
    autoheight: true,
    columns: [
        {id: "users_firstname", header: "First Name", width: 100, editor: "text"},
        {id: "users_lastname", header: "Last Name", width: 100, editor: "text"},
        {id: "users_displayName", header: "Display Name", width: 100, editor: "text"},
        {id: "users_name", header: "User ID", width: 100, editor: "text"},
        {id: "users_pass", header: "Password", width: 100, editor: "password", type: "password"},
        {id: "users_employeeId", header: "Employee #", width: 100, editor: "text"},
        {id: "users_2accessLevel", header: "Access #", width: 100, editor: "text"},
        {id: "users_2group", header: "Group", width: 100, editor: "text"},
        {id: "users_managerID", header: "Boss", width: 100, editor: "text"},
        {id: "users_manager", header: "Manager", width: 100, editor: "text"},
        {id: "users_authorized", header: "Authorized", width: 100, editor: "text"}
    ],
    editable: true,
    url: "/labs2/php/api_methods/SELECTz.php?tableName=users&columnNames=users_id,users_UUID,users_firstname,users_lastname,users_name,users_employeeId,users_pass,users_2group,users_2accessLevel,users_displayName,users_manager,users_managerID,users_authorized&dataName=data&select=5"
};

webix.ui({

    view: "window",
    id: "UserList",
    width: 1325,
    autoheight: true,
    left: 1,
    move: true,

    head: "Users",
    body: {
        rows: [topbar, data]
    }

}).show();


webix.ajax().get("/labs2/php/api_methods/SELECTz.php?tableName=users&columnNames=users_authorized%20AS%20value&selectColumn=users_name&selectData=" + $userId + "&dataName=data&select=1", function (text, data) {
    var userAuthor = JSON.stringify(text);
    console.log(userAuthor.search("No"));
    if (userAuthor.search("No") !== -15) {
        $$("usersTable").hide();
    }

});