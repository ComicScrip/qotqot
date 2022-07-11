import { getMinifyAccountInfo } from "../utils/Airtable";
import axios from "axios";
import base from "../../../middlewares/common";
import reqCurrentUser from "../../../middlewares/reqCurrentUser";
import { useContext } from "react";
import { CurrentUserContext } from "../contexts/currentUserContext";

export async function GetAccountInfo(req, res) {
  const { currentUserProfile } = useContext(CurrentUserContext);
  console.log(currentUserProfile.fields["Code Client Test"]);
  axios
    .get(
      "https://api.airtable.com/v0/app5Yy06J0dhcG7Xb/Coordonn%C3%A9es%20Clients%20Personnalisables?filterByFormula=%7BCode%20Client%7D%3D%22EVENT69-0001%22",
      {
        headers: {
          Authorization: `Bearer ${process.env.AIR_TABLE_API_KEY}`,
        },
      }
    )
    .then((response) => {
      res.send(getMinifyAccountInfo(response.data.records));
    })
    .catch(() => res.status(500).json({ msg: "Something went very wrong" }));
}

export default base().use(reqCurrentUser).get(GetAccountInfo);
