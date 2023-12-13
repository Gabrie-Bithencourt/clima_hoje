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
        local_clima = data.location
        informacoes_clima = data.timelines

        setTimeout(() => {
            pegaInfoEndereco(local_clima)
            montaInfoClima(informacoes_clima)
        }, 1000);
    })

    .catch(error => {
        console.error("Erro: [ ", error, " ]")
    })
    
}


function pegaInfoEndereco(info_endereco){

    let latitude = info_endereco.lat
    let longitude = info_endereco.lon
    let cord = latitude + "+" + longitude

    let pega_info_endereco = url_api_opencage + "q=" + cord + api_key_open_cage

    fetch(pega_info_endereco).then( response => {
        if(!response.ok){
            throw new Error(`Erro na requisição pega Info Endereco: ${response.status}`)
        }

        return response.json()
    })

    .then( data => {
        infos_endereco = data.results[0].components
        montaEndereco(infos_endereco)
    })

    .catch(error => {
        console.error("Erro: [ ", error, " ]")
    })

}

function montaEndereco(infos){

    let city = infos.city
    let estado = infos.state
    let pais = infos.country

    document.getElementById("name_city").innerText = city
    document.getElementById("name_estado").innerText = estado
    document.getElementById("name_pais").innerText = pais

    document.querySelector(".infos_endereco").classList.remove("d-none")
}

function montaInfoClima(infos){
    let daily = infos.daily

    for (let index = 0; index < daily.length; index++) {

        if(index == 0){
            const info_diaria = daily[index]
            criaCardInicial(info_diaria)
        }
        
    }

}

function criaCardInicial(data){

    let time = new Date(data.time)
    time = time.toLocaleDateString('pt-BR', { weekday: 'long' })
    
    const values  = data.values


    let dia = document.querySelector("#box_dia")
    dia.innerText = time

    // Temperatura //
    const temp_media = document.querySelector("#box_temperatura .valor")
    temp_media.innerText = typeof values.temperatureAvg !== "undefined" ? values.temperatureAvg : ""

    const temp_max = document.querySelector("#max_temperatura")
    temp_max.innerText = typeof values.temperatureMax !== "undefined" ? values.temperatureMax : ""

    const temp_min = document.querySelector("#min_temperatura")
    temp_max.innerText = typeof values.temperatureMin !== "undefined" ? values.temperatureMin : ""

    // Vento //
    const humidade = document.querySelector("#box_umidade .valor")
    humidade.innerText = typeof values.humidityAvg !== "undefined" ? values.humidityAvg : ""

    //  //
}