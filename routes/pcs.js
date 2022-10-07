const router = require('express').Router();

const spells = [{name: "Greater Invisibility", level: 4, school: "Illusion"}, {name: "Message", level: 0, school: "Transmutation"}]
const pcs = [{name: "Roweena", race: "Human", class: "Bard", level: 11, spells: spells, id: 1}]
var id = 1;

// Get
router.get(`/getAll`, (req, res, next) => {
    res.status(200).json(pcs)
})

router.get(`/getById/:id`, (req, res, next) => {
    if (req.params.id <= pcs.length && req.params.id >= 1) {
        res.status(200).json(pcs[req.params.id-1])
    } else {
        next(new Error(`/getById/{id} valid input required`))
    }
})

// Create
router.post("/create", (req, res, next) => {
    if (req.body.name && req.body.race && req.body.class && req.body.level){
        req.body.id = ++id;
        pcs.push(req.body)
        res.status(201).json(req.body)
    }else{
        next(new Error('New entries require a Name, Race, Class and Level!'))
    }
})

// Update
router.put(`/update/:id`, (req, res, next) => {
    if (req.body.name && req.body.race && req.body.class && req.body.level){
        try {
            (Object.keys(pcs[req.params.id-1]).length);
            pcs[(req.params.id-1)] = req.body;
            res.status(200).json(`Entry with ID ${req.params.id} updated`)
        } catch {
            next(new Error(`/update/{id} valid input required`))
        }
    }else{
        next(new Error('Entries require a Name, Race, Class and Level!'))
    }
})

// Delete
router.delete(`/deleteById/:id`, (req, res, next) => {
    try {
        (Object.keys(pcs[req.params.id-1]).length);
        const deleted = pcs[req.params.id-1];
        pcs.splice((req.params.id-1), 1);
        res.status(200).json(deleted)
    } catch (err) {
        next(new Error(`Index invalid`))
    }
})

module.exports = router;