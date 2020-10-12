const request = require("supertest");
const app = require("./app");

describe("Test the root path", () => {
  describe("and the route is invalid", () => {
    it("should respond with a status code of 404", async () => {
      const response = await request(app).get('/invalidRoute');
      expect(response.statusCode).toBe(404);
    });
  });
});

describe("Test the api/items path", () => {
  describe("with a query of ipod and limit of 4", () => {
    let searchResponse;

    beforeEach(async () => {
      searchResponse = await request(app).get("/api/items").query({ q: "ipod", limit: "4" });
    });

    it("should respond with the GET method and a status code of 200", () => {
      expect(searchResponse.statusCode).toBe(200);
    });

    it("should respond with a correctly adapted object", () => {
      expect(searchResponse.body).toEqual(expect.objectContaining({
        author: expect.objectContaining({
          name: expect.any(String),
          lastName: expect.any(String),
        }),
        categories: expect.arrayContaining([expect.any(String)]),
        items: expect.arrayContaining([
          expect.objectContaining({
            condition: expect.any(String),
            free_shipping: expect.any(Boolean),
            id: expect.any(String),
            price: expect.objectContaining({
              amount: expect.any(Number),
              currency: expect.any(String),
              decimals: expect.any(Number),
            }),
            title: expect.any(String),
          }),
        ]),
      }));
    });
  });

  describe("with no query", () => {
    it("should respond with the GET method and a status code of 400", async () => {
      const searchResponse = await request(app).get("/api/items");
      expect(searchResponse.statusCode).toBe(400);
    });
  });

  describe("with an id param", () => {
    describe("and it's valid", () => {
      let searchResponse, validId, getByIdResponse;

      beforeEach(async() => {
        searchResponse = await request(app).get("/api/items").query({ q: "ipod", limit: "4" });
        validId = searchResponse.body.items[0].id;
        getByIdResponse = await request(app).get("/api/items/" + validId);
      })

      it("should respond with the GET by ID method and a status code of 200", () => {
        expect(getByIdResponse.statusCode).toBe(200);
      });

      it("should respond with a correctly adapted object", () => {
        expect(getByIdResponse.body).toEqual(expect.objectContaining({
          author: expect.objectContaining({
            name: expect.any(String),
            lastName: expect.any(String),
          }),
          item: expect.objectContaining({
            id: expect.any(String),
            title: expect.any(String),
            price: expect.objectContaining({
              amount: expect.any(Number),
              currency: expect.any(String),
              decimals: expect.any(Number),
            }),
            categories: expect.arrayContaining([expect.any(String)]),
            picture: expect.any(String),
            condition: expect.any(String),
            free_shipping: expect.any(Boolean),
            sold_quantity: expect.any(Number),
            description: expect.any(String),
          }),
        }));
      });
    });

    describe("and it's invalid", () => {
      it("should respond with the GET by ID method and a status code of 404", async () => {
        const getByIdResponse = await request(app).get("/api/items/fakeIdThatShouldNeverWorkOnExternalAPI");
        expect(getByIdResponse.statusCode).toBe(404);
      });
    });
  });
});
