import { useSQLiteContext } from "expo-sqlite";
import { useCallback } from "react";
import { User } from "@/models";
import uuid from "react-native-uuid";

export const useUserRepository = () => {
  const db = useSQLiteContext();

  const insert = useCallback(
    (user: User) => {
      user.id = uuid.v4().toString();
      const query = db.prepareSync(`
        INSERT INTO users (id, firstName, lastName, email, telephone) 
        VALUES ($id, $firstName, $lastName, $email, $telephone);
      `);
      return query
        .executeAsync({
          $id: user.id,
          $firstName: user.firstName,
          $lastName: user.lastName,
          $email: user.email,
          $telephone: user.telephone,
        })
        .then(() => query.finalizeAsync().then(() => user));
    },
    [db]
  );

  const remove = useCallback(
    (user: User) => {
      const query = db.prepareSync(`
        DELETE FROM users WHERE id = $id
      `);
      return query
        .executeAsync({
          $id: user.id,
          $firstName: user.firstName,
          $lastName: user.lastName,
          $email: user.email,
          $telephone: user.telephone,
        })
        .then(() => query.finalizeAsync().then(() => user));
    },
    [db]
  );

  const select = useCallback(
    (page: number) => {
      const query = db.prepareSync(`
        SELECT 
        id,
        firstName,
        lastName,
        email,
        telephone 
        FROM users 
        LIMIT $start, $limit
    `);

      return query
        .executeForRawResultAsync({
          $start: Math.max(0, (page - 1) * 50),
          $limit: 50,
        })
        .then((result) => {
          return result.getAllAsync().then((items) => {
            const users = items.map(
              (item) =>
                ({
                  id: item[0],
                  firstName: item[1],
                  lastName: item[2],
                  email: item[3],
                  telephone: item[4],
                  age: 0,
                  isVip: false,
                  objets: [],
                } as User)
            );
            return users;
          });
        })
        .then((users) => query.finalizeAsync().then(() => users));
    },
    [db]
  );

  const update = useCallback(
    (user: User) => {
      const query = db.prepareSync(`
        UPDATE users 
        SET firstName = $firstName, 
        lastName = $lastName,
        email = $email,
        telephone = $telephone
        WHERE id = $id
      `);
      return query
        .executeAsync({
          $id: user.id,
          $firstName: user.firstName,
          $lastName: user.lastName,
          $email: user.email,
          $telephone: user.telephone,
        })
        .then(() => query.finalizeAsync().then(() => user));
    },
    [db]
  );

  return {
    db,
    insert,
    remove,
    select,
    update,
  } as const;
};
