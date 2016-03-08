webix.ui({
	
		view:"window",
		id:"userProfileSettings",
		//height:"300",
		width:"150",
		move:false,
		
		head:{
			view:"toolbar",
			id:"userProfileSettingsToolbar",
			elements:[
			{view:"button", value:"Add", width:70, click:"add_row"},
			{view:"button", value:"Delete", width:70, click:"delete_row"},
			{view:"button", value:"Modify", width:70, click:"update_row"},
			{view:"button", value:"Clear Form", width:85, click:"$$('userDetail').clear()"}
			]
			},		
		body:
		{	view:"form",
			id:"userDetail",
			datatype:"json",
			elements:[
				{view:"text", name:"users_UUID", id:"users_UUID", label:"UUID", labelPosition: "top", labelWidth:"100", width:"420"},
				{view:"text", name:"users_firstname", id:"users_firstname", label:"First Name", labelPosition: "top", labelWidth:"100", width:"220"},
				{view:"text", name:"users_lastname", id:"users_lastname", label:"Last Name", labelPosition: "top", labelWidth:"100", width:"220"},
				{view:"text", name:"users_name", id:"users_name", label:"User Name", labelPosition: "top", labelWidth:"100", width:"220"},
				{view:"text", name:"users_employeeId", id:"users_employeeId", label:"Employee No.", labelPosition: "top", labelWidth:"100", width:"220"},
				{view:"text", name:"users_pass", id:"users_pass", label:"Password", labelPosition: "top", labelWidth:"100", width:"220",type:"password"},
				{view:"text", name:"users_2group", id:"users_2group", label:"User Group", labelPosition: "top", labelWidth:"100", width:"220"},
				{view:"text", name:"users_2accessLevel", id:"users_2accessLevel", label:"Access Level", labelPosition: "top", labelWidth:"100", width:"220"}
				],
				url:"_profile.php"	
		}
	
			
	}).show();
	
			/**************** Page Logic **************/
			function add_row(){
				var userId = $$("users_UUID").getValue();
				var	pswd =  $$("users_firstname").getValue();
				var userId = $$("users_lastname").getValue();
				var userId = $$("users_name").getValue();
				var userId = $$("users_employeeId").getValue();
				var userId = $$("users_pass").getValue();
				var userId = $$("users_2group").getValue();
				var userId = $$("users_2accessLevel").getValue();
				
				
				
				
				//console.log(userId,pswd);
				
				
				
				webix.ajax().get("./php/login.php",{ users_name:userId, users_pass:pswd }, function(text){
					var myMessageText = (text);
					if(myMessageText == "Success"){
						webix.message({text:myMessageText});
						//newDoc(userId);
					}
					});
					
				}	
			function delete_row(){
				console.log("close window");
			}
/*			function newDoc(userId) {
				window.location.assign("./app/main/index.php?users_name="+userId)
			}
*/