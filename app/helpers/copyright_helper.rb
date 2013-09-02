module CopyrightHelper
  # CopyrightHelper Adds a method for a copyright time period
  # Author: Chris Allen Moore
  # example when parameter is before this year: copyright_years(2012) #=> "2012 - 2013"
  # example when parameter is this year: copyright_years(2013) #=> "2013"
  def copyright_years(year_started)
    raise ArgumentError, "Parameter must be an integer number" unless year_started.is_a?(Integer)
    raise ArgumentError, "year_started should not be in the future" if year_started > Time.new.year
    thisYear = Time.now.year

    if year_started == thisYear
      "#{year_started}"
    else
      "#{year_started} - #{thisYear}"
    end
  end

end