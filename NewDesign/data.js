var demoData = {
	menu: [
		{ value: "Home"},
		{ value: "Messages"},
		{ value: "Settings",  submenu: ["Edit Name", "Change Password", "Alerts"] }
	],
	tree: [
		{ id:"1", value:"Inbox", icon:"inbox"},
		{ id:"2", value:"Sent", icon:"sent"},
		{ id:"3", value:"Drafts", icon:"drafts"},
		{ id:"4", value:"Trash", icon:"trash"},
		{ id:"5", value:"Contact Groups", open:true, icon:"folder", data:[
			{ id:"5-1", value:"Friends", icon:"file"},
			{ id:"5-2", value:"Blocked", icon:"file"}
		]
		}
	],
	table: [
		{ id:1, title:"The Shawshank Redemption", year:1994, votes:678790, rating:9.2, rank:1, category:"Thriller"},
		{ id:2, title:"The Godfather", year:1972, votes:511495, rating:9.2, rank:2, category:"Crime"},
		{ id:3, title:"The Godfather: Part II", year:1974, votes:319352, rating:9.0, rank:3, category:"Crime"},
		{ id:4, title:"The Good, the Bad and the Ugly", year:1966, votes:213030, rating:8.9, rank:4, category:"Western"},
		{ id:5, title:"Pulp fiction", year:1994, votes:533848, rating:8.9, rank:5, category:"Crime"},
		{ id:6, title:"12 Angry Men", year:1957, votes:164558, rating:8.9, rank:6, category:"Western"}
	],
    chart: [
        { id:1, value:20, label:"06", color: "#ee4339"},
        { id:2, value:55, label:"07", color: "#ee9336"},
        { id:3, value:40, label:"08", color: "#eed236"},
        { id:4, value:78, label:"09", color: "#d3ee36"},
        { id:5, value:61, label:"10", color: "#a7ee70"},
        { id:6, value:35, label:"11", color: "#58dccd"},
        { id:7, value:80, label:"12", color: "#36abee"},
        { id:8, value:50, label:"13", color: "#476cee"},
        { id:9, value:65, label:"14", color: "#a244ea"},
        { id:10, value:59, label:"15", color: "#e33fc7"}
    ],
	options:[
		{ id:"1", value:"One"   },
		{ id:"2", value:"Two"   },
		{ id:"3", value:"Three" }
	],
	list: [
		{"id":"1","value":"Parra, Ray", day: "Monday", "phone":"1-516-588-4014", "address":"38 Trebovir Road"},
		{"id":"2","value":"Ritter, Suellen", day: "Monday", "phone":"1-254-142-2718", "address":"14 Pembridge Square"},
		{"id":"3","value":"Blunt, Janelle", day: "Monday", "phone":"1-625-450-6164", "address":"85 Shepherds Bush Road"},
		{"id":"4","value":"Acker, Cristopher", day: "Monday", "phone":"1-168-882-3418", "address":"42, Adler Street "},
		{"id":"5","value":"Dion, Lane", day: "Tuesday","phone":"1-999-444-8015", "address":"122 Church Road"},
		{"id":"6","value":"Mcknight, Rossana", day: "Tuesday","phone":"1-925-700-6209", "address":"16 Leinster Square"},
		{"id":"7","value":"Perryman, Becki", day: "Tuesday","phone":"1-879-598-4224", "address":"428 Woolwich Road"},
		{"id":"8","value":"Sparks, Jolie", day: "Wednesday","phone":"1-639-297-3499", "address":"27 Revolutionary Road"},
		{"id":"9","value":"Mattingly, Shirley", day: "Wednesday","phone":"1-856-490-2946", "address":"131 Beaconsfield Road, SE17 2BX"},
		{"id":"10","value":"Mccracken, Rosario", day: "Wednesday","phone":"1-576-828-1193", "address":"194, Earls Court Road"},
		{"id":"11","value":"Goldsmith, Sudie", day: "Thursday","phone":"1-170-148-7838", "address":"7 Craven Road Paddington"},
		{"id":"12","value":"Berryman, Dan", day: "Thursday","phone":"1-652-296-9698", "address":"22, Coventry Road, Ilford, Essex"},
		{"id":"13","value":"Alley, Sherley", day: "Thursday","phone":"1-312-951-9057", "address":"357 Green Lanes N4 1DZ"},
		{"id":"14","value":"Weston, Giovanni", day: "Thursday","phone":"1-333-753-7919", "address":"85, Yellow Bridge"}
	]
};