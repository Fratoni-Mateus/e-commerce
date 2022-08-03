const userSchema = require('../models/usersSchema');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


const SECRET = process.env.SECRET;

const login = (req, res) => {
    try {
        userSchema.findOne({ email: req.body.email }, (error, user) =>{
            if(!user) {
                return res.status(401).send({
                    message: "User não encontrado",
                    email: `${req.body.email}`
                });
            }

            const validPassword = bcrypt.compareSync(req.body.password, user.password);

            if(!validPassword) {
                return res.status(401).send({
                    message: "Login não autorizado"
                })
            }

            const token = jwt.sign({ name: user.name }, SECRET)

            res.status(200).send({
                message: "Login autorizado",
                token
            })
        })

    } catch (error) {
        console.error(error);
    }
}

module.exports = {
    login
}