const { request } = require("express");
const { response } = require("express");
const Usuario = require("../models/Usuario");
const bcrypt = require("bcryptjs");
const {generarJwt} = require("../helpers/jwt");


const addUser = async (req = request, res = response) => {
  const { name, email, password } = req.body;

  try {
    const user = await Usuario.findOne({ email }); //retorna un usuario si es que existe

    if (user) {
      return res.status(400).json({
        ok: false,
        msg: "Exite un user con ese email",
      });
    }

    const dbUser = new Usuario(req.body);

    const salt = bcrypt.genSaltSync();

    dbUser.password = bcrypt.hashSync(password, salt);
    console.log('llego hasta aca');
    const token = await generarJwt(dbUser.id, name);

    await dbUser.save();

    return res.status(200).json({
      ok: true,
      msg: "ok",
      uid: dbUser.id,
      name: name,
      mail: email,
      pass: dbUser.password,
      token: token,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      ok: false,
      msg: "user dont created",
    });
  }
};

const userLogin = async(req = request, res = response) => {
  const { email, password } = req.body;

  try {
    const userDB = await Usuario.findOne({email})

    if(!userDB){
        return res.status(400).json({
            ok: false,
            msg: "ocurrio un error al iniciar sesion eml",
          });
    }

    const validarPass = bcrypt.compareSync(password, userDB.password);

    if(!validarPass){
        return res.status(400).json({
            ok: false,
            msg: "ocurrio un error al iniciar sesion pswrd",
          });
    }
    const token = await generarJwt(userDB.id, userDB.name);
    return res.status(200).json({
        ok: true,
        msg: "user login",
        token,
        uid: userDB.id,
        name: userDB.name,
        email: userDB.email,
      });
  } catch (error) {
    return res.status(500).json({
        ok: false,
        msg: "ocurrio un problema al iniciar sesion",
        error: error
      });
  }
 
};

const renewToken = async(req=request, res=response) => {

    const {uid} = req;
    
    const dbUser = await Usuario.findById(uid);
    console.log(dbUser);
    const token = await generarJwt(uid, dbUser.name);

    return res.json({
        ok: true,
        uid,
        name: dbUser.name,
        email: dbUser.email,
        token
    });
};
module.exports = {
  addUser,
  userLogin,
  renewToken,
};
