import express from 'express'
import gravatar from 'gravatar'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import passport from 'passport'

// Load Input Validation
import validateLoginInput from '../../validation/login.js'
import validateRegisterInput from '../../validation/register.js'

// Load User model
import User from '../../models/User.js'

import Utils from '../../utils/Utils.js'

const router = express.Router()
/** @route   GET api/users/test
 * @desc    Tests users route
 * @access  Public
 */
router.get('/test', (req, res) => res.json({ msg: 'Users Works' }))

/**
 * @route       GET api/users/list
 * @description Return the list users
 * @access      Private
 */
router.get('/list', (req, res) => {
  const limit = req.body.limit
  const page = req.body.page || 1
  let skip = 0
  if (page > 1) {
    skip = (page - 1) * limit
  }

  User.find({ deleted: false }, { password: 0 })
    .limit(limit)
    .skip(skip)
    .sort({ created_date: -1 })
    .then((items) => {
      const data = Utils.dataPagination({ limit, skip, page }, items)

      return res.json(data)
    })
    .catch((err) => res.status(404).json({ err }))
})

/**
 * @route       GET api/users/register
 * @description Register User
 * @access      Public
 */
router.post('/register', (req, res) => {
  const { errors, isValid } = validateRegisterInput(req.body)

  // Check Validation
  if (!isValid) {
    return res.status(400).json(errors)
  }

  User.findOne({ email: req.body.email }).then((user) => {
    if (user) {
      errors.email = 'Email already exists'
      return res.status(400).json(errors)
    }

    const avatar = gravatar.url(req.body.email, {
      s: '200', // Size
      r: 'pg', // Rating
      d: 'mm', // Default
    })

    const newUser = new User({
      name: req.body.firstname + ' ' + req.body.lastname,
      email: req.body.email,
      avatar,
      password: req.body.password,
      created_date: new Date(),
      deleted: false,
    })

    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(newUser.password, salt, (err, hash) => {
        if (err) throw err
        newUser.password = hash
        newUser
          .save()
          .then((user) => res.json(user))
          .catch((err) => res.status(404).json({ err }))
      })
    })
  })
})

/**
 * @route       GET api/users/login
 * @description Login User / Returning JWT Token
 * @access      Public
 */
router.post('/login', async (req, res) => {
  const { errors, isValid } = validateLoginInput(req.body)

  // Check Validation
  if (!isValid) {
    return res.status(400).json(errors)
  }

  const email = req.body.email
  const password = req.body.password
  
  // Find user by email
  const findUser = await User.findOne({ email })
  // Check for user
  errors.success = false
  if (!findUser) {
    errors.msg = 'User not found'
    return res.status(404).json(errors)
  }

  // Check Password
  const isMatch = await bcrypt.compare(password, findUser.password)
  if (!isMatch) {
    errors.msg = 'Password incorrect'
    return res.status(400).json(errors)
  }

  // User Matched
  errors.success = true
  errors.msg = ''

  const payload = {
    user: {
      avatar: findUser.avatar,
      email: findUser.email,
      deleted: findUser.deleted,
      id: findUser.id,
      is_online: findUser.is_online,
      name: findUser.name,
      role: findUser.role,
      status: findUser.status,
    }
  } // Create JWT Payload

  // Sign Token
  jwt.sign(
    payload,
    process.env.secretOrKey,
    { expiresIn: 6000 },
    (err, token) => {
      res.json({
        msg: 'Login Successfully !!!',
        success: true,
        token: 'Bearer ' + token,
        timeout: 6000
      })
    }
  )
})

/**
 * @route       GET api/users/me
 * @description Return the current user
 * @access      Private
 */
router.get(
  '/me',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    if (!res) {
      return res.status(400).json({ auth: 'You are not authorized' })
    }
    const user = res.req.user
    delete user.password

    return res.json(user)
  }
)

export default router
