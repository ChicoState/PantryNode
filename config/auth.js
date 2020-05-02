module.exports ={
    ensureAuthenticated: function(req, res, next){
        if(req.isAuthenticated()){
            console.log(req.user.name);
            return next();
        }
        return res.redirect('/');
    }
}