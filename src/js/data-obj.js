
const data_obj = {
    tasks: [
        {
            id:1,
            title:'Подключите кошелек',
            type_task: 'connect',
            isDone: false,
            buttype: {
                def: 1 + ' $TROW',
                sand: 'sandinng',
                success: 'done'
            }
        },
        {
            id:2,
            title:'вызовите контракт',
            type_task: 'call_contract',
            isDone: false,
            buttype: {
                def: 1000 + ' $TROW',
                sand: 'sandinng',
                success: 'done'
            }
        },
        {
            id:3,
            title:'Поделись игрой с 1 другом',
            type_task: 'share_link',
            isDone: false,
            buttype: {
                def: 15 + ' $TROW',
                sand: 'sandinng',
                success: 'done'
            }
        },
        {
            id:4,
            title:'Нарисуй 5 картинок',
            type_task: 'draw_picture',
            isDone: false,
            buttype: {
                def: 100 + ' $TROW',
                sand: 'sandinng',
                success: 'done'
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