const express = require("express");
const router = express.Router();
const TaskController = require("../controllers/TaskController");
const jwt = require("jsonwebtoken");

// Middleware JWT
router.use((req, res, next) => {
  const token = req.headers["authorization"]?.split(" ")[1];
  if (!token) return res.status(401).json({ message: "Token necessário" });

  try {
    const decoded = jwt.verify(token, process.env.SECRET_JWT);
    req.userId = decoded.id;
    next();
  } catch {
    res.status(401).json({ message: "Token inválido" });
  }
});

router.post("/", TaskController.create);
router.get("/", TaskController.list);
router.put("/:id", TaskController.update); 
router.delete("/:id", TaskController.delete);

module.exports = router;
