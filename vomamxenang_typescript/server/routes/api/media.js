import express from 'express'
import passport from 'passport'
import fs from 'fs'
import multer from 'multer'

// Load Media model
import Media from '../../models/Media.js'

// Load Input Validation
// import validateMediaInput from '../../validation/media.js'
import auth from '../../middlewares/auth.js'
// end config to save file to local folder

import Utils from '../../utils/Utils.js'
import { dataUri, multerUploads } from '../../utils/multer.js'

import { uploader } from '../../config/cloudinaryConfig.js'

const router = express.Router()
/**
 * @route   GET api/media/test
 * @desc    Tests Media route
 * @access  Public
 */
router.get('/test', (req, res) => res.json({ msg: 'Media Works' }))

/**
 * @route   POST api/media/upload
 * @desc    Upload Media route
 * @access  Private
 */
router.post('/upload', multerUploads, async (req, res) => {
  if (req.file) {
    const file = dataUri(req).content
    const resp = await uploader.upload(file)
    if (resp.url) {
      // save to mongodb and save file
      const reqFile = req.file
      const reqBody = {
        filename: resp.url,
        isPortrait: req.body.isPortrait,
        mediaName: req.body.mediaName,
        title: req.body.title,
        seo_title: req.body.seo_title,
        seo_keywords: req.body.seo_keywords,
        seo_descriptin: req.body.seo_descriptin,
      }
      const mediaFile = new Media({...reqFile, ...reqBody})

      const result = await mediaFile.save()
      if (res.status(200)) {
        return res.json(result)
      }

      return res.status(400).send(result.err)
    }
        
    return res.status(400).json({
      messge: 'someting went wrong while processing your request',
      data: {
        err,
      },
    })
  }
})

/**
 * @route   GET api/media/get:id
 * @desc    Get media by id
 * @access  Public
 */
router.get('/get/:id', (req, res) => {
  Media.findById(req.params.id)
    .then((media) => {
      res.status(200).json(media)
    })
    .catch((err) => {
      res.status(400).send(err)
    })
})

/**
 * @route       GET api/media/list
 * @description Return the list media
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

    const total_count = await Media.countDocuments({ deleted: 2 })
    const items = await Media.find({ deleted: 2 })
      .limit(limit)
      .skip(skip)
      .sort({ created_date: -1 })

    const data = Utils.dataPagination({ limit, skip, page, total_count }, items)

    return res.json(data)
  } catch (error) {
    res.status(404).send({ error })
  }
})

/**
 * @route       POST api/media/update-status
 * @description Return the list updated media
 * @access      Private
 */
router.post(
  '/update-status',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const reqId = req.body.id
    const updatedData = req.body
    delete updatedData.id

    Media.findOneAndUpdate(
      { _id: reqId },
      { $set: { ...updatedData } },
      { new: false },
      (err, resp) => {
        if (err) {
          return res.status(404).json({ err })
        }

        if (resp) {
          Media.find(null, (err, items) => {
            const data = Utils.dataPagination(req, items)

            return res.json(data)
          }).catch((err) => res.status(404).json({ err }))
        }
      }
    )
  }
)

/**
 * @route       POST api/media/delete
 * @description Return the list updated media
 * @access      Private
 */
router.post(
  '/delete',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    Media.deleteOne({ _id: req.body.id }, (err) => {
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
          res.status(404).json({ noItemsFound: 'No Media found' })
        }
      })

      Media.find(null, (err, items) => {
        const data = Utils.dataPagination(req, items)

        return res.json(data)
      }).catch((err) => res.status(404).json({ err }))
    })
  }
)

/**
 * @route       POST api/media/edit-${id}
 * @description Return the updated media
 * @access      Private
 */
router.put('/edit-:id', (req, res) => {
  Utils.upload(req, res, function (err) {
    if (err instanceof multer.MulterError) {
      return res.status(500).json(err)
    } else if (err) {
      return res.status(500).json(err)
    }

    const reqId = req.params.id
    delete req.files[0].id
    const mediaFile = {
      ...req.files[0],
      ...req.body,
      updated_date: Date.now(),
    }

    Media.findOneAndUpdate(
      { _id: reqId },
      { $set: { ...mediaFile } },
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
  })
})

export default router
