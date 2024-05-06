import should from "should";
import { Response } from "supertest";
import { request, shouldBeJsonContent, shouldBeStatus } from ".";
import { API_PATH } from "../src/config/default";

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
