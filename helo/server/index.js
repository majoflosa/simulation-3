require( 'dotenv' ).config();

const express = require( 'express' ),
    { json } = require( 'body-parser' ),
    cors = require( 'cors' ),
    massive = require( 'massive' ),
    session = require( 'express-session' ),
    port = 4000;

const app = express();

massive( process.env.CONNECTION_STRING ).then( db => {
    console.log( 'Database connected successfully.' );
    app.set( 'db', db );
}).catch( err => console.log('massive err: ', err) );

app.use( cors() );
app.use( json() );
app.use( session({
    secret: process.env.SECRET,
    saveUninitialized: false,
    resave: false,
    cookie: {
        maxAge: 2 * 24 * 14 * 60 * 60 * 1000
    }
}));

const isAuthed = (req, res, next) => {
    if ( !req.session.user ) {
        console.log( 'no user' );
        res.redirect( 'http://localhost:3000/#/' );
    } else {
        console.log( 'user found' );
        res.redirect( 'http://localhost:3000/#/?username=' + req.session.user.id );
    }
    // console.log( req.session );
    // res.status(200).json( req.session );
}

// user clicks login
// button leads to /login/:username/:password
// /login get endpoint invokes getLoginUser
// getLoginUser checks database for requested user
// if user is found, add it to session and redirect to /dashboard
// /dashboard requests authedUser at /api/user
// /api/user sends req.session.user as response

const { registerUser, getUserPosts, getLoginUser, getSessionUser } = require( `${__dirname}/controller` );
// app.get( '/api/user-login/:username/:password', getLoginUser, isAuthed );
app.get( '/login/:username/:password', getLoginUser );
app.get( '/api/session-user/', getSessionUser );


app.post( '/api/register/', registerUser );

app.get( '/api/userposts/:id', getUserPosts )

app.get( '/logout', (req, res, next) => {
    req.session.destroy();
    console.log( req.session );
    res.redirect( 'http://localhost:3000/#/');
});


app.listen( port, () => console.log(`Server running at ${port}`) );