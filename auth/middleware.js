
const checkSession = (req, res, next) => {
    req.session.user ?
        next() :
        //If header is undefined return Forbidden (403)
        res.send({ 403: 'Forbidden' })
}

export { checkSession }
