/*
 * <dsCode> Inc. (c) 2020. This copyright is based on the Apache License 2.0. Please contact David Sutton for use of this software.
 */

module.exports = function (app, root) {

    app.post(root + "/mirror", (req, res) => {
        res.send("<pre>" + JSON.stringify(req.body, "", "\t") + "</pre>");
    });

    app.get(root + "/mirror", (req, res) => {
        res.send("<pre>" + JSON.stringify(req.query, "", "\t") + "</pre>");
    });


};