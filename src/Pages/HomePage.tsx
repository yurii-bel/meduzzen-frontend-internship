import React from "react";

interface Props {
  title: string;
}

const HomePage: React.FC<Props> = ({ title }) => {
  return (
    <>
      <header>
        <h1>{title}</h1>
        <h3>Greetings!</h3>
      </header>
    </>
  );
};

export default HomePage;
