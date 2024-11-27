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
      getImagesLen(){
        console.log(this.images.length);
        
        return this.images.length
      },
      getStat()
      {
        
        return {
          bal: this.bal,
          best_game_record: best_record,
          game_len: this.games.length
        }
      },
      uploadData()
      {
        return JSON.stringify(this.images);
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
  