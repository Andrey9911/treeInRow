export  function messageShow(type, message)
{
    let div = document.createElement('div');
    div.textContent = message;
    div.className = 'message-block ' + type;
    document.querySelector('#app').append(div)

    if(type=== 'sanding') return;
    else setTimeout(() => {div.remove()},1500);
}

export function closeMessageLoad(){
    document.querySelector('.message-block').remove()
}