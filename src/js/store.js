import { defineStore } from 'pinia';
// import { createFile } from "../db/serialized_file";

  export const useHistoryStore = defineStore('historu', {
    state: () => (
        {
          user:{},
          bal: 0,
          message: {},
          games:[
          ],
          images:[]
        }
      ),
    getters: {
      getStat()
      {
        
        return {
          bal: this.bal,
          best_game_record: best_record,
          game_len: this.games.length
        }
      }
    },
    actions: {
      saveUser(user){
        this.user = Object.assign({
          user_id: user.user_id,
        })
      },
        addImage(image){
          let obj = Object.assign({
            img: image.img,
            metadata: {
              user: image.metadata.user,
              date_create: image.metadata.date_create,
            }
          })
          this.images.push(obj)
        },
        addGameRecord(game)
        {
            this.games.push({
                id: game.game_id,
                score: game.score,
                time: game.time
            });
        }
    },
    }
  )
  