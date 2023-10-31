import "./App.css";
import { React, useEffect } from "react";

function App() {
  // Find your CMS ID and Public Token from the settings page.
  const CMS_ID = process.env.REACT_APP_PLASMIC_CMS_ID;
  const CMS_PUBLIC_TOKEN = process.env.REACT_APP_PLASMIC_PUBLIC_KEY;

  useEffect(() => {
    console.log(CMS_ID);
    console.log(CMS_PUBLIC_TOKEN);
  });

  return (
    <div className="App">
      <header className="App-header">No Online Orders!</header>
    </div>
  );
}

export default App;
