import ReactDOM from "react-dom/client";

export const renderCell = (td, component) => {
    td.innerHTML = "";
    const root = ReactDOM.createRoot(td);
    root.render(component);
};
