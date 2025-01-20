// authClient.ts
import { FutureverseAuthClient } from "@futureverse/auth";

export const authClient = new FutureverseAuthClient({
  clientId: "nk0Nrj__tuhKRt4nT7V9j",
  environment: import.meta.env.MODE, // Hoặc 'staging' nếu test
  redirectUri: "http://localhost:5177",
});
