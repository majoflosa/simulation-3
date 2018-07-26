const getLoginUser = (req, res, next) => {
    req.app.get( 'db' )
        .getLoginUserQuery( [req.params.username, req.params.password] )
        .then( response => {
            console.log( 'getLoginUser successful: ', response );
            if ( response[0] ) {
                req.session.user = response[0];
                console.log('session: ', req.session);
                res.status(200).json({authedUser: req.session.user});
                // next();
            } else {
                res.redirect( 'http://localhost:3000/#/?loginfail=true' );
            }
        })
        .catch( err => {
            console.log( 'getLoginUser failed: ', err );
            res.status(500).json( err );
        });
}

const getSessionUser = (req, res, next) => {
    if (req.session.user) {
        res.status(200).json({sessionUser: req.session.user});
    } else {
        res.status(500).json({errMsg: 'There is no user in this session.'});
    }
}

const getUserPosts = (req, res, next) => {
    if ( req.query.userposts && req.query.search ) {
        req.app.get( 'db' )
            .getUserPosts( [req.query.userposts, req.query.search])
            .then( response => res.status(200).json(response) )
            .catch( err => res.status(500).json(err) );}
    // } else if ( !req.query.userposts && !req.query.search ) {

    // } else if ( !req.query.userposts && req.query.search ) {

    // } else if ( req.query.userposts && !req.query.search ) {

    // }
}

const registerUser = (req, res, next) => {
    req.app.get( 'db' )
        .registerUserQuery( [req.body.username, req.body.password] )
        .then( response => {
            console.log( 'registerUser successful: ', response );
            if ( response[0] ) {
                req.session.user = response[0];
            }
            res.status(200).json( response );
        })
        .catch( err => {
            console.log( 'registerUser failed: ', err );
            res.status(500).json( err );
        });
};



module.exports = {
    getLoginUser,
    getSessionUser,
    getUserPosts,
    registerUser
};