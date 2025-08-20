import React, { useState } from "react";
import { Link } from "react-router-dom";
import Logo from "../../assets/logo.png";

const LoginAluno = () => {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [focusField, setFocusField] = useState(""); // controla o foco

  const inputStyle = (field) => ({
    width: "100%",
    padding: "10px",
    borderRadius: "8px",
    border: "none",
    backgroundColor: "#333",
    marginTop: "5px",
    caretColor: "#a78bfa",
    outline: focusField === field ? "2px solid #a78bfa" : "none",
    color: "white",
  });

  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          backgroundColor: "#111",
        }}
      >
        <div
          style={{
            width: "320px",
            padding: "30px 20px",
            borderRadius: "12px",
            textAlign: "center",
            color: "white",
          }}
        >
          {/* Avatar */}
          <img
            src={Logo}
            className="logo"
            alt="logo"
            style={{
              width: "80px",
              height: "80px",
              borderRadius: "50%",
              margin: "0 auto 20px auto",
            }}
          />

          {/* Empresa */}
          <h2 style={{ fontWeight: "bold", marginBottom: "5px" }}>FitWare</h2>
          <p style={{ color: "#a78bfa", marginBottom: "25px" }}>
            Logue em sua conta e seja FitWare!
          </p>

          {/* Email */}
          <div style={{ textAlign: "left", marginBottom: "10px" }}>
            <label>Email</label>
            <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={inputStyle("email")}
              onFocus={() => setFocusField("email")}
              onBlur={() => setFocusField("")}
            />
          </div>

          {/* Senha */}
          <div style={{ textAlign: "left", marginBottom: "10px" }}>
            <label>Senha</label>
            <input
              type="password"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              style={inputStyle("senha")}
              onFocus={() => setFocusField("senha")}
              onBlur={() => setFocusField("")}
            />
          </div>

          {/* Esqueceu senha */}
          <div style={{ textAlign: "left", marginBottom: "20px" }}>
            <a
              href="#"
              style={{
                fontSize: "14px",
                color: "#a78bfa",
                textDecoration: "none",
              }}
            >
              Esqueceu a senha?
            </a>
          </div>

          {/* Botão */}
          <button
            style={{
              width: "100%",
              padding: "12px",
              borderRadius: "8px",
              backgroundColor: "#444",
              color: "#aaa",
              border: "none",
              fontWeight: "bold",
            }}
          >
            Login Aluno
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginAluno;
