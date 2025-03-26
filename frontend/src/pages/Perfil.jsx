import React, { useState, useEffect } from "react";
import styled from "styled-components";

// Componente de layout do perfil
const ProfileContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  background-color: #f4f6f9;
  height: 100vh;
`;

const ProfileCard = styled.div`
  background-color: #fff;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 400px;
  text-align: center;
  margin-top: 50px;
`;

const ProfileTitle = styled.h2`
  font-size: 24px;
  color: #333;
  margin-bottom: 20px;
`;

const ProfileImage = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  object-fit: cover;
  margin-bottom: 20px;
`;

const UserInfo = styled.div`
  margin-bottom: 15px;
  font-size: 18px;
  color: #555;
`;

const UserInfoLabel = styled.span`
  font-weight: bold;
`;

const EditButton = styled.button`
  background-color: #4CAF50;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #45a049;
  }
`;

const Perfil = () => {
  const [user, setUser] = useState(null);

  // Simulação de busca de dados do usuário
  useEffect(() => {
    // Aqui você poderia fazer uma requisição API para obter os dados do perfil
    const mockUser = {
      username: "john_doe",
      email: "johndoe@example.com",
      ranking: "Avançado",
      imageUrl: "https://i.pravatar.cc/150?img=3"
    };
    setUser(mockUser);
  }, []);

  return (
    <ProfileContainer>
      {user ? (
        <ProfileCard>
          <ProfileImage src={user.imageUrl} alt="Profile" />
          <ProfileTitle>Perfil de {user.username}</ProfileTitle>
          <UserInfo>
            <UserInfoLabel>Usuário:</UserInfoLabel> {user.username}
          </UserInfo>
          <UserInfo>
            <UserInfoLabel>Email:</UserInfoLabel> {user.email}
          </UserInfo>
          <UserInfo>
            <UserInfoLabel>Ranking:</UserInfoLabel> {user.ranking}
          </UserInfo>
          <EditButton>Editar Perfil</EditButton>
        </ProfileCard>
      ) : (
        <p>Carregando...</p>
      )}
    </ProfileContainer>
  );
};

export default Perfil;
