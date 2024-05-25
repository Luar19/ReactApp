import React, { useEffect, useState } from "react";
import axios from "axios";
import styled  from "styled-components";
import Tarjetas from "./Targetas";
import Tabla from "./Tabla";


interface Book {
  title: string;
  author: string;
  genre: string;
  content: string;
}

interface WelcomePageProps {
  view: "cards" | "table";
  onViewChange: () => void;
  onLogout: () => void;
  bookData: BookData[];
}

interface BookData {
  title: string;
  description: string;
}


const Navigation = styled.nav`
  ul {
    margin: 0;
    padding: 0;
    list-style-type: none;
    display: flex;
    justify-content: flex-end;
  }

  li {
    margin-right: 20px;
  }

  a {
    text-decoration: none;
    color: #fff;
    padding: 10px;
    border-radius: 5px;
    font-size: 14px;
    cursor: pointer;
  }

  .Vista {
    background-color: #00c16c;
  }

  .Cerrar {
    background-color: #00755c;
  }

  a:hover {
    background-color: #002e34;
  }
`;
const Botones = styled.a`
width: 15%;
padding: 10px;
border: none;
background-color: #00c16c;
color: #fff;
font-size: 11px;
cursor: pointer;
position: fixed;
top: 10px; 
left: 10px; 

&:hover{
    background-color: #005a33;
}
`;

const Botones2 = styled.a`
width: 15%;
padding: 10px;
background-color: #00755c;
color: #fff;
font-size: 11px;
cursor: pointer;
position: fixed;
top: 50px; 
left: 10px;
&:hover{
    background-color: #005a33;
}
`;



const Vista: React.FC<WelcomePageProps> = ({ view, onViewChange, onLogout }) => {
  const [bookData, setBookData] = useState<Book[]>([]);

  useEffect(() => {
    fetchBookData();
  }, []);

  const fetchBookData = async () => {
    try {
      const response = await axios.get(
        "https://fakerapi.it/api/v1/texts?_quantity=5&_characters=200&_locale=es_ES"
      );

      
      setBookData(response.data.data);
       localStorage.setItem("libros", JSON.stringify(response.data.data))

     //const targetData = localStorage.getItem("libros");

      
    } catch (error) {
      console.error("Error fetching book data:", error);
    }
  };

  const handleViewChange = () => {
    onViewChange();
  };

  const handleLogout = () => {
    onLogout();
    sessionStorage.removeItem("dataUser");
  };

  return (
    <div>
      <Navigation>
        <ul>
          <li>
            <Botones onClick={handleViewChange}>
              Cambiar vista
            </Botones>
          </li>
          <li>
            <Botones2  onClick={handleLogout}>
              Cerrar Sesión
            </Botones2>
          </li>
        </ul>
      </Navigation>

      {view === "cards" ? (
        <CardView>
          {bookData.map((book, index) => (
            <Tarjetas
            key={index}
            index={index}
            total={bookData.length} // Agregar la prop total
            title={book.title}
            author={book.author}
            genre={book.genre}
            content={book.content}
          />
          
          ))}
        </CardView>
      ) : (
        <Tabla bookData={bookData} />
      )}
    </div>
  );
};


const CardView = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(3, 220px);
  gap: 10px;
  padding: 100px;
`;

export default Vista;
