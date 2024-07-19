import { AppContextValue } from "@/context/AppContext/AppContext";

export function log(...params: any) {
  console.log(...params);
  return new Promise<void>((resolve) => {
    const query = AppContextValue.db.prepareSync(
      "INSERT INTO logs (message, date, user) VALUES ( $message, CURRENT_DATE(), $userId );"
    );
    query
      .executeAsync()
      .then(() => {
        return query.finalizeAsync();
      })
      .finally(resolve);
  });
}
