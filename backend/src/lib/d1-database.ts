import { KVModel } from "../model/kv";
import { seminarModel } from "../model/seminar";

export function d1Database(d1: D1Database) {
  return {
    seminar: seminarModel(d1),
    KV: KVModel(d1),
  };
}
