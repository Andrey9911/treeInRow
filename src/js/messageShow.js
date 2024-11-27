export default function messageShow(type, message)
{
    let div = document.createElement('div');
    div.textContent = message;
    div.className = 'message-block ' + type;
    document.querySelector('#app').append(div)
    setTimeout(() => {div.remove()},1000);
}