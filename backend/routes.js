app.get('/dashboard', (req, res) => {
  res.render('dashboard', {
    title: "Dashboard",
    publicIP: "192.168.1.1"
  });
});
