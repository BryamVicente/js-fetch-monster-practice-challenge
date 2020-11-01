const monsterUrl = " http://localhost:3000/monsters/"
const monsterContainer = document.querySelector('#monster-container')
const monsterCreator = document.querySelector('#create-monster')

// Step 1: fetch the first 50 monsters in the array 
fetch(monsterUrl)
.then(response => response.json())
.then(monster => renderMonsters(monster))

const renderMonsters = (monster) => {
    const limit = 50
    const limitedArray = monster.slice(0,limit)
    for(const monsterObj of limitedArray){
       renderMonster(monsterObj)
    }
}
//Step 2: Monsters should be shown on the page along with the name, age and description 
const renderMonster = (monsterObj) => {
    const monsterDiv = document.createElement('div')

    monsterDiv.innerHTML = `
    <h2>${monsterObj.name}</h2>
    <h4> Age: ${monsterObj.age} </h4>
    <p> Bio: ${monsterObj.description}</p>
    `
    monsterContainer.append(monsterDiv)
}
// Step 3-1: Create a form with input field ids of name, age, & description
// Step 3-2: Once form is created, add a submit handler to it
// Step 3-3: create a POST request to add a new monster in database 
const formCreator = () => {
    const monsterForm = document.createElement('form')
    monsterForm.id = "monster-form"

    monsterForm.innerHTML = `
    <input id="name" name="name" value="" placeholder="name...">
    <input id="age" name="age" value="" placeholder="age...">
    <input id="description" name="description" value="" placeholder="description...">
    <button>Create Monster!</button>
    `
    monsterCreator.append(monsterForm)

    monsterForm.addEventListener('submit', event => {
        event.preventDefault()
        const form = event.target 
        const name = form.name.value
        const age = form.age.value
        const description = form.description.value
        const input = {
            name: name,
            age: age,
            description: description
        }

        const post = {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(input),
        }

        fetch(monsterUrl, post)
        .then(response => response.json())
        .then(newMonster => renderMonster(newMonster))
    })
}
// Step 4-1: Create click events on back and forward buttons 
// Step 4-2: Create separte fetch requests for both back and forward buttons  

const clickHandler = () => {
    const forward = document.querySelector('#forward')
    forward.addEventListener('click', event => {
        // console.log(event.target)
        if(event.target.matches('#forward')){
            fetch(monsterUrl)
            .then(response => response.json())
            .then(monsters => secondRound(monsters))
            
            const secondRound = (monsters) => {
                let second = 100
                let round = 50
    
                const SecondArray = monsters.slice(round,second)
                for(const monster of SecondArray){
                    renderMonster(monster)
                }
            }                 
        }
    })

    const back = document.querySelector('#back')
    back.addEventListener('click', event => {
        if (event.target.matches('#back')){
            fetch(monsterUrl)
            .then(response => response.json())
            .then(monsters => backToFirst(monsters))
            
            const backToFirst = (monsters) => {
                let first = 50
                let round = 0
            
                const backArray = monsters.slice(round,first)
                for(const monster of backArray){
                    renderMonster(monster)
                }
            }
        }
    })
}

// I was only able to access upto 100 monsters. I know how to display more monsters by hardcoding, but I was wondering if there's a more effecient way.
// I was also wondering if there's a better way for the 'back' button to function.

clickHandler()
formCreator()
