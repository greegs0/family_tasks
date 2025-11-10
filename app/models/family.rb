class Family < ApplicationRecord
  belongs_to :user
  has_many :members, dependent: :destroy
  has_many :chats
end
