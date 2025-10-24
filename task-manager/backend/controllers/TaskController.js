const { Task } = require("../models/Task");

class TaskController {
  async create(req, res) {
    const { title, description } = req.body;
    const userId = req.userId;

    if (!title) return res.status(400).json({ message: "Título obrigatório" });

    try {
      const task = await Task.create({ title, description, userId });
      res.status(201).json(task);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }

  async list(req, res) {
    const userId = req.userId;
    try {
      const tasks = await Task.findAll({ where: { userId } });
      res.json(tasks);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }

  async update(req, res) {
  console.log("UPDATE BODY:", req.body, "ID:", req.params.id, "userId:", req.userId);
  try {
    const task = await Task.findOne({ where: { id: req.params.id, userId: req.userId } });
    if (!task) return res.status(404).json({ message: "Tarefa não encontrada" });

    if (req.body.title !== undefined) task.title = req.body.title;
    if (req.body.description !== undefined) task.description = req.body.description;

    await task.save();
    res.json(task);
  } catch (err) {
    console.error("Erro ao atualizar tarefa:", err);
    res.status(500).json({ message: err.message });
  }
}


  async delete(req, res) {
    const { id } = req.params;
    const userId = req.userId;

    try {
      const task = await Task.findOne({ where: { id, userId } });
      if (!task) return res.status(404).json({ message: "Tarefa não encontrada" });

      await task.destroy();
      res.json({ message: "Tarefa deletada com sucesso" });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }
}

module.exports = new TaskController();
