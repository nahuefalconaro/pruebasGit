const { request } = require("express")
const { response } = require("express")
const {validationResult} = require('express-validator')
const validarCampos = (req=request, res=response, next) =>{
    const error = validationResult(req)
    if(!error.isEmpty()){
        return res.status(400).json({
            ok: false,
            msg: 'Ha ocurrido un error, campos no validos',
            error: error.mapped()
        })
    }
    next()//func d middleware para que pase al siguiente validador
}


module.exports = {
    validarCampos
}