const express = require('express');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');

const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image')

const db = knex({
  client: 'pg',
  connection: {
    host : 'postgres://smart_brain_database_0mnu_user:cDG6FnrJhR9cTI2Hxg90vHyuxn3u8ZUZ@dpg-cf7svaun6mplr402v310-a/smart_brain_database_0mnu',
    port : 5432,
    user : 'smart_brain_database_0mnu_user',
    password : 'cDG6FnrJhR9cTI2Hxg90vHyuxn3u8ZUZ',
    database : 'smart_brain_database_0mnu'
  }
});

const app = express();

app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
	res.send('success');
})
app.post('/signin', (req, res) => { signin.handleSignin(req, res, db, bcrypt) })
app.post('/register', (req, res) => { register.handleRegister(req, res, db, bcrypt) })
app.get('/profile/:id', (req, res) => { profile.handleProfile(req, res, db) })
app.put('/image', (req, res) => { image.handleImage(req, res, db) })
app.post('/imageurl', (req, res) => { image.handleApiCall(req, res) })

app.listen(process.env.PORT || 3000, () => {
	console.log(`app is running on port ${process.env.PORT}`);
})
