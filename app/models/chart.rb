class Chart < ApplicationRecord
  has_attached_file :datafile,
    :url => "/system/:class/:attachment/:filename"

  validates_attachment_presence :datafile
  validates_attachment_content_type :datafile, content_type: ['application/vnd.ms-excel', 'text/csv', 'text/plain'],
                                                   :message => ', Only CSV files are allowed. '

  belongs_to :page

  serialize :labels
  serialize :states
  serialize :real
end
