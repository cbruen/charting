class AddAttachmentToCharts < ActiveRecord::Migration[5.0]
  def change
    add_attachment :charts, :datafile
  end
end
