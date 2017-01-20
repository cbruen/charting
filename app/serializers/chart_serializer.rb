class ChartSerializer < ActiveModel::Serializer
  attributes :id, :labels, :states, :real
end
