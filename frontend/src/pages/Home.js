import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../services/api";

function Home() {
  const [doacoes, setDoacoes] = useState([]);
  const [erro, setErro] = useState("");
  const navigate = useNavigate();
  const usuario = JSON.parse(localStorage.getItem("usuario"));

  useEffect(() => {
    carregarDoacoes();
  }, []);

  const carregarDoacoes = async () => {
    try {
      const response = await api.get("/doacoes");
      setDoacoes(response.data);
    } catch (error) {
      setErro("Erro ao carregar doações");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("usuario");
    navigate("/");
  };

  const handleSolicitar = async (id) => {
    try {
      await api.put(`/doacoes/${id}`, {
        status: "em_andamento",
        receptorId: usuario.id,
      });
      carregarDoacoes();
    } catch (error) {
      setErro("Erro ao solicitar doação");
    }
  };

  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <h1 style={styles.logo}>🍱 FoodLink</h1>
        <div style={styles.headerRight}>
          <span style={styles.nomeUsuario}>Olá, {usuario?.nome}!</span>
          {usuario?.tipo === "doador" && (
            <Link to="/nova-doacao" style={styles.btnNovo}>
              + Nova Doação
            </Link>
          )}
          <button style={styles.btnLogout} onClick={handleLogout}>
            Sair
          </button>
        </div>
      </header>

      <main style={styles.main}>
        <h2 style={styles.titulo}>Doações disponíveis</h2>
        {erro && <p style={styles.erro}>{erro}</p>}

        {doacoes.length === 0 ? (
          <p style={styles.vazio}>Nenhuma doação disponível no momento.</p>
        ) : (
          <div style={styles.grid}>
            {doacoes.map((doacao) => (
              <div key={doacao.id} style={styles.card}>
                <h3 style={styles.cardTitulo}>{doacao.titulo}</h3>
                <p style={styles.cardDesc}>{doacao.descricao}</p>
                <p style={styles.cardInfo}>
                  📦 Quantidade: {doacao.quantidade}
                </p>
                {doacao.validade && (
                  <p style={styles.cardInfo}>📅 Validade: {doacao.validade}</p>
                )}
                <p style={styles.cardInfo}>👤 Doador: {doacao.doador?.nome}</p>
                <span
                  style={{
                    ...styles.badge,
                    backgroundColor:
                      doacao.status === "aberto"
                        ? "#4caf50"
                        : doacao.status === "em_andamento"
                          ? "#ff9800"
                          : "#9e9e9e",
                  }}
                >
                  {doacao.status === "aberto"
                    ? "Disponível"
                    : doacao.status === "em_andamento"
                      ? "Em andamento"
                      : "Concluído"}
                </span>

                {usuario?.tipo === "receptor" && doacao.status === "aberto" && (
                  <button
                    style={styles.btnSolicitar}
                    onClick={() => handleSolicitar(doacao.id)}
                  >
                    Solicitar
                  </button>
                )}
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}

const styles = {
  container: { minHeight: "100vh", backgroundColor: "#f5f5f5" },
  header: {
    backgroundColor: "#e8874a",
    padding: "16px 32px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
  logo: { color: "white", margin: 0, fontSize: "24px" },
  headerRight: { display: "flex", alignItems: "center", gap: "16px" },
  nomeUsuario: { color: "white", fontSize: "16px" },
  btnNovo: {
    backgroundColor: "white",
    color: "#e8874a",
    padding: "8px 16px",
    borderRadius: "8px",
    textDecoration: "none",
    fontWeight: "500",
  },
  btnLogout: {
    backgroundColor: "transparent",
    border: "1px solid white",
    color: "white",
    padding: "8px 16px",
    borderRadius: "8px",
    cursor: "pointer",
  },
  main: { padding: "32px" },
  titulo: { color: "#333", marginBottom: "24px" },
  erro: { color: "red" },
  vazio: { color: "#888", textAlign: "center", marginTop: "48px" },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
    gap: "20px",
  },
  card: {
    backgroundColor: "white",
    padding: "20px",
    borderRadius: "12px",
    boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
  },
  cardTitulo: { color: "#333", margin: "0 0 8px 0" },
  cardDesc: { color: "#666", marginBottom: "12px" },
  cardInfo: { color: "#888", fontSize: "14px", margin: "4px 0" },
  badge: {
    display: "inline-block",
    padding: "4px 10px",
    borderRadius: "20px",
    color: "white",
    fontSize: "12px",
    marginTop: "8px",
  },
  btnSolicitar: {
    display: "block",
    width: "100%",
    marginTop: "12px",
    padding: "10px",
    backgroundColor: "#e8874a",
    color: "white",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    fontSize: "14px",
  },
};

export default Home;
