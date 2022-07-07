const express = require("express");
const Feed = require("../models/Feed");

const router = express.Router();

//? GET
router.get("/", async (req, res) => {
  try {
    const feed = await Feed.find();
    res.send(feed);
  } catch (error) {
    res.send(error);
  }
});

router.get("/:id", async (req, res) => {
  try{
    const {id} = req.params
    const feed = await Feed.find({userid: id})
    console.log(feed)
    res.send(feed)
  }catch(error){
      res.send(error)
  }
  });

  router.get("/user/:id", async (req, res) => {
    try{
      const {id} = req.params
      const feed = await Feed.find({userid: id})
      console.log(feed)
      res.send(feed)
    }catch(error){
        res.send(error)
    }
    });

  //? POST
router.post("/", async (req, res) => {
  try{
    const feed = await Feed.create(req.body)
    res.send(feed)
  }catch(error){
    res.send(error)
  }
  
});

//? Delete
router.delete("/:id", async (req,res)=>{
  try{
    const {id} = req.params
    const feed = await Feed.findByIdAndDelete(id)
    res.send(feed)
  }catch(error){
    res.send(error)
  }
})

 //? Update
router.put('/:id', async (req,res)=>{
  try{
    // console.log(req.body)
    const {id} = req.params
    const feed = await Feed.findOneAndUpdate({_id: id },req.body, {new: true} )
    res.send(feed)
  }catch(error){
    res.send(error)
  }
})

router.put('/img/:id', async (req,res)=>{
  try{
    console.log(req.body)
    const {id} = req.params
    const feed = await Feed.findOneAndUpdate({_id: id },req.body, {new: true} )
    console.log(feed)
    res.send(feed)
  }catch(error){
    res.send(error)
  }
})

module.exports = router;
