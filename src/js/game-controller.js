// const gameBoard = document.getElementById('game-board');
const boardSize = 7;
const tileTypes = 5;  // Количество типов плиток
let tiles = [];
let colors = ['FF4545','B349ED','5570EE','79F743','FFF845', 'FF69B4'];
var gameBoard;
export let moves = 5;
export let score = 0;
// let moves = new Proxy(move, {
//     get(target, prop) {
//         return  target// (*)
//     },
//     set(target, prop, val) { // перехватываем запись свойства
//         target[prop] = val;
//         return true;
      
//     }
// })

// Инициализация игрового поля
export function initBoard(board) {
    gameBoard = board
    for (let row = 0; row < boardSize; row++) {
        tiles[row] = [];
        for (let col = 0; col < boardSize; col++) {
            const tile = createTile();
            tile.dataset.row = row;
            tile.dataset.col = col;
            gameBoard.append(tile);
            tiles[row][col] = tile;
        }
    }
}

export function changeMove()
{
    moves--;
    console.log(moves);
    
    return moves;
}
// Создание отдельной плитки
function createTile() {
    const tile = document.createElement('div');
            tile.style.width = '61px';
            tile.style.height = '61px';
            tile.style.borderRadius = '5px';
            tile.style.border = '1px solid #fff';
    tile.classList.add('tile');
    const type = Math.floor(Math.random() * tileTypes) + 1;
    
    tile.style.backgroundColor = `#${colors[type]}`;
    // console.log(type);
    tile.dataset.type = type;
    tile.innerText = type; // Для отладки отображаем тип
    tile.addEventListener('click', (e) => {handleTileClick(e)});
    return tile;
}

// Событие на клик по плитке
let firstTile = null;
function handleTileClick(e) {
        
        
        const clickedTile = e.target;
        if (!firstTile) {
            // console.log(1);
            
            firstTile = clickedTile;

            console.log(`первый клик. выбранный - ${e}`,firstTile, firstTile == e.target); 

            firstTile.classList.add('selected');
        } else {
            // console.log(2);
            console.log(`второй клик. выбранные - первый: ${firstTile.dataset.type}\n второй - ${clickedTile.dataset.type}`,
                firstTile, clickedTile
            ); 
            swapTiles(firstTile, clickedTile);
            firstTile.classList.remove('selected');
            checkMatches(clickedTile);
            firstTile = null;

            changeMove(moves);
        }

}

// Обмен плиток
function swapTiles(tile1, tile2) {
    console.log(tile1, tile2);
    
    const tempType = tile1.dataset.type;
    tile1.dataset.type = tile2.dataset.type;
    tile2.dataset.type = tempType;
    console.log(tile1, tile2);
}


function checkGorizont(tile){
    let matches = [];
    let col = Number(tile.dataset.col);
    let count_strike = 0;
    // Проверка по горизонтали
    let strike = col
    console.log(`strike = ${strike};  sizeRow = ${tiles[tile.dataset.row].length-1}`);
    console.log(`${strike != tiles[tile.dataset.row].length-1}`);
    score += count_strike;
        while(strike != tiles[tile.dataset.row].length-1)
        {   
            console.log(col);
            
            console.log(`${tiles[tile.dataset.row][col]}; col = ${col}`);
            
            if (tiles[tile.dataset.row][strike].dataset.type === tiles[tile.dataset.row][strike + 1].dataset.type) {

                matches.push(tiles[tile.dataset.row][strike]);
                console.log(matches);
                count_strike++;
                strike++;
            }
            
            else break
        }
        strike = col;
        while(strike !== 0)
            {
                if (tiles[tile.dataset.row][strike].dataset.type === tiles[tile.dataset.row][strike - 1].dataset.type) {
                    count_strike--;
                    strike--;
                    matches.push(tiles[tile.dataset.row][strike]);
                }else{break;}
            }
        strike = 0;
    // Удаление совпавших элементов и заполнение новыми
    if (matches.length > 0) {
        // removeMatches(matches);
    }
}

function checkVertical(tile)
{
    
        let matches = [];
        let col = Number(tile.dataset.col);
        let count_strike = 0;
        // Проверка по горизонтали
        let strike = row
        console.log(`strike = ${strike};  sizeRow = ${tiles[tile.dataset.row].length-1}`);
        console.log(`${strike != tiles[tile.dataset.row].length-1}`);
        score += count_strike;
            while(strike != tiles[tile.dataset.row].length-1)
            {   
                console.log(col);
                
                console.log(`${tiles[tile.dataset.col][col]}; row = ${row}`);
                
                if (tiles[strike][tile.dataset.col].dataset.type === tiles[strike + 1][tile.dataset.col].dataset.type) {
    
                    matches.push(tiles[strike][tile.dataset.col]);
                    console.log(matches);
                    count_strike++;
                    strike++;
                }
                
                else break
            }
            strike = row;
            while(strike !== 0)
                {
                    if (tiles[strike][tile.dataset.col].dataset.type === tiles[strike - 1][tile.dataset.col].dataset.type) {
                        count_strike--;
                        strike--;
                        matches.push(tiles[strike][tile.dataset.col]);
                    }else{break;}
                }
            strike = 0;

}
// Проверка на совпадения
function checkMatches(tile) {
    checkGorizont(tile)
    checkVertical(tile)
    
}

// Удаление совпадений
// function removeMatches(matches) {
//     matches.forEach(tile => {
//         const row = tile.dataset.row;
//         const col = tile.dataset.col;
//         const newTile = createTile();
//         newTile.dataset.row = row;
//         newTile.dataset.col = col;
//         gameBoard.replaceChild(newTile, tile);
//         tiles[row][col] = newTile;
//     });
// }

// Запуск игры

