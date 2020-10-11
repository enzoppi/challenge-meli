const request = require("supertest");
const app = require("./app");

describe("Test the root path", () => {
  describe("and the route is invalid", () => {
    it("it should respond with a status code of 404", async () => {
      const response = await request(app).get('/invalidRoute');
      expect(response.statusCode).toBe(404);
    });
  });
});

describe("Test the api/items path", () => {
  describe("with a query of ipod and limit of 4", () => {    
    test("it should respond with the GET method and a status code of 200", async () => {
      const searchResponse = await request(app).get("/api/items").query({ q: "ipod", limit: "4" });
      expect(searchResponse.statusCode).toBe(200);
    });
  });

  describe("with no query", () => {    
    test("it should respond with the GET method and a status code of 400", async () => {
      const searchResponse = await request(app).get("/api/items");
      expect(searchResponse.statusCode).toBe(400);
    });
  });

  describe("with an id param", () => {
    describe("and it's valid", () => {
      test("it should respond with the GET by ID method and a status code of 200", async () => {
        const searchResponse = await request(app).get("/api/items").query({ q: "ipod", limit: "4" });
        const validId = searchResponse.body.items[0].id;
        const getByIdResponse = await request(app).get("/api/items/" + validId);
        expect(getByIdResponse.statusCode).toBe(200);
      });
    });

    describe("and it's invalid", () => {
      test("it should respond with the GET by ID method and a status code of 404", async () => {
        const getByIdResponse = await request(app).get("/api/items/fakeIdThatShouldNeverWorkOnExternalAPI");
        expect(getByIdResponse.statusCode).toBe(404);
      });
    });
  });
});
