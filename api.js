// const express = require("express");
// const app = express();
// const cors = require("cors");
// const axios = require("axios");
// const port = 8000;

// app.use(cors());

// app.get("/", (req, res) => {
//   let response = null;
//   try {
//     let api = async () => {
//       response = axios.get(
//         "https://api.odcloud.kr/api/15050724/v1/uddi:1c79c18a-ef4e-40a7-8b42-df1f94f15513_201711161619?page=1&perPage=10&returnType=XML",
//         {
//           params: {
//             serviceKey:
//               "38E/Z4yURCT3H1kNL0fgSZRQRrbZEyoeujrEmRvGZgEe8V2c9OrDf+sgfjqT6JrLzQOSpvGfbm0D/diK1Z0sqA==",
//           },
//         }
//       );
//     };
//     api().then(() => {
//       res.setHeader("Access-Control-Allow-Origin", "*");
//     });
//   } catch (e) {
//     console.log("error!!");
//   }

//   return response;
// });

// app.listen(port, () => {
//   console.log("get Start Server!!");
// });

//--------------------------------
const express = require("express");
const app = express();
const cors = require("cors");
const axios = require("axios");
const port = 3000;

app.use(cors());

app.get("/data", async (req, res) => {
  try {
    let serviceKey =
      "38E/Z4yURCT3H1kNL0fgSZRQRrbZEyoeujrEmRvGZgEe8V2c9OrDf+sgfjqT6JrLzQOSpvGfbm0D/diK1Z0sqA==";
    let response = await axios.get(
      "https://api.odcloud.kr/api/15050724/v1/uddi:1c79c18a-ef4e-40a7-8b42-df1f94f15513_201711161619?page=1&perPage=1",
      {
        params: {
          serviceKey: serviceKey,
        },
      }
    );
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.json(response.data);
    console.log(response.data);
  } catch (e) {
    console.log(e);
  }
});

app.listen(port, () => {
  console.log("Server is running on port", port);
});
