const Jimp=require('')

class ActivateController{
    activate(req,res){
        const {name,avtar}=req.body;

        if(!name||!avtar){
            return res.status(400).send({'message':'All fields are required'})
        }

        return res.json({'message':'ok'})
    }

}

module.exports=new ActivateController()