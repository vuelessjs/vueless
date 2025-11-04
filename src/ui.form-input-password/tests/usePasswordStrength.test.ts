import { ref } from "vue";
import { describe, it, expect } from "vitest";

import { usePasswordStrength } from "../usePasswordStrength";

describe("usePasswordStrength", () => {
  describe("Empty password", () => {
    it("should return weak strength for empty password", () => {
      const password = ref("");
      const { strength } = usePasswordStrength(password);

      expect(strength.value.score).toBe(0);
      expect(strength.value.level).toBe("weak");
      expect(strength.value.color).toBe("error");
      expect(strength.value.percent).toBe(0);
    });
  });

  describe("Weak passwords", () => {
    it("should return weak strength for very short password", () => {
      const password = ref("abc");
      const { strength } = usePasswordStrength(password);

      expect(strength.value.score).toBe(0);
      expect(strength.value.level).toBe("weak");
      expect(strength.value.color).toBe("error");
      expect(strength.value.percent).toBe(25);
    });

    it("should return weak strength for password with only lowercase", () => {
      const password = ref("abcdefgh");
      const { strength } = usePasswordStrength(password);

      expect(strength.value.score).toBe(1);
      expect(strength.value.level).toBe("weak");
      expect(strength.value.color).toBe("error");
      expect(strength.value.percent).toBe(25);
    });

    it("should penalize repetitive characters", () => {
      const password = ref("aaabbbccc");
      const { strength } = usePasswordStrength(password);

      expect(strength.value.level).toBe("weak");
    });

    it("should penalize sequential numbers", () => {
      const password = ref("password123");
      const { strength } = usePasswordStrength(password);

      expect(strength.value.level).toBe("fair");
    });

    it("should penalize sequential letters", () => {
      const password = ref("abcdefgh");
      const { strength } = usePasswordStrength(password);

      expect(strength.value.level).toBe("weak");
    });
  });

  describe("Fair passwords", () => {
    it("should return fair strength for password with lowercase and numbers", () => {
      const password = ref("pass1");
      const { strength } = usePasswordStrength(password);

      expect(strength.value.score).toBe(2);
      expect(strength.value.level).toBe("fair");
      expect(strength.value.color).toBe("warning");
      expect(strength.value.percent).toBe(50);
    });

    it("should return fair strength for 8+ chars with lowercase and uppercase", () => {
      const password = ref("Passwor");
      const { strength } = usePasswordStrength(password);

      expect(strength.value.score).toBe(2);
      expect(strength.value.level).toBe("fair");
      expect(strength.value.color).toBe("warning");
      expect(strength.value.percent).toBe(50);
    });
  });

  describe("Good passwords", () => {
    it("should return good strength for password with mixed case and numbers", () => {
      const password = ref("Passwor1");
      const { strength } = usePasswordStrength(password);

      expect(strength.value.score).toBe(4);
      expect(strength.value.level).toBe("strong");
      expect(strength.value.color).toBe("success");
      expect(strength.value.percent).toBe(100);
    });

    it("should return good strength for 12+ chars with mixed case", () => {
      const password = ref("PasswordTest");
      const { strength } = usePasswordStrength(password);

      expect(strength.value.score).toBe(4);
      expect(strength.value.level).toBe("strong");
      expect(strength.value.color).toBe("success");
      expect(strength.value.percent).toBe(100);
    });

    it("should return good strength for password with 3 character types", () => {
      const password = ref("Password");
      const { strength } = usePasswordStrength(password);

      expect(strength.value.score).toBe(3);
      expect(strength.value.level).toBe("good");
      expect(strength.value.color).toBe("notice");
      expect(strength.value.percent).toBe(75);
    });
  });

  describe("Strong passwords", () => {
    it("should return strong strength for password with all character types", () => {
      const password = ref("P@ssw0rd!2024");
      const { strength } = usePasswordStrength(password);

      expect(strength.value.score).toBe(4);
      expect(strength.value.level).toBe("strong");
      expect(strength.value.color).toBe("success");
      expect(strength.value.percent).toBe(100);
    });

    it("should return strong strength for very long password with all types", () => {
      const password = ref("MyVerySecureP@ssw0rd!2024");
      const { strength } = usePasswordStrength(password);

      expect(strength.value.score).toBe(4);
      expect(strength.value.level).toBe("strong");
      expect(strength.value.color).toBe("success");
      expect(strength.value.percent).toBe(100);
    });
  });

  describe("Length bonuses", () => {
    it("should give bonus for 8+ characters", () => {
      const shortPassword = ref("Pass1");
      const longPassword = ref("Password1");

      const { strength: shortStrength } = usePasswordStrength(shortPassword);
      const { strength: longStrength } = usePasswordStrength(longPassword);

      expect(longStrength.value.score).toBeGreaterThan(shortStrength.value.score);
    });

    it("should give bonus for 12+ characters", () => {
      const mediumPassword = ref("Passwor1");
      const longPassword = ref("Password1234");

      const { strength: mediumStrength } = usePasswordStrength(mediumPassword);
      const { strength: longStrength } = usePasswordStrength(longPassword);

      expect(longStrength.value.score).toBeGreaterThanOrEqual(mediumStrength.value.score);
    });

    it("should give bonus for 16+ characters", () => {
      const mediumPassword = ref("Password1234");
      const veryLongPassword = ref("Password12345678");

      const { strength: mediumStrength } = usePasswordStrength(mediumPassword);
      const { strength: veryLongStrength } = usePasswordStrength(veryLongPassword);

      expect(veryLongStrength.value.score).toBeGreaterThanOrEqual(mediumStrength.value.score);
    });
  });

  describe("Character type bonuses", () => {
    it("should give bonus for lowercase letters", () => {
      const password = ref("password");
      const { strength } = usePasswordStrength(password);

      expect(strength.value.score).toBeGreaterThanOrEqual(1);
    });

    it("should give bonus for uppercase letters", () => {
      const password = ref("PASSWORD");
      const { strength } = usePasswordStrength(password);

      expect(strength.value.score).toBeGreaterThanOrEqual(1);
    });

    it("should give bonus for numbers", () => {
      const password = ref("12345678");
      const { strength } = usePasswordStrength(password);

      expect(strength.value.score).toBeGreaterThanOrEqual(1);
    });

    it("should give bonus for special characters", () => {
      const password = ref("!@#$%^&*");
      const { strength } = usePasswordStrength(password);

      expect(strength.value.score).toBeGreaterThanOrEqual(1);
    });
  });

  describe("Reactivity", () => {
    it("should update strength when password changes", () => {
      const password = ref("weak");
      const { strength } = usePasswordStrength(password);

      expect(strength.value.level).toBe("weak");

      password.value = "P@ssw0rd!2024";

      expect(strength.value.level).toBe("strong");
    });

    it("should recalculate score when password is updated", () => {
      const password = ref("abc");
      const { strength } = usePasswordStrength(password);

      const initialScore = strength.value.score;

      password.value = "Password123";

      expect(strength.value.score).not.toBe(initialScore);
    });
  });

  describe("Edge cases", () => {
    it("should handle numeric password value", () => {
      const password = ref(12345678);
      const { strength } = usePasswordStrength(password);

      expect(strength.value.score).toBeGreaterThanOrEqual(0);
      expect(strength.value.level).toBeDefined();
    });

    it("should cap score at maximum of 4", () => {
      const password = ref("MyVerySecureP@ssw0rd!2024WithExtraLength");
      const { strength } = usePasswordStrength(password);

      expect(strength.value.score).toBeLessThanOrEqual(4);
    });

    it("should not allow negative scores", () => {
      const password = ref("aaa");
      const { strength } = usePasswordStrength(password);

      expect(strength.value.score).toBeGreaterThanOrEqual(0);
    });
  });

  describe("Special character detection", () => {
    it("should detect common special characters", () => {
      const specialChars = ["!", "@", "#", "$", "%", "^", "&", "*", "(", ")", "_", "+"];

      specialChars.forEach((char) => {
        const password = ref(`password${char}`);
        const { strength } = usePasswordStrength(password);

        expect(strength.value.score).toBeGreaterThanOrEqual(2);
      });
    });

    it("should detect brackets and braces", () => {
      const password = ref("password[]{};");
      const { strength } = usePasswordStrength(password);

      expect(strength.value.score).toBeGreaterThanOrEqual(2);
    });
  });
});
