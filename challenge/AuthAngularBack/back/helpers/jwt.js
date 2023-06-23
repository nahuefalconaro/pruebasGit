const jwt = require('jsonwebtoken')

const generarJwt = (uid, name) => {
    const payload = { uid, name };
    return new Promise((resolve, reject)=>{
        jwt.sign(payload, process.env.SECRET_JWT, {
            expiresIn: '24h'
        }, (error, token)=>{
            if (error) {
                console.log('ocurrio un error');
                reject('No se pudo crear el token')
            }else{
                resolve(token)
            }
        })
    })


    
}

module.exports = {
    generarJwt
}