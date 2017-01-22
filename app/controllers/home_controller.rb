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

    def download
      @chart = Chart.find(params[:id])
      header = @chart["labels"]
      header.unshift("")
      data = @chart["real"]
      row_labels = @chart["states"].collect {|x| x[0]}
      row_labels.each_with_index do |y,z|
        data[z].unshift(y)
      end

      #p = Axlsx::Package.new
      #wb = p.workbook
      #wb.add_worksheet(:data)

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
      @chart.datafile = params[:file]
      @chart.states = all
      @chart.labels = labelValue
      @chart.real = all2
      @chart.save
      
      render json: @chart
    end


end
