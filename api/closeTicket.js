export default function handler(req, res) {
  async function closeTicket(rowId) {
    const apiUrl = new URL(`https://data.plasmic.app/api/v1/cms/rows/${rowId}`);
    // Do network stuff
    try {
      const updateJson = {
        data: {
          open: false,
        },
      };
      const response = await fetch(apiUrl.toString(), {
        method: "PUT",
        headers: {
          // Plasmic CMS ID and CMS Private API token
          "x-plasmic-api-cms-tokens": `${CMS_ID}:${CMS_SECRET_TOKEN}`,
          "content-type": "application/json",
        },
        body: JSON.stringify(updateJson),
      });
      const parsedResponse = await response.json();
      return res.json({
        parsedResponse,
      });
    } catch (error) {
      return res.json({ error });
    }
  }
  closeTicket(req.query);
}
