import should from "should";
import sinon from "sinon";
import { Response } from "supertest";
import { request, shouldBeJsonContent, shouldBeStatus } from ".";
import { API_PATH } from "../src/config/default";
import * as secrets from "../src/config/secrets";

describe("Not implemented endpoint", () => {
  let response: Response;

  before(async () => {
    response = await request.get(`${API_PATH}not-implemented`);
  });

  it("Should return 404 status code", () => shouldBeStatus(response, 404));

  it("Should return json format data", () => shouldBeJsonContent(response));

  it("Should return error data", () => {
    should(response.body).be.instanceOf(Object);
    should(response.body).have.property("code", 404);
    should(response.body).have.property(
      "message",
      `Cannot GET ${API_PATH}not-implemented`
    );
  });
});

describe("No API KEY available", () => {
  let response: Response;

  before(async () => {
    sinon.stub(secrets, "OPEN_WEATHER_API_KEY").set(() => "");
    response = await request.get(`${API_PATH}current`);
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
    sinon.restore();
  });
});
