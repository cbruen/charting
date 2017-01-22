class Chart < ApplicationRecord
  has_attached_file :datafile
  validates_attachment_presence :datafile
  validates_attachment_content_type :datafile, :content_type =>['text/csv'],
                                                      :message => ', Only CSV files are allowed. '

  serialize :labels
  serialize :states
  serialize :real
end
