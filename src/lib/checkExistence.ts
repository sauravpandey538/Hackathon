import { fetchApi } from "./api";

export default async function checkExistence(email: string) {
  const user = await fetchApi("/api/auth/check-existence", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email }),
  });
  return user;
}
