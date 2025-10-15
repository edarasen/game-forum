class AddGameSlugToRawgdata < ActiveRecord::Migration[8.0]
  def change
    add_column :rawgdata, :game_slug, :string
  end
end
