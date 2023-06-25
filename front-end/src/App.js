import logo from "./logo.svg";
import "./App.css";
import { MyNav } from "./components/MyNav";
import { Route, Routes } from "react-router-dom";
import { Home } from "./components/Home";
import { NotFound } from "./components/NotFound";

function App() {
	return (
		<div>
			<MyNav />
			<Routes>
				<Route path='' element={<Home />} />
				<Route path='home' element={<Home />} />
				<Route path='*' element={<NotFound />} />
			</Routes>
		</div>
	);
}

export default App;
