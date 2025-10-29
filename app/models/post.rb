class Post < ApplicationRecord
  validates :title, presence: true
  validates :body, presence: true

  belongs_to :user
  belongs_to :channel

  has_many :comments, dependent: :destroy

  after_destroy :destroy_report

  private
  def destroy_report
    @reports = Report.posts.where(content_id: self.id)
    @reports.each do |report|
      report.destroy!
    end
  end
end
