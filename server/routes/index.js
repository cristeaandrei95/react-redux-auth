module.exports = function(app, userController){
 app.get('/', async function(req, res) {
  res.send("BillPRO api is working...");
 });

app.post('/signup', userController.signup);

// if password match sends back tocken
app.post('/login', userController.login)

// get user from token
app.post('/getUser', userController.authenticate, userController.getUser);
}
