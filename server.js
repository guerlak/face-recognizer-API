const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const register = require('./controllers/register')
const login = require('./controllers/login')
const image = require('./controllers/images')
const profile = require('./controllers/profile')
const Clarifai = require('clarifai');

const faceDetect = new Clarifai.App({
    apiKey: 'e2090dd0b894438c834ca2d6f3587044'
});

const knex = require('knex')({
    client: 'pg',
    connection: {
      connectionString: process.env.DATABASE_URL,
      ssl: true
    }
});

app.use(bodyParser.json());
app.use(cors());

app.listen(process.env.PORT|| 3001, ()=>{
    console.log(`API server running on port ${process.env.PORT}`)
})

app.get('/', (req, res)=> {
    res.send("Server is fine...")
})


app.post('/clarifai',(req, res) => {

    console.log(req.json())

    const faceUrl = req.json();

    const clarifai = faceDetect.models.predict(Clarifai.FACE_DETECT_MODEL, faceUrl.input)

    res.json(clarifai)

});

app.post('/login',(req, res) => {login.login(req, res, knex, bcrypt)});

app.post('/register', (req, res) => {register.handleRegister(req, res, knex, bcrypt)});

app.get('/profile/:id', (req, res) => {profile.handleProfileGet(req, res, knex)});

app.put('/image', (req, res)=> {image.handleImage(req, res, knex)});
