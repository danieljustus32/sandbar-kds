import "./App.css";
import { React, useEffect, useState } from "react";
import { ScaleLoader } from "react-spinners";

function App() {
  // Find your CMS ID and Public Token from the settings page.
  const CMS_ID = process.env.REACT_APP_PLASMIC_CMS_ID;
  const CMS_PUBLIC_TOKEN = process.env.REACT_APP_PLASMIC_PUBLIC_KEY;

  const modelId = "order";

  const [isBusy, setIsBusy] = useState(false);

  useEffect(() => {
    setInterval(async () => {
      setIsBusy(true);
      console.log("KDS is checking for tickets!");
      // Do network stuff
      try {
        const response = await fetch(
          `https://data.plasmic.app/api/v1/cms/databases/${CMS_ID}/tables/${modelId}/query`,
          {
            headers: {
              // Plasmic CMS ID and CMS Public API token
              "x-plasmic-api-cms-tokens": `${CMS_ID}:${CMS_PUBLIC_TOKEN}`,
            },
          }
        );
        console.log(response);
        setIsBusy(false);
      } catch (error) {
        return;
      }
      // Load all model entries
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
