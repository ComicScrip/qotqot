// import { getMinifyAccountInfo } from "../utils/Airtable";
import axios from "axios";
import base from "../../../middlewares/common";
import reqCurrentUser from "../../../middlewares/reqCurrentUser";
// import { handleGetProfile } from "../profile";

export async function GetAccountInfo(req, res) {
  const { postalCode } = req.body;
  await axios
    .patch(
      `${process.env.AIRTABLE_API}/Coordonn%C3%A9es%20Clients%20Personnalisables`,
      {
        records: [
          {
            id: "recXFUR2gw1CFMGcr",
            fields: {
              ["Code Postal - Facturation"]: postalCode,
            },
          },
        ],
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.AIR_TABLE_API_KEY}`,
        },
      }
    )
    .catch(() => res.status(500).json({ msg: "Something went very wrong" }));
}

export default base().use(reqCurrentUser).post(GetAccountInfo);

//
