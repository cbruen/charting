class ChartsController < ApplicationController
require 'csv'

  def new
    @chart = Chart.new
  end

  def create
    @chart = Chart.create(chart_params)
    res = CSV.read(@chart.datafile.path)
    labelValue = res[0]
    labelValue.shift
    length = res.length-2
    all = []
    all2 = []

    (1..length).each do |y|
      test = []
      test2 = []
      first = res[y].shift
      res[y].each_with_index {|x,z| test << (x.to_f / res[-1][z+1].to_f) * 100 }
      res[y].each_with_index {|x,z| test2 << x.to_f }
      all << [first] + test
      all2 << test2
    end

    @chart.states = all
    @chart.labels = labelValue
    @chart.real = all2
    @chart.save

    render json: @chart
  end

  private

  def chart_params
    params.require(:chart).permit(:datafile)
  end

end
