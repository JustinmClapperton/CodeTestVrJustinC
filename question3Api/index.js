let customerRoutes = require('./routes/CustomerRoutes')
let addressRoutes = require('./routes/AddressRoutes')

let express = require('express')
let bodyParser = require('body-parser')

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const port = process.env.PORT || 8000;

customerRoutes.use('/:customerId/addresses', addressRoutes);
app.use('/api/v1/customers', customerRoutes);

// when a random route is inputed
app.get('*', (req, res) => res.status(200).send({
    message: 'Welcome',
}));

app.listen(port, () => {
    console.log(`Server is running on PORT ${port}`);
});

module.exports = app