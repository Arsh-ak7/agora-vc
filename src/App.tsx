import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { VideoRoom } from "./Components";

function App() {
	const [joined, setJoined] = React.useState<boolean>(false);
	return (
		<div className='App'>
			{!joined && <button onClick={() => setJoined(true)}>Join room</button>}

			{joined && <VideoRoom />}
		</div>
	);
}

export default App;
