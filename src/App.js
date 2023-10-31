import "./App.css";
import { React, useEffect, useState } from "react";
import { ScaleLoader } from "react-spinners";

function App() {
  // Find your CMS ID and Public Token from the settings page.
  const CMS_ID = process.env.REACT_APP_PLASMIC_CMS_ID;
  const CMS_PUBLIC_TOKEN = process.env.REACT_APP_PLASMIC_PUBLIC_KEY;

  const [isBusy, setIsBusy] = useState(false);

  useEffect(() => {
    setInterval(() => {
      setIsBusy(true);
      console.log("KDS is checking for tickets!");
      // Do network stuff
      setIsBusy(false);
    }, 15000);
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        No Online Orders! {isBusy && <ScaleLoader color="#fff" />}
      </header>
    </div>
  );
}

export default App;
