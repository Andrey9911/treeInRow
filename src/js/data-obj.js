
const data_obj = {
    tasks: [
        {
            id:1,
            title:'Подключите кошелек',
            type_task: 'connect',
            reward: '1 $TROW',
            isDone: false
        },
        {
            id:2,
            title:'вызовите контракт',
            type_task: 'call_contract',
            reward: '1000 $TROW',
            isDone: false
        },
        {
            id:3,
            title:'Поделись реф ссылкой с 1 другом',
            type_task: 'share_link',
            reward: '15 $TROW',
            isDone: false
        },
    ],
    users: [
        {
            user_id: "a1",
            username: 'Andrey',
            historyGame: [
                {
                    id: 1,
                    time: '01:01',
                    user_id: null,
                    record: 5000
                }
            ]
        }
    ],
    GameStory: [
        {
            id: 1,
            time: '01:01',
            userid: null,
            record: 5000
        }
        
    ],
    
  }

export default data_obj;