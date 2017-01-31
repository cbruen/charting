class AddPageIdToCharts < ActiveRecord::Migration[5.0]
  def change
    add_column :charts, :page_id, :integer
  end
end
