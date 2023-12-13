
import React, { useState } from 'react'

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '20px',
    gap: '10px',
  },
  input: {
    width: '300px',
    padding: '10px',
    margin: '5px',
    borderRadius: '5px',
    border: '1px solid #ccc',
  },
  button: {
    padding: '10px 20px',
    margin: '5px',
    borderRadius: '5px',
    border: 'none',
    backgroundColor: '#007bff',
    color: 'white',
    cursor: 'pointer',
  },
  button2: {
    padding: '10px 20px',
    margin: '5px',
    borderRadius: '5px',
    border: 'none',
    backgroundColor: 'purple',
    color: 'white',
    cursor: 'pointer',
  },
  select: {
    padding: '10px',
    margin: '5px',
    borderRadius: '5px',
    border: '1px solid #ccc',
    width: '320px',
  },
  form_outer:{
    display: 'flex',
    flexDirection: 'column',
    alignItems: "center",
    backgroundColor: "rgba(255,255,255,0.75)",
    margin: "0 auto",
    borderRadius: '20px',
    webkitBoxShadow: "-3px 4px 15px 5px #127F55", // Corrigido para minúsculas
    boxShadow: "-3px 4px 15px 5px #127F55", // Removido o ponto e vírgula extra
    width: '75%',
    maxWidth: '900px',
    padding: '10px',
    paddingTop: '10px'
  },
  title:{
    fontSize: "2rem",
    fontWeight: "bold",
    color: "black",
    textShadow: "2px 2px 4px rgba(0,0,0,0.5)",
    fontFamily:"arial",
    paddingBottom:"12px"

  },
  description:{
    fontSize: "16px",      // Tamanho adequado para a leitura
    fontWeight: "400",     // Peso normal da fonte
    color: "#1043a0",      // Cor para dar destaque, mas não muito forte
    fontFamily: "Arial, sans-serif", // Fonte Arial com fallback para sans-serif
    paddingBottom: "12px", // Espaçamento na parte inferior para separar do próximo conteúdo
    textAlign: "center",   // Centraliza o texto
    maxWidth: "60%",       // Limita a largura do texto para melhor leitura
    margin: "0 auto",      // Centraliza o bloco de descrição
    lineHeight: "1.5"      // Espaçamento de linha para melhorar a leitura

  }
};


export default function Home() {
  const [tipoPesquisa, setTipoPesquisa] = useState('nomeAluno');
  const [nome, setNome] = useState('');
  const [dataNascimento, setDataNascimento] = useState('');
  const [codigoEntidade, setCodigoEntidade] = useState('');
  const [cpf, setCpf] = useState('');

  const handleLogin = () => {
    window.open('https://censobasico.inep.gov.br/censobasico/#/', '_blank');
  };

  const normalizeText = (text) => {
    return text
      .normalize("NFD").replace(/[\u0300-\u036f]/g, "") // Remove acentos
      .toUpperCase() // Converte para letras maiúsculas
      .replace(/ /g, "+"); // Substitui espaços por +
  };

  const handleSearch = () => {
    let searchUrl = '';
    let nomeNormalizado = normalizeText(nome);
    switch (tipoPesquisa) {
      case 'nomeAluno':
        searchUrl = `https://censobasico.inep.gov.br/censobasico/rest/aluno/pesquisar?dataNascimento=${dataNascimento}&localPesquisaSelected=1&nomePessoaFisica=${nomeNormalizado}&pagina=1&t=${new Date().getTime()}`;
        break;
      case 'codigoEntidade':
        searchUrl = `https://censobasico.inep.gov.br/censobasico/rest/sessionEntidade/buscarInformacoesEntidadeSelecionada?codigoEntidadeSelecionada=${codigoEntidade}&t=${new Date().getTime()}`;
        break;
      case 'cpf':
        searchUrl = `https://censobasico.inep.gov.br/censobasico/rest/aluno/pesquisar?localPesquisaSelected=1&numeroCpf=${cpf}&pagina=1&t=${new Date().getTime()}`;
        break;
      default:
        break;
    }
    window.open(searchUrl, '_blank');
  };

  return (
    <div style={styles.container}>
      <div style={styles.form_outer}>
        <h1 style={styles.title}>Pesquisa Educacenso</h1>
        <h3 style={styles.description}>
          Esse site é destinado a pesquisa no educacenso no momento em que ele estiver fechado.
          É necessario fazer login no censo antes de pesquisar!
        </h3>
      <select
        value={tipoPesquisa}
        onChange={(e) => setTipoPesquisa(e.target.value)}
        style={styles.select}
      >
        <option value="nomeAluno">Pesquisar por Nome do Aluno</option>
        <option value="codigoEntidade">Pesquisar por Código da Entidade</option>
        <option value="cpf">Pesquisar por CPF</option>
      </select>

      {tipoPesquisa === 'nomeAluno' && (
        <>
          <input
            type="text"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            placeholder="Nome do Aluno"
            style={styles.input}
          />
          <input
            type="date"
            value={dataNascimento}
            onChange={(e) => setDataNascimento(e.target.value)}
            placeholder="Data de Nascimento"
            style={styles.input}
          />
        </>
      )}

      {tipoPesquisa === 'codigoEntidade' && (
        <input
          type="number"
          value={codigoEntidade}
          onChange={(e) => setCodigoEntidade(e.target.value)}
          placeholder="Código da Entidade"
          style={styles.input}
        />
      )}

      {tipoPesquisa === 'cpf' && (
        <input
          type="number"
          value={cpf}
          onChange={(e) => setCpf(e.target.value)}
          placeholder="CPF"
          style={styles.input}
        />
      )}
      <button onClick={handleSearch} style={styles.button}>Pesquisar</button>
      <button onClick={handleLogin} style={styles.button2}>Login no Educacenso</button>
     
      </div>
    </div>
  );
}
