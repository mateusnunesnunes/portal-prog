import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

// Container da Sidebar com flexbox
const SidebarContainer = styled.div`
  width: 250px;
  height: 100vh; /* Full height da tela */
  background-color: #222;  /* Cor de fundo escura */
  color: #fff;  /* Cor do texto */
  padding: 20px;
  position: fixed; /* Fixa a sidebar */
  top: 0;
  left: 0;
  display: flex;
  flex-direction: column; /* Organiza os links verticalmente */
  align-items: flex-start; /* Alinha os links à esquerda */
  gap: 15px; /* Espaçamento entre os links */
  padding-top: 30px; /* Deixa um espaço para o título */
`;

// Estilo dos links da Sidebar
const SidebarLink = styled(Link)`
  color: white;
  text-decoration: none;
  font-size: 18px;
  padding: 10px 15px; /* Adiciona mais área clicável */
  width: 100%; /* Faz os links ocuparem toda a largura */
  text-align: left; /* Alinha o texto à esquerda */
  &:hover {
    background-color: #444; /* Destaca o link ao passar o mouse */
    text-decoration: underline;
  }
`;

// Estilo do título
const Title = styled.h2`
  color: white;
  margin-bottom: 20px; /* Adiciona espaço entre o título e os links */
  font-size: 24px;
`;

function Sidebar() {
  return (
    <SidebarContainer>
      <Title>Portal</Title>
      <SidebarLink to="/">Início</SidebarLink>
      <SidebarLink to="/exercicios">Exercícios</SidebarLink>
      <SidebarLink to="/perfil">Perfil</SidebarLink>
      <SidebarLink to="/ranking">Ranking</SidebarLink>
      <SidebarLink to="/config">Configurações</SidebarLink>
      <SidebarLink to="/login">Sair</SidebarLink>
    </SidebarContainer>
  );
}

export default Sidebar;
