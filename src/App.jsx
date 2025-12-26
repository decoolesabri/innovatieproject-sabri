import BaseCard from "./components/Card/BaseCard";

function App() {
  return (
    <div className="p-10">
      <BaseCard
        title="Test kaart"
        onDelete={() => alert("Kaart verwijderd")}
      >
        <p>Dit is testinhoud</p>
      </BaseCard>
    </div>
  );
}

export default App;
