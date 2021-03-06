const express = require('express');
const app = express();
const bodyparser = require('body-parser');
const mongoose = require('mongoose');
const adminRoute = require('./routers/adminRoute');
const userRoute = require('./routers/userRoute');
const orderRoute = require('./routers/orderRoute');
const cors = require('cors');

const port = process.env.PORT || 4000;

app.use(bodyparser.urlencoded({extended: false}));
app.use(bodyparser.json());

app.use(cors());

app.use(express.static(__dirname + '/css'));
app.use(express.static(__dirname + '/js'));

app.set('view engine', 'ejs');

mongoose.connect('mongodb://localhost/shopping-cart', {useNewUrlParser: true}, () => {
    console.log('Database connected');
});

//app.use('/api/user', userRoute);
app.use('/uploads', express.static('uploads'));

app.use('/', adminRoute);
app.use('/user', userRoute);
app.use('/order', orderRoute);

// app.get('/', (req,res) => {
//     res.render('login');
// });

// app.get('/adminregister', (req,res) => {
//     res.render('register');
// });



app.listen(port, () => {
    console.log(`server started on port ${port}`);
});