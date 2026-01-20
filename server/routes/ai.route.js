const { getReadme } = require("../controllers/ai.controllers")

const AiRouter= require("express").Router()

AiRouter.post("/readme", getReadme)

module.exports = AiRouter 