const router = require("express").Router();
const {Schema, model} = require("mongoose");

const spellSchema = new Schema({
    name: {type:String, required:true},
    level: {type:Number, required:true},
    school: {type:String, required:true}
})

const pcSchema = new Schema({
    name: {type:String, required:true},
    race: {type:String, required:true},
    class: {type:String, required:true},
    level: {type:Number, required:true},
    spells: [spellSchema]
})

const pcModel = model("pcs", pcSchema);

// Get
router.get("/getAll", (req, res, next) => {
    pcModel.find({}).then(pcs => {
        res.status(200).json(pcs)
    }).catch(next)
})

router.get("/getById/:id", (req, res, next) => {
    pcModel.findById({"_id":req.params.id}).then(pc => {
        res.status(200).json(pc)
    }).catch(next)
})

// Create
router.post("/create", (req, res, next) => {
    pcModel.create(req.body).then(pc => {
        res.status(201).json(pc)
    }).catch(next)
})

// Update
router.put("/updateById/:id", (req, res, next) => {
    pcModel.findByIdAndUpdate({"_id":req.params.id}, req.body).then((Old) =>{
        pcModel.findById({"_id":req.params.id}).then((New) => {
            res.status(200).json({Old, New})
        })
     }).catch(next)
})

// Delete
router.delete("/deleteById/:id", (req, res, next) => {
    pcModel.findById({"_id":req.params.id}).then(pc => {
        pcModel.deleteOne({"_id":req.params.id}).then(deleted => {
            res.status(200).json({pc, deleted})
        }).catch(next)})
})



module.exports = router;