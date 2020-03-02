const Booking = require('../models/Booking')

module.exports = {
    async store(req,res){
        const { user_id } = req.headers
        const { spot_id } = req.params
        const { date } = req.body

        const booking = await Booking.create({
            user: user_id,
            spot: spot_id,
            date
        })

        await booking.populate('spot').populate('user').execPopulate()
        //buscar conexão do dono do spot/ busca a id dentro dos connectedUsers
        const ownerSocket = req.connectedUsers[booking.spot.user]
        //se tiver conexxão em tempo real
        if (ownerSocket){
            //to para especificar quem vai receber a msg
            //booking_request nome da msg
            req.io.to(ownerSocket).emit('booking_request', booking)
        }

        return res.json(booking)
    }
}