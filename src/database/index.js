const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/noderest', {
  useUnifiedTopology: true,
  useNewUrlParser: true,  
})
.then(() => console.log('DB Connected!'))
.catch(err => {
console.log(`DB Connection Error: ${err.message}`);
});;

mongoose.set('useCreateIndex', true);
mongoose.Promise = global.Promise;

module.exports = mongoose;