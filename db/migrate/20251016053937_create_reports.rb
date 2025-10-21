class CreateReports < ActiveRecord::Migration[8.0]
  def change
    create_table :reports do |t|
      t.integer :content_type, default: 0
      t.integer :content_id
      t.references :user, null: false, foreign_key: true
      t.timestamps
    end
  end
end
