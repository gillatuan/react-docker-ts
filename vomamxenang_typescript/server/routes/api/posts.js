import express from "express"
import passport from "passport"
import Utils from "../../utils/Utils.js"

// Load Posts model
import Posts from "../../models/Posts.js"
import auth from '../../middlewares/auth.js'

const router = express.Router()
/**
 * @route       GET api/posts/test
 * @description Return test value
 * @access      Public
 */
router.get("/test", (req, res) => res.json({ msg: "Posts Works" }))

/**
 * @route       GET api/posts/list
 * @description Return the list posts
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

    const total_count = await Posts.countDocuments({ deleted: 2 })
    const items = await Posts.find({ deleted: 2 })
      .limit(limit)
      .skip(skip)
      .sort({ created_date: -1 })
      console.log('total_count, ', total_count);
      console.log('items, ', items);

    const data = Utils.dataPagination({ limit, skip, page, total_count }, items)

    return res.json(data)
  } catch (error) {
    res.status(404).send({ error })
  }
})

// @route   POST api/posts/new
// @desc    Create post
// @access  Private
router.post("/new", passport.authenticate("jwt", { session: false }), (req, res) => {
  Posts.findOne({ title: req.body.title })
    .then((item) => {
      if (item) {
        return res.status(400).json({ messageErr: "Title is existing" })
      }

      let seo_title = req.body.seo_title
      if (req.body.seo_title === "") {
        seo_title = req.body.title
      }

      let seo_keywords = req.body.seo_keywords
      if (req.body.seo_keywords === "") {
        seo_keywords = req.body.title
      }

      let seo_description = req.body.seo_description
      if (req.body.seo_keywords === "") {
        seo_description = req.body.info
      }

      const newPost = new Posts({
        alias: req.body.alias,
        title: req.body.title,
        seo_title,
        seo_keywords,
        seo_description,
        info: req.body.info,
        fileSrc: req.body.fileSrc,
        description: req.body.description,
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
})

/**
 * @route   GET api/posts/get:id
 * @desc    Get post by id
 * @access  Public
 */
router.get("/get/:id", (req, res) => {
  Posts.findById(req.params.id)
    .then((post) => {
      res.status(200).json(post)
    })
    .catch((err) => {
      res.status(400).send(err)
    })
})

/**
 * @route   GET api/posts/get:alias
 * @desc    Get posts by alias
 * @access  Public
 */
router.get("/get-item/:alias", (req, res) => {
  let arrAlias = req.params.alias.split(",")

  Posts.find({ alias: { $in: arrAlias } })
    .then((item) => {
      if (!item) {
        return res.status(400).json({ messageErr: "This / These Post is / are not existed" })
      }

      return res.status(200).json(item)
    })
    .catch((err) => res.status(404).json({ err }))
})

/**
 * @route       POST api/posts/update-status
 * @description Return the list updated posts
 * @access      Private
 */
router.post("/update-status", passport.authenticate("jwt", { session: false }), (req, res) => {
  const reqId = req.body.id
  const updatedData = req.body
  delete updatedData.id

  Posts.findOneAndUpdate({ _id: reqId }, { $set: { ...updatedData } }, { new: false }, (err, resp) => {
    if (err) {
      return res.status(404).json({ err })
    }

    if (resp) {
      Posts.find({ deleted: 2 }, (err, items) => {
        const data = Utils.dataPagination(req, items)

        return res.json(data)
      }).catch((err) => res.status(404).json({ err }))
    }
  })
})

/**
 * @route       POST api/posts/delete
 * @description Return the list updated posts
 * @access      Private
 */
router.post("/delete", passport.authenticate("jwt", { session: false }), (req, res) => {
  Posts.deleteOne({ _id: req.body.id }, (err) => {
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
        res.status(404).json({ noItemsFound: "No Posts found" })
      }
    })

    Posts.find(null, (err, items) => {
      const data = Utils.dataPagination(req, items)

      return res.json(data)
    }).catch((err) => res.status(404).json({ err }))
  })
})

/**
 * @route       POST api/posts/edit-${id}
 * @description Return the list updated posts
 * @access      Private
 */
router.put("/edit-:id", passport.authenticate("jwt", { session: false }), (req, res) => {
  const reqId = req.params.id
  const updatedData = req.body
  const updated_date = Date.now()

  Posts.findOneAndUpdate(
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

      if (resp) {
        return res.status(200).json(updatedData)
      }
    },
  )
})

export default router
