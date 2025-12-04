import ky from "ky-universal";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000/api";

export const apiInstance = ky.create({
  prefixUrl: API_BASE_URL,
  timeout: 30 * 1000, // 30 seconds
  headers: {
    "Content-Type": "application/json",
  },
});
