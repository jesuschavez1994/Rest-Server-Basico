const { response, request } = require('express')

const  usuariosGet = (req = request, res = response ) => {

    const {query, name='sin nombre', apikey} = req.query;

    res.json({
        msg: 'Get API - Controller',
        query,
        name,
        apikey
    })
}

const usuarioPost = (req = request, res = response) => {

    const {name, phone} = req.body

    res.json({
        msg: 'Post API - Controller',
        name,
        phone
    })

}

const usuarioPut = (req = request, res = response) => {

    const id = req.params.id

    res.json({
        msg: 'Put API - Controller',
        id
    })
}

const usuarioPatch = (req = request, res = response) => {
    res.json({
        ok: true,
        msg: 'Patch  API - Controller'
    })
}

const usuarioDelete = (req = request, res = response) => {
    res.json({
        ok: true,
        msg: 'Delete  API - Controller'
    })
}

module.exports = {
    usuariosGet, usuarioPost,
    usuarioPut, usuarioPatch,
    usuarioDelete
}