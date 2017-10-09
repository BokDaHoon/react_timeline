import mysql from 'mysql';

const config = {
  /*
    host: '10.131.102.75',
    user: 'root',
    password: 'admin',
    database: 'newsfeed'
  */
    host: 'lottedbinstance2.c7xusshagwzv.us-east-1.rds.amazonaws.com',
    user: 'test',
    password: 'test1234',
    port: '8080',
    database: 'lotte_demo_database'
};

const connection = mysql.createConnection(config);

export default connection;
