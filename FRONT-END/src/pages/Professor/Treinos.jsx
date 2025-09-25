import React from "react";
import "../../styles/pages/professor/treinosprof.scss";
import "../../styles/pages/aluno/mensagensAluno.scss";

export default function TreinosProf() {
  return (
    <div className="treinos-container">
      
      {/* search bar */}
      <div className="search-container">
        <div className="search-bar">
          <i className="fas fa-search search-icon"></i>
          <input
            type="text"
            placeholder="Buscar treino..."
            className="search-input"
          />
        </div>
      </div>
      {/* Filtros */}
        <div className="filtros-grid">
          <div className="filtro-item active">Todos</div>
          <div className="filtro-item">Força</div>
          <div className="filtro-item">Cardio</div>
          <div className="filtro-item">Funcional</div>
          <div className="filtro-item">Result</div>
        </div>

      {/* Lista de Treinos */}
      <section className="treinos-list">
        {/* Treino de Força */}
        <div className="treino-card">
          <div className="treino-header">
            <div className="treino-info">
              <h3>Treino de Força</h3>
              <div className="treino-meta">
                <span className="treino-nivel">Intermediário</span>
                <span className="treino-duracao">45 min.</span>
              </div>
            </div>
          </div>

          <div className="exercicios-list">
            <div className="exercicio-item">
              <div className="exercicio-numero">1.</div>
              <div className="exercicio-content">
                <div className="exercicio-nome">Agachamento</div>
                <div className="exercicio-detalhes">3*12 - Descanso: 60s</div>
              </div>
            </div>
            <div className="exercicio-item">
              <div className="exercicio-numero">2.</div>
              <div className="exercicio-content">
                <div className="exercicio-nome">Supino</div>
                <div className="exercicio-detalhes">3*10 - Descanso: 90s</div>
              </div>
            </div>
            <div className="exercicio-item">
              <div className="exercicio-numero">3.</div>
              <div className="exercicio-content">
                <div className="exercicio-nome">Remada</div>
                <div className="exercicio-detalhes">3*12 - Descanso: 60s</div>
              </div>
            </div>
          </div>

          <div className="treino-actions">
            <button className="btn-atribuir">Atribuir</button>
            <button className="btn-detalhes">Ver Detalhes</button>
          </div>
        </div>

        {/* Treino de Cardio */}
        <div className="treino-card">
          <div className="treino-header">
            <div className="treino-info">
              <h3>Treino de Cardio</h3>
              <div className="treino-meta">
                <span className="treino-nivel">Iniciante</span>
                <span className="treino-duracao">30 min.</span>
              </div>
            </div>
          </div>

          <div className="exercicios-list">
            <div className="exercicio-item">
              <div className="exercicio-numero">1.</div>
              <div className="exercicio-content">
                <div className="exercicio-nome">Corrida</div>
                <div className="exercicio-detalhes">20 min. - Intensidade moderada</div>
              </div>
            </div>
            <div className="exercicio-item">
              <div className="exercicio-numero">2.</div>
              <div className="exercicio-content">
                <div className="exercicio-nome">Dutar corrida</div>
                <div className="exercicio-detalhes"></div>
              </div>
            </div>
          </div>

          <div className="treino-actions">
            <button className="btn-atribuir">Atribuir</button>
            <button className="btn-detalhes">Ver Detalhes</button>
          </div>
        </div>

        {/* Treino Funcional */}
        <div className="treino-card">
          <div className="treino-header">
            <div className="treino-info">
              <h3>Treino Funcional</h3>
              <div className="treino-meta">
                <span className="treino-nivel">Avançado</span>
                <span className="treino-duracao">40 min.</span>
              </div>
            </div>
          </div>

          <div className="exercicios-list">
            <div className="exercicio-item">
              <div className="exercicio-numero">1.</div>
              <div className="exercicio-content">
                <div className="exercicio-nome">Burpees</div>
                <div className="exercicio-detalhes">3*15 - Descanso: 30s</div>
              </div>
            </div>
            <div className="exercicio-item">
              <div className="exercicio-numero">2.</div>
              <div className="exercicio-content">
                <div className="exercicio-nome">Mountain Climbers</div>
                <div className="exercicio-detalhes">3*30s - Descanso: 30s</div>
              </div>
            </div>
            <div className="exercicio-item">
              <div className="exercicio-numero">3.</div>
              <div className="exercicio-content">
                <div className="exercicio-nome">Prancha</div>
                <div className="exercicio-detalhes">3*45s - Descanso: 30s</div>
              </div>
            </div>
          </div>

          <div className="treino-actions">
            <button className="btn-atribuir">Atribuir</button>
            <button className="btn-detalhes">Ver Detalhes</button>
          </div>
        </div>
      </section>

      {/* Bottom Navigation */}
      <nav className="bottom-nav">
        <div className="nav-item">
          <i className="fas fa-home"></i>
          <span>Início</span>
        </div>
        <div className="nav-item">
          <i className="fas fa-users"></i>
          <span>Alunos</span>
        </div>
        <div className="nav-item active">
          <i className="fas fa-dumbbell"></i>
          <span>Treinos</span>
        </div>
        <div className="nav-item">
          <i className="fas fa-comment"></i>
          <span>Mensagens</span>
        </div>
        <div className="nav-item">
          <i className="fas fa-user"></i>
          <span>Perfil</span>
        </div>
      </nav>
    </div>
  );
}