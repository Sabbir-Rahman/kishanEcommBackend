const express = require('express')
const router = express.Router()



const isSuperAdmin = require('../middleware/authMiddleware').isSuperAdmin

const {test,viewAllRole,roleRegister, roleUpdateUserTable, roleUpdateRoleTable} = require('../controllers/userRoleControllers')


router.use('/',isSuperAdmin)


router.get('/',test)
router.get('/view',viewAllRole)
router.post('/register',roleRegister)
router.put('/usertable/update',roleUpdateUserTable)
router.put('/roletable/update',roleUpdateRoleTable)

module.exports = router