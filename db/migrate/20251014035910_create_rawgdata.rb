class CreateRawgdata < ActiveRecord::Migration[8.0]
  def change
    create_table :rawgdata do |t|
      t.string :name_original
      t.string :background_image
      t.string :website
      t.string :developer
      t.string :genres

      t.timestamps
    end
  end
end
