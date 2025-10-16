class AddNewAttributesToUsers < ActiveRecord::Migration[8.0]
  def change
    add_column :users, :username, :string, null: false
    add_column :users, :profile_picture, :string
    add_column :users, :role, :string, default: "user"
    add_column :users, :deactivated, :boolean, default: false
    add_column :users, :deactivated_at, :timestamp
    add_column :users, :moderator_status, :string, default: "no application"
    add_column :users, :mod_approval_date, :timestamp
  end
end
