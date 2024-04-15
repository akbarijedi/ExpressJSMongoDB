const express = require('express')
const mongoose = require('mongoose')
const tell = require('./models/tell')
const app = express()

mongoose.connect('mongodb://localhost/tell')

app.set('view engine', 'ejs')
app.use(express.urlencoded({extended : false}))

app.get('/',async (req,res)=>{
    
    const tells = await tell.find()
    res.render('index',{tells:tells})
})

// Delete Routes
app.post('/del',async (req,res)=>{
    console.log (req.body.deleteme)
    await tell.findByIdAndDelete(req.body.deleteme)
    res.redirect('/')
})

// Save Routes
app.post('/saveTell', async (req,res)=>{
    await tell.create({tell:req.body.personTell , name:req.body.personName})
    res.redirect('/');
})

// EDIT Routes
// LOAD to edit
app.get('/edit',async (req,res)=>{
    const edittell = await tell.findById(req.query.editme)
    console.log("=====> "+ (req.query.editme))
    res.render('edit',{tells:edittell})
})

// Save edit
app.post('/editsave',async (req,res)=>{
    await tell.updateOne({_id:req.body.edit_tell_id},{ name:req.body.personName, tell:req.body.personTell })
    res.redirect('/')
})

app.post('/search',async (req,res)=>{
    const searchterm = req.body.searchme;
    const searchres = await tell.find({
        $or:[
            {
                name: { $regex: '.*' + searchterm + '.*' },
        },
        {
            tell: { $regex : '.*'+ searchterm+ '.*' }
        }
        ]
        
    })
    res.render('index', {tells:searchres})

})
console.log('Hi, Server started! Have Fun ;)' )
console.log('GO to :'+"\u001B[32m" +' http://127.0.0.1:5000' + "\u001B[0m")
app.listen(process.env.PORT || 5000)