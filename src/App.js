import react from "react";
import ReactDOM from "react-dom/client";
import Todo from "./components/Todo";
import Todo from "./components/Todo";


const AppLayout= ()=>{
    return (
        <div className="app">
            <Todo/>
        </div>
    )
}

const root= ReactDOM.createRoot(document.getElementById("root"));
root.render(<AppLayout/>);