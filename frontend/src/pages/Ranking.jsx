import React, { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";

// Componente de layout do ranking
const RankingContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  background-color: #f4f6f9;
  height: 100vh;
`;

const RankingCard = styled.div`
  background-color: #fff;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 600px;
  text-align: center;
  margin-top: 50px;
`;

const RankingTitle = styled.h2`
  font-size: 24px;
  color: #333;
  margin-bottom: 20px;
`;

const UserList = styled.ul`
  list-style-type: none;
  padding: 0;
  margin: 0;
`;

const UserItem = styled.li`
  background-color: #f9f9f9;
  margin-bottom: 10px;
  padding: 15px;
  border-radius: 5px;
  font-size: 18px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
`;

const Ranking = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fazendo a requisição para obter os usuários ordenados por ranking
    axios.get("http://localhost:5000/users/ranking")
      .then(response => {
        setUsers(response.data); // Salvando os usuários no estado
        setLoading(false); // Atualizando o status de carregamento
      })
      .catch(error => {
        console.error("Erro ao buscar os usuários:", error);
        setLoading(false);
      });
  }, []);

  return (
    <RankingContainer>
      <RankingCard>
        <RankingTitle>Ranking dos Usuários</RankingTitle>
        {loading ? (
          <p>Carregando...</p>
        ) : (
          <UserList>
            {users.map((user, index) => (
              <UserItem key={user.id}>
                <span>{user.username}</span>
                <span>{user.ranking}</span>
              </UserItem>
            ))}
          </UserList>
        )}
      </RankingCard>
    </RankingContainer>
  );
};

export default Ranking;
