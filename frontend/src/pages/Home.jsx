import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";

// Container principal
const HomeContainer = styled.div`
  font-family: Arial, sans-serif;
  color: #333;
  margin: 0 auto;
  padding: 20px;
  max-width: 1000px;
`;

// Estilos para o título principal
const Header = styled.header`
  text-align: center;
  margin-bottom: 40px;

  h1 {
    font-size: 36px;
    color: #4CAF50;
  }
`;

// Estilo para a seção "Sobre o Projeto"
const AboutProject = styled.section`
  background-color: #f4f4f9;
  padding: 30px;
  margin-bottom: 40px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);

  h2 {
    color: #2e7d32;
    font-size: 28px;
    margin-bottom: 15px;
  }

  p {
    font-size: 18px;
    line-height: 1.6;
    color: #555;
  }
`;

// Estilo para a seção de Exercícios
const ExercisesSection = styled.section`
  padding: 20px;
  margin-bottom: 40px;

  h2 {
    color: #2e7d32;
    font-size: 28px;
    margin-bottom: 15px;
  }

  p {
    font-size: 18px;
    color: #555;
  }
`;

// Estilo para os links de exercícios
const ExerciseList = styled.ul`
  list-style-type: none;
  padding: 0;

  li {
    margin: 10px 0;
    font-size: 18px;
  }

  a {
    text-decoration: none;
    color: #388e3c;
    font-weight: bold;
    transition: color 0.3s ease-in-out;

    &:hover {
      color: #4caf50;
    }
  }
`;

// Estilo para as categorias de exercícios
const ExerciseCategory = styled.div`
  margin-bottom: 30px;
`;

function Home() {
  const [exercises, setExercises] = useState([]);

  useEffect(() => {
    // Carregar os exercícios disponíveis do backend
    axios.get("http://localhost:5000/exercicios")
      .then((response) => {
        setExercises(response.data);  // Armazenar os exercícios
      })
      .catch((error) => {
        console.error("Erro ao buscar exercícios:", error);
      });
  }, []);

  return (
    <HomeContainer>
      <Header>
        <h1>Bem-vindo ao Sistema de Exercícios de Programação!</h1>
      </Header>

      <AboutProject>
        <h2>Sobre o Projeto</h2>
        <p>
          Este projeto tem como objetivo oferecer uma plataforma interativa para
          estudantes de programação praticarem suas habilidades com exercícios de lógica.
          Utilizando a linguagem Python e a tecnologia Pyodide, o sistema permite que os
          alunos escrevam, testem e executem seus códigos diretamente no navegador, sem a
          necessidade de configurações locais.
        </p>
        <p>
          A importância acadêmica deste projeto reside no fato de que ele oferece um ambiente
          de aprendizado acessível, interativo e de fácil implementação para cursos e disciplinas
          de introdução à programação. Ele também contribui para o desenvolvimento de habilidades
          práticas de programação desde os primeiros estágios dos estudos, preparando os estudantes
          para desafios mais complexos em sua formação acadêmica e profissional.
        </p>
      </AboutProject>

      <ExercisesSection>
        <h2>Exercícios Disponíveis</h2>
        <p>Abaixo estão alguns dos exercícios disponíveis para praticar lógica de programação:</p>

        {exercises.facil && exercises.facil.length > 0 && (
          <ExerciseCategory>
            <h3>Fáceis</h3>
            <ExerciseList>
              {exercises.facil.map((exercise) => (
                <li key={exercise.id}>
                  <Link to={`/exercicio/${exercise.id}`}>{exercise.title}</Link>
                </li>
              ))}
            </ExerciseList>
          </ExerciseCategory>
        )}

        {exercises.medio && exercises.medio.length > 0 && (
          <ExerciseCategory>
            <h3>Médios</h3>
            <ExerciseList>
              {exercises.medio.map((exercise) => (
                <li key={exercise.id}>
                  <Link to={`/exercicio/${exercise.id}`}>{exercise.title}</Link>
                </li>
              ))}
            </ExerciseList>
          </ExerciseCategory>
        )}

        {exercises.dificil && exercises.dificil.length > 0 && (
          <ExerciseCategory>
            <h3>Difíceis</h3>
            <ExerciseList>
              {exercises.dificil.map((exercise) => (
                <li key={exercise.id}>
                  <Link to={`/exercicio/${exercise.id}`}>{exercise.title}</Link>
                </li>
              ))}
            </ExerciseList>
          </ExerciseCategory>
        )}
      </ExercisesSection>
    </HomeContainer>
  );
}

export default Home;
