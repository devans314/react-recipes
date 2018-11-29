const requireLogin = (req, res, next) => {
    if(!req.session.userId){
        req.session.message = "Please log in first";
        res.redirect('/auth/login');
    } else {
        next();
    }
}

module.exports = requireLogin;