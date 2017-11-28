const mysql = require("mysql");

const payroll = mysql.createConnection({
    host: "192.168.64.5",
    user: "root",
    password: "P@55w0rd",
    database: "payroll"
});

payroll.connect(err => {
    if(err) throw err;
});

export default payroll;