import "./App.css";
import Accordion from "./components/accordion";
import RandomColor from "./components/accordion/random-color";

function App() {
	return (
		<div className="App">
			{/* Accordion Component */}
			<Accordion />

			{/* Random Color Component */}
			<RandomColor />
		</div>
	);
}

export default App;
