import React, { useState } from 'react';

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
    form_outer: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: "center",
        backgroundColor: "rgba(255,255,255,0.75)",
        margin: "0 auto",
        borderRadius: '20px',
        boxShadow: "-3px 4px 15px 5px #127F55",
        width: '75%',
        maxWidth: '900px',
        padding: '10px',
        paddingTop: '10px'
    },
    title: {
        fontSize: "2rem",
        fontWeight: "bold",
        color: "black",
        textShadow: "2px 2px 4px rgba(0,0,0,0.5)",
        fontFamily: "arial",
        paddingBottom: "12px"
    },
    description: {
        fontSize: "16px",
        fontWeight: "400",
        color: "#1043a0",
        fontFamily: "Arial, sans-serif",
        paddingBottom: "12px",
        textAlign: "center",
        maxWidth: "60%",
        margin: "0 auto",
        lineHeight: "1.5"
    }
};

export default function Home() {
    const [tipoPesquisa, setTipoPesquisa] = useState('cpf');
    const [nome, setNome] = useState('');
    const [dataNascimento, setDataNascimento] = useState('');
    const [codigoEntidade, setCodigoEntidade] = useState('');
    const [cpf, setCpf] = useState('');
    const [codigoProjeto, setCodigoProjeto] = useState('2518601'); // Valor padrão do exemplo
    const [codigoEscola, setCodigoEscola] = useState('43184812'); // Valor padrão do exemplo

    const handleLogin = () => {
        window.open('https://censobasico.inep.gov.br/censobasico/#/', '_blank');
    };

    const handleSearch = async () => {
        if (tipoPesquisa === 'cpf') {
            const url = 'https://educacenso.inep.gov.br/educacenso/rest/s/alunos/pesquisar';
            const payload = {
                abrangencia: 0,
                codigoProjeto: parseInt(codigoProjeto, 10),
                codigoEscola: parseInt(codigoEscola, 10),
                codigoPessoaFisica: null,
                nomePessoaFisica: null,
                numeroCpf: cpf,
                numeroNis: null,
                dataNascimento: null,
                nomeFiliacao: null,
                codigoUfNascimento: null,
                codigoMunicipioNascimento: null,
                sort: "nomePessoaFisica",
                page: 0,
                size: 30,
                numeroMatriculaCertidao: null
            };

            try {
                const response = await fetch(url, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(payload),
                });

                if (response.ok) {
                    const data = await response.json();
                    console.log('Dados recebidos:', data);
                    // Aqui você pode processar e exibir os dados recebidos
                    alert('Pesquisa realizada com sucesso! Verifique o console para ver os dados.');
                } else {
                    console.error('Erro na requisição:', response.statusText);
                    alert('Erro ao realizar a pesquisa. Verifique o console para mais detalhes.');
                }
            } catch (error) {
                console.error('Erro ao fazer a requisição:', error);
                alert('Ocorreu um erro de rede. Verifique sua conexão e tente novamente.');
            }
        } else {
            // Mantenha a lógica antiga para os outros tipos de pesquisa se necessário
            alert('Este tipo de pesquisa ainda não foi atualizado para a nova API.');
        }
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
                    <option value="cpf">Pesquisar por CPF</option>
                    <option value="nomeAluno" disabled>Pesquisar por Nome do Aluno (desabilitado)</option>
                    <option value="codigoEntidade" disabled>Pesquisar escola pelo inep (desabilitado)</option>
                </select>

                {tipoPesquisa === 'cpf' && (
                    <>
                        <input
                            type="number"
                            value={cpf}
                            onChange={(e) => setCpf(e.target.value)}
                            placeholder="CPF do Aluno"
                            style={styles.input}
                        />
                        <input
                            type="number"
                            value={codigoProjeto}
                            onChange={(e) => setCodigoProjeto(e.target.value)}
                            placeholder="Código do Projeto"
                            style={styles.input}
                        />
                        <input
                            type="number"
                            value={codigoEscola}
                            onChange={(e) => setCodigoEscola(e.target.value)}
                            placeholder="Código da Escola"
                            style={styles.input}
                        />
                    </>
                )}
                <button onClick={handleSearch} style={styles.button}>Pesquisar</button>
                <button onClick={handleLogin} style={styles.button2}>Login no Educacenso</button>
            </div>
        </div>
    );
}
