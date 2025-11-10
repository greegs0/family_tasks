class CreateFamilies < ActiveRecord::Migration[7.1]
  def change
    create_table :families do |t|
      t.references :user, null: false, foreign_key: true
      t.string :name
      t.string :zipcode

      t.timestamps
    end
  end
end
