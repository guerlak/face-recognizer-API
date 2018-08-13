const images = (req, res) => {

    const {id} = req.body;
    
    knex('users').where('id', '=', id).increment('entries', 1)
    .returning('entries')
    .then(entries =>{
    res.json(entries[0])
    })
    .catch(err => res.status(400).json("unable to registry an entry"))
    
}
module.exports = {

    handleImage: images
}