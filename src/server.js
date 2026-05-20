const express = require('express')
const app = express()

app.use('/public', express.static('public'))
app.set('view engine', 'ejs');


// Routes
app.get('/', (req, res) => {
  res.render('pages/index', {
    title: 'OpenFi Network'
  });
});

const apiRoutes = require('./routes/api.routes');
const webRoutes = require('./routes/dashboard.routes');

app.use('/api', apiRoutes);
app.use('/dashboard', webRoutes);


// Error responses
app.use((req, res) => {
  res.status(404).render('pages/misc/404');
});

// Extras
app.listen(80, () => {
  console.log(`all ready; http://localhost:80`)
})