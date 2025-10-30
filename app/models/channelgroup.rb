class Channelgroup < ApplicationRecord
  validates :title, presence: true
  validates :description, presence: true

  has_many :channels, dependent: :destroy
  has_many :posts, through: :channels
end
