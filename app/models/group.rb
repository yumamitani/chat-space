class Group < ApplicationRecord
  has_many :groups_users
  has_many :users, throuth: :groups_users
  has_many :messages
end
