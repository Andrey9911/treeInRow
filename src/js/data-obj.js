
const data_obj = {
    tasks: [
        {
            id:1,
            title:'Подключите кошелек',
            type_task: 'connect',
            isDone: false,
            reward: 100,
            buttype: {
                def: '',
                sand: 'sandinng',
                done: 'done'
            }
        },
        {
            id:2,
            title:'вызовите контракт',
            type_task: 'call_contract',
            isDone: false,
            reward: 1000,
            buttype: {
                def: '',
                sand: 'sandinng',
                done: 'done'
            }
        },
        {
            id:3,
            title:'Поделись игрой с 1 другом',
            type_task: 'share_link',
            isDone: false,
            reward:15,
            buttype: {
                def: '',
                sand: 'sandinng',
                done: 'done'
            }
        },
        {
            id:4,
            title:'Нарисуй 5 картинок',
            type_task: 'draw_picture',
            isDone: false,
            reward:100,
            buttype: {
                def: '',
                sand: 'sandinng',
                done: 'done'
            }
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