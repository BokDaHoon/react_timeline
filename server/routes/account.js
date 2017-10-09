import express from 'express';
import connection from '../database/connection';
import bcrypt from 'bcryptjs';

const router = express.Router();

router.post('/singup', (req, res) => {
   res.json({ success : true });
});

router.post('/signin', (req, res) => {
   connection.query('SELECT * FROM ACCOUNT', function(err, rows) {

      console.log('The solution is: ', rows);
      res.send(rows);
   });

   //res.json({ success : true });
});

router.get('/getinfo', (req, res) => {
   res.json({ info : null });
});

router.get('/logout', (req, res) => {
   return res.json({ success : true });
})

export default router;
