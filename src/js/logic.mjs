export function start()
{
    
}
export function getRandomColor() {
    var letters = ['FF4545','B349ED','5570EE','79F743','FFF845', 'FF69B4'];
    let number = Math.floor(Math.random() * 5)
    var color = '#';
      color += letters[number];
    return {color:color, num: number};
  }

