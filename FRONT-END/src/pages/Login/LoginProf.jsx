import React, { useState } from "react";
import { Link } from "react-router-dom";
import Logo from "../../assets/logo.png";

const LoginProf = () => {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  return (
    <div className="flex justify-center items-center min-h-screen bg-[#111] px-4">
      <div className="w-full max-w-sm bg-transparent text-white rounded-xl p-6 sm:p-8 shadow-lg">
        {/* Avatar */}
        <img
          src={Logo}
          alt="logo"
          className="w-20 h-20 rounded-full mx-auto mb-6"
        />

        {/* Empresa */}
        <h2 className="text-2xl font-bold text-center">FitWare</h2>
        <p className="text-center text-violet-400 mb-6">
          Logue em sua conta e seja FitWare!
        </p>

        {/* Email */}
        <div className="mb-4">
          <label className="block mb-1">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 rounded-lg bg-[#333] text-white focus:outline-none focus:ring-2 focus:ring-violet-500"
          />
        </div>

        {/* Senha */}
        <div className="mb-4">
          <label className="block mb-1">Senha</label>
          <input
            type="password"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            className="w-full p-3 rounded-lg bg-[#333] text-white focus:outline-none focus:ring-2 focus:ring-violet-500"
          />
        </div>

        {/* Esqueceu senha */}
        <div className="mb-6">
          <a href="#" className="text-sm text-violet-400 hover:underline">
            Esqueceu a senha?
          </a>
        </div>

        {/* Botão */}
        <button className="w-full py-3 rounded-lg bg-violet-600 text-white font-bold hover:bg-violet-700 transition">
          Login Professor
        </button>
      </div>
    </div>
  );
};

export default LoginProf;
