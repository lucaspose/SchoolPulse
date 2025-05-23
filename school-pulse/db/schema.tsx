import { pgTable, serial, timestamp, varchar } from 'drizzle-orm/pg-core';

export const users = pgTable('users', {
  id: serial('id').primaryKey(),
  name: varchar('name').notNull(),
  email: varchar('email').notNull(),
  password: varchar('password').notNull(),
  createdAt: timestamp('created_at').defaultNow()
});

export const posts = pgTable('posts', {
    id: serial('id').primaryKey(),
    title: varchar('title').notNull(),
    content: varchar('content').notNull(),
    createdAt: timestamp('created_at').notNull().defaultNow(),
    updatedAt: timestamp('updated_at').notNull().defaultNow()
});