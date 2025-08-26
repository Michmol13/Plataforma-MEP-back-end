//Dependencias, son bibliotecas que se instalan para que nuestro servidor pueda levantarse correctamente
const express = require('express');//facilita la creacion de servidores y manejo de rutas
const mongoose = require('mongoose');//Permite conectarse a la base de datos de mongoDB y crear las colecciones y realizar consultas
const cors = require('cors');//Permite la comunicacion entre dominios diferentes
const bodyParser = require('body-parser');//Permite interpretar los datos que vienen en la peticion en formato json
require('dotenv').config();//Se importa el archivo .env para poder utilizar sus variables dentro del codigo

const app = express(); //Crear una instancia de express
const PORT = process.env.PORT || 3000;

//Importar rutas
const registroUsuarioRoute = require('./routes/registroUsuario.route');
const registroHijosRoute = require('./routes/registroHijos.route');
const registroMaterialesEscolaresRoute = require('./routes/registroMaterialesEscolares.route');
const registroNivelesEducativosRoute = require('./routes/registroNivelesEducativos.route')
const registroCategoriaMaterialesRoute = require('./routes/registroCategoriaMateriales.route');
const registroListaUtilesRoute = require('./routes/registroListasUtiles.route');

app.use(express.json()); //Habilita el manejo de JSON en las peticiones 
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json()); //Habilita el analisis de JSON en las peticiones
app.use(cors({
    origin: "https://michmol13.github.io/Plataforma-MEP-front-end/" 
}));

mongoose.connect(process.env.MONGODB_URI,{
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(()=> console.log('MongoDB Atlas conectado'))
.catch(error=> console.log('Ocurrio un error al conectarse con MongoDB: ', error));

app.use('/registroUsuarios', registroUsuarioRoute);
app.use('/registroHijos', registroHijosRoute);
app.use('/registroCategoria', registroCategoriaMaterialesRoute);
app.use('/registroMaterialesEscolares', registroMaterialesEscolaresRoute);
app.use('/registroNivelesEducativos', registroNivelesEducativosRoute);
app.use('/registroListasUtiles', registroListaUtilesRoute);

app.get('/', (req,res)=> {
    res.send('Backend corriendo en Render');
})

app.listen(PORT, '0.0.0.0', () => {
    console.log(`Servidor corriendo en puerto ${PORT}`);
});