import './App.css';

import { v4 as uuidv4 } from 'uuid';

function App() {
	const generate = () => {
		console.log(uuidv4());
	};

	return (
		<div className="App">
			<button onClick={() => generate()}>Generate</button>
		</div>
	);
}

export default App;
