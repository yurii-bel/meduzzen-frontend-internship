import Counter from "../Components/Counter";

interface Props {
  title: string;
}

const HomePage: React.FC<Props> = ({ title }) => {
  return (
    <>
      <header>
        <main className="container mx-auto py-10">
          <h1 className="text-4xl font-bold mb-5">{title}</h1>
          <h2 className="text-2xl font-bold mb-5">Greetings!</h2>
          <p className="text-gray-700 leading-loose">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum
            eu nisi vel sapien euismod molestie ac vel dolor. Sed eu elit et
            eros efficitur auctor. Morbi lobortis velit ut ex pellentesque, vel
            pulvinar magna commodo. Praesent commodo ornare justo, id dapibus
            augue hendrerit sed. Sed sodales faucibus libero, ac eleifend nisl
            consectetur eu. Sed hendrerit orci vel enim ultrices, eu aliquet
            eros hendrerit. Nam elementum sapien at justo bibendum, ac ultricies
            odio sollicitudin. Morbi non ullamcorper augue. Sed in dui at quam
            volutpat aliquam.
          </p>
          <Counter />
        </main>
      </header>
    </>
  );
};

export default HomePage;
