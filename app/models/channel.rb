class Channel < ApplicationRecord
  validates :title, presence: true
  validates :description, presence: true

  belongs_to :channelgroup
  has_many :posts, dependent: :destroy

  enum :post_permission, { admin_only: 0, admin_moderator_only: 1, all_users: 2 }
end
