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
const port = 3001;
require("dotenv").config({ path: "./.env" });

app.use(cors());

app.get("/", async (req, res) => {
  try {
    let serviceKey = `${process.env.OPEN_API_SERVICE_KEY}`;
    let response = await axios.get(`${process.env.OPEN_API_KEY}`, {
      params: {
        serviceKey: serviceKey,
      },
    });
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.json(response.data);
    response.data.data.forEach(function (school) {
      //프론트에서 가져오고 싶은 데이터들
      const Institution = school["설립구분"];
      const MaW = school["남녀공학구분"];
      const Type = school["고교유형"];
      const SchoolName = school["학교"];
      const Addr = school["학교도로명주소"];
      const PhNum = school["학교전화번호"];
      const FoundDate = school["설립일자"];
      //forEach를 사용하여 api데이터 안에 있는 json파일 중 "학교"라는 파라미터들을 전부 뽑아낸다
      console.log("설립구분 : " + Institution);
      console.log("남녀공학구분 : " + MaW);
      console.log("고교유형 : " + Type);
      console.log("학교 : " + SchoolName);
      console.log("학교주소 : " + Addr);
      console.log("학교번호 : " + PhNum);
      console.log("설립일자 : " + FoundDate);
      console.log("-----------------------");
    });
  } catch (e) {
    console.log(e);
  }
});

app.listen(port, () => {
  console.log("Server is running on port", port);
});
