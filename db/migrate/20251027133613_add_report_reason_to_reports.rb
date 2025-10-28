class AddReportReasonToReports < ActiveRecord::Migration[8.0]
  def change
    add_column :reports, :report_reason, :integer, null: false
  end
end
