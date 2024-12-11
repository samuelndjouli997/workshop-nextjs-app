import { database } from "@/firebase/config";
import { ref, get } from "firebase/database";

export default async function getRealtimeData(path: string) {
  const dataRef = ref(database, path);
  try {
    const snapshot = await get(dataRef);
    if (snapshot.exists()) {
      return { data: snapshot.val(), error: null };
    } else {
      return { data: null, error: "No data found" };
    }
  } catch (error) {
    return { data: null, error };
  }
}
