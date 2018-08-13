const profile = (req, res, knex)=>{

    const {id} = req.params;
    
    knex.select('*').from('users').where({
        id: id})
        .then(user => {

        if(user.length){
            res.json(user);
        }else{
            res.status(400).json("No such user on this ID")
        }
    })
}
module.exports = {
    handleProfileGet: profile
}