const IncomingForm = require('formidable').IncomingForm

module.exports = function upload (req, res) {
    let form = new IncomingForm()

    form.on('file', (field, file) => {
        res.send("saveD")
    })
    form.on('end', () => {
        res.json()
    })
    form.parse(req)
}