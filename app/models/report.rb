class Report < ApplicationRecord
  validates :content_id, presence: true
  enum :content_type, { post: 0, comment: 1 }
  enum :report_reason, { spam: 0, harassment: 1, inappropriate_content: 2, cheating: 3, off_topic: 4, impersonation: 5, others: 6 }

  scope :posts, -> { where(content_type: 'post') }
  scope :comments, -> { where(content_type: 'comment') }
end
