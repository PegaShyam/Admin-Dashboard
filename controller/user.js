
exports.login = (req, res,next) => {
    res.render('login.ejs')
}

exports.dashboard = (req,res,next)=>{
    res.render('index.ejs')
}

exports.createUser = (req,res,next)=>{
    res.render('createusers.ejs')
}

exports.profile = (req,res,next)=>{
    res.render('profile.ejs')
}