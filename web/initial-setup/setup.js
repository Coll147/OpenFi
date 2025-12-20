document.getElementById('show-password2').addEventListener('click', () => {
    const element = document.getElementById('passwd1')
    element.type = element.type === 'password' ? 'text' : 'password'
})


async function setup() {
  // Take variables
  let account = JSON.parse(localStorage.getItem("account")) // Load BD
  const passwd1 = document.getElementById('passwd1').value
  const passwd2 = document.getElementById('passwd2').value
  const email = document.getElementById('email-set').value

  // Security checks
  if (!passwd1 || (passwd1 !== passwd2)) {
    console.log('Password not valid')
    return
  }

  console.log(account[0].password)
  account[0].password = await sha256(passwd1)
  console.log(account[0].password)
  account[0].email = email

  localStorage.setItem("account", JSON.stringify(account)) // Save DB

  log('User Setup', `OpenFi System`, 'Info', `Setup completed. Welcome  to  OpenFi`)


  window.location.href = "../login.html"
}