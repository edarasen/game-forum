class ChangeIsReportedDefault < ActiveRecord::Migration[8.0]
  def change
    change_column_default :posts, :is_reported, to: false
    change_column_default :comments, :is_reported, to: false
  end
end
