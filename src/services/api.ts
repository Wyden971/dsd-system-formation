import { User } from "@/models";
import axios from "axios";
import { buildStorage, setupCache } from "axios-cache-interceptor";
import { AppContextValue } from "@/context/AppContext/AppContext";

const storage = buildStorage({
  async set(key: string, cachedResonse, request) {
    console.log("set : ", key);
    switch (key) {
      case "users":
        if (request) {
          console.log(request.data);
          const query = AppContextValue.db.prepareSync(
            "INSERT INTO users (id, firstName, lastName, telephone, email) VALUES ($id, $firstName, $lastName, $email, $telephone);"
          );
          query
            .executeAsync({
              $id: request.data.id,
              $firstName: request.data.firstName,
              $lastName: request.data.lastName,
              $email: request.data.email,
              $telephone: request.data.telephone,
            })
            .then(() => query.finalizeAsync());
        }
        break;
    }
  },
  async find(key: string, request) {
    switch (key) {
      case "users":
        const result = await AppContextValue.db.getAllAsync(
          "SELECT * FROM users"
        );

        console.log("result : ", result);
        return {
          state: "stale",
          createdAt: new Date(),
          data: result,
          ttl: undefined,
        };
    }
    return request?.data;
  },
  async remove(key: string, request) {
    switch (key) {
      case "users":
        const query = AppContextValue.db.prepareSync(
          "DELETE users WHERE id=$id"
        );
        query
          .executeAsync({
            $id: request?.params.id,
          })
          .then(() => query.finalizeAsync());
        break;
    }
  },
});

export const client = setupCache(
  axios.create({
    baseURL: "https://6698f9b02069c438cd70d92c.mockapi.io/api/v1",
    headers: {
      clientId: process.env.clientId,
    },
  })
);

export function getUsers(page = 1) {
  return client.get<User[]>("users", {
    params: {
      page,
    },
    id: "users",
  });
}

export function createUser(user: User) {
  return client.post<User>("users", user, {
    id: "users",
  });
}

export function updateUser({ id, ...userData }: User) {
  return client.put<User>(`users/${id}`, userData, {
    id: "users",
  });
}

export function deleteUser(id: string) {
  return client.delete(`users/${id}`, {
    id: "users",
  });
}
