import { computed } from "vue";

import type { Ref, ComputedRef } from "vue";

export interface PasswordStrength {
  score: number;
  level: "weak" | "fair" | "good" | "strong";
  color: "error" | "warning" | "notice" | "success";
  percent: number;
}

export function usePasswordStrength(password: Ref<string | number>): {
  strength: ComputedRef<PasswordStrength>;
} {
  const strength = computed<PasswordStrength>(() => {
    const pwd = String(password.value || "");

    if (!pwd) {
      return {
        score: 0,
        level: "weak",
        color: "error",
        percent: 0,
      };
    }

    let score = 0;

    if (pwd.length >= 8) score += 1;
    if (pwd.length >= 12) score += 1;

    if (/[a-z]/.test(pwd)) score += 1;
    if (/[A-Z]/.test(pwd)) score += 1;
    if (/\d/.test(pwd)) score += 1;
    const specialCharsRegex = /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/;

    if (specialCharsRegex.test(pwd)) score += 1;

    if (pwd.length >= 16) score += 1;

    if (/(.)\1{2,}/.test(pwd)) score -= 1;

    const sequentialNumbers = "012|123|234|345|456|567|678|789|890";
    const sequentialLetters =
      "abc|bcd|cde|def|efg|fgh|ghi|hij|ijk|jkl|klm|lmn|mno|nop|opq|pqr|qrs|rst|stu|tuv|uvw|vwx|wxy|xyz";
    const sequentialPattern = new RegExp(`(${sequentialNumbers}|${sequentialLetters})`, "i");

    if (sequentialPattern.test(pwd)) {
      score -= 1;
    }

    score = Math.max(0, Math.min(4, score));

    let level: PasswordStrength["level"];
    let color: PasswordStrength["color"];
    let percent: number;

    if (score === 0 || score === 1) {
      level = "weak";
      color = "error";
      percent = 25;
    } else if (score === 2) {
      level = "fair";
      color = "warning";
      percent = 50;
    } else if (score === 3) {
      level = "good";
      color = "notice";
      percent = 75;
    } else {
      level = "strong";
      color = "success";
      percent = 100;
    }

    return {
      score,
      level,
      color,
      percent,
    };
  });

  return {
    strength,
  };
}
