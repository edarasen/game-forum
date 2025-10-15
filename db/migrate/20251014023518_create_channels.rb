class CreateChannels < ActiveRecord::Migration[8.0]
  def change
    create_table :channels do |t|
      t.string :title
      t.string :description
      t.references :channelgroup, null: false, foreign_key: true
      t.timestamps
    end
  end
end
