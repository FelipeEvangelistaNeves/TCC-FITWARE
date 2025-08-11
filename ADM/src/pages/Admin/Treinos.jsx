export default function Treinos() {
  return (
    <div className="admin-page">
      <h1>Treinos Cadastrados</h1>

      <div className="treinos-top">
        <button className="btn-primary">+ Novo Treino</button>
      </div>

      <table>
        <thead>
          <tr>
            <th>Nome</th>
            <th>Professor</th>
            <th>Duração</th>
            <th>Alunos</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Treino de Hipertrofia</td>
            <td>Lucas Rocha</td>
            <td>4 semanas</td>
            <td>23</td>
            <td>Editar | Remover</td>
          </tr>
          <tr>
            <td>Funcional Avançado</td>
            <td>Maria Souza</td>
            <td>2 semanas</td>
            <td>18</td>
            <td>Editar | Remover</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
