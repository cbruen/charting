class HomeController < ApplicationController
  require 'csv'
  def index

  end

  def data
    @param = []
    line_num=0
    File.open('app/assets/data/data1.txt').each do |line|

      try = line.to_s.split(" ").collect{|x| x.to_f}
      @param << try
    end
    render plain: @param
    end

    def upload
      res = CSV.read(params[:file].path)
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
      @chart = Chart.new
      @chart.states = all
      @chart.labels = labelValue
      @chart.real = all2


      render json: @chart
    end

    private

    def save_params
      binding.pry
      params.require(:state).permit({label: []})
    end

end
