// controllers/UserController.js
const { User } = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

class UserController {
  async register(req, res) {
    const { username, email, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ message: "Username e senha são obrigatórios" });
    }

    try {
      const existingUser = await User.findOne({ where: { email } });
      if (existingUser) return res.status(400).json({ message: "Usuário já existe" });

      const hashedPassword = await bcrypt.hash(password, 10);
      const user = await User.create({ username, email, password: hashedPassword });

      const token = jwt.sign({ id: user.id }, process.env.SECRET_JWT, { expiresIn: "1h" });

      res.json({
        user: { id: user.id, username: user.username, email: user.email },
        token,
      });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }

  async login(req, res) {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: "Email e senha são obrigatórios" });
    }

    try {
      const user = await User.findOne({ where: { email } });
      if (!user) return res.status(400).json({ message: "Usuário não encontrado" });

      const valid = await bcrypt.compare(password, user.password);
      if (!valid) return res.status(400).json({ message: "Senha inválida" });

      const token = jwt.sign({ id: user.id }, process.env.SECRET_JWT, { expiresIn: "1h" });

      res.json({
        user: { id: user.id, username: user.username, email: user.email },
        token,
      });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }
}

module.exports = new UserController();
