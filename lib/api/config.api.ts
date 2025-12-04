import ky from "ky-universal";

export const apiInstance = ky.create({
  prefixUrl: "http://localhost:3000/api", // TODO: Move to the env file
  timeout: 30 * 1000, // 30 seconds
  headers: {
    "Content-Type": "application/json",
  },
});
