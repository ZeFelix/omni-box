const mongoose = require('mongoose');

const File = mongoose.Schema({
    title : {
        type : String,
        require : true
    },
    path : {
        type : String,
        require : true
    }
},{
    timestamps : true,
    toOject: {virtuals: true},
    toJSON: {virtuals: true}
});

File.virtual('url').get(function(){
    return `http://localhost:8000/files/${encodeURIComponent(this.path)}`
});

module.exports = mongoose.model('File', File);