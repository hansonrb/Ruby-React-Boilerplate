class CreateTimezones < ActiveRecord::Migration[5.1]
  def change
    create_table :timezones do |t|
      t.string   :name, :null => false
      t.string   :city, :null => false

      t.float    :difference, :null => false, :default => 0 # GMT

      t.integer  :user_id

      t.timestamps
    end

    add_index :timezones, [:name, :user_id], unique: true
  end
end
