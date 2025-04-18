
import { pgTable, serial, varchar, text } from "drizzle-orm/pg-core";

export const mockInterview = pgTable('mockInterview', {
  id: serial('id').primaryKey(),
  jsonMockResp: text('jsonMockResp').notNull(),
  jobPosition: varchar('jobPosition').notNull(),
  jobDesc: varchar('jobDesc').notNull(),
  jobExperience: varchar('jobExperience').notNull(),
  createdBy: varchar('createdBy').notNull(),
  createdAt: varchar('createdAt'), // Fixed the typo
  mockId: varchar('mockId').notNull()
});
 export const UserAnswer=pgTable('userAnswer',{
  id: serial('id').primaryKey(),
  mockIdRef:varchar('mockId').notNull(),
  correctAns:varchar('correctAns'),
  userAns:text('userAns'),
  feedback:text('feedback'),
  rating:varchar('rating'),
  userEmail:varchar('userEmail'),
  createdAt:varchar('createdAt'),
  question:varchar('question').notNull(),
 })

