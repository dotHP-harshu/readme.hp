const { getReadme } = require("../controllers/ai.controllers")

const AiRouter= require("express").Router()

AiRouter.get("/readme", getReadme)

module.exports = AiRouter 