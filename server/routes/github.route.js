const { getRepoContent } = require("../controllers/github.controllers")

const GithubRoutes  = require("express").Router()

GithubRoutes.post("/content", getRepoContent )

module.exports = GithubRoutes