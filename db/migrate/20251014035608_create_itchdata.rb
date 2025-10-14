class CreateItchdata < ActiveRecord::Migration[8.0]
  def change
    create_table :itchdata do |t|
      t.integer :views_count
      t.integer :downloads_count

      t.timestamps
    end
  end
end
