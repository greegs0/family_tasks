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

family_adams = Family.create!(name: "Adams",zipcode: "93200")
family_kardashians = Family.create!(name: "Kardashians",zipcode: "75001")
family_dupont = Family.create!(name: "Dupont",zipcode: "14000")
