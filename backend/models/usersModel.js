const mongoose = require('mongoose');

const usersSchema = mongoose.Schema({
    username: {
    type: String,
    required: [true,'please add aname']
},
password: {
    type: String, 
    required: [true,'please add aname']
},
email: {
    type: String,
    required: [true,'please add aname'],
    unique : true 
}, 

// 
role: [{
    type: mongoose.Types.ObjectId,
    ref: 'roles'
}],

status: {
    type: Boolean,
    default: false,
},

token: {
    type: String,
    // required: [true,'please add aname'],
    default:'',
    unique : true ,
}, 

},
{
    timestamps: true,

}
)

module.exports = mongoose.model('users', usersSchema)