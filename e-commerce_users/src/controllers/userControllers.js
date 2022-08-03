const userSchema = require("../models/usersSchema");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const SECRET = process.env.SECRET;

const getAll = async (req, res) => {
    try {
    const authHeader = req.get('authorization');
    if (!authHeader) {
        return res.status(401).send("Erro no header")
    }

    const token = authHeader.split(' ')[1];
    if (!token) {
        return res.status(401).send("Erro no header")
    }

        jwt.verify(token, SECRET, (err) => {
            if(err) {
                throw new Error()
                // return res.status(401).send("Não autorizado")
            }
        })
        
        userSchema.find(function (err, users){
            if(err) {
                res.status(500).send({message: err.message});
            }
            res.status(200).send(users)
        })
    } catch (err) {
        console.error(err)
        return res.status(401).send("Não autorizado")
    }
}

// To-do: Criar verificação de e-mail já cadastrado no banco de dados
const createUser = async (req, res) => {

    const hashedPassword = bcrypt.hashSync(req.body.password, 10);
    req.body.password = hashedPassword;

    const newUser = new userSchema(req.body);

    const savedUser = await newUser.save();
!
    res.status(201).send({
        "message": "User criado com sucesso",
        savedUser
    })
}

const updateUserById = async (req, res) => {
    try {
        const findUser = await userSchema.findById(req.params.id);

        if (findUser) {
            findUser.name = req.body.name || findUser.name
            findUser.email = req.body.email || findUser.email
        } else {
            throw new Error("Usuário não encontrado")
        }

        const savedUser = await findUser.save();

        res.status(200).json({
            message: "User atualizado com sucesso",
            savedUser
        })

    } catch (error) {
        console.error(error);
        res.status(400).json({
            message: "Erro na requisição."
        })
    }
}

const deleteUserById = async (req, res) =>{
    try {
        const userFound = await userSchema.findById(req.params.id);

        await userFound.delete();

        res.status(200).json({
            mensagem: `User ${userFound.email} deletada com sucesso!`
        })

    } catch (error) {
        res.status(400).json({
            mensagem: err.message
        })
    }
}

module.exports = {
    getAll,
    createUser,
    updateUserById,
    deleteUserById
}