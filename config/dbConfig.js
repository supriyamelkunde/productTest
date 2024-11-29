const mysql = require('mysql2');

const db = mysql.createPool({
    host: 'nodejs-technical-test.cm30rlobuoic.ap-southeast-1.rds.amaxonaws.com',
    user: 'candidate',
    password: 'NoTeDeSt^C10.6?SxwY882}',
    database: 'conqtvms_dev',
    port: 3306
});

module.exports = db