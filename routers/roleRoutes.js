const express = require('express')
const router = express.Router()



const isSuperAdmin = require('../middleware/authMiddleware').isSuperAdmin

const {test,viewAllRole,roleRegister} = require('../controllers/userRoleControllers')


router.use('/',isSuperAdmin)


router.get('/',test)
router.get('/view',viewAllRole)
router.post('/register',roleRegister)

module.exports = router