import express from 'express'
import passport from 'passport'

import Utils from '../../utils/Utils.js'

// Load Modules model
import Modules from '../../models/Modules.js'

// Load Input Validation
import auth from '../../middlewares/auth.js'

const router = express.Router()
/**
 * @route       GET api/modules/test
 * @description Return test value
 * @access      Public
 */
router.get('/test', (req, res) => res.json({ msg: 'Modules Works' }))

/**
 * @route       GET api/modules/list
 * @description Return the list modules
 * @access      Private
 */
router.post('/list', auth, async (req, res) => {
  try {
    const limit = req.body.limit || PAGING_LIMIT
    const page = req.body.page || 1
    let skip = 0
    if (page > 1) {
      skip = (page - 1) * limit
    }

    const items = await Modules.find({ deleted: 2 })
      .limit(limit)
      .skip(skip)
      .sort({ created_date: -1 })

    const data = Utils.dataPagination({ limit, skip, page }, items)

    return res.json(data)
  } catch (error) {
    res.status(404).send({ error })
  }
})

// @route   POST api/modules/new
// @desc    Create post
// @access  Private
router.post(
  '/new',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    Modules.findOne({ title: req.body.title })
      .then((item) => {
        if (item) {
          return res.status(400).json({ messageErr: 'Title is existing' })
        }

        const newPost = new Modules({
          ...req.body,
          // description: req.body.description,
          // fileSrc: req.body.fileSrc,
          // info: req.body.info,
          post: req.body.selectedPosts,
          // title: req.body.title,
          user: req.user.id,
        })

        newPost
          .save()
          .then((item) => {
            res.status(200).json(item)
          })
          .catch((err) => res.status(400).send(err))
      })
      .catch((err) => res.status(404).json({ err }))
  }
)

/**
 * @route   GET api/modules/get:id
 * @desc    Get post by id
 * @access  Public
 */
router.get('/get/:id', (req, res) => {
  Modules.findById(req.params.id)
    .then((post) => {
      res.status(200).json(post)
    })
    .catch((err) => {
      res.status(400).send(err)
    })
})

/**
 * @route   GET api/modules/get:alias
 * @desc    Get post by alias
 * @access  Public
 */
router.get('/get-item/:alias', (req, res) => {
  let arrAlias = req.params.alias.split(',')

  Modules.find({ alias: { $in: arrAlias } })
    .then((item) => {
      if (!item) {
        return res
          .status(400)
          .json({ messageErr: 'This module is not existing' })
      }

      return res.status(200).json(item)
    })
    .catch((err) => res.status(404).json({ err }))
})

/**
 * @route       POST api/modules/update-status
 * @description Return the list updated modules
 * @access      Private
 */
router.post(
  '/update-status',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const reqId = req.body.id
    const updatedData = req.body
    delete updatedData.id

    Modules.findOneAndUpdate(
      { _id: reqId },
      { $set: { ...updatedData } },
      { new: false },
      (err, resp) => {
        if (err) {
          return res.status(404).json({ err })
        }

        if (resp) {
          return res.status(200).json(resp)
        }
      }
    )
  }
)

/**
 * @route       POST api/modules/delete
 * @description Return the list updated modules
 * @access      Private
 */
router.post(
  '/delete',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    Modules.deleteOne({ _id: req.body.id }, (err) => {
      // remove file
      fs.exists(req.body.filename, (exists) => {
        if (exists) {
          //Show in green
          fs.unlink(req.body.filename, (err) => {
            if (err) {
              res.status(404).json({ err })
            }
          })
        } else {
          res.status(404).json({ noItemsFound: 'No Modules found' })
        }
      })

      Modules.find(null, (err, items) => {
        const data = Utils.dataPagination(req, items)

        return res.json(data)
      }).catch((err) => res.status(404).json({ err }))
    })
  }
)

/**
 * @route       POST api/modules/edit-${id}
 * @description Return the list updated modules
 * @access      Private
 */
router.put(
  '/edit-:id',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const reqId = req.params.id
    const updatedData = req.body

    Modules.findOneAndUpdate(
      { _id: reqId },
      { $set: { ...updatedData, post: updatedData.selectedPosts } },
      { new: false },
      (err, resp) => {
        if (err) {
          return res.status(404).json({ err })
        }

        if (resp) {
          return res.status(200).json(resp)
        }
      }
    )
  }
)

export default router
