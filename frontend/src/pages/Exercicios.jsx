import React, { useEffect, useState } from "react";
import axios from "axios";
import styled from "styled-components";
import Modal from "react-modal";

const ExerciseContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px;
`;

const CategoryTitle = styled.h3`
  color: #2c3e50;
`;

const ExerciseList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const ExerciseItem = styled.div`
  background-color: #ecf0f1;
  padding: 10px;
  border-radius: 5px;
  cursor: pointer;
  &:hover {
    background-color: #bdc3c7;
  }
`;

const ModalContent = styled.div`
  padding: 20px;
  background-color: white;
  max-width: 600px;
  margin: 0 auto;
`;

function Exercicios() {
  const [exercises, setExercises] = useState({ facil: [], medio: [], dificil: [] });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedExercise, setSelectedExercise] = useState(null);

  useEffect(() => {
    // Buscar exercícios do backend
    axios.get("http://localhost:5000/exercicios")
      .then((response) => {
        setExercises(response.data);
      })
      .catch((error) => {
        console.error("Erro ao buscar exercícios:", error);
      });
  }, []);

  // Função para abrir o modal com o exercício selecionado
  const openModal = (exercise) => {
    setSelectedExercise(exercise);
    setIsModalOpen(true);
  };

  // Função para fechar o modal
  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedExercise(null);
  };

  return (
    <ExerciseContainer>
      <CategoryTitle>Exercícios Fáceis</CategoryTitle>
      <ExerciseList>
        {exercises.facil.map((exercise) => (
          <ExerciseItem key={exercise.id} onClick={() => openModal(exercise)}>
            {exercise.title}
          </ExerciseItem>
        ))}
      </ExerciseList>

      <CategoryTitle>Exercícios Médios</CategoryTitle>
      <ExerciseList>
        {exercises.medio.map((exercise) => (
          <ExerciseItem key={exercise.id} onClick={() => openModal(exercise)}>
            {exercise.title}
          </ExerciseItem>
        ))}
      </ExerciseList>

      <CategoryTitle>Exercícios Difíceis</CategoryTitle>
      <ExerciseList>
        {exercises.dificil.map((exercise) => (
          <ExerciseItem key={exercise.id} onClick={() => openModal(exercise)}>
            {exercise.title}
          </ExerciseItem>
        ))}
      </ExerciseList>

      {/* Modal para exibir os detalhes do exercício */}
      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        contentLabel="Detalhes do Exercício"
        ariaHideApp={false}
        style={{
          content: {
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '80%',
            maxWidth: '600px',
            padding: '20px',
          },
        }}
      >
        {selectedExercise && (
          <ModalContent>
            <h2>{selectedExercise.title}</h2>
            <p><strong>Dificuldade:</strong> {selectedExercise.difficulty}</p>
            <p><strong>Descrição:</strong> {selectedExercise.description}</p>
            <p><strong>Saída Esperada:</strong> {selectedExercise.expected_output}</p>
            <a href={`/editor/${selectedExercise.id}`}>
              <button>Ir para o Editor</button>
            </a>
            <button onClick={closeModal}>Fechar</button>
          </ModalContent>
        )}
      </Modal>
    </ExerciseContainer>
  );
}

export default Exercicios;
