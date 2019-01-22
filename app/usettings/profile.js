/*
 * <dsCode> Inc. (c) 2016. This copyright is based on the Apache License 2.0. Please contact David Sutton for use of this software.
 */

webix.ui({

    view: "window",
    id: "userProfileSettings",
    //height:"300",
    width: "150",
    move: false,

    head: {
        view: "toolbar",
        id: "userProfileSettingsToolbar",
        elements: [
            {view: "button", value: "Add", width: 70, click: "add_row"},
            {view: "button", value: "Delete", width: 70, click: "delete_row"},
            {view: "button", value: "Modify", width: 70, click: "update_row"},
            {view: "button", value: "Clear Form", width: 85, click: "$$('userDetail').clear()"}
        ]
    },
    body: {
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
                width: "420"
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
                width: "220"
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
            },
            {
                view: "text",
                name: "users_2group",
                id: "users_2group",
                label: "User Group",
                labelPosition: "top",
                labelWidth: "100",
                width: "220"
            },
            {
                view: "text",
                name: "users_2accessLevel",
                id: "users_2accessLevel",
                label: "Access Level",
                labelPosition: "top",
                labelWidth: "100",
                width: "220"
            }
        ],
        url: "_profile.php"
    }


}).show();

/**************** Page Logic **************/
function add_row() {
    var userId = $$("users_UUID").getValue();
    var userFirstName = $$("users_firstname").getValue();
    var userLastName = $$("users_lastname").getValue();
    var userName = $$("users_name").getValue();
    var userEmployeeId = $$("users_employeeId").getValue();
    var userPass = $$("users_pass").getValue();
    var user2Group = $$("users_2group").getValue();
    var user2AccessLevel = $$("users_2accessLevel").getValue();


    //console.log(userId,pswd);


    webix.ajax().get("./php/login.php", {users_name: userId, users_pass: pswd}, function (text) {
        var myMessageText = (text);
        if (myMessageText == "Success") {
            webix.message({text: myMessageText});
            //newDoc(userId);
        }
    });

}
function delete_row() {
    console.log("close window");
}
/*			function newDoc(userId) {
 window.location.assign("./app/main/index.php?users_name="+userId)
 }
 */
function update_row() {
    var userId = $$("users_UUID").getValue();
    var userFirstName = $$("users_firstname").getValue();
    var userLastName = $$("users_lastname").getValue();
    var userName = $$("users_name").getValue();
    var userEmployeeId = $$("users_employeeId").getValue();
    var userPass = $$("users_pass").getValue();
    var user2Group = $$("users_2group").getValue();
    var user2AccessLevel = $$("users_2accessLevel").getValue();
    var userDisplayName = $$("users_displayName").getValue();
    var theFormData = "users_UUID=" + userId + "&users_firstname=" + userFirstName + "&users_lastname=" + userLastName + "&users_name=" + userName + "&users_employeeId=" + userEmployeeId + "&users_pass=" + userPass + "&users_2group=" + user2Group + "&users_2accessLevel=" + user2AccessLevel + "&users_displayName=" + userDisplayName;
    var theEncodedURI = encodeURI(theFormData);

    console.log(theEncodedURI);
    // webix.ajax().post("somefile.php",{JSON stuff goes here});
}