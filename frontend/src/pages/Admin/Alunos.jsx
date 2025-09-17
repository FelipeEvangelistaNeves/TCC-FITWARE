export default function Alunos() {
  return (
    <div className="admin-page">
      <h1>Gerenciar Alunos</h1>
      <table>
        <thead>
          <tr>
            <th>Nome</th>
            <th>Plano</th>
            <th>Status</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>João Silva</td>
            <td>Mensal</td>
            <td>Ativo</td>
            <td>Editar | Remover</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
