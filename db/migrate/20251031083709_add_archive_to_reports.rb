class AddArchiveToReports < ActiveRecord::Migration[8.0]
  def change
    add_column :reports, :archive, :boolean, default: false
  end
end
