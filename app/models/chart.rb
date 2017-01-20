class Chart < ApplicationRecord
  serialize :labels
  serialize :states
  serialize :real
end
