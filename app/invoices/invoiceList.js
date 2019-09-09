/*
 * <dsCode> Inc. (c) 2016. This copyright is based on the Apache License 2.0. Please contact David Sutton for use of this software.
 */

/**
 * Created by sutton on 3/17/16.
 */

webix.DataDriver.plainjs = webix.extend({
    arr2hash: function (data) {
        var hash = {};
        for (var i = 0; i < data.length; i++) {
            var pid = data[i].parent_id;
            if (!hash[pid]) hash[pid] = [];
            hash[pid].push(data[i]);
        }
        return hash;
    },
    hash2tree: function (hash, level) {
        var top = hash[level];
        for (var i = 0; i < top.length; i++) {
            var branch = top[i].id;
            if (hash[branch])
                top[i].data = this.hash2tree(hash, branch);
        }
        return top;
    },
    getRecords: function (data, id) {
        var hash = this.arr2hash(data);
        return this.hash2tree(hash, 0);
    }
}, webix.DataDriver.json);

webix.ui({
    view: "window",
    id: "invoiceList",
    height: 500,
    width: 950,
    move: true,
    head: "Invoice List",
    body: {
        cols: [
            {
                view: "tree",
                width: "500",
                height: "500",
                //data: [{'value':'Bacon East Pharmacy', status:[{'value': 'O', vdates:[{'value': '2015-09-16', invoice:[{value:'Bp 20150916',id:'887A4F0B-2F94-4647-8329-E42FE495403A'}]}]}]}],
                /*
                                    data: [

                                        {id:"887A4F0B-2F94-4647-8329-E42FE495403B",value: "Bacon East Pharmacy", parent_id:0},
                                        {id:"887A4F0B-2F94-4647-8329-E42FE495403C",value: "O", parent_id:"887A4F0B-2F94-4647-8329-E42FE495403B"},
                                        {id:"887A4F0B-2F94-4647-8329-E42FE495403D",value: "2015-09-16", parent_id:"887A4F0B-2F94-4647-8329-E42FE495403C"},
                                        {id: "887A4F0B-2F94-4647-8329-E42FE495403A", value: "Bp 20150916", parent_id:"887A4F0B-2F94-4647-8329-E42FE495403D" },
                                    ],
                */
                url: "./data.json",
                datatype: "plainjs",
            },
            {
                view: "text",
                width: 350,
                height: 50,
                id: "invoice_custNumber"
            }
        ]
    }

}).show();