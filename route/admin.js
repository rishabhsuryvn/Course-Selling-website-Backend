const {Router} = require('express')
const adminMiddleware = require('../middleware/admin')
const router = Router()
const {Admin, Course} = require('../db/index')
router.post('/signup', (req,res)=>{
   const username = req.body.username
   const password = req.body.password

   Admin.create({
    username: username,
    password: password
   })
   .then(()=>{
    res.json({
        "msg": "Admin created successfully"
    })
   })

});

router.post('/courses', adminMiddleware, async(req,res)=>{
    const title= req.body.title
    const description= req.body.description
    const imageLink= req.body.imageLink
    const price= req.body.price

   const newCourse = await Course.create({
        title: title,
        description: description,
        imageLink: imageLink,
        price: price
    })
      res.json({
        "msg": "course created succesfully", courseId: newCourse._id
      })

});

router.get('/courses', adminMiddleware, async(req,res)=>{
    const response = await Course.find({})
    res.json({
        courses: response
    })


});
module.exports = router;