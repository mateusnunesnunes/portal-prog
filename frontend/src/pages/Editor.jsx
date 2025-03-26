import React, { useEffect, useState } from "react";
import axios from "axios";
import MonacoEditor from "@monaco-editor/react";
import { useParams } from "react-router-dom";

// Função para carregar o Pyodide
const loadPyodide = async () => {
  const pyodide = await window.loadPyodide();
  return pyodide;
};

function Editor() {
  const { id } = useParams();  // Pega o id do exercício da URL
  const [exercise, setExercise] = useState(null);
  const [pyodide, setPyodide] = useState(null);  // Guardar a instância do Pyodide
  const [code, setCode] = useState("");  // Código do editor
  const [output, setOutput] = useState("");  // Resultado da execução do código Python
  const [loading, setLoading] = useState(false);  // Para indicar o carregamento

  // Carregar o Pyodide quando o componente for montado
  useEffect(() => {
    const initPyodide = async () => {
      setLoading(true);  // Inicia o carregamento do Pyodide
      try {
        const pyodideInstance = await loadPyodide();
        setPyodide(pyodideInstance);  // Armazenar a instância do Pyodide
        setLoading(false);  // Carregamento concluído
      } catch (error) {
        console.error("Erro ao carregar Pyodide:", error);
        setLoading(false);
        setOutput("Erro ao carregar Pyodide");
      }
    };

    initPyodide();

    // Buscar o exercício do backend
    axios.get(`http://localhost:5000/exercicio/${id}`)
      .then((response) => {
        setExercise(response.data);  // Armazenar os detalhes do exercício
      })
      .catch((error) => {
        console.error("Erro ao buscar exercício:", error);
        setOutput("Erro ao carregar exercício");
      });
  }, [id]);

  // Função para lidar com a mudança no editor
  const handleEditorChange = (value) => {
    setCode(value);  // Atualiza o código com a mudança
  };

  // Função para rodar o código Python
  const runPythonCode = async () => {
    if (pyodide) {
      try {
        setLoading(true);  // Inicia o carregamento do código
  
        // Capturar a saída de stdout
        const capturedOutput = [];
  
        // Função para capturar a saída do print() e juntar os argumentos
        const redirectStdout = (...args) => {
          capturedOutput.push(args.join(" "));  // Junta os argumentos com um espaço
        };
  
        // Redirecionar o stdout para a função
        pyodide.globals.set("print", redirectStdout);
  
        // Executa o código Python usando o Pyodide
        await pyodide.runPythonAsync(code);
  
        // Junta toda a saída de stdout capturada
        const result = capturedOutput.join("\n");
  
        console.log("Resultado do Pyodide:", result);  // Para verificar o que Pyodide está retornando
        setOutput(result !== "" ? result : "Código executado com sucesso!");  // Exibe o resultado da execução
        setLoading(false);  // Finaliza o carregamento
      } catch (error) {
        // Se ocorrer um erro, captura e exibe a mensagem de erro do interpretador Python
        setOutput(`Erro na execução do código: ${error.message}`);
        setLoading(false);  // Finaliza o carregamento em caso de erro
      }
    } else {
      setOutput("Pyodide não carregado");
    }
  };
  

  if (!exercise) {
    return <div>Carregando exercício...</div>;
  }

  return (
    <div>
      <h1>{exercise.title}</h1>
      <p><strong>Descrição:</strong> {exercise.description}</p>
      <p><strong>Saída Esperada:</strong> {exercise.expected_output}</p>

      <MonacoEditor
        height="600px"
        defaultLanguage="python"
        value={code}  // Vincula o valor do editor ao estado
        onChange={handleEditorChange}  // Handle para mudanças no editor
      />

      {/* Botão para rodar o código */}
      <button onClick={runPythonCode} disabled={loading}>
        {loading ? "Executando..." : "Rodar Código"}
      </button>

      {/* Exibe o resultado da execução */}
      <h2>Resultado:</h2>
      <pre>{output}</pre>
    </div>
  );
}

export default Editor;
