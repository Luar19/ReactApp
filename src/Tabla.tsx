import React from "react";
import styled from "styled-components";


interface Book {
  title: string;
  author: string;
  genre: string;
  content: string;
}

interface TablaProps {
  bookData: Book[];
}


const getDefinir = (index: number, length: number) => {
  if (index === length - 1) return "#FFFF00"; 
  return index % 2 === 0 ? "#0eed57" : "#ef1102"; 
};

const TableView = styled.div`
display: grid;
border-collapse: collapse;
grid-template-columns: repeat(5, 4fr);
grid-template-rows: repeat(2, 220px);
gap: 10px;
width: 100%;
max-width: 1000px;

`;

const Tablas = styled.table`
place-items: center;
border-collapse: collapse;
width: 200%;
border: 2px solid #002e34;
background-color: #002e34;
justify-self: start;
position: center;

`;

const Colores = styled.tr<{ color: string }>`
  background-color: ${(props) => props.color};
  color:#fff
`;

const Titulos = styled.td`
  padding: 8px;
  text-align: center;
  font-size: small;
  color: #fff;
`;

const Titulos2 = styled.td`
  padding: 8px;
  text-align: center;
  font-size: small;
  color: #000;
`;

const Tabla: React.FC<TablaProps> = ({ bookData }) => {
  return (
    <TableView>
      <Tablas>
      <thead>
        <tr>
          <Titulos>Índice</Titulos>
          <Titulos>Título</Titulos>
          <Titulos>Autor</Titulos>
          <Titulos>Género</Titulos>
          <Titulos>Contenido</Titulos>
        </tr>
      </thead>
      <tbody>
        {bookData.map((book, index) => (
          <Colores key={index} color={getDefinir(index, bookData.length)}>
            <Titulos2>{index + 1}</Titulos2>
            <Titulos2>{book.title}</Titulos2>
            <Titulos2>{book.author}</Titulos2>
            <Titulos2>{book.genre}</Titulos2>
            <Titulos2>{book.content}</Titulos2>
          </Colores>
        ))}
      </tbody>

      </Tablas>
      
    </TableView>
  );
};

export default Tabla;
