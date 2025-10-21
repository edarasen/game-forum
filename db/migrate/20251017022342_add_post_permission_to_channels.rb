class AddPostPermissionToChannels < ActiveRecord::Migration[8.0]
  def change
    add_column :channels, :post_permission, :integer, default: 2
  end
end
