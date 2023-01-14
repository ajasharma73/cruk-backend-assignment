import { main } from "../../resources/donation-fn-code/lambda";
import getTestContext from "./utils/getTestContext";
import getTestEvent from "./utils/getTestEvent";

const DONATIONS_USER:{[email:string]:number} = {
    "testuser01@gmail.com":3
}

jest.mock("aws-sdk", () => {
  const mSNS = {
    publish: jest
      .fn()
      .mockImplementation(
        ({ Message, MessageDeduplicationId, MessageGroupId, TopicArn }) => {
            if(DONATIONS_USER[MessageGroupId] && TopicArn === process.env.TOPIC_ARN){
                return Promise.resolve({message: Message});
            }else{
                return Promise.reject({message:"User does not exist"});
            };
        }
      ),
    promise: jest.fn(),
  };
  return { SNS: jest.fn(() => mSNS) };
});

describe("API /v1/app", () => {
  beforeAll(async () => {
    process.env.TOPIC_ARN = "donation-thank-you";
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
