let user = require('../model/user')
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

exports.institute = (req,res,next)=>{
    res.render('institution.ejs')
}
exports.createUser = async (req,res,next)=>{
    try{
        let users = await user.find({userRole:0}).select({name:1,collegeId:1,verified:1})
   res.render('createusers.ejs',{users:users})
    }
    catch(err){
        res.render('500.ejs')
    }
}
exports.verification=async (req,res,next)=>{
    try{
        let users = await user.find({userRole:0,status:false}).select({name:1,collegeId:1})
    res.render('verification.ejs',{
        users:users
    })
    }
    catch(err){
        res.render('500.ejs')
    }
}