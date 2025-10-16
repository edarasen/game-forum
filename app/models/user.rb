class User < ApplicationRecord
  include Devise::JWT::RevocationStrategies::JTIMatcher

  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable,
         :jwt_authenticatable, jwt_revocation_strategy: self

  # You can call on .admin/?, .moderator/?, and .user/?
  enum :role, { admin: "admin", moderator: "moderator", user: "user" }
  enum :moderator_status, { not_applied: "no application", pending: "pending", approved: "approved" }
end
