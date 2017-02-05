exports.render = function(req, res) {
  var main_message;

  if (req.session.lastVisit) {
    console.log(req.session.lastVisit);
  }
  req.session.lastVisit = new Date();

  if (req.user){
    req.flash('info', 'Congratulations! You are logged in!')
  }
  else {
    req.flash('warning', 'You are a guest. Please sign in.')
  }

  res.render('index', {
    title: 'MEAN Main Page',
    fullName: req.user ? req.user.fullName : '',
    username: req.user ? req.user.username : '',
    info: req.flash('info'),
    warning: req.flash('warning'),
    error: req.flash('error')
  })
};
