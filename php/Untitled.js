{
	view:"form",
	id:"profileWindow",
	datatype:"json",
	//height:"300",
	//width:"300",
	//left:"50",
	//top:"0",
	margin:10,
	elements:[
		//{view:"text", name:"users_UUID", label:"UUID", labelWidth:"100", width:"420"},
		//{view:"text", name:"users_firstname", label:"First Name", labelWidth:"100", width:"220"},
		//{view:"text", name:"users_lastname", label:"Last Name", labelWidth:"100", width:"220"},
		//{view:"text", name:"users_name", label:"User Name", labelWidth:"100", width:"220"},
		//{view:"text", name:"users_employeeId", label:"Employee No.", labelWidth:"100", width:"220"},
		//{view:"text", name:"users_pass", label:"Password", labelWidth:"100", width:"220",type:"password"},
		//{view:"text", name:"users_2group", label:"User Group", labelWidth:"100", width:"220"},
		//{view:"text", name:"users_2accessLevel", label:"Access Level", labelWidth:"100", width:"220"}
	//],
	
      {
        rows: [
          {
            view: "text",
            name: "users_UUID",
            label: "UUID",
            labelPosition: "top",
            width:"220"
          },
          {
            view: "text",
            name: "users_firstname",
            label: "first Name",
            labelPosition: "top",
            width:"220"

          },
          {
            view: "text",
            name: "users_name",
            label: "Username",
            labelPosition: "top",
            width:"220"

          },
          {
            view: "text",
            name: "users_2group",
            label: "Group",
            labelPosition: "top",
            width:"220"
      	},
      
          {
            view: "text",
            name: "users_employeeId",
            label: "Employee No.",
            labelPosition: "top",
            width:"220"

          },
          {
            view: "text",
            name: "users_lastname",
            label: "Last Name",
            labelPosition: "top",
            width:"220"

          },
          {
            view: "text",
            name: "users_pass",
            type: "password",
            label: "Password",
            labelPosition: "top",
            width:"220"

          },
          {
            view: "text",
            name: "users_2accessLevel",
            label: "Access Level",
            labelPosition: "top",
            width:"220"

          }
    ]
	
	}],
	url:"_profile.php"
	}
