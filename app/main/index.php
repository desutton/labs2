<?php
/**
 * <dsCode> Inc. (c) 2016. This copyright is based on the Apache License 2.0. Please contact David Sutton for use of this software.
 */

		/*
		 * This is the main background page that the javascript components are built on top
		 *
		 * */
	    $theUserName = $_GET['users_name'];
include $_SERVER['DOCUMENT_ROOT'] . '/php/resources/appVersion.php';

?>
<html>
	<header>
		<!-- -->
		<title>
		<?php echo($theAppVersion); ?>
		</title>
        <!--<link rel="stylesheet" href="http://localhost/webix/codebase/skins/clouds.css" type="text/css">-->
        <link rel="stylesheet" href="/labs2/webix/codebase/skins/flat.min.css" type="text/css">
        <!--<link rel="stylesheet" href="/labs2/webix/codebase/webix.css" type="text/css">-->
        <link rel="stylesheet" href="http://localhost/labs2/css/font-awesome.css" type="text/css">
        <link rel="stylesheet" href="http://localhost/labs2/css/main.css" type="text/css">
        <script src="http://localhost/labs2/webix/codebase/webix.js" type="text/javascript"></script>
		<!--<script src="../supportjs/dscode.js" type="text/javascript"></script>-->
	</header>
	<body>
		<div class="des_TitleBar"><?php echo($theAppVersion); ?></div>
		<script>
			var userId = ("<?php echo($theUserName);?>"); //capture the user name
			var desTest = ("welcome.php?users_name="+userId); //build the url for the welcome page
		webix.ui({

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
                            /*	{
                                    id: 1, value: "ToDo", icon: "inbox", iFrame: "../tasks/today.php",
                                    submenu: [
                                        {
                                            value: "Home",
                                            iFrame: "../main/welcome.php",
                                            icon: "clock-o",
                                            css: "des_menuLink"
                                        },
                                        {
                                            value: "Today",
                                            iFrame: "../tasks/today.php",
                                            icon: "clock-o",
                                            css: "des_menuLink"
                                        },
                                        {
                                            value: "Past Due",
                                            iFrame: "../tasks/pastDue.php",
                                            icon: "exclamation-circle",
                                            css: "des_menuLink"
                                        },
                                        {
                                            value: "Scheduled",
                                            iFrame: "../tasks/scheduled.php",
                                            icon: "calendar",
                                            css: "des_menuLink"
                                        }
                                    ]
                                }, */
                                {
                                    id: 2,
                                    value: "Settings",
                                    icon: "fas fa-cogs",
                                    iFrame: "../users/index.php",
                                    css: "des_menuLink",
                                    submenu: [
                                        {value: "New User", icon: "fas fa-user-plus", iFrame: "../users/newUsers.php"},
                                        {value: "User List", icon: "fas fa-users", iFrame: "../users/usersList.php"}
                                    ]
                                },/*

                                {
                                    id: 3, value: "Customers", icon: "users",
                                    submenu: [
                                        {value: "Add Customer", icon: "user-plus", iFrame: "../customers/newCustomer.php"},
                                        {value: "Customer List", icon: "list-alt", iFrame: "../customers/customerList.php"}
                                    ]
                                },
                                {
                                    id: 4, value: "Invoices", icon: "money",
                                    submenu: [
                                        {value: "New Invoice", icon: "plus-circle", iFrame: "../invoices/newInvoices.php"},
                                        {value: "Invoice List", icon: "bars", iFrame: "../invoices/invoiceList.php"}
                                    ]
                                },
                                {
                                    id: 5, value: "Reports", icon: "file",
                                    submenu: [
                                        {value: "Lab Reports", icon: "area-chart", iFrame: "../reports/newLabReport.php"},
                                        {value: "Sterility Reports", icon: "bug", iFrame: "../reports/newLabReport.php"},
                                        {
                                            value: "Stability Reports",
                                            icon: "bullseye",
                                            iFrame: "../reports/newLabReport.php"
                                        },
                                        {
                                            value: "Special Reports",
                                            icon: "line-chart",
                                            iFrame: "../reports/newLabReport.php"
                                        }
                                    ]
                                },
                                {   id: 6, value: "Methods", icon: "flask", iFrame: "../methods/methods.php"},
                                {
                                    id: 7, value: "Search", icon: "search",
                                    submenu: [
                                        {value: "Scan QR", icon: "qrcode", iFrame: "../search/search.php"},
                                        {value: "Search Reports", icon: "file-text", iFrame: "../search/search.php"},
                                        {value: "Search Methods", icon: "flask", iFrame: "../search/search.php"},
                                        {value: "Search Customers", icon: "users", iFrame: "../search/search.php"},
                                        {value: "Search Lot Numbers", icon: "map-marker", iFrame: "../search/search.php"}
                                    ]
                                },
                            */    {
                                id: 8, value: "Inventory", icon: "archive", iFrame: "../inventory/index.php",
                                submenu: [
                                    {
                                        value: "Requisition Forms",
                                        icon: "qrcode",
                                        iFrame: "../inventory/inventoryIndex.php"
                                    }
                                ]
                            },
                            {id: 9, value: "Logout", icon: "cogs", href: "../../php/logout.php"}
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
		</script>
		
		<div class="des_logoutLink"><a href="../../php/logout.php">Logout</a></div>
		<div class="des_FooterBar"> Property of CIAL </div>
	</body>
</html>