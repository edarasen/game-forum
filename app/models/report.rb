class Report < ApplicationRecord
  validates :content_id, presence: true
  enum :content_type, { post: 0, comment: 1}

  scope :posts, -> { where(content_type: 'post') }
  scope :comments, -> { where(content_type: 'comment') }
end
