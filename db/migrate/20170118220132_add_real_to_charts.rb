class AddRealToCharts < ActiveRecord::Migration[5.0]
  def change
    add_column :charts, :real, :text
  end
end
