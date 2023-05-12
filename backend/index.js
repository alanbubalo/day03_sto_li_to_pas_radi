const express = require("express");
const cors = require("cors");
const app = express();
var db = require("./database.js");
var testVectorService = require("./TestVectorService.js");

app.use(cors());

function getData(status, msg, data=[]) {
    return {
        status: status,
        msg: msg,
        data: data,
    }
}

// ~/api/samples
// ~/api/input-conditions
// ~/api/test-point-collections
// ~/api/get-vector-table/{sample_id}
app.get("/", (req, res) => {
    res.send(new Date());
});

app.get("/api/samples", (req, res) => {
    var sql = "select * from samples";
    var params = []
    db.all(sql, params, (err, rows) => {
        if (err) {
            res.status(400).json(getData(400, err.message));
            return;
        }

        res.json(getData(200, "success", rows));
    });
});

app.get("/api/input-conditions", (req, res) => {
    var sql = "select * from input_conditions";
    var params = []
    db.all(sql, params, (err, rows) => {
        if (err) {
            res.status(400).json(getData(400, err.message));
            return;
        }
    
        res.json(getData(200, "success", rows));
    });
});

app.get("/api/test-point-collections", (req, res) => {
    var sql = "select * from test_point_collections";
    var params = []
    db.all(sql, params, (err, rows) => {
        if (err) {
            res.status(400).json(getData(400, err.message));
            return;
        }
    
        res.json(getData(200, "success", rows));
    });
});

app.get("/api/get-vector-table/:sampleId", (req, res) => {
    if (isNaN(req.params.sampleId)) {
        res.json(getData(400, "sampleId must be an integer"));
    }

    res.json(getData(200, "success", testVectorService.getVectorTable(parseInt(req.params.sampleId))));
});

app.listen(3000, () => {
    console.log("Server started on port 3000");
});
