const {Schema, model} = require('mongoose');
const reactionSchema = require('./Reaction');
const moment = require('moment');

const thoughtSchema = new Schema(
    {
      thoughtText: {
        type: String, 
        required: true,
        max_length: 280
       
      },
      userName: {
            type: String,
            required: true,
        },
    reactions: [
        reactionSchema
    ],
    createdAt: {
      type: Date,
      default: Date.now(),
      get: (time) => moment(time).format("MM/DD/YYYY hh:mm a")
    },
  },
  {
      toJSON: {
        getters: true
      }
  }
  )
  
  thoughtSchema.virtual('reactionCount').get(function(){
    return this.reactions.length
})


  const Thought = model('thought', thoughtSchema);

module.exports = Thought;