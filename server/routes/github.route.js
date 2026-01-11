const { getRepoContent } = require("../controllers/github.controllers")

const GithubRoutes  = require("express").Router()

GithubRoutes.get("/content", getRepoContent )

module.exports = GithubRoutes