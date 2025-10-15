class Channel < ApplicationRecord
  validates :title, presence: true
  validates :description, presence: true
  
  belongs_to :channelgroup
  has_many :posts, dependent: :destroy
end
