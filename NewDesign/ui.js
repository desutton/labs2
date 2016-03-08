webix.ready(function(){
webix.ui({
	"rows": [
		{
			"type": "line",
			"cols": [
				{
					"type": "line",
					"cols": [
						{
							"type": "line",
							"rows": [
								{
									"type": "line",
									"cols": [
										{
											"data":demoData.menu,
											"type": {
												"subsign": true
											},
											"view": "menu"
										},
										{
											"view": "spacer"
										},
										{
											"label": "LabNoteBook",
											"view": "label",
											"id": "appName",
											"align": "right",
											"borderless": true
										}
									]
								}
							]
						}
					]
				}
			]
		},
		{
			"cols": [
				{
					"type": "line",
					"cols": [
						{
							"type": "line",
							"rows": [
								{
									"type": "line",
									"rows": [
										{
											"data":demoData.tree,
											"view": "tree",
											"id": "Customer-Jobs"
										},
										{
											"type": "line",
											"cols": [
												{
													"view": "calendar",
													"id": "Job-Calendar"
												}
											]
										}
									]
								}
							]
						},
						{
							"type": "line",
							"rows": [
								{
									"type": "line",
									"rows": [

												{
													"type": "line",
													"rows": [
														{
															"data":demoData.tree,
															"columns": [
																{
																	"id": "value",
																	"header": "Film title",
																	"fillspace": true,
																	"template": "{common.treetable()} #value#"
																},
																{
																	"id": "id",
																	"header": "ID",
																	"width": 55
																}
															],
															"view": "treetable",
															"id": "Job-Methods",
															"datatype": "json"
														},
														{
															"type": "line",
															"rows": [
																{
																	"template": "Basic Info",
																	"width": 300,
																	"view": "template",
																	"height": 25
																},
																{
																	"type": "line",
																	"rows": [
																		{
																			"view": "property",
																			"elements": [
																				{
																					"label": "Layout",
																					"type": "label"
																				},
																				{
																					"label": "Width",
																					"type": "text",
																					"id": "width",
																					"value": 250
																				},
																				{
																					"label": "Height",
																					"type": "text",
																					"id": "height",
																					"value": 250
																				},
																				{
																					"label": "Data loading",
																					"type": "label"
																				},
																				{
																					"label": "Data url",
																					"type": "text",
																					"id": "url",
																					"value": "http://webix.com/data"
																				}
																			]
																		},
																		{
																			"type": "line",
																			"cols": [
																				{
																					"type": "ean13",
																					"value": "123456789012",
																					"view": "barcode",
																					"height": 150,
																					"width": 150
																				},
																				{
																					"view": "form",
																					"rows": [
																						{
																							"type": "line",
																							"rows": [
																								{
																									"label": "Options",
																									"options": [
																										"One",
																										"Two",
																										"Three"
																									],
																									"view": "radio"
																								},
																								{
																									"view": "button",
																									"label": "save"
																								}
																							]
																						},
																						{
																							"view": "spacer"
																						}
																					]
																				}
																			]
																		}
																	]
																}
															]
														}
													]
												}


									]
								}
							]
						}
					]
				},
				{
					"type": "space",
					"rows": [
						{
							"view": "tabview",
							"cells": [
								{
									"header": "Tab A'",
									"view": "spacer"
								},
								{
									"header": "Tab B",
									"view": "spacer"
								}
							]
						}
					]
				}
			]
		},
		{
			"template": "Footer ",
			"height": 50,
			"view": "template"
		}
	]
})});