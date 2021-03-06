// import { getMinifyAccountInfo } from "../utils/Airtable";
import axios from "axios";
import base from "../../../middlewares/common";
import reqCurrentUser from "../../../middlewares/reqCurrentUser";

export async function GetAccountInfo(req, res) {
  const user = req.currentUser.fields["ID"];
  await axios
    .get(
      `${process.env.AIRTABLE_API}/Coordonn%C3%A9es%20Clients%20Personnalisables?filterByFormula=%7BCode%20Client%7D%3D%22${user}%22`,
      {
        headers: {
          Authorization: `Bearer ${process.env.AIR_TABLE_API_KEY}`,
        },
      }
    )
    .then((response) => {
      res.send(response.data.records);
    })
    .catch(() => res.status(500).json({ msg: "Something went very wrong" }));
}

export default base().use(reqCurrentUser).get(GetAccountInfo);
