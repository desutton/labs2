<?php
/**
 * <dsCode> Inc. (c) 2016. This copyright is based on the Apache License 2.0. Please contact David Sutton for use of this software.
 */

///////////////////////////////////////////////////////////////////////////////
///
/// This is the main background page which the javascript components
///  are built on top as iframes. This helps keeps the URL the same
/// during reloads and allows for the individual apps to be separated
/// in memory, from the main web-app. The parent-child relationship of
/// the app back to this background app also allows certain var to be
///  passed from one app to another - if done correctly.
///
///
///////////////////////////////////////////////////////////////////////////////
$theUserName = $_GET['users_name'];  // Grab the user name from the cookieMonster
include $_SERVER['DOCUMENT_ROOT'] . '/labs2/php/resources/appVersion.php';  //
?>
<html>
	<header>
		<title>
            <?php echo($theAppVersion); ?>
        </title>
        <link rel="stylesheet" href="../../webix/codebase/skins/flat.min.css" type="text/css">
        <link rel="stylesheet" href="/labs2/css/main_new.css" type="text/css">
        <link href="/labs2/css/fontawesome.css" rel="stylesheet">
        <link href="/labs2/css/brands.css" rel="stylesheet">
        <link href="/labs2/css/solid.css" rel="stylesheet">
        <script src="../../webix/codebase/webix.js" type="text/javascript"></script>
    </header>
    <body>
    <div class="des_TitleBar"> <?php echo($theAppVersion); ?> </div>
		<script>
			var userId = ("<?php echo($theUserName);?>"); //capture the user name
			var desTest = ("welcome.php?users_name="+userId); //build the url for the welcome page
		webix.ui({
///////////////////////////////////////////////////////////////////////////////
//                       UI for the Menu system                              //
//                                                                           //
///////////////////////////////////////////////////////////////////////////////
			view:"window",
			id:"my_win",
			head:userId,
            width: 1450, <!-- Global size for the inside iFrame default for iMac = 1450 -->
            height: 3000, <!-- Global size for the inside iFrame default for iMac = 4096 -->
			position:"center",
			body: {
				view: "layout",
				id: "mainMenuLayout",
				type: "space",
				rows: [
					{
						view: "menu", id: "mainMenu", subMenuPos: "right", layout: "x", subsign: true, height: 50,
						data: [
                            {
                                id: 1, value: "ToDo", icon: "fas fa-inbox", iFrame: "../main/welcome.php",
                                    submenu: [
                                        {
                                            value: "Home",
                                            iFrame: "../main/welcome.php",
                                            id: "home",
                                            icon: "fas fa-clock",
                                            css: "des_menuLink"
                                        },
                                        {
                                            value: "ToDo",
                                            id: "todos",
                                            iFrame: "../tasks/today.php",
                                            icon: "fas fa-list",
                                            css: "des_menuLink"
                                        },
                                        {
                                            value: "Maint Request",
                                            id: "maintRequest",
                                            iFrame: "../maint/maintRequest.php",
                                            icon: "fas fa-exclamation-circle",
                                            css: "des_menuLink"
                                        },
                                        {
                                            value: "Scheduled",
                                            id: "schedule",
                                            iFrame: "../tasks/scheduled.php",
                                            icon: "fas fa-calendar",
                                            css: "des_menuLink"
                                        }
                                    ]
                            },
                                {
                                    id: 2,
                                    value: "Settings",
                                    icon: "fas fa-cogs",
                                    iFrame: "../users/index.php",
                                    css: "des_menuLink",
                                    subMenuPos: "right",
                                    submenu: [
                                        {
                                            value: "User Prefs",
                                            id: "userPrefs",
                                            icon: "fas fa-user-plus",
                                            iFrame: "../users/usersAccount.php"
                                        },
                                        {
                                            value: "User List",
                                            icon: "fas fa-users",
                                            id: "userList",
                                            iFrame: "../users/usersList.php"
                                        }
                                    ]
                                },

                                {
                                    id: 3, value: "Customers", icon: "fas fa-users",
                                    submenu: [
                                        {
                                            value: "Add Customer",
                                            id: "addCustomer",
                                            icon: "fas fa-user-plus",
                                            iFrame: "../customers/newCustomer.php"
                                        },
                                        {
                                            value: "Customer List",
                                            id: "customerList",
                                            icon: "fas fa-list-alt",
                                            iFrame: "../customers/customerList.php"
                                        }
                                    ]
                                },
                                {
                                    id: 4, value: "Invoices", icon: "fas fa-file-invoice-dollar",
                                    submenu: [
                                        {
                                            value: "New Invoice",
                                            id: "invoiceMaker",
                                            icon: "fas fa-plus-circle",
                                            iFrame: "../invoices/newInvoices.php"
                                        },
                                        {
                                            value: "Invoice List",
                                            id: "invoiceList",
                                            icon: "fas fa-file-invoice",
                                            iFrame: "../invoices/invoiceList.php"
                                        }
                                    ]
                                },
                                {
                                    id: 5, value: "Reports", icon: "fas fa-file",
                                    submenu: [
                                        {
                                            value: "Lab Reports",
                                            id: "labReport",
                                            icon: "fas fa-chart-area",
                                            iFrame: "../reports/newLabReport.php"
                                        },
                                        {
                                            value: "Sterility Reports",
                                            id: "bugReport",
                                            icon: "fas fa-bug",
                                            iFrame: "../reports/newLabReport.php"
                                        },
                                        {
                                            value: "Stability Reports",
                                            id: "stabilityReport",
                                            icon: "fas fa-bullseye",
                                            iFrame: "../reports/newLabReport.php"
                                        },
                                        {
                                            value: "Special Reports",
                                            id: "specialChem",
                                            icon: "fas fa-chart-bar",
                                            iFrame: "../reports/newLabReport.php"
                                        }
                                    ]
                                },
                            {id: 6, value: "Testing", icon: "fas fa-flask", iFrame: "../methods/methods.php"},
                                {
                                    id: 7, value: "Search", icon: "fas fa-search",
                                    submenu: [
                                        {
                                            value: "Scan QR",
                                            id: "scanQR",
                                            icon: "fas fa-qrcode",
                                            iFrame: "../search/search.php"
                                        },
                                        {
                                            value: "Search Reports",
                                            id: "findReports",
                                            icon: "fas fa-file-alt",
                                            iFrame: "../search/search.php"
                                        },
                                        {
                                            value: "Search Methods",
                                            id: "findMethod",
                                            icon: "fas fa-flask",
                                            iFrame: "../search/search.php"
                                        },
                                        {
                                            value: "Search Customers",
                                            id: "findCustomer",
                                            icon: "fas fa-users",
                                            iFrame: "../search/search.php"
                                        },
                                        {
                                            value: "Search Lot Numbers",
                                            id: "findLOT",
                                            icon: "fas fa-map-marker",
                                            iFrame: "../search/search.php"
                                        }
                                    ]
                                },
                            {
                                id: 8, value: "Inventory", icon: "fas fa-boxes", iFrame: "../inventory/index.php",
                                submenu: [
                                    {
                                        value: "Requisition Forms",
                                        id: "requestForms",
                                        icon: "fas fa-truck-moving",
                                        iFrame: "../inventory/inventoryIndex.php"
                                    },
                                    {
                                        value: "Archives",
                                        id: "archives",
                                        icon: "fas fa-archive",
                                        iFrame: "../inventory/inventoryArchive.php"
                                    }
                                ]
                            },
                            {id: 9, value: "Logout", icon: "fas fa-cogs", href: "../../php/logout.php"}
						],
						on: {
							onMenuItemClick: function (id) {
								var myClick = $$("mainBody").load(this.getMenuItem(id).iFrame); //capture the menu item selected and open it in the iFrame

							}
						}
					},
					{
						view: "iframe",
						height: 800,
						width: 1450,
						id: "mainBody",
						css: "des_mainBodyLower",
						src: desTest //open the welcome page in the iFrame
					}
				]
			}
        }).show();
            /////////////////////////////// Menu Access Control Logic /////////////////////
            //                                                                           //
            // This is meant to be a temp fix until a better solution can be written     //
            //                                                                           //
            ///////////////////////////////////////////////////////////////////////////////
            webix.ajax().get("/labs2/php/api_methods/SELECTz.php?tableName=users&columnNames=users_2accessLevel&selectColumn=users_name&selectData=" + userId + "&dataName=data&select=1", function (text, data) {
                var userAuthor = text;
                userAuthor = userAuthor.replace('[', "");
                userAuthor = userAuthor.replace(']', "");
                userAuthor = JSON.parse(userAuthor);
                console.log("The User Access is: " + userAuthor.users_2accessLevel);
                if (userAuthor.users_2accessLevel === "0") {
                    $$("mainMenu").showItem(1);
                    $$("mainMenu").showItem("home");
                    $$("mainMenu").showItem("todos");
                    $$("mainMenu").showItem("maintRequest");
                    $$("mainMenu").showItem("schedule");
                    $$("mainMenu").showItem(2);
                    $$("mainMenu").showItem("userPrefs");
                    $$("mainMenu").showItem("userList");
                    $$("mainMenu").showItem(3);
                    $$("mainMenu").showItem("addCustomer");
                    $$("mainMenu").showItem("customerList");
                    $$("mainMenu").showItem(4);
                    $$("mainMenu").showItem("invoiceMaker");
                    $$("mainMenu").showItem("invoiceList");
                    $$("mainMenu").showItem(5);
                    $$("mainMenu").showItem("labReport");
                    $$("mainMenu").showItem("bugReport");
                    $$("mainMenu").showItem("stabilityReport");
                    $$("mainMenu").showItem("specialChem");
                    $$("mainMenu").showItem(6);
                    $$("mainMenu").showItem(7);
                    $$("mainMenu").showItem("scanQR");
                    $$("mainMenu").showItem("findReports");
                    $$("mainMenu").showItem("findMethod");
                    $$("mainMenu").showItem("findCustomer");
                    $$("mainMenu").showItem("findLOT");
                    $$("mainMenu").showItem(8);
                    $$("mainMenu").showItem("requestForms");
                    $$("mainMenu").showItem("archives");
                    console.log("Super User");
                } else if (userAuthor.users_2accessLevel === "10") {
                    $$("mainMenu").showItem(1);
                    $$("mainMenu").showItem("home");
                    $$("mainMenu").hideItem("todos");
                    $$("mainMenu").showItem("maintRequest");
                    $$("mainMenu").hideItem("schedule");
                    $$("mainMenu").showItem(2);
                    $$("mainMenu").showItem("userPrefs");
                    $$("mainMenu").showItem("userList");
                    $$("mainMenu").hideItem(3);
                    $$("mainMenu").hideItem("addCustomer");
                    $$("mainMenu").hideItem("customerList");
                    $$("mainMenu").hideItem(4);
                    $$("mainMenu").hideItem("invoiceMaker");
                    $$("mainMenu").hideItem("invoiceList");
                    $$("mainMenu").hideItem(5);
                    $$("mainMenu").hideItem("labReport");
                    $$("mainMenu").hideItem("bugReport");
                    $$("mainMenu").hideItem("stabilityReport");
                    $$("mainMenu").hideItem("specialChem");
                    $$("mainMenu").hideItem(6);
                    $$("mainMenu").hideItem(7);
                    $$("mainMenu").hideItem("scanQR");
                    $$("mainMenu").hideItem("findReports");
                    $$("mainMenu").hideItem("findMethod");
                    $$("mainMenu").hideItem("findCustomer");
                    $$("mainMenu").hideItem("findLOT");
                    $$("mainMenu").showItem(8);
                    $$("mainMenu").showItem("requestForms");
                    $$("mainMenu").showItem("archives");
                    console.log("IT");
                } else {
                    $$("mainMenu").showItem(1);
                    $$("mainMenu").showItem("home");
                    $$("mainMenu").hideItem("todos");
                    $$("mainMenu").showItem("maintRequest");
                    $$("mainMenu").hideItem("schedule");
                    $$("mainMenu").showItem(2);
                    $$("mainMenu").hideItem("userList");
                    $$("mainMenu").showItem("userPrefs");
                    $$("mainMenu").hideItem(3);
                    $$("mainMenu").hideItem("addCustomer");
                    $$("mainMenu").hideItem("customerList");
                    $$("mainMenu").hideItem(4);
                    $$("mainMenu").hideItem(5);
                    $$("mainMenu").hideItem("labReport");
                    $$("mainMenu").hideItem("bugReport");
                    $$("mainMenu").hideItem("stabilityReport");
                    $$("mainMenu").hideItem("specialChem");
                    $$("mainMenu").hideItem(6);
                    $$("mainMenu").hideItem(7);
                    $$("mainMenu").hideItem("scanQR");
                    $$("mainMenu").hideItem("findReports");
                    $$("mainMenu").hideItem("findMethod");
                    $$("mainMenu").hideItem("findCustomer");
                    $$("mainMenu").hideItem("findLOT");
                    $$("mainMenu").hideItem("invoiceMaker");
                    $$("mainMenu").hideItem("invoiceList");
                    $$("mainMenu").showItem(8);
                    $$("mainMenu").showItem("requestForms");
                    $$("mainMenu").showItem("archives");
                     console.log("Normal");
                }
            });
            ///////////////////////////////////////////////////////////////////////////////
        </script>

    <div class="des_FooterBar"> |* Property of CIAL /|\ AppVersion: <?php echo($theAppVersion); ?> *|
        <div class="des_logoutLink"><a href="../../php/logout.php">Logout</a></div>
        <!-- Emergency escape from the Javascript -->
    </div>
	</body>
</html>