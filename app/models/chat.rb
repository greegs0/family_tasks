class Chat < ApplicationRecord
  belongs_to :user
  belongs_to :family
  has_many :messages, dependent: :destroy
  SYSTEM_PROMPT = "you are a family assistant. you need to create a calendar that will include family's birthday's and vaccines. Context : use the age of family members and their zipcode. You will present the informations the following way : 1/ family holidays 2/ family members' vaccines."
end
