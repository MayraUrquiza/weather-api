import should from "should";
import { Response } from "supertest";
import { request, shouldBeJsonContent, shouldBeStatus } from ".";
import { CONFIG as CONFIG_DEFAULT } from "../src/config/default";
import { CONFIG as CONFIG_SECRETS } from "../src/config/secrets";

describe("Not implemented endpoint", () => {
  let response: Response;

  before(async () => {
    response = await request.get(`${CONFIG_DEFAULT.API_PATH}not-implemented`);
  });

  it("Should return 404 status code", () => shouldBeStatus(response, 404));

  it("Should return json format data", () => shouldBeJsonContent(response));

  it("Should return error data", () => {
    should(response.body).be.instanceOf(Object);
    should(response.body).have.property("code", 404);
    should(response.body).have.property(
      "message",
      `Cannot GET ${CONFIG_DEFAULT.API_PATH}not-implemented`
    );
  });
});

describe("No API KEY available", () => {
  let response: Response;
  let previousValue: string;

  before(async () => {
    previousValue = CONFIG_SECRETS.OPEN_WEATHER_API_KEY;
    CONFIG_SECRETS.OPEN_WEATHER_API_KEY = "";
    response = await request.get(`${CONFIG_DEFAULT.API_PATH}current`);
  });

  it("Should return 401 status code", () => shouldBeStatus(response, 401));

  it("Should return json format data", () => shouldBeJsonContent(response));

  it("Should return error data", () => {
    should(response.body).be.instanceOf(Object);
    should(response.body).have.property("code", 401);
    should(response.body).have.property(
      "message",
      "There is no API KEY available"
    );
    should(response.body).have.property(
      "details",
      "Must provide Open Weather API KEY"
    );
  });

  after(() => {
    CONFIG_SECRETS.OPEN_WEATHER_API_KEY =
      process.env.OPEN_WEATHER_API_KEY || previousValue;
  });
});
