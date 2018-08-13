const handleLogin = (req, res, db, crypt)=>{

    const {email, password} = req.body;

      db.select('email', 'hash').from('login')
      .where('email', email)
      .then(data => {
          const isValid = crypt.compareSync(password, data[0].hash)
          if(isValid){
              db.select('*').from('users')
              .where('email', '=', req.body.email)
              .then(user => {
                  res.json(user[0])
              }).catch(err => res.status(400).json("Unable to find user on login, try again..."))
            }else{
                res.status(400).json("Wrong credentials...")
            }
            })
      .catch(err => res.status(400).json("Wrong credentials..."))
    }
    module.exports = {
        login: handleLogin
    }