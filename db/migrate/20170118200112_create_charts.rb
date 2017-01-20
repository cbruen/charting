class CreateCharts < ActiveRecord::Migration[5.0]
  def change
    create_table :charts do |t|
      t.text :states
      t.text :labels

      t.timestamps
    end
  end
end
