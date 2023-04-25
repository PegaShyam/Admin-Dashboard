let user = require("../model/user");
exports.entry = (req, res, next) => {
  res.render("login.ejs", {
    title: "login",
    err: "",
    user_name: "",
    password: "",
  });
};

exports.dashboard = (req, res, next) => {
  res.render("dash");
};

exports.dash1 = (req, res, render) => {
  res.render("dash1");
};
exports.dash2 = (req, res, render) => {
  res.render("dash2");
};
exports.dash3 = (req, res, render) => {
  res.render("dash3");
};

exports.institute = (req, res, next) => {
  res.render("institution.ejs");
};
exports.createUser = async (req, res, next) => {
  try {
    let users = await user
      .find({ userRole: 0 })
      .select({ name: 1, collegeId: 1, verified: 1 });
    res.render("createusers.ejs", { users: users });
  } catch (err) {
    res.render("500.ejs");
  }
};
exports.verification = async (req, res, next) => {
  try {
    let users = await user
      .find({ userRole: 0, status: false })
      .select({ name: 1, collegeId: 1 });
    res.render("verification.ejs", {
      users: users,
    });
  } catch (err) {
    res.render("500.ejs");
  }
};

exports.sales = async (req, res, next) => {
  res.render("sales_dash.ejs", { title: "Sales", name: req.session.username });
};
exports.ecom = async (req, res, next) => {
  res.render("ecom-dash.ejs", {
    title: "E-commerce",
    name: req.session.username,
  });
};
exports.events = async (req, res, next) => {
  res.render("events-dash.ejs", {
    title: "Events",
    name: req.session.username,
  });
};
exports.userGrowth = async (req, res, next) => {
  res.render("user-dash.ejs", {
    title: "Userbase",
    name: req.session.username,
  });
};

exports.salesCollege = async (req, res, next) => {
  res.render("sales-dash-college.ejs", {
    title: "Sales:Name of college",
    name: req.session.username,
  });
};

exports.userCollege = async (req, res, next) => {
  res.render("user-dash-college.ejs", {
    title: "Users:Name of collge",
    name: req.session.username,
  });
};
