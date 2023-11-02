module.exports = (err, req, res, next) => {
    console.log(err)

    const validateError = {
        error: true,
        method: req.method,
        url: req.url
    }

    if (err.name === 'JsonWebTokenError') return res.status(400).json({ ...validateError, message: 'Authenticated Failed' })

    // if (err.code && err.message) return res.status(err.code).json({ ...validateError, message: err.message })

    res.status(500).json({ ...validateError, message: 'internal server error', error: err.errors })
}