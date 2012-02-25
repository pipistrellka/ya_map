require 'spec_helper'

describe YaMap::Placemark do
  it "should return valid js" do
    pm = YaMap::Placemark.new YaMap::GeoPoint.new(1,2)
    pm.to_s.should match(/^buildPlacemark\('placemark(\d*)', new YMaps.GeoPoint\(2,1\), \{\}, \{\}, \{\}\)$/i)
  end

  it "should return valid js create draggable placement" do
    pm = YaMap::Placemark.new YaMap::GeoPoint.new(1,2)
    pm.options[:draggable] = true
    pm.draggable[:url] = "url/for/update"
    pm.to_s.should match(/^buildPlacemark\('placemark(\d*)', new YMaps.GeoPoint\(2,1\), \{draggable:true\}, \{\}, \{url:"url\/for\/update"\}\)$/i)
  end

  it "should return valid js create draggable placement with post" do
    pm = YaMap::Placemark.new YaMap::GeoPoint.new(1,2)
    pm.options[:draggable] = true
    pm.draggable[:item] =  "item"
    pm.to_s.should match(/^buildPlacemark\('placemark(\d*)', new YMaps.GeoPoint\(2,1\), \{draggable:true\}, \{\}, \{item:"item"\}\)$/i)
  end

end
