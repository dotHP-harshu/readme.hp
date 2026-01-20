function normalizeCode(code) {
    return code.replace(/\r\n/g, "\n")   // normalize newlines
        .replace(/\n{3,}/g, "\n") // max 2 blank lines
        .replace(/[ \t]+$/gm, ""); // remove trailing spaces
}

function writeAfile(file,content){
  return`=== FILE START ===\n===File:${file}===\n===Content===\n${normalizeCode(content)}\n=== FILE END ===\n`
}

const formatContent=(dataArray) =>{
   return dataArray.map((f)=> writeAfile(f.value.path,f.value.content))
}

module.exports = formatContent