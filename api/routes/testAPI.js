var express = require("express");
var router = express.Router();

const oracledb = require("oracledb");
const config = {
  user: "lisareichelson",
  password: "v9obo5QZOqJlXqHGeDtfLmlx",
  connectString: "oracle.cise.ufl.edu:1521/orcl",
};

let resultArr;

const set_resultArr = (rows) => {
  resultArr = rows;
  console.log(resultArr);
};

async function getData() {
  let conn;
  try {
    conn = await oracledb.getConnection(config);

    const result = await conn.execute("select * from SEA WHERE depth = :id", [
      6218,
    ]);
    console.log("Data Recieved");
    set_resultArr(result.rows);
    //return result.rows;
  } catch (err) {
    console.log("Ouch!", err);
  } finally {
    if (conn) {
      // conn assignment worked, need to close
      await conn.close();
    }
  }
}

router.get("/", function (req, res, next) {
  getData();
  res.send(resultArr);
});

module.exports = router;
