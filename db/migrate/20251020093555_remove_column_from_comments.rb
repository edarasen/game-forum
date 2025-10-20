class RemoveColumnFromComments < ActiveRecord::Migration[8.0]
  def change
    remove_column :comments, :is_reported, :boolean
  end
end
