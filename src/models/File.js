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
    const url = process.env.URL || "http://localhost:8000"
    
    return `${url}/files/${encodeURIComponent(this.path)}`
});

module.exports = mongoose.model('File', File);