import "./App.css";
import { React, useEffect, useState } from "react";
import moment from "moment";
import { v4 as uuidv4 } from "uuid";

function App() {
  // Find your CMS ID and Public Token from the settings page.
  const CMS_ID = process.env.REACT_APP_PLASMIC_CMS_ID;
  const CMS_PUBLIC_TOKEN = process.env.REACT_APP_PLASMIC_PUBLIC_KEY;
  const [openTickets, setOpenTickets] = useState([]);

  const modelId = "order";

  function formatPhoneNumber(phoneNumberString) {
    var cleaned = ("" + phoneNumberString).replace(/\D/g, "");
    var match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
    if (match) {
      return "(" + match[1] + ") " + match[2] + "-" + match[3];
    }
    return null;
  }

  useEffect(() => {
    setInterval(async () => {
      const apiUrl = new URL(
        `https://data.plasmic.app/api/v1/cms/databases/${CMS_ID}/tables/${modelId}/query`
      );
      apiUrl.search = new URLSearchParams({
        q: JSON.stringify({ where: { open: true }, limit: 4, order: "asc" }),
      }).toString();
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
      } catch (error) {
        alert(error);
      }
    }, 1000);
  }, [CMS_ID, CMS_PUBLIC_TOKEN]);

  // FOR DEBUG PURPOSES //
  useEffect(() => {
    console.log(openTickets);
  }, [openTickets]);

  // Used to left-pad numbers with 0's, e.g. 1 becomes 001 //
  const lpad = function (s, width, char) {
    return s.length >= width
      ? s
      : (new Array(width).join(char) + s).slice(-width);
  };

  return (
    <div className="App">
      <header className="App-header">
        {openTickets.length > 0 ? (
          <>
            <span className="tickets-header">Open Tickets:</span>
            <div className="tickets-wrapper">
              {openTickets.map((ticket) => {
                return (
                  <div key={ticket.id} className="ticket">
                    <span>{ticket.data.firstName}</span>
                    <span>{lpad(ticket.data.number, 3, "0")}</span>
                    <span>{moment(ticket.createdAt).format("HH:mm")}</span>
                    <div className="order-wrapper">
                      <ul>
                        {ticket.data.order.map((entry) => {
                          return (
                            <li key={uuidv4()} className="line-item">
                              <span>{entry.item.name}</span>
                              {entry.item.modifiers
                                ? entry.item.modifiers.map((mod) => {
                                    return (
                                      <ul key={uuidv4()} className="modifier">
                                        <li>
                                          <span>{mod.modifier}</span>
                                        </li>
                                      </ul>
                                    );
                                  })
                                : null}
                            </li>
                          );
                        })}
                      </ul>
                    </div>
                  </div>
                );
              })}
            </div>
          </>
        ) : (
          <>
            <span>No Online Orders!</span>
          </>
        )}
      </header>
    </div>
  );
}

export default App;
