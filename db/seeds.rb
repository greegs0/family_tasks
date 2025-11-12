# This file should ensure the existence of records required to run the application in every environment (production,
# development, test). The code here should be idempotent so that it can be executed at any point in every environment.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Example:
#
#   ["Action", "Comedy", "Drama", "Horror"].each do |genre_name|
#     MovieGenre.find_or_create_by!(name: genre_name)
#   end
Family.destroy_all
User.destroy_all
user_adams = User.create!(email: "morticia@gmail.com", password:"123456")
user_kardashians = User.create!(email: "kris@gmail.com", password:"123456")
user_dupont = User.create!(email: "dupont@gmail.com", password:"123456")

family_adams = Family.create!(name: "Adams", zipcode: "93200", user_id: user_adams.id)
family_kardashians = Family.create!(name: "Kardashians", zipcode: "75001", user_id: user_kardashians.id)
family_dupont = Family.create!(name: "Dupont", zipcode: "14000", user_id: user_dupont.id)
