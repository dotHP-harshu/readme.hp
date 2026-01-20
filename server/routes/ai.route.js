const { getReadme } = require("../controllers/ai.controllers")

const AiRouter= require("express").Router()
const multer = require("multer");
const upload = multer({
    storage:multer.memoryStorage()
})

AiRouter.post("/readme", upload.single("file") , getReadme)

module.exports = AiRouter 