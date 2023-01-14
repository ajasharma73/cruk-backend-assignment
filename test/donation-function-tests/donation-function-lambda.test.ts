import { connectionConfig } from "./database/knexconfig";
import getTestContext from "./utils/getTestContext";
import getTestEvent from "./utils/getTestEvent";
import util from "util";
import { DONATION_THANK_NOTE } from "../../resources/donation-fn-code/constants/messages";

jest.mock("../../resources/donation-fn-code/utils/secretValue");

const DONATIONS_USER: { [email: string]: number } = {
  "testuser01@gmail.com": 3,
};

jest.mock("aws-sdk", () => {
  const mSNS = {
    publish: jest
      .fn()
      .mockImplementation(({ Message, MessageGroupId }, cb) => { 
        if (
          DONATIONS_USER[MessageGroupId]
        ) {
            expect(Message).toBe(util.format(DONATION_THANK_NOTE,DONATIONS_USER[MessageGroupId]));
            cb(null,{});
        } else {
            cb(new Error( "Invalid user" ), null);
        }
      }),
    promise: jest.fn(),
  };
  return { SNS: jest.fn(() => mSNS) };
});

import { main } from "../../resources/donation-fn-code/lambda";

describe("API /v1/app", () => {
  beforeAll(() => {
    process.env.TOPIC_ARN = "donation-thank-you";
    process.env.DATABASE_NAME = connectionConfig.database;
  });

  it("tests a user who made 3 donations", async () => {
    const event = getTestEvent("testuser01@gmail.com");
    const context = getTestContext();

    const response = await main(event, context);

    expect(response.statusCode).toBe(200);
  });

    it("tests a user who made 1 donations", async () => {
      const event = getTestEvent("testuser02@gmail.com");
      const context = getTestContext();

      const response = await main(event, context);

      expect(response.statusCode).toBe(200);
    });

    it("tests a user who made no donations", async () => {
      const event = getTestEvent("testuser03@gmail.com");
      const context = getTestContext();

      const response = await main(event, context);

      expect(response.statusCode).toBe(200);
    });

    it("tests a user who does not exist", async () => {
      const event = getTestEvent("testuser04@gmail.com");
      const context = getTestContext();

      const response = await main(event, context);

      expect(response.statusCode).toBe(200);
    });
});
