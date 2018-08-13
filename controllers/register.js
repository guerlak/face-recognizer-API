const handleRegister  = (req, res, knex, bcrypt)=>{
    
    const {email, name, password} = req.body;

    if(!email || !password || !name){
        res.status(400).json("Incorret submission")
    }else{

    const hash = bcrypt.hashSync(password);
    knex.transaction(trx => {
        trx.insert({
            hash: hash,
            email: email
        })
        .into('login')
        .returning('email')
        .then(loginEmail => {
            return trx('users')
                    .insert({
                    email: loginEmail[0],
                    name: name,
                    joined: new Date()
                })
                .returning('*')
                .then(user => {
                    res.json(user[0])
                })
        })
        .then(trx.commit)
        .catch(trx.rollback)
    })
    .catch(err => res.status(400).json('Unable to register user'))   
    }
}

module.exports = {
    handleRegister: handleRegister
}