import "./App.css";
import { React, useEffect, useState } from "react";
import { ScaleLoader } from "react-spinners";

function App() {
  // Find your CMS ID and Public Token from the settings page.
  const CMS_ID = process.env.REACT_APP_PLASMIC_CMS_ID;
  const CMS_PUBLIC_TOKEN = process.env.REACT_APP_PLASMIC_PUBLIC_KEY;
  const [openTickets, setOpenTickets] = useState([]);

  const modelId = "order";

  const [isBusy, setIsBusy] = useState(false);

  useEffect(() => {
    setInterval(async () => {
      console.clear();
      const apiUrl = new URL(
        `https://data.plasmic.app/api/v1/cms/databases/${CMS_ID}/tables/${modelId}/query`
      );
      apiUrl.search = new URLSearchParams({
        q: JSON.stringify({ where: { open: true }, limit: 4 }),
      }).toString();
      setIsBusy(true);
      console.log("KDS is checking for tickets!");
      // Do network stuff
      try {
        const response = await fetch(apiUrl.toString(), {
          headers: {
            // Plasmic CMS ID and CMS Public API token
            "x-plasmic-api-cms-tokens": `${CMS_ID}:${CMS_PUBLIC_TOKEN}`,
          },
        });
        const parsedResponse = await response.json();
        setOpenTickets(parsedResponse.rows);
        setIsBusy(false);
      } catch (error) {
        return;
      }
    }, 10000);
  }, []);

  useEffect(() => {
    console.log(openTickets);
  }, [openTickets]);

  return (
    <div className="App">
      <header className="App-header">
        {openTickets.length > 0 ? (
          <span>Tickets Found!</span>
        ) : (
          <span>No Online Orders!</span>
        )}
      </header>
    </div>
  );
}

export default App;
