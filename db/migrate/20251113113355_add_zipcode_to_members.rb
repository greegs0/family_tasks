class AddZipcodeToMembers < ActiveRecord::Migration[7.1]
  def change
    add_column :members, :zipcode, :string
  end
end
