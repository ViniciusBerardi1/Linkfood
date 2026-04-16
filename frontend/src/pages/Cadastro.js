import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../services/api";

function Cadastro() {
  const [form, setForm] = useState({
    nome: "",
    email: "",
    senha: "",
    tipo: "doador",
    telefone: "",
    endereco: "",
  });
  const [erro, setErro] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleCadastro = async (e) => {
    e.preventDefault();
    try {
      await api.post("/auth/register", form);
      navigate("/");
    } catch (error) {
      setErro("Erro ao cadastrar! Verifique os dados.");
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h1 style={styles.logo}>🍱 FoodLink</h1>
        <p style={styles.subtitle}>Crie sua conta</p>

        {erro && <p style={styles.erro}>{erro}</p>}

        <form onSubmit={handleCadastro} style={styles.form}>
          <input
            style={styles.input}
            name="nome"
            placeholder="Nome completo"
            value={form.nome}
            onChange={handleChange}
            required
          />
          <input
            style={styles.input}
            name="email"
            type="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            required
          />
          <input
            style={styles.input}
            name="senha"
            type="password"
            placeholder="Senha"
            value={form.senha}
            onChange={handleChange}
            required
          />
          <input
            style={styles.input}
            name="telefone"
            placeholder="Telefone"
            value={form.telefone}
            onChange={handleChange}
          />
          <input
            style={styles.input}
            name="endereco"
            placeholder="Endereço"
            value={form.endereco}
            onChange={handleChange}
          />

          <select
            style={styles.input}
            name="tipo"
            value={form.tipo}
            onChange={handleChange}
          >
            <option value="doador">Doador</option>
            <option value="receptor">Receptor</option>
          </select>

          <button style={styles.button} type="submit">
            Cadastrar
          </button>
        </form>

        <p style={styles.link}>
          Já tem conta? <Link to="/">Entrar</Link>
        </p>
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
  logo: {
    fontSize: "32px",
    color: "#e8874a",
    margin: "0 0 8px 0",
  },
  subtitle: {
    color: "#888",
    marginBottom: "24px",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "12px",
  },
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
  erro: {
    color: "red",
    marginBottom: "12px",
  },
  link: {
    marginTop: "16px",
    color: "#888",
  },
};

export default Cadastro;
