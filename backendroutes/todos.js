const express = require("express");
const router = express.Router();

const { check, validationResult } = require("express-validator");
const auth = require("../middleware/auth");
const User = require("../models/User");
const Todos = require("../models/Todos");

//@route GET api/todos
//@desc get all users todos
//@access private

router.get("/", auth, async (req, res) => {
  let user1 = await User.findById(req.user.id);
    if(user1.isOnlineStatus== true){
        try {
          const todos  = await Todos.find({ user: req.user.id }).sort({
            date: -1,
          });
          res.json(todos);
        } catch (err) {
          console.error(err.message);
          res.status(500).send("Server error");
        }
}
 else{
  return res.status(401).json({ msg: "User not logged in" });
 }
});

//@route POST api/todos
//@desc add new todos
//@access private

router.post(
  "/",
  [auth, [check("title", "Title is required").not().isEmpty(),
    check("description","Description is required").not().isEmpty(),
]],
  async (req, res) => {
    let user1 = await User.findById(req.user.id);
    if(user1.isOnlineStatus== true){
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          return res.status(400).json({ errors: errors.array() });
        }

        const { title, description, isCompleted } = req.body;
        try {
          const newtodo = new Todos({
            title,
            description,
            isCompleted,
            user: req.user.id,
          });

          const todo = await newtodo.save();
          res.json(todo);
          
        } catch (err) {
          console.error(err.message);
          res.status(500).send("Server error");
        }
      }
      else{
        return res.status(401).json({ msg: "User not logged in" });
       }
  }
);

//@route PUT api/todos/:id
//@desc update todos
//@access private

router.put("/:id", auth, async (req, res) => {
  let user1 = await User.findById(req.user.id);
  if(user1.isOnlineStatus== true){
      const { title, description, isCompleted} = req.body;

      //build todo object
      const todoFields = {};
      if (title) todoFields.title = title;
      if (description) todoFields.description = description;
      if (isCompleted) todoFields.isCompleted = isCompleted;

      try {
        let todo = await Todos.findById(req.params.id);
        if (!todo) return res.status(404).json({ msg: "Todoitem not found" });

        //making sure user owns todo
        if (todo.user.toString() !== req.user.id) {
          return res.status(401).json({ msg: "Not authorized" });
        }

        todo = await Todos.findByIdAndUpdate(
          req.params.id,
          { $set: todoFields },
          { new: true }
        );
        res.json(todo);
      } catch (err) {
        console.error(err.message);
        res.status(500).send("Server error");
      }
}
else{
  return res.status(401).json({ msg: "User not logged in" });
 }
});

//@route DELETE api/todos/:id
//@desc delete todos
//@access private

router.delete("/:id", auth, async (req, res) => {
  let user1 = await User.findById(req.user.id);
  if(user1.isOnlineStatus== true){
      try {
        let todo = await Todos.findById(req.params.id);
        if (!todo) return res.status(404).json({ msg: "todoitem not found" });

        //making sure user owns todo
        if (todo.user.toString() !== req.user.id) {
          return res.status(401).json({ msg: "Not authorized" });
        }

        await Todos.findByIdAndRemove(req.params.id);
        res.json({ msg: "TodoItem removed" });
      } catch (err) {
        console.error(err.message);
        res.status(500).send("Server error");
      }
    }
    else{
      return res.status(401).json({ msg: "User not logged in" });
     }
});

module.exports = router;