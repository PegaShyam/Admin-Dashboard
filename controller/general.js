exports.entry = (req,res,next)=>{
    res.render('login.ejs',{
        title:'login',
        err:'',
        user_name:'',
        password:''

    })
}

exports.dashboard = (req,res,next)=>{
    res.render('dash')
}


exports.dash1 = (req,res,render)=>{
    res.render('dash1')
}
exports.dash2 = (req,res,render)=>{
    res.render('dash2')
}
exports.dash3 = (req,res,render)=>{
    res.render('dash3')
}
