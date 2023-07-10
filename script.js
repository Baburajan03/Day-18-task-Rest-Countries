async function fetchdata() {
    try{
        let response = await fetch('https://restcountries.com/v3.1/all');
        let data = await response.json();
        return data
    }
    catch{
            console.log('invalid data')
    }
}

async function getWeather(latlng){
    try {
        let res = await fetch (`https://api.openweathermap.org/data/2.5/weather?lat=${latlng[0]}&lon=${latlng[1]}&appid=226674a0868709d660446ede82e2776c`)
        let data = await res.json()
        return data.main.temp - 273.15
    } catch (error) {
        console.log(error)
    }
}
async function mycountries(){
    let countries = await fetchdata()
    let container = document.createElement('div')
    container.classList.add('container','bg')
    document.body.appendChild(container)

    let rows = document.createElement('div')
    rows.setAttribute('class','row')
    container.appendChild(rows)
    
    countries.forEach((e) => {

    let column1 = document.createElement('div')
    column1.setAttribute('class','col-sm-4')
    column1.setAttribute('id','column')
    rows.appendChild(column1)
    
    let column2 = document.createElement('div')
    column1.appendChild(column2) 

    let column3 = document.createElement('div')
    column3.classList.add('card','styles')
    column2.appendChild(column3)

    let heading1 = document.createElement('h6')
    heading1.classList.add('card-title')
    heading1.innerHTML = `${e.name.common}`
    column3.appendChild(heading1)

    let image = document.createElement('img')
    image.setAttribute('src',`${e.flags.png}`)
    image.setAttribute('alt','country flag')
    image.classList.add('card-img-top','p-3')
    column3.appendChild(image)

    let column4 = document.createElement('div')
    column4.setAttribute('class','card-body')
    column3.appendChild(column4)

    let heading2 = document.createElement('h6')
    heading2.setAttribute('class','adjust')
    heading2.innerHTML = `Capital : ${e.capital}`
    column4.appendChild(heading2)

    let heading3 = document.createElement('h6')
    heading3.setAttribute('class','adjust')
    heading3.innerHTML = `Region : ${e.region}`
    column4.appendChild(heading3)

    let button = document.createElement('button')
    button.classList.add('btn','btn-outline-secondary')
    button.innerHTML = "Click for  Weather"
    button.addEventListener('click',async ()=>{

        let temp = await getWeather(e.latlng)   
        let h6 = document.createElement('h6')
        h6.setAttribute('id','temp')
        h6.innerHTML = `${temp.toFixed(0)} &deg; C`;
        column4.appendChild(h6)
        
    })
    column4.appendChild(button)
    rows.appendChild(column1)
})
}
mycountries()
