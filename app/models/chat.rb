class Chat < ApplicationRecord
  belongs_to :user
  belongs_to :family
  has_many :messages, dependent: :destroy
  SYSTEM_PROMPT = ""
end
