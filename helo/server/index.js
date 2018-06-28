require( 'dotenv' ).config();

const express = require( 'express' ),
    { json } = require( 'body-parser' ),
    cors = require( 'cors' ),
    massive = require( 'massive' ),
    port = 4000;

const app = express();

massive( process.env.CONNECTION_STRING ).then( db => {
    console.log( 'Database connected successfully.' );
    app.set( 'db', db );
}).catch( err => console.log('massive err: ', err) );

app.use( cors() );
app.use( json() );


app.listen( port, () => console.log(`Server running at ${port}`) );