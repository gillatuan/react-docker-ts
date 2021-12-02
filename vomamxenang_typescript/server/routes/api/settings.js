import express from "express"
import passport from "passport"
import Utils from "../../utils/Utils.js"
import fs from "fs"

// Load Settings model
import Settings from "../../models/Settings.js"

const router = express.Router()
/**
 * @route       GET api/settings/test
 * @description Return test value
 * @access      Public
 */
router.get("/test", (req, res) => res.json({ msg: "Settings Works" }))

/**
 * @route       GET api/settings/list
 * @description Return the list settings
 * @access      Private
 */
router.get("/list/:page", (req, res) => {
  Settings.find({ deleted: 2 }, (err, items) => {
    let data = []
    if (items.length > 0) {
      data = Utils.dataPagination(req, items)
    }

    return res.json(data)
  }).catch((err) => res.status(404).json({ err }))
})

// @route   POST api/settings/new
// @desc    Create post
// @access  Private
router.post("/new", passport.authenticate("jwt", { session: false }), (req, res) => {
  Settings.findOne({ name: req.body.name, deleted: 2 })
    .then((item) => {
      if (item) {
        return res.status(400).json({ messageErr: "Name is existing" })
      }
      const name = req.body.name
      const value = req.body.value

      const newSetting = new Settings({
        name,
        value,
      })

      // write to setting file
      const srcPath = "client/src/config/setting.json"
      Utils.readThenWriteFile(srcPath, { [name]: value })

      newSetting
        .save()
        .then((item) => {
          res.status(200).json(item)
        })
        .catch((err) => res.status(400).send(err))
    })
    .catch((err) => res.status(404).json({ err }))
})

/**
 * @route   GET api/settings/get:id
 * @desc    Get post by id
 * @access  Public
 */
router.get("/get/:id", (req, res) => {
  Settings.findById(req.params.id)
    .then((post) => {
      res.status(200).json(post)
    })
    .catch((err) => {
      res.status(400).send(err)
    })
})

/**
 * @route       POST api/settings/update-status
 * @description Return the list updated settings
 * @access      Private
 */
router.post("/update-status", passport.authenticate("jwt", { session: false }), (req, res) => {
  const reqId = req.body.id
  const updatedData = req.body
  delete updatedData.id

  Settings.findOneAndUpdate({ _id: reqId }, { $set: { ...updatedData } }, { new: false }, (err, resp) => {
    if (err) {
      return res.status(404).json({ err })
    }

    if (resp) {
      Settings.find({ deleted: 2 }, (err, items) => {
        const data = Utils.dataPagination(req, items)

        return res.json(data)
      }).catch((err) => res.status(404).json({ err }))
    }
  })
})

/**
 * @route       POST api/settings/delete
 * @description Return the list updated settings
 * @access      Private
 */
router.post("/delete", passport.authenticate("jwt", { session: false }), (req, res) => {
  Settings.deleteOne({ _id: req.body.id }, (err) => {
    // remove file
    fs.exists(req.body.filename, (exists) => {
      if (exists) {
        // Show in green
        fs.unlink(req.body.filename, (err) => {
          if (err) {
            res.status(404).json({ err })
          }
        })
      } else {
        res.status(404).json({ noItemsFound: "No Settings found" })
      }
    })

    Settings.find(null, (err, items) => {
      const data = Utils.dataPagination(req, items)

      return res.json(data)
    }).catch((err) => res.status(404).json({ err }))
  })
})

/**
 * @route       POST api/settings/edit-${id}
 * @description Return the list updated settings
 * @access      Private
 */
router.put("/edit-:id", passport.authenticate("jwt", { session: false }), (req, res) => {
  const reqId = req.params.id
  const updatedData = req.body
  const updated_date = Date.now()

  Settings.findOneAndUpdate(
    { _id: reqId },
    {
      $set: {
        ...updatedData,
        updated_date,
      },
    },
    { new: false },
    (err, resp) => {
      if (err) {
        return res.status(404).json({ err })
      }

      // write to setting file
      const srcPath = "client/src/config/setting.json"
      Utils.readThenWriteFile(srcPath, { [updatedData.name]: updatedData.value }, resp)

      if (resp) {
        return res.status(200).json(updatedData)
      }
    },
  )
})

export default router
