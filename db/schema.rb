# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema[8.0].define(version: 2025_10_14_134303) do
  # These are extensions that must be enabled in order to support this database
  enable_extension "pg_catalog.plpgsql"

  create_table "channelgroups", force: :cascade do |t|
    t.string "title"
    t.string "description"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "channels", force: :cascade do |t|
    t.string "title"
    t.string "description"
    t.bigint "channelgroup_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["channelgroup_id"], name: "index_channels_on_channelgroup_id"
  end

  create_table "itchdata", force: :cascade do |t|
    t.integer "views_count"
    t.integer "downloads_count"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "rawgdata", force: :cascade do |t|
    t.string "name_original"
    t.string "background_image"
    t.string "website"
    t.string "developer"
    t.string "genres"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "game_slug"
  end

  add_foreign_key "channels", "channelgroups"
end
