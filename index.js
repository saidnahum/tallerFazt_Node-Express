// Importar Express
const express = require('express');

// Importando morgan
const morgan = require('morgan');


// Creando servidor
const app = express();

// Express Settings
app.set('appName', 'Web Page: said.com');
app.set('port', 3000);
app.set('view engine', 'ejs');

// Middlewares
function logger(req, res, next) {
   console.log('Request Received');
   next();
}

// Llamando Middlewares
// Middleware express para aceptar archivos .json agregar lo siguiente:
app.use(express.json());
app.use(morgan('dev'));
//app.use(logger);


// Rutas o Routing
// Para retornar una vista
app.get('/', (req, res) => {
   const data = [{name: 'Said'}, {name: 'Mauricio'}, {name: 'Juan'}];
   res.render('index.ejs', {people: data});
});


// app.get('/', (req, res) => {
//    res.send('Home Page');
// });

app.get('/about', (req, res) => {
   res.send('About Page');
});

app.get('/contact', (req, res) => {
   res.send('Contact Page');
});

app.get('/test', (req, res) => {
   res.send('<h1>Test</h1>');
});

// Ruta alll
app.all('/user', (req, res, next) => {
   console.log('Por aqui paso primero');
   next();
});

// Ruta GET para obtener un usuario
app.get('/user', (req, res) => {
   res.json({
      name: 'Said',
      lastname: 'Montes'
   });
});

// Ruta POST para mandar un usuario al servidor
app.post('/user/:id', (req, res) => {
   console.log(req.body);
   console.log(req.params);
   res.send('POST REQUEST RECEIVED');
});

// Ejecutando servidor
app.listen(app.get('port'), () => {
   console.log(app.get('appName'));
   console.log('Server on port: ', app.get('port'));
});