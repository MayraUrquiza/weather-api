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
import { IDayDTO } from "../src/dtos/forecast";
import * as forecastService from "../src/services/forecastService";

describe("Test five days forecast", () => {
  let response: Response;

  const shouldBeForecastData = (response: Response) => {
    should(response.body).be.instanceOf(Object);
    should(response.body).have.properties([
      "city",
      "countryCode",
      "lat",
      "lon",
      "sunrise",
      "sunset",
      "days",
    ]);
    should(response.body.days).be.instanceOf(Object);
    Object.values<IDayDTO[]>(response.body.days).forEach((day) => {
      should(day).be.instanceOf(Array);
      day.forEach((item) => {
        should(item).have.properties([
          "dt",
          "temp",
          "feels",
          "pressure",
          "humidity",
          "mainCondition",
        ]);
        should(item.mainCondition).have.properties(["name", "description"]);
      });
    });
  };

  describe("Get five days forecast for the current location", () => {
    before(async () => {
      response = await request.get(`${CONFIG.API_PATH}forecast`);
    });

    it("Should return 200 status code", () => shouldBeStatus(response, 200));

    it("Should return json format data", () => shouldBeJsonContent(response));

    it("Should return forecast data", () => shouldBeForecastData(response));

    it("Should return forecast for current location", async () => {
      const currentLocationResponse = await request.get(
        `${CONFIG.API_PATH}location`
      );

      should(response.body.lon).be.equal(currentLocationResponse.body.lon);
      should(response.body.lat).be.equal(currentLocationResponse.body.lat);
    });
  });

  describe("Get five days forecast for an existing city", () => {
    before(async () => {
      response = await request.get(`${CONFIG.API_PATH}forecast/cordoba`);
    });

    it("Should return 200 status code", () => shouldBeStatus(response, 200));

    it("Should return json format data", () => shouldBeJsonContent(response));

    it("Should return forecast data", () => shouldBeForecastData(response));

    it("Should return forecast for the required city", () => {
      should(response.body).have.property("city", "Córdoba");
    });
  });

  describe("Get five days forecast for a non-existing city", () => {
    before(async () => {
      response = await request.get(`${CONFIG.API_PATH}forecast/fakecity`);
    });

    it("Should return 400 status code", () => shouldBeStatus(response, 400));

    it("Should return json format data", () => shouldBeJsonContent(response));

    it("Should return error data", () => shouldBeNotFoundCityError(response));
  });

  describe("Error handling mechanism when encountering unexpected errors", () => {
    before(async () => {
      sinon
        .stub(forecastService, "getDailyForecast")
        .throws(new Error("Simulated error on get daily forecast"));

      response = await request.get(`${CONFIG.API_PATH}forecast`);
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
        `${CONFIG.API_PATH}forecast/${maliciousInput}`
      );
    });

    it("Should return 400 status code", () => shouldBeStatus(response, 400));

    it("Should return json format data", () => shouldBeJsonContent(response));

    it("Should return error data", () => shouldBeNotFoundCityError(response));
  });
});
