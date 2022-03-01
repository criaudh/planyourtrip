class CreateTrips < ActiveRecord::Migration[6.1]
  def change
    create_table :trips do |t|
      t.references :place_proposal
      t.date :start_at
      t.date :end_at
      t.integer :duration
      t.boolean :subscription_lock, default: false

      t.timestamps
    end
  end
end
