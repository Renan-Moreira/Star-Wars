let endpoint = 'https://swapi.dev/api/starships'

window.onload = async () =>{
    try{
        loadCharacters(endpoint)
    }catch(error){                                                  //fiz mudanças apenas em pontos importantes da aplicação
        console.log(error)
        alert('erro ao carregar')
    }
}

async function loadCharacters(url){
    const mainContent = document.getElementById('main-content')
    mainContent.innerHTML = ' '

    try{
        const response = await fetch(url)
        const responseJson = await response.json()
        responseJson.results.forEach((characters) =>{

            const cards = document.createElement('div')
            cards.className = 'cards'
            cards.style.backgroundImage= 
            `url('https://starwars-visualguide.com/assets/img/starships/${characters.url.replace(/\D/g, '')}.jpg')`
    
            const charactersNameBg = document.createElement('div')
            charactersNameBg.className = 'characters-name-bg'
    
            const charactersName = document.createElement('span')
            charactersName.className = 'characters-name'
            charactersName.innerText = `${characters.name}`

            mainContent.appendChild(cards)
            cards.appendChild(charactersNameBg)
            
            cards.onclick = () =>{
                const model = document.getElementById('model')
                model.style.visibility= 'visible'

                const modelContent = document.getElementById('model-content')
                modelContent.innerHTML = ' '

                const image = document.createElement('div')
                image.className = 'image'
                image.style.backgroundImage= 
                `url('https://starwars-visualguide.com/assets/img/starships/${characters.url.replace(/\D/g, '')}.jpg')`

                const name = document.createElement('span')
                name.className= 'content-details'
                name.innerText = `Nome: ${characters.name}`

                const height = document.createElement('span')
                height.className= 'content-details'
                height.innerText = `Modelo: ${convertHeight(characters.model)}`

                const mass = document.createElement('span')
                mass.className = 'content-details'
                mass.innerText = `comprimento: ${convertMass(characters.length)}`

                const eyeColors = document.createElement('span')
                eyeColors.className = 'content-details'
                eyeColors.innerText = `Custo: ${convertEyeColors(characters.cost_in_credits)}`

                const birth = document.createElement('span')
                birth.className = 'content-details'
                birth.innerText = `Passageiros: ${convertBirth(characters.passengers)}`

                modelContent.appendChild(image)
                modelContent.appendChild(name)
                modelContent.appendChild(height)
                modelContent.appendChild(mass)
                modelContent.appendChild(eyeColors)
                modelContent.appendChild(birth)

            }
            charactersNameBg.appendChild(charactersName)
        })

        const backButton = document.getElementById('back-button')
        const nextButton = document.getElementById('next-button')
        
        backButton.disable = !responseJson.previous
        nextButton.disable = !responseJson.next

        backButton.style.visibility = responseJson.previous? 'visible' : 'hidden'
        nextButton.style.visibility = responseJson.next? 'visible' : 'hidden'

        endpoint = url

    }catch(error){
        console.log(error)
        alert('erro ao carregar personagens')
    }
    
}

async function hideModel(){
    const model = document.getElementById('model')
    model.style.visibility = 'hidden'
}
async function loadNextPage(){
    if(!endpoint) return;
    try{
        const response = await fetch(endpoint)
        const responseJson = await response.json()

        await loadCharacters(responseJson.next)

    }catch(error){
        console.log(error)
        alert('erro ao carregar proxima pagina')
    }
}
async function loadPreviousPage(){
    if(!endpoint) return;
    try{
        const response = await fetch(endpoint)
        const responseJson = await response.json()

        await loadCharacters(responseJson.previous)

    }catch(error){
        console.log(error)
        alert('erro ao carregar pagina anterior')
    }
}

const convertEyeColors = (eyeColors) => {
    if(eyeColors === 'unknown') return 'desconhecido'  //aqui é o custo da nave//
    return eyeColors
}
const convertHeight = (height) =>{
    if(height == 'undefined') return 'desconhecida' //aqui é o modelo da nave//
    return (height / 100).toFixed(2)
}
const convertMass = (mass) =>{
    if(mass == 'undefined') return 'desconhecido' //o comprimento da nave//
    return `${mass} metros`
}
const convertBirth = (birth) =>{
    if(birth == 'undefined') return 'desconhecido' //os passageiros//
    return birth
}