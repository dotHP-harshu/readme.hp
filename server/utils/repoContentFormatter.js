function normalizeCode(code) {
    return code.replace(/\r\n/g, "\n")   // normalize newlines
        .replace(/\n{3,}/g, "\n") // max 2 blank lines
        .replace(/[ \t]+$/gm, ""); // remove trailing spaces
}

function writeAfile(file,content){
  return`===File:${file}===\n===Content===\n${normalizeCode(content)}`
}

const formatContent=(dataArray) =>{
    return dataArray.reduce((pre, f) => pre + writeAfile(f.value.path,f.value.content), "")
}

module.exports = formatContent