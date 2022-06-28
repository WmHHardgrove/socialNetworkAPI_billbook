const {Schema, model} = require('mongoose');

const reactionSchema = new Schema(
    {
      reactionID: {
        type: Schema.Types.ObjectID,
        default: () => new Types.ObjectID()
       
      },
      reactionBody: {
        type: String,
        max_lenght: 280
      },
      userName: {
            type: String,
            required: true,
        },
    createdAt: 
    type: Date,
    default: Date.now(),
    
    
    {
      toJSON: {
        getters: true,
      },
    },
}
  
  const Reaction = model('reaction', reactionSchema);

module.exports = Reaction;