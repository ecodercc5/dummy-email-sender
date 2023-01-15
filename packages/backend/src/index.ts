import express, { RequestHandler } from "express";
import cors from "cors";
import { GoogleSheets } from "./apis/google-sheets";
import { IEmail } from "./email";
import { Template } from "./template";
import { createSpreadSheetToEmails } from "./sheet-to-email";
import { OutlookEmailSender } from "./outlook-email-sender";

const app = express();

// middleware
app.use(cors());
app.use(express.json());

const createGetSpreadSheet = (secretsPath: string) => {
  return async (spreadSheetId: string, gid: string) => {
    const sheetsAPI = await GoogleSheets.createAPI(secretsPath);

    const getSpreadhSheetsRes = await sheetsAPI.spreadsheets.get({
      spreadsheetId: spreadSheetId,
    });

    const sheets = getSpreadhSheetsRes.data.sheets!;
    // get name of sheet with corresponding gid
    const sheet = sheets.find((sh) => {
      return sh.properties?.sheetId === Number(gid);
    });

    const sheetTitle = sheet?.properties?.title!;

    // get the values from spreadsheet
    const sheetData = await GoogleSheets.getSheet(sheetsAPI, {
      id: spreadSheetId,
      range: sheetTitle,
    });

    return sheetData;
  };
};

const getSpreadSheet = createGetSpreadSheet("./secrets.json");

// gettting sheet from spreadsheets
app.get("/api/spreadsheets/:spreadSheetId/sheets/:gid", async (req, res) => {
  const { spreadSheetId, gid } = req.params;
  console.log("yoooo");

  try {
    const sheetData = await getSpreadSheet(spreadSheetId, gid);
    console.log(sheetData);

    return res.json({
      data: {
        sheet: sheetData,
      },
    });
  } catch (err) {
    console.error(err);
    console.log("bad request");

    return res.status(400).json({ error: "Bad Request" });
  }
});

interface ISendEmailsRequestBody {
  spreadSheetId: string;
  gid: string;
  email: IEmail;
}

const templateFill = Template.createFill((variable) => `{{${variable}}}`);
const spreadSheetToEmails = createSpreadSheetToEmails(templateFill);

app.post("/api/emails", async (req, res) => {
  const { spreadSheetId, gid, email } = req.body as ISendEmailsRequestBody;

  try {
    const sheetData = await getSpreadSheet(spreadSheetId, gid);
    const emails = spreadSheetToEmails(sheetData, email);

    console.log(emails);

    // send emails
    await OutlookEmailSender.sendEmails(emails);

    return res.sendStatus(200);
  } catch (err) {
    console.error(err);
    console.log("bad request");

    return res.status(400).json({ error: "Bad Request" });
  }
});

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
