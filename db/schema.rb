# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2019_08_09_230652) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "columns", force: :cascade do |t|
    t.string "name", null: false
    t.integer "project_id", null: false
    t.integer "task", default: [], array: true
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["project_id"], name: "index_columns_on_project_id"
  end

  create_table "project_favorites", force: :cascade do |t|
    t.integer "project_id", null: false
    t.integer "user_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["project_id", "user_id"], name: "index_project_favorites_on_project_id_and_user_id", unique: true
  end

  create_table "projects", force: :cascade do |t|
    t.string "name", null: false
    t.string "description"
    t.integer "creator_id", null: false
    t.integer "owner_id"
    t.string "color", default: "red"
    t.string "view", default: "board"
    t.integer "column", default: [], array: true
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.integer "workspace_id", null: false
    t.index ["creator_id"], name: "index_projects_on_creator_id"
    t.index ["owner_id"], name: "index_projects_on_owner_id"
    t.index ["workspace_id"], name: "index_projects_on_workspace_id"
  end

  create_table "tasks", force: :cascade do |t|
    t.string "name", null: false
    t.text "description"
    t.integer "creator_id", null: false
    t.integer "owner_id"
    t.integer "column_id"
    t.integer "task_id"
    t.integer "subtask", default: [], array: true
    t.boolean "completed", default: false
    t.datetime "due_date"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["column_id"], name: "index_tasks_on_column_id"
    t.index ["creator_id"], name: "index_tasks_on_creator_id"
    t.index ["owner_id"], name: "index_tasks_on_owner_id"
    t.index ["task_id"], name: "index_tasks_on_task_id"
  end

  create_table "users", force: :cascade do |t|
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "email", null: false
    t.string "first_name", null: false
    t.string "last_name", null: false
    t.string "password_digest", null: false
    t.string "session_token", null: false
    t.index ["email"], name: "index_users_on_email", unique: true
    t.index ["session_token"], name: "index_users_on_session_token", unique: true
  end

  create_table "workspace_users", force: :cascade do |t|
    t.integer "workspace_id", null: false
    t.integer "user_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["workspace_id", "user_id"], name: "index_workspace_users_on_workspace_id_and_user_id", unique: true
  end

  create_table "workspaces", force: :cascade do |t|
    t.string "name", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["name"], name: "index_workspaces_on_name", unique: true
  end

end
