import React from "react";
import styled from "styled-components";

interface TarjetasProps {
  index: number;
  total: number; 
  title: string;
  author: string;
  genre: string;
  content: string;
}

const Targetas = styled.div<{ index: number; isLast: boolean }>`
  border-collapse: collapse;
  width: 350px;
  height: 200px;
  border: 1px solid #004443;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  padding: 10px;
  overflow: hidden;
  border-radius: 10px;
  box-shadow: rgba(50, 50, 93, 0.25) 0px 13px 27px -5px,
    rgba(0, 0, 0, 0.3) 0px 8px 16px -8px;
  background-color: ${(props) =>
    props.isLast ? "#f0e702" : props.index % 2 === 0 ? "#0eed57" : "#ef1102"};

    p{
      margin: 5px 0;
      text-align: left;
      width: 100%;
      font-size: small;
    }
`;

const Tarjetas: React.FC<TarjetasProps> = ({
  index,
  total,
  title,
  author,
  genre,
  content,
}) => {
  const isLast = index === total - 1; 

  return (
    <Targetas index={index} isLast={isLast}>
      <h3>{title}</h3>
      <p>
        <strong>Autor:</strong> {author}
      </p>
      <p>
        <strong>Género:</strong> {genre}
      </p>
      <p className="card-content">{content}</p>
    </Targetas>
  );
};

export default Tarjetas;
