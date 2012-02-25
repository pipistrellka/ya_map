module YaMap
  class Map
    DEFAULT_ZOOM = 10
    JS_OBJECT_MAPPER_NAME = 'yandexObjectsMapper'
    attr_accessor :container
    attr_reader :init_overlay
    def initialize(container = nil, options = {})
      @container = container || :map
      @init_global = []
      @init_start = []
      @init_overlay = []
      @init_end = []
      self.enable_scroll_zoom if options[:enable_scroll_zoom]
    end

    def self.header(options={})
      "<script src=\"http://api-maps.yandex.ru/1.1/index.xml?key=#{YaMap::ApiKey.get options}\" type=\"text/javascript\"></script>"
    end

    def center_zoom_init(center, zoom = DEFAULT_ZOOM)
      center = center.is_a?(GeoPoint) ? center : GeoPoint.new(center)
      record_init "map.setCenter(#{center},#{zoom});"
    end

    def center_near_init()
      record_init "GeoTag();"
    end

    def enable_scroll_zoom
      record_init "map.enableScrollZoom();"
    end

    def control_init(controls = {})
      record_init "map.addControl(new YMaps.Zoom()#{", #{controls[:zoom]}" if controls[:zoom].is_a?(YaMap::ControlPosition)});" if controls[:zoom]
    end

    def add_overlay placemark
      @init_overlay << "map.addOverlay(#{placemark});"
    end

    def add_overlay_group placemarks
      @init_overlay << "var group = new YMaps.GeoObjectCollection();"
      placemarks.each do |p|
         @init_overlay << "group.add(#{p});"
      end
      @init_overlay << "map.addOverlay(group);"
      @init_overlay << "map.addControl(new PlacemarksNavigator(group));"
    end

    def add_button_to_toolbar(button, id=0)
      record_init "var button = #{button}"
      record_init button.add_event("button", id)
      record_init "map.addControl(new YMaps.ToolBar(button));"
    end

    def set_bounds bounds
      record_init "map.setBounds(#{bounds});"
    end

    def set_min_zoom zoom
      record_init "map.setMinZoom(#{zoom});"
    end

    def set_max_zoom zoom
      record_init "map.setMaxZoom(#{zoom});"
    end

    def div style = {}
      style.reverse_merge! :height => 400, :width => 600
      [:width, :height].each { |p| style[p] = style[p].to_s + 'px' if style[p].is_a? Integer }
      "<div id=\"#{self.container}\" style=\"#{style.map{|k,v| "#{k}:#{v}"}.join(';')}\"></div>"
    end

    def record_init_global(code)
      @init_global << code
    end

    def record_init_start(code)
      @init_start << code
    end
    alias_method :record_init, :record_init_start
    def record_init_end(code)
      @init_end << code
    end

    def to_html
      <<EOD
<script type="text/javascript">
//<![CDATA[
var map;
#{JS_OBJECT_MAPPER_NAME} = [];
#{@init_global*"\n"}
window.onload = function () {
    map = new YMaps.Map(document.getElementById("#{self.container}"));
    #{@init_start*"\n"}
    #{@init_overlay*"\n"}
    #{@init_end*"\n"}
  }
//]]>
</script>
EOD
    end
  end
end