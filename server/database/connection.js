import mysql from 'mysql';

const config = {
    host: '10.131.102.75',
    user: 'root',
    password: 'admin',
    database: 'newsfeed'
};

const connection = mysql.createConnection(config);

export default connection;
