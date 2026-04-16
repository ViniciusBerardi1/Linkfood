const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const prisma = new PrismaClient();

exports.register = async (req, res) => {
  try {
    const { nome, email, senha, tipo, telefone, endereco } = req.body;

    const usuarioExiste = await prisma.usuario.findUnique({ where: { email } });
    if (usuarioExiste) {
      return res.status(400).json({ error: "Email já cadastrado!" });
    }

    const senhaCriptografada = await bcrypt.hash(senha, 10);

    const usuario = await prisma.usuario.create({
      data: {
        nome,
        email,
        senha: senhaCriptografada,
        tipo,
        telefone,
        endereco,
      },
    });

    res
      .status(201)
      .json({ message: "Usuário cadastrado com sucesso!", usuario });
  } catch (error) {
    res.status(500).json({ error: "Erro ao cadastrar usuário" });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, senha } = req.body;

    const usuario = await prisma.usuario.findUnique({ where: { email } });
    if (!usuario) {
      return res.status(404).json({ error: "Usuário não encontrado!" });
    }

    const senhaValida = await bcrypt.compare(senha, usuario.senha);
    if (!senhaValida) {
      return res.status(401).json({ error: "Senha incorreta!" });
    }

    const token = jwt.sign(
      { id: usuario.id, tipo: usuario.tipo },
      process.env.JWT_SECRET || "foodlink_secret",
      { expiresIn: "7d" },
    );

    res.json({ message: "Login realizado com sucesso!", token, usuario });
  } catch (error) {
    res.status(500).json({ error: "Erro ao realizar login" });
  }
};
