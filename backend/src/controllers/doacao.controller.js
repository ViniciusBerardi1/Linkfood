const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

exports.listar = async (req, res) => {
  try {
    const doacoes = await prisma.doacao.findMany({
      include: {
        doador: {
          select: { id: true, nome: true, email: true, telefone: true },
        },
      },
      orderBy: { createdAt: "desc" },
    });
    res.json(doacoes);
  } catch (error) {
    res.status(500).json({ error: "Erro ao listar doações" });
  }
};

exports.criar = async (req, res) => {
  try {
    const { titulo, descricao, quantidade, validade, doadorId } = req.body;

    const doacao = await prisma.doacao.create({
      data: { titulo, descricao, quantidade, validade, doadorId },
    });

    res.status(201).json({ message: "Doação cadastrada com sucesso!", doacao });
  } catch (error) {
    res.status(500).json({ error: "Erro ao cadastrar doação" });
  }
};

exports.atualizar = async (req, res) => {
  try {
    const { id } = req.params;
    const { status, receptorId } = req.body;

    const doacao = await prisma.doacao.update({
      where: { id: Number(id) },
      data: { status, receptorId },
    });

    res.json({ message: "Doação atualizada com sucesso!", doacao });
  } catch (error) {
    res.status(500).json({ error: "Erro ao atualizar doação" });
  }
};

exports.deletar = async (req, res) => {
  try {
    const { id } = req.params;

    await prisma.doacao.delete({ where: { id: Number(id) } });

    res.json({ message: "Doação removida com sucesso!" });
  } catch (error) {
    res.status(500).json({ error: "Erro ao remover doação" });
  }
};
