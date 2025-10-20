class RemoveColumnFromPosts < ActiveRecord::Migration[8.0]
  def change
    remove_column :posts, :is_reported, :boolean
  end
end
