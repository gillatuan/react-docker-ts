import multer from 'multer'
import fs from 'fs'

const dataPagination = (reqBody, items) => {
  const limit = reqBody.limit
  const offset = reqBody.skip
  const total_count = reqBody.total_count

  return {
    limit,
    offset,
    total_count,
    items
  }
}

// config to save file to local folder
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    /*
			Files will be saved in the 'uploads' directory. Make
			sure this directory already exists!
		*/
    cb(null, "../admin/public/images/uploads")
  },
  filename: function(req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname )
  },
  /* fields: [
    {
      name: "selectedFile",
      maxCount: 1,
    },
  ], */
})

const upload = multer({
  storage,
}).single('file')

const readThenWriteFile = (srcPath, newValue, oldValue) => {
  fs.readFile(srcPath, "utf-8", (err, data) => {
    if (err) {
      console.log("err readFile", err)

      throw err
    }

    let parseData = JSON.parse(data)

    if (oldValue) {
      delete parseData[oldValue.name]
    }

    const newSetting = {
      ...parseData,
      ...newValue,
    }

    const newSettingToString = JSON.stringify(newSetting, null, 2)

    //Do your processing, MD5, send a satellite to the moon, etc.
    fs.writeFile(srcPath, newSettingToString, (err) => {
      if (err) throw err
      console.log("complete")
    })
  })
}

export default {
  dataPagination,
  readThenWriteFile,
  upload,
}
