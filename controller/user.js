
const user = require('../model/user');
const bcrypt = require('bcrypt')
const nodemailer = require('nodeMailer')
const { validationResult } = require('express-validator')

let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.USER_EMAIL,
        pass: process.env.USER_PASSWORD
    },
    tls: {
        rejectUnauthorized: false
    }
})

exports.login = (req, res,next) => {
    res.render('login.ejs',{
        title:'login',
        err:'',
        user_name:'',
        password:''
    })
}
exports.logout = (req,res,next)=>{
    req.session.destroy(err => {
        console.log(err)
        res.redirect('/')
    })
}
exports.dashboard = (req,res,next)=>{
    res.render('index.ejs')
}

exports.signup = (req,res,next)=>{
    res.render('signup.ejs',{
        title:'signup',
        err:[],
        user:'',
        email:'',
        dob:'',
        phone:'',
        state:'',
        city:'',
        institution:'',
        password:'',
        confirm:''
})
}

exports.profile = (req,res,next)=>{
    res.render('profile.ejs')
}

exports.createUser = async (req,res,next)=>{
const errors = validationResult(req).errors
 if(errors.length>0){
    return res.status(422).render('signup.ejs',{
        title:'signup',
        err:errors[0],
        user:req.body.name,
        email:req.body.email,
        dob:req.body.dob,
        gender:req.body.gender,
        phone:req.body.phone,
        state:req.body.state,
        city:req.body.city,
        institution:req.body.college,
        password:req.body.password,
        confirm:req.body.confirm
    })
 }

 //creating user
let user_name=req.body.name;
let email=req.body.email;
let dob=req.body.dob;
let phone=req.body.phone;
let state=req.body.state;
let city=req.body.city;
let institution=req.body.college;
let password=req.body.password;
let confirm=req.body.confirm;
let gender = req.body.gender
if(password == confirm){
   try{
    let hashed = await bcrypt.hash(password,13);
    if(hashed){
    let result = await user.create({
            name:user_name,
            phone:phone,
            email:email,
            collegeMail:'',
            verified:'Pending',
            collegeId:institution,
            userRole:0,
            state:state,
            city:city,
            dob:dob,
            password:hashed,
            gender:gender,
            status:false,
            waLogin:false
            })
    if(result){
        res.render('login.ejs',{
            title:'login',
            err:'',
            user_name:req.body.name,
            password:''
        })
        let mailOptions = {
            to: req.body.email,
            from: process.env.MAIL_FROM,
            subject: "Signup confirmation",
            text: " WE are so happy that you chose our service.Sellular team welcomes you!",
            html: `<h1>Hey user these are your credentials</h1>
    <ul>
    <li><h3>User name: ${req.body.name}</h3></li>
    <li><h3>Email : ${req.body.email}</h3></li>
    <li><h3>Password: ${req.body.password}</h3></li>
    
    </ul>`
        }
        try{
             await transporter.sendMail(mailOptions)
        }
        catch(err){
            console.log('failed to send email')
        }}}
   }
   catch(err){
    console.log(err);
    res.render('500.ejs')
   }
}

}

exports.validateUser = async (req,res,next)=>{
    const name = req.body.name;
    const password = req.body.password
    try{
        let result = await user.find({name:name})
        if(result.length > 0){
            console.log(result[0])
        req.body.id = result[0]._id;
        let matched = await bcrypt.compare(password, result[0].password)
        if(matched == true){
            console.log('user is verified')
            const user_id = req.body.id;
            req.body.id = -1;
            req.session.isloggedIn = true
            req.session.userId = user_id
            res.redirect(`/dashboard`)
        }
        else{
            console.log('wrong password')
        req.flash('errorpswd', 'Wrong password') //this method is now available in our app
                                //this metod takes a key value pair
                                //new we need to register in the page which will be rendered
                            res.render('login.ejs', {
                                title: 'login',
                                err: req.flash('errorpswd'), //we simply specify the key in here
                                user_name:req.body.name,
                                 password:''
                            })
        }
    }
    else{
        console.log('no such user exists')
        req.flash('username', 'No such user found!!') //this method is now available in our app
        //this metod takes a key value pair
        //new we need to register in the page which will be rendered
        res.render('login.ejs', {
        title: 'login',
        err: req.flash('username'), //we simply specify the key in here
        user_name:req.body.name,
         password:''
    })
    }
    }
    catch(err){
        console.log(err)
        res.render('500.ejs')
    }
}
exports.profile = async(req,res,next)=>{
    let uid = req.session.userId;
    let User = await user.find({_id:uid}).select({'name':1,'email':1,'phone':1,'collegeId':1})
    if(User.length>0){
        User = User[0];
    res.render('profile.ejs',{
        username:User.name,
        email:User.email,
        phone:User.phone,
        college:User.collegeId
    })
}
else{
    res.status(500).render('500.ejs')
}
}
exports.editProfile= async (req,res,next)=>{
    let uid = req.session.userId;
    let User = await user.find({_id:uid})
    if(User.length>0){
        User=User[0]
    res.render('editProfile.ejs',{
        name:User.name,
        email:User.email,
        dob:User.dob,
        phone:User.phone,
        state:User.state,
        city:User.city,
        college:User.collegeId
    })
    }
    else{
        res.status(500).render('500.ejs')
    }
}

//password change

exports.changePassword = (req,res,next)=>{
    res.render('confirm_update.ejs',{title:'change password',err:''})
}
exports.confirmUpdate= async(req,res,next)=>{
try{
    let password = req.body.password;
let uid = req.session.userId
let User = await user.find({_id:uid}).select({password:1,_id:-1})
if(User.length>0){
    let oldPass=User[0].password;
    let matched = await bcrypt.compare(password,oldPass)
    if(matched){
        res.render('changepassword.ejs',{title:"update password",err:''})
    }
    else{
        res.render('confirm_update.ejs',{title:'change password',err:'wrong password'})
    }
}
else{
    res.render('500.ejs')
}
}
catch(err){
    console.log(err);
    res.render('500.ejs')
}
},
exports.updatePassword = async(req,res,next)=>{
    try{
        const errors = validationResult(req).errors
    if(errors.length>0){
        res.render('changepassword.ejs',{title:'change password',err:errors[0]})
    }
    let id = req.session.userId;
    let User = await user.find({_id:id}).select({password:1,_id:-1})
    let old_pass = User[0].password;
    let password = req.body.password;
    //  new password should not be same as old password
    let matched = await bcrypt.compare(password,old_pass)
    if(matched){
        res.render('changepassword.ejs',{title:'change password',err:'new password should not be the old password'})
    }
    let new_pass = await bcrypt.hash(password,13);

     await user.updateOne({_id:id},{
        password:new_pass
    })
    res.redirect('/profile')
    }
catch(err){
    console.log(err)
    res.render('500.ejs')
}
    
}

//forgot password
exports.forgot1=(req,res,next)=>{
    res.render('forgotpwd1.ejs',{title:'forgot password',err:''})
}
exports.confirmMail= async(req,res,next)=>{
    let mail = req.body.email
    let User = await user.find({email:mail})
    if(User.length>0){
     //will sen a verfication code to user and after verfying will redirect them to passwor change page
   let mailed = await transporter.sendMail(mailOptions)
     if(mailed)res.render('forgotpwd1.ejs',{title:'forgot password',err:'A mail is sent to change password'})
     else res.render('500.ejs')
    }
    else{
       console.log('no user exists')
        res.render('forgotpwd1.ejs',{title:'forgot password',err:'this email does not exists'})
    }
}