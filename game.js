const apiKey = 'PoMrnpP4y0S3hCQnPAS1Q3MVi1Bsrkbl7F8HLieT'
// let category = 'Linux'
// let difficulty = 'Easy'
let limit = '10'
// const url = 'https://quizapi.io/api/v1/questions?apiKey=' + apiKey + '&category=' + category + '&difficulty=' + difficulty + '&limit=' + limit
const url = `https://quizapi.io/api/v1/questions?apiKey=` + apiKey + `&limit=` + limit


window.onload = sendApiRequest
async function sendApiRequest() {
    let res = await fetch(url)
    //console.log(respons)
    let data = await res.json()
    console.log(data)
}