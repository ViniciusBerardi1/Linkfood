import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

function NovaDoacao() {
  const [form, setForm] = useState({
    titulo: "",
    descricao: "",
    quantidade: "",
    validade: "",
  });
  const [erro, setErro] = useState("");
  const navigate = useNavigate();
  const usuario = JSON.parse(localStorage.getItem("usuario"));

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post("/doacoes", { ...form, doadorId: usuario.id });
      navigate("/home");
    } catch (error) {
      setErro("Erro ao cadastrar doação!");
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h1 style={styles.logo}>🍱 FoodLink</h1>
        <p style={styles.subtitle}>Cadastrar nova doação</p>

        {erro && <p style={styles.erro}>{erro}</p>}

        <form onSubmit={handleSubmit} style={styles.form}>
          <input
            style={styles.input}
            name="titulo"
            placeholder="Título (ex: Arroz e feijão)"
            value={form.titulo}
            onChange={handleChange}
            required
          />
          <textarea
            style={{ ...styles.input, height: "100px", resize: "vertical" }}
            name="descricao"
            placeholder="Descrição do alimento"
            value={form.descricao}
            onChange={handleChange}
            required
          />
          <input
            style={styles.input}
            name="quantidade"
            placeholder="Quantidade (ex: 5kg, 10 marmitas)"
            value={form.quantidade}
            onChange={handleChange}
            required
          />
          <input
            style={styles.input}
            name="validade"
            placeholder="Validade (ex: 20/04/2026)"
            value={form.validade}
            onChange={handleChange}
          />
          <button style={styles.button} type="submit">
            Cadastrar Doação
          </button>
          <button
            style={styles.btnVoltar}
            type="button"
            onClick={() => navigate("/home")}
          >
            Voltar
          </button>
        </form>
      </div>
    </div>
  );
}

const styles = {
  container: {
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#f5f5f5",
  },
  card: {
    backgroundColor: "white",
    padding: "40px",
    borderRadius: "12px",
    boxShadow: "0 2px 12px rgba(0,0,0,0.1)",
    width: "100%",
    maxWidth: "400px",
    textAlign: "center",
  },
  logo: { fontSize: "32px", color: "#e8874a", margin: "0 0 8px 0" },
  subtitle: { color: "#888", marginBottom: "24px" },
  form: { display: "flex", flexDirection: "column", gap: "12px" },
  input: {
    padding: "12px",
    borderRadius: "8px",
    border: "1px solid #ddd",
    fontSize: "16px",
  },
  button: {
    padding: "12px",
    borderRadius: "8px",
    border: "none",
    backgroundColor: "#e8874a",
    color: "white",
    fontSize: "16px",
    cursor: "pointer",
    marginTop: "8px",
  },
  btnVoltar: {
    padding: "12px",
    borderRadius: "8px",
    border: "1px solid #ddd",
    backgroundColor: "white",
    color: "#888",
    fontSize: "16px",
    cursor: "pointer",
  },
  erro: { color: "red", marginBottom: "12px" },
};

export default NovaDoacao;
