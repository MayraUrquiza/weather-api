import should from "should";
import sinon from "sinon";
import { Response } from "supertest";
import {
  request,
  shouldBeJsonContent,
  shouldBeNotFoundCityError,
  shouldBeStatus,
} from ".";
import { CONFIG } from "../src/config/default";
import * as weatherService from "../src/services/weatherService";

describe("Test current weather", () => {
  let response: Response;

  const shouldBeWeatherData = (response: Response) => {
    should(response.body).be.instanceOf(Object);
    should(response.body).have.properties([
      "city",
      "countryCode",
      "lat",
      "lon",
      "sunrise",
      "sunset",
      "dt",
      "temp",
      "feels",
      "pressure",
      "humidity",
      "mainCondition",
    ]);
    should(response.body.mainCondition).have.properties([
      "name",
      "description",
    ]);
  };

  describe("Get current weather for the current location", () => {
    before(async () => {
      response = await request.get(`${CONFIG.API_PATH}current`);
    });

    it("Should return 200 status code", () => shouldBeStatus(response, 200));

    it("Should return json format data", () => shouldBeJsonContent(response));

    it("Should return current weather data", () =>
      shouldBeWeatherData(response));

    it("Should return current weather for current location", async () => {
      const currentLocationResponse = await request.get(
        `${CONFIG.API_PATH}location`
      );

      should(response.body.lon).be.equal(currentLocationResponse.body.lon);
      should(response.body.lat).be.equal(currentLocationResponse.body.lat);
    });
  });

  describe("Get current weather for an existing city", () => {
    before(async () => {
      response = await request.get(`${CONFIG.API_PATH}current/cordoba`);
    });

    it("Should return 200 status code", () => shouldBeStatus(response, 200));

    it("Should return json format data", () => shouldBeJsonContent(response));

    it("Should return current weather data", () =>
      shouldBeWeatherData(response));

    it("Should return current weather for the required city", () => {
      should(response.body).have.property("city", "Córdoba");
    });
  });

  describe("Get current weather for a non-existing city", () => {
    before(async () => {
      response = await request.get(`${CONFIG.API_PATH}current/fakecity`);
    });

    it("Should return 400 status code", () => shouldBeStatus(response, 400));

    it("Should return json format data", () => shouldBeJsonContent(response));

    it("Should return error data", () => shouldBeNotFoundCityError(response));
  });

  describe("Error handling mechanism when encountering unexpected errors", () => {
    before(async () => {
      sinon
        .stub(weatherService, "getCurrentWeather")
        .throws(new Error("Simulated error on get current weather"));

      response = await request.get(`${CONFIG.API_PATH}current`);
    });

    it("Should return 500 status code", () => shouldBeStatus(response, 500));

    it("Should return json format data", () => shouldBeJsonContent(response));

    after(() => {
      sinon.restore();
    });
  });

  describe("Validate for xss vulnerabilities", () => {
    before(async () => {
      const maliciousInput = encodeURIComponent(
        "<script>alert(1234);</script>"
      );
      response = await request.get(
        `${CONFIG.API_PATH}current/${maliciousInput}`
      );
    });

    it("Should return 400 status code", () => shouldBeStatus(response, 400));

    it("Should return json format data", () => shouldBeJsonContent(response));

    it("Should return error data", () => shouldBeNotFoundCityError(response));
  });
});
