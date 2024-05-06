import should from "should";
import supertest, { Response } from "supertest";
import { app } from "../app";

export const request = supertest.agent(app);

export const shouldBeStatus = (response: Response, status: number) => {
  should(response.status).be.equal(status);
};

export const shouldBeJsonContent = (response: Response) => {
  should(response.headers["content-type"]).match(/json/);
};

export const shouldBeNotFoundCityError = (response: Response) => {
  should(response.body).be.instanceOf(Object);
  should(response.body).have.property("code", 400);
  should(response.body).have.property(
    "message",
    "It is not possible to find the required city"
  );
};
