import should from "should";
import { Response } from "supertest";
import { request, shouldBeJsonContent, shouldBeStatus } from ".";
import { CONFIG } from "../src/config/default";

describe("Get current location", () => {
  let response: Response;

  before(async () => {
    response = await request.get(`${CONFIG.API_PATH}location`);
  });

  it("Should return 200 status code", () => shouldBeStatus(response, 200));

  it("Should return json format data", () => shouldBeJsonContent(response));

  it("Should return current location data", () => {
    should(response.body).be.instanceOf(Object);
    should(response.body).have.properties([
      "city",
      "country",
      "countryCode",
      "lat",
      "lon",
    ]);
  });
});
