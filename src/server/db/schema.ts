import { relations, sql } from "drizzle-orm";
import {
  index,
  int,
  mysqlTableCreator,
  primaryKey,
  text,
  timestamp,
  varchar,
} from "drizzle-orm/mysql-core";
import { type AdapterAccount } from "next-auth/adapters";

/**
 * This is an example of how to use the multi-project schema feature of Drizzle ORM. Use the same
 * database instance for multiple projects.
 *
 * @see https://orm.drizzle.team/docs/goodies#multi-project-schema
 */
export const mysqlTable = mysqlTableCreator((name) => `project-finder_${name}`);

export const users = mysqlTable("user", {
  id: varchar("id", { length: 255 }).notNull().primaryKey(),
  name: varchar("name", { length: 255 }),
  email: varchar("email", { length: 255 }).notNull(),
  emailVerified: timestamp("emailVerified", {
    mode: "date",
    fsp: 3,
  }).default(sql`CURRENT_TIMESTAMP(3)`),
  trialUsed: int("trialUsed").default(0),
  image: varchar("image", { length: 255 }),
});

export const usersRelations = relations(users, ({ many }) => ({
  accounts: many(accounts),
  sessions: many(sessions),
}));

export const accounts = mysqlTable(
  "account",
  {
    userId: varchar("userId", { length: 255 }).notNull(),
    type: varchar("type", { length: 255 })
      .$type<AdapterAccount["type"]>()
      .notNull(),
    provider: varchar("provider", { length: 255 }).notNull(),
    providerAccountId: varchar("providerAccountId", { length: 255 }).notNull(),
    refresh_token: text("refresh_token"),
    access_token: text("access_token"),
    expires_at: int("expires_at"),
    token_type: varchar("token_type", { length: 255 }),
    scope: varchar("scope", { length: 255 }),
    id_token: text("id_token"),
    session_state: varchar("session_state", { length: 255 }),
  },
  (account) => ({
    compoundKey: primaryKey(account.provider, account.providerAccountId),
    userIdIdx: index("userId_idx").on(account.userId),
  }),
);

export const accountsRelations = relations(accounts, ({ one }) => ({
  user: one(users, { fields: [accounts.userId], references: [users.id] }),
}));

export const sessions = mysqlTable(
  "session",
  {
    sessionToken: varchar("sessionToken", { length: 255 })
      .notNull()
      .primaryKey(),
    userId: varchar("userId", { length: 255 }).notNull(),
    expires: timestamp("expires", { mode: "date" }).notNull(),
  },
  (session) => ({
    userIdIdx: index("userId_idx").on(session.userId),
  }),
);

export const sessionsRelations = relations(sessions, ({ one }) => ({
  user: one(users, { fields: [sessions.userId], references: [users.id] }),
}));

export const verificationTokens = mysqlTable(
  "verificationToken",
  {
    identifier: varchar("identifier", { length: 255 }).notNull(),
    token: varchar("token", { length: 255 }).notNull(),
    expires: timestamp("expires", { mode: "date" }).notNull(),
  },
  (vt) => ({
    compoundKey: primaryKey(vt.identifier, vt.token),
  }),
);

export const projects = mysqlTable(
  "project",
  {
    id: varchar("id", { length: 255 }).notNull().primaryKey(),
    name: varchar("name", { length: 255 }).notNull(),
    description: text("description"),
    image: varchar("image", { length: 255 }),
    projectUrl: varchar("projectUrl", { length: 255 }),
    tags: text("tags"),
    type: varchar("type", { length: 255 }),
    ownerId: varchar("ownerId", { length: 255 }).notNull(),
    createdAt: timestamp("createdAt", {
      mode: "date",
      fsp: 3,
    }).default(sql`CURRENT_TIMESTAMP(3)`),
  },
  (project) => ({
    ownerIdIdx: index("ownerId_idx").on(project.ownerId),
  }),
);

export const likes = mysqlTable(
  "likes",
  {
    projectId: varchar("projectId", { length: 255 }).notNull(),
    userId: varchar("userId", { length: 255 }).notNull(),
  },
  (like) => {
    return {
      compoundKey: primaryKey(like.projectId, like.userId),
    };
  },
);

export const comments = mysqlTable(
  "comment",
  {
    id: varchar("id", { length: 255 }).notNull().primaryKey(),
    content: text("content"),
    projectId: varchar("projectId", { length: 255 }).notNull(),
    userId: varchar("userId", { length: 255 }).notNull(),
    createdAt: timestamp("createdAt", {
      mode: "date",
      fsp: 3,
    }).default(sql`CURRENT_TIMESTAMP(3)`),
  },
  (comment) => ({
    projectIdIdx: index("projectId_idx").on(comment.projectId),
    userIdIdx: index("userId_idx").on(comment.userId),
  }),
);

export const likesRelations = relations(likes, ({ one }) => ({
  project: one(projects, {
    fields: [likes.projectId],
    references: [projects.id],
  }),
  user: one(users, { fields: [likes.userId], references: [users.id] }),
}));

export const projectsRelations = relations(projects, ({ many }) => ({
  comments: many(comments),
  likes: many(likes),
}));

export const commentsRelations = relations(comments, ({ one }) => ({
  project: one(projects, {
    fields: [comments.projectId],
    references: [projects.id],
  }),
  user: one(users, { fields: [comments.userId], references: [users.id] }),
}));
