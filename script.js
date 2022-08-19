document.addEventListener('DOMContentLoaded',() => {
    // code goes here
    const width = 10
    const grid = document.querySelector("grid")
    let squares = Array.from(document.querySelectorAll(".grid div"))
    const ScoreDisplay = document.querySelector("#score")
    const start = document.querySelector("#start")

    //The Tetraminoes (The thingie that falls down)
    const lTetramino = [[1, width+1, width*2+1, 2],
                        [width, width+1, width+2, width*2+2],
                        [1, width+1, width*2+1, width*2],
                        [width, width*2, width*2+1, width*2+2]
                    ]

    const zTetramino = [[0,width,width+1,width*2+1],
                        [width+1,width+2,width*2,width*2+1],
                        [0,width,width+1,width*2+1],
                        [width+1,width+2,width*2,width*2+1]
                    ]

    const tTetramino = [[1,width,width+1,width+2],
                        [1,width+1,width+2,width*2+1],
                        [width, width+1,width+2,width*2+1],
                        [1,width,width+1,width*2+1]
                    ]
                    
    const oTetramino = [[0,1,width,width+1],
                        [0,1,width,width+1],
                        [0,1,width,width+1],
                        [0,1,width,width+1]
                    ]
    const tetras = [lTetramino,zTetramino,tTetramino,oTetramino]

    let currentPosition = 4
    let currentRotation = 0

    // Random Selection
    let random = Math.floor(Math.random()*tetras.length)
    let current = tetras[random][currentRotation]

    //draw the first falling thigie (tetraminoes)

    function draw(){
        current.forEach(index =>{
            squares[currentPosition + index].classList.add('tetramino')
        })
    }

    function undraw(){
        current.forEach(index =>{
            squares[currentPosition + index].classList.remove('tetramino')
        })
    }

// make thetetras fall down
    timer = setInterval(moveDown,1000)

//assign function to input from keyboard

    function control(e){
        if(e.key == "ArrowLeft") moveLeft()
        if(e.key =="ArrowUp") rotate()
        if(e.key == "ArrowRight") moveRight()
    }
    document.addEventListener("keyup", control)

    // falling down function
    
    function moveDown(){
        undraw()
        currentPosition += width
        draw()
        freeze()
    }

    // freeze function to stop freefalling into infinity

    function freeze(){
        if(current.some(index => squares[currentPosition + index + width].classList.contains('taken')))
        {
            current.forEach(index => squares[currentPosition + index].classList.add('taken'))

            //start new falling
            random = Math.floor(Math.random() * tetras.length)
            current = tetras[random][currentRotation]
            currentPosition = 4
            draw()
        }
    }

    //moving the falling block LEFT untill the wall

    function moveLeft(){

        undraw()
        const leftEdge = current.some(index => (currentPosition + index) % width === 0 )

        if(!leftEdge){
            currentPosition -=1
        }
        if(current.some(index => squares[currentPosition+ index].classList.contains('taken'))){
            currentPosition +=1
        }
        draw()
    }
/*
    function moveRight(){
        undraw()
        const rightEdge = current.some(index => (currentPosition + index) % width === 0 )

        if(!rightEdge){
            currentPosition ++
        }
        if(current.some(index => squares[currentPosition + index -1].classList.contains('taken'))){
            currentPosition --
        }
        draw()
    }
*/

    // rotating the falling thingie

    function rotate(){
        undraw()
        currentRotation ++
        if(currentRotation === current.length){    //going back to 0 when we reach 4
            currentRotation = 0
        }
        current = tetras[random][currentRotation]
        draw()
    }

// showing Next Falling Thingie
    const displaySquares = document.querySelectorAll(".mini-grid div")
    const displayWidth = 4
    let displayIndex = 0

// falling thingie without any rotation

const upNextTetra = [
                    [1,displayWidth+1,displayWidth*2+1,2], //l-tetramino   
                    [0, displayWidth, displayWidth+1, displayWidth*2+1],
                    [1,displayWidth,displayWidth+1,displayWidth+2],
                    [0,1,displayWidth,displayWidth+1],
                    [1,displayWidth+1,displayWidth*2+1,displayWidth*3+1]
                    ]
//display the shape

function displayShape(){
    displaySquares.forEach(square => {
        square.classList.remove('tetramino')
    })
    upNextTetra[nextRandom].forEach( index => {
        displaySquares[displayIndex +index].classList.add('tetramino')
    })
}

})
