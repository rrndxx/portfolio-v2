-- Portfolio content store (libSQL / SQLite / Turso)
-- Singleton documents + ordered collection rows. Nested shapes live in JSON columns.

CREATE TABLE IF NOT EXISTS site_config (
  id INTEGER PRIMARY KEY CHECK (id = 1),
  data TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS about (
  id INTEGER PRIMARY KEY CHECK (id = 1),
  data TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS skills (
  id INTEGER PRIMARY KEY CHECK (id = 1),
  data TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS resume_profile (
  id INTEGER PRIMARY KEY CHECK (id = 1),
  data TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS projects (
  slug TEXT PRIMARY KEY,
  data TEXT NOT NULL,
  featured INTEGER NOT NULL DEFAULT 0,
  sort_order INTEGER NOT NULL DEFAULT 0
);

CREATE TABLE IF NOT EXISTS experience (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  data TEXT NOT NULL,
  sort_order INTEGER NOT NULL DEFAULT 0
);

CREATE TABLE IF NOT EXISTS achievements (
  id TEXT PRIMARY KEY,
  data TEXT NOT NULL,
  featured INTEGER NOT NULL DEFAULT 0,
  sort_order INTEGER NOT NULL DEFAULT 0
);

CREATE TABLE IF NOT EXISTS gallery (
  id TEXT PRIMARY KEY,
  data TEXT NOT NULL,
  featured INTEGER NOT NULL DEFAULT 0,
  sort_order INTEGER NOT NULL DEFAULT 0
);

CREATE TABLE IF NOT EXISTS resume_experience (
  id TEXT PRIMARY KEY,
  data TEXT NOT NULL,
  sort_order INTEGER NOT NULL DEFAULT 0
);

CREATE TABLE IF NOT EXISTS resume_roles (
  id TEXT PRIMARY KEY,
  data TEXT NOT NULL,
  sort_order INTEGER NOT NULL DEFAULT 0
);
