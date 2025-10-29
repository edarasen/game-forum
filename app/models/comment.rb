class Comment < ApplicationRecord
  validates :body, presence: true
  
  belongs_to :post
  belongs_to :user
  
  after_destroy :destroy_report

  private
  def destroy_report
    @reports = Report.comments.where(content_id: self.id)
    @reports.each do |report|
      report.destroy!
    end
  end
end
