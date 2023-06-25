import logo from "./logo.svg";
import "./App.css";
import "./style.css";
import { MyNav } from "./components/MyNav";
import { Route, Routes } from "react-router-dom";
import { Home } from "./components/Home";
import { NotFound } from "./components/NotFound";
import './assets/js/script.js'
import { SignupPage } from "./components/Signup";
import {LoginPage} from "./components/Login";
import { DeleteItem } from "./components/DeleteItem";
import { Topics } from "./components/Topics";
import { ProfileSettings } from "./components/ProfileSettings";

function App() {
	return (
		<div>
			<MyNav />
			<Routes>
				<Route path='' element={<Home />} />
				<Route path='home' element={<Home />} />
				<Route path='signup' element={<SignupPage />} />
				<Route path='Login' element={<LoginPage />} />
				<Route path='Delete' element={<DeleteItem />} />
				<Route path='Topics' element={<Topics />} />
				<Route path='Profile-settings' element={<ProfileSettings />} />
				<Route path='*' element={<NotFound />} />
			</Routes>
		</div>
	);
}

export default App;
