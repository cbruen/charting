class State < ActiveRecord::Base
  serialize :label, :state
end
