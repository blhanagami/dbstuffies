// Example model schema from the Drizzle docs
// https://orm.drizzle.team/docs/sql-schema-declaration

import { sql } from "drizzle-orm";
import {
  index,
  integer,
  pgTableCreator,
  pgTable,
  text,
  timestamp,
  varchar,
  serial,
} from "drizzle-orm/pg-core";

/**
 * This is an example of how to use the multi-project schema feature of Drizzle ORM. Use the same
 * database instance for multiple projects.
 *
 * @see https://orm.drizzle.team/docs/goodies#multi-project-schema
 */
export const createTable = pgTableCreator((name) => `dbstuffies_${name}`);

export const posts = createTable(
  "post",
  {
    id: integer("id").primaryKey().generatedByDefaultAsIdentity(),
    content: varchar("content", { length: 256 }),
    createdAt: timestamp("created_at", { withTimezone: true })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).$onUpdate(
      () => new Date()
    ),
  },
  (example) => ({
    nameIndex: index("name_idx").on(example.content),
  })
);

/*export const textSchema = {
  table: 'texts',
  fields: {
    id: { type: 'integer', primaryKey: true, autoIncrement: true },
    field_name: { type: 'string', notNull: true },
    value: { type: 'text', notNull: true },
  },
*/


// Define your schema using Drizzle ORM's helpers
export const textSchema = pgTable('texts', {
  id: serial('id').primaryKey(),
  field_name: varchar('field_name', { length: 255 }).notNull(),
  value: text('value').notNull(),
});

//export type InsertPost = typeof textSchema.$inferInsert;
//export type SelectPost = typeof textSchema.$inferSelect;

