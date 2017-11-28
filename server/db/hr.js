const mssql = require('mssql');
const HR = new mssql.ConnectionPool ({
    user: 'sa',
    password: 'P@55w0rd',
    server: '192.168.64.5',
    database: 'HR'
});


export default HR;