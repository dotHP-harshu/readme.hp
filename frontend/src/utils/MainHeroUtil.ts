export function shuffleArray(array:string[]) {
    let arr = array.slice();

    for (let i = arr.length - 1; i > 0; i--) {
        // Pick a random index from 0 to i
        const j = Math.floor(Math.random() * (i + 1));

        // Swap elements at i and j
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }

    return arr;
}