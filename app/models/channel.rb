class Channel < ApplicationRecord
  validates :title, presence: true
  validates :description, presence: true
  
  belongs_to :channelgroup
end
