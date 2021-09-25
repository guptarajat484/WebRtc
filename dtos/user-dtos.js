class UserDto{
    id;
    phone;
    isactivated;
    createdAt
    constructor(user){
        this.id=user._id
        this.phone=user.phone
        this.isactivated=user.isactivated
        this.createdAt=user.createdAt
    }
   
}

module.exports=UserDto