// Rotas e acessis a API DE cordenadas OpenCage Geocoding API //
const url_api_opencage = "https://api.opencagedata.com/geocode/v1/json?"
const api_key_open_cage = "&key=9f4e44137f2c4764ba5a1cbdfff3852c"

// Rotas e acessis a API DE Informacoes de clima Tomorrow.io API //
const url_api_tomorrow = "https://api.tomorrow.io/v4/weather/forecast?"
const api_key_tomorrow = "&apikey=TW4RwmnwikFctziD22LvDNbSvL6g0u0Z"


function buscaCordenada(){

    let nome_cidade = document.getElementById("cidade").value
    let buscar_cordenadas_cidade = url_api_opencage + "q="+ nome_cidade + api_key_open_cage

    fetch(buscar_cordenadas_cidade).then( response => {

            if(!response.ok){
                throw new Error(`Erro na requisição: ${response.status}`)
            }

            return response.json()
        })

        .then(data => {
            let cordenadas = data.results[0].geometry
            infosClima(cordenadas)
        })

        .catch(error => {
            console.error("Erro: [ ", error, " ]")
        })

}

function infosClima(cordenadas){
    let lat = cordenadas.lat
    let long = cordenadas.lng

    let requiscao_de_clima = url_api_tomorrow + "&location=" + lat + "," + long + api_key_tomorrow

    fetch(requiscao_de_clima).then( response => {

        if(!response.ok){
            throw new Error(`Erro na requisição a API de clima: ${response.status}`)
        }

        return response.json()
    })

    .then(data => {
        console.log(data)
    })

    .catch(error => {
        console.error("Erro: [ ", error, " ]")
    })

}