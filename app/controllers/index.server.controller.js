exports.render = function(req, res) {
  var main_message;

  if (req.session.lastVisit) {
    console.log(req.session.lastVisit);
  }
  req.session.lastVisit = new Date();

  if (req.user){
    main_message = "Congratulations! You are logged in!"
  }
  else {
    main_message = "You are a guest. Please sign in."
  }

  res.render('index', {
    title: 'MEAN Main Page',
    userFullName: req.user ? req.user.fullName : '',
    user: JSON.stringify(req.user),
    main_message: main_message
  })
};
