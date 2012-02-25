module YaMap
  class Button < YaMap::MappingObject
    attr_accessor :options, :content

    def initialize content = {}, options = {}
      @content = content
      @options = options
    end

    def add_event(b, item, url=0)
      <<EOD
    YMaps.Events.observe(#{b}, #{b}.Events.Click, function () {
        var map = this.getToolBar().getMap();
        if(#{url} == 0){
          $('##{item}_latitude').val(map.getCenter().getY());
          $('##{item}_longitude').val(map.getCenter().getX());
          $('##{item}_zoom').val(map.getZoom());
          map.addOverlay(buildPlacemark('#{binding_name}', map.getCenter(), {draggable:true}, {}, {item: '#{item}'}));
        } else {
          $.post('#{url}', { lat: map.getCenter().getY(), long: map.getCenter().getX(), zoom: map.getZoom() },
              function(data){
                  map.addOverlay(buildPlacemark('#{binding_name}', map.getCenter(), {draggable:true}, {},{url:"#{url}"}));
          });

        }
        this.disable();
    });
EOD
    end

    def to_s mode = :new
      case mode
        when :new then "new YMaps.ToolBarButton(#{javascriptify_variable(@content)}, #{javascriptify_variable(@options)})"
      end
    end
  end
end