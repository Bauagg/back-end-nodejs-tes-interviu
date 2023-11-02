
module.exports = (req, res, next) => {
    try {
        if (req.user.role === 'admin') {
            next()
        } else {
            res.status(400).json({ error: true, message: 'unauthorization access' })
        }
    } catch (error) {
        next(error)
    }
}