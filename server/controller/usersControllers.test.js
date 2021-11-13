const User = require("../../database/models/user");
const { checkUser } = require("./usersControllers");

jest.mock("../../database/models/user");

describe("Given a User", () => {
  describe("When it receives a wrong username", () => {
    test("Then it should summon the function checkUser with an error and a 401 code", async () => {
      User.findOne = jest.fn().mockResolvedValue(null);
      const req = {
        body: {
          username: "Davidgg",
          password: "1234abcd",
          name: "David",
          photo: "qwe",
          bio: "qwe",
        },
      };
      const next = jest.fn();
      const expectedError = new Error("Authentication failed");
      expectedError.code = 401;

      await checkUser(req, null, next);

      expect(next.mock.calls[0][0]).toHaveProperty("message");
      expect(next.mock.calls[0][0]).toHaveProperty("code", 401);
    });
  });
});
