const {Router} = require('express')
const userMiddleware = require('../middleware/user');
const { User, Course } = require('../db');
const router = Router()

router.post('/signup', (req,res)=>{
    const username = req.body.username
    const password = req.body.password

    User.create({
        username: username,
        password: password
    })

    res.json({
        message: "user created succefully"
    })

});

router.get('/courses',async(req,res)=>{
 const response = await Course.find({})

 res.json({
    courses: response
 })

});

router.post('/courses/:courseId', userMiddleware, (req,res)=>{
    const courseId = req.params.courseId
    const username = req.headers.username
    User.updateOne({
        username: username
    },{
        "$push": {
          purchasedCourses: courseId
        }
    }).catch((e)=>{
        console.log(e)
    })
    res.json({
        message: "purchased complete"
    })

});

router.get('/purchasedCourses', userMiddleware, async(req,res)=>{
   const user = await User.findOne({
      username: req.headers.username
   })

   const course = await Course.find({
    _id:{
        "$in": user.purchasedCourses
    }
   })
   res.json({
    courses: course
   })

})

module.exports = router;