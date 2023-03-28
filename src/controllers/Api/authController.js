import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import db from '../../models/index'

const generateToken = (user) =>{
    const payload = {
        id: user.id,
        name: user.username,
        email: user.email,
    };
    const options = {
        expiresIn : '1h'
    }
    return jwt.sign(payload,process.env.JWT_SERECTKEY,options);
}


let register = async (req, res) => {
    const {username, email, password} = req.body;

    await db.User.create({username, email, password}).then((result) => {
        const token = generateToken(result);
        return res.status(200).json({
            status : "OK",
            token : token
        });
    }).catch((err) => {
        return res.status(412).json({
            status : "ERR",
            msg : err.message
        });
    });
}

let login = async (req, res) => {
    const {email, password} = req.body;

    await db.User.findOne({where: {email}}).then(async (result) => {
        if(!result) return res.status(401).json({status : "ERR", msg : "Invalid email"});

        const isValidPassword = await bcrypt.compare(password, result.password); 
        if(!isValidPassword) return res.status(401).json({status : "ERR", msg : "Invalid password"});

        const token = generateToken(result);

        return res.status(200).json({
            status : "OK",
            token : token
        })
    }).catch((err) => {
        return res.status(412).json({
            status : "ERR",
            msg : err.message
        });
    });
}

let profile = async (req, res) => {
    await db.User.findOne({where : {id : req.user.id}}).then((result) => {
        if(!result) return res.status(404).json({status : "ERR", msg: "User not found"});

        return res.status(200).json({status : "OK", data : result});
    }).catch((err) => {
        return res.status(412).json({
            status : "ERR",
            msg : err.message
        });
    });   

}







export default {
    register, 
    login,
    profile
}