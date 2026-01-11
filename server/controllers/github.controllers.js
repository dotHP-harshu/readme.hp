const axios = require("axios")
const { formatResponse, formatError } = require("../utils/responseFormatter")
const formatContent = require("../utils/repoContentFormatter")


const getRepoContent = async (req, res) => {
    const { fileArray, username, repo, branch } = req.body

    if (!fileArray || !username || !repo || !branch) return res.send(formatError(null, "file array not found", 400))

    const request = axios.create({
        baseURL: "https://raw.githubusercontent.com",
        timeout: 10000,
        validateStatus: (status) => status >= 200 && status < 300,
        headers: {
            Accept: "application/van.github.raw"
        }
    })

    const allFileData = await Promise.allSettled(
        fileArray.map(async (file) => {
            try {
                const { data } = await request.get(`/${username}/${repo}/${branch}/${file}`, { responseType: "text" })
                return ({ content: data, path: file })

            } catch (error) {
                throw {
                    path: file,
                    message: error.message
                }
            }
        })
    )

    const successfullFiles = allFileData.filter((f) => f.status === "fulfilled")
    const unsuccessfullFiles = allFileData.filter((f) => f.status === "rejected")


    res.send(formatResponse(true, { successfullFiles: successfullFiles.map((f) => f.value.path), unsuccessfullFiles: unsuccessfullFiles.map((f) => f.reason.path), content:formatContent(successfullFiles)  }, "Get file array successfully."))
}

module.exports = { getRepoContent }