class CreatePosts < ActiveRecord::Migration[8.0]
  def change
    create_table :posts do |t|
      t.string :title
      t.text :body
      t.references :channel, null: false, foreign_key: true
      t.references :user, null: false, foreign_key: true
      t.boolean :is_reported
      t.timestamps
    end
  end
end
