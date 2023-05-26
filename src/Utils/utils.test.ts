import { apiInstance } from "../Api/api";
import {
  setAuthorizationHeader,
  validateName,
  validateEmail,
  validatePassword,
  validateCity,
  validatePhoneNumber,
  validateTitle,
} from "./utils";

// Mock the apiInstance import
jest.mock("../Api/api", () => {
  return {
    apiInstance: {
      defaults: {
        headers: {
          common: {
            Authorization: "",
          },
        },
      },
    },
  };
});

describe("Utils Tests", () => {
  describe("setAuthorizationHeader", () => {
    it("should set the Authorization header with the provided token", () => {
      const token = "your-token";
      setAuthorizationHeader(token);

      expect(apiInstance.defaults.headers.common.Authorization).toBe(
        `Bearer ${token}`
      );
    });
  });

  describe("validateName", () => {
    it("should return true for a valid name", () => {
      const validName = "John Doe";
      expect(validateName(validName)).toBe(true);
    });

    it("should return false for an invalid name", () => {
      const invalidName = "1234";
      expect(validateName(invalidName)).toBe(false);
    });
  });

  describe("validateEmail", () => {
    it("should return true for a valid email", () => {
      const validEmail = "test@example.com";
      expect(validateEmail(validEmail)).toBe(true);
    });

    it("should return false for an invalid email", () => {
      const invalidEmail = "invalid-email";
      expect(validateEmail(invalidEmail)).toBe(false);
    });
  });

  describe("validatePassword", () => {
    it("should return true for a valid password", () => {
      const validPassword = "password123";
      expect(validatePassword(validPassword)).toBe(true);
    });

    it("should return false for an invalid password", () => {
      const invalidPassword = "123";
      expect(validatePassword(invalidPassword)).toBe(false);
    });
  });

  describe("validateCity", () => {
    it("should return true for a valid city", () => {
      const validCity = "New York";
      expect(validateCity(validCity)).toBe(true);
    });

    it("should return false for an invalid city", () => {
      const invalidCity = "123";
      expect(validateCity(invalidCity)).toBe(false);
    });
  });

  describe("validatePhoneNumber", () => {
    it("should return true for a valid phone number", () => {
      const validPhoneNumber = "123-456-7890";
      expect(validatePhoneNumber(validPhoneNumber)).toBe(true);
    });

    it("should return false for an invalid phone number", () => {
      const invalidPhoneNumber = "123";
      expect(validatePhoneNumber(invalidPhoneNumber)).toBe(false);
    });
  });

  describe("validateTitle", () => {
    it("should return true for a valid title", () => {
      const validTitle = "Example Title";
      expect(validateTitle(validTitle)).toBe(true);
    });

    it("should return false for an invalid title", () => {
      const invalidTitle = "Invalid Title 123!";
      expect(validateTitle(invalidTitle)).toBe(false);
    });
  });
});
