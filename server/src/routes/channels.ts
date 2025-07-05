import express from 'express'

const router = express.Router();

router.get('/', (req,res) =>{
    res.json(
        [{id: 1, name:'general'},
        {id: 2, name:'music'},
        {id: 3, name:'memes'}]
    );
});

export default router;