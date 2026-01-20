const MAX_TOKENS_PER_CHUNK = 25_000
const CHARS_PER_TOKEN = 3.5
const MAX_CHARS_PER_CHUNK = MAX_TOKENS_PER_CHUNK * CHARS_PER_TOKEN


export function getChunks(contentArray){
    let chunks = []
    let currentChunk= ""
    for(const content of contentArray){
        if((content.length + currentChunk.length) > MAX_CHARS_PER_CHUNK){
            if(currentChunk.length > 0){
                chunks.push(currentChunk)
            }
             currentChunk = content
        }else{
            currentChunk += content
        }
    }
    if(currentChunk.length > 0){
        chunks.push(currentChunk)
    }

    return chunks
}