const {Schema, model} = require('mongoose');

const userSchema = new Schema(
    {
      user: {
        type: String,
        unique: true,
        required: true,
        trim: true,
      },
      email: {
        type: String,
        required: true,
        unique: true,
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Fill in your email address.'],
      },
      thoughts: [
        {
            type: Schema.Types.ObjectID,
            ref: 'Thought'
        }
      ],
      friends: [
        {
            type: Schema.Types.ObjectID,
            ref: 'User'
        }
      ],
  });
  

userSchema.virtual('friendCount').get(function(){
    return this.friends.length
})


  const User = model('user', userSchema);

module.exports = User;