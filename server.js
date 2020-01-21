 const express = require('express')
 const mongoose=require('mongoose');

 const users=require('./routes/api/users')
 const post=require('./routes/api/post')
 const profile=require('./routes/api/profile');
 const bodyParser=require('body-parser');
 const passport= require('passport')
 var cors = require('cors')
const app = express()
const port = 8000;


app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(cors())

//mongo db
const db=require('./config/keys').mongoURI

// mongo connnect
 mongoose.connect(db,
         { useNewUrlParser: true, 
          useUnifiedTopology: true,
          useFindAndModify:false})
        .then(()=>{
     console.log('mongodb connectesd')
 }).catch(err=>console.log('err',err))

  app.use(passport.initialize());
  //passport config
  require('./config/passport')(passport)

 app.use('/api/users',users)
 app.use('/api/post',post)
 app.use('/api/profile',profile)
app.get('/', (req, res) => res.send('back end runnig!'))
app.listen(port, () => console.log(`server stated ${port}`))