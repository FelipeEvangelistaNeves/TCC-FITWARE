
import React from "react";
import {Link} from 'react-router-dom';
import Logo from '../../img/logo.png';
import { useState } from "react";

const LoginAluno = () => {

  
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");


  return (
  <div>
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh", backgroundColor: "#111" }}>
     <div style={{ width: "320px", padding: "30px 20px", borderRadius: "12px", textAlign: "center", color: "white" }}>
        {/* Avatar */}
        <img src={Logo} className="logo" alt="logo" style={{
            width: "80px",
            height: "80px",
            borderRadius: "50%",
            margin: "0 auto 20px auto",
        }}/>

        {/* Empresa */}
        <h2 style={{ fontWeight: "bold", marginBottom: "5px" }}>FitWare</h2>
        <p style={{ color: "#a78bfa", marginBottom: "25px" }}>Logue em sua conta e seja FitWare!</p>

        {/* Email */}
        <div style={{ textAlign: "left", marginBottom: "10px" }}>
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{
              width: "100%",
              padding: "10px",
              borderRadius: "8px",
              border: "none",
              backgroundColor: "#333",
              color: "white",
              marginTop: "5px",
            }}
          />
        </div>

        {/* Senha */}
        <div style={{ textAlign: "left", marginBottom: "10px" }}>
          <label>Senha</label>
          <input
            type="password"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            style={{
              width: "100%",
              padding: "10px",
              borderRadius: "8px",
              border: "none",
              backgroundColor: "#333",
              color: "white",
              marginTop: "5px",
            }}
          />
        </div>

        {/* Esqueceu senha */}
        <div style={{ textAlign: "left", marginBottom: "20px" }}>
          <a href="#" style={{ fontSize: "14px", color: "#a78bfa", textDecoration: "none" }}>
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

  </div>);
};

export default LoginAluno;

/*
import { useState } from "react";

export default function Login() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  return (
    <div style={{
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
        
        <img src={Logo} className="logo" alt="logo" style={{
            width: "80px",
            height: "80px",
            borderRadius: "50%",
            margin: "0 auto 20px auto",
        }}  />

       
        <h2 style={{ fontWeight: "bold", marginBottom: "5px" }}>Empresa</h2>
        <p style={{ color: "#a78bfa", marginBottom: "25px" }}>
          Plataforma para Professores
        </p>

       
        <div style={{ textAlign: "left", marginBottom: "10px" }}>
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{
              width: "100%",
              padding: "10px",
              borderRadius: "8px",
              border: "1px solid #a78bfa",
              backgroundColor: "transparent",
              color: "white",
              marginTop: "5px",
            }}
          />
        </div>

        
        <div style={{ textAlign: "left", marginBottom: "10px" }}>
          <label>Senha</label>
          <input
            type="password"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            style={{
              width: "100%",
              padding: "10px",
              borderRadius: "8px",
              border: "none",
              backgroundColor: "#333",
              color: "white",
              marginTop: "5px",
            }}
          />
        </div>

        
        <div style={{ textAlign: "left", marginBottom: "20px" }}>
          <a
            href="#"
            style={{ fontSize: "14px", color: "#a78bfa", textDecoration: "none" }}
          >
            Esqueceu a senha?
          </a>
        </div>

        
        <button
          style={{
            width: "100%",
            padding: "12px",
            borderRadius: "8px",
            backgroundColor: "#444",
            color: "#aaa",
            border: "none",
            cursor: "not-allowed",
            fontWeight: "bold",
          }}
        >
          Login Professor
        </button>
      </div>
    </div>
  );
}
*/