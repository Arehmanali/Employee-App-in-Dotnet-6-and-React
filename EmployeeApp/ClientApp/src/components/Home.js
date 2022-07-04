import Department from "./Department";
import Employee from "./Employee";

const Home = () => {
  return (
    <div>
      <h1 style={{ textAlign: "center" }}>Welcome to Employee App</h1>
      <Employee />
      <Department />
    </div>
  );
};

export default Home;
