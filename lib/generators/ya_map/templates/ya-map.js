function buildPlacemark(id, geo_point, options, extras, draggable) {
  var pm = new YMaps.Placemark(geo_point, options);
  if (extras) {
    if (extras.iconContent) pm.setIconContent(extras.iconContent);
    if (extras.name) pm.name = extras.name;
    if (extras.description) pm.description = extras.description;
  }
  yandexObjectsMapper[id] = pm;
  if (options.draggable) {
      YMaps.Events.observe(pm, pm.Events.DragEnd, function () {
        var map = this.getMap();
        if(draggable.url){
            $.post(draggable.url, { lat: this.getCoordPoint().getY(), long: this.getCoordPoint().getX(), zoom: map.getZoom() },
            function(data){});
        } else {
           $('#'+draggable.item+'_latitude').val(this.getCoordPoint().getY());
           $('#'+draggable.item+'_longitude').val(this.getCoordPoint().getX());
           $('#'+draggable.item+'_zoom').val(map.getZoom());
        }
    });
  }
  return pm;
}


function destroyAllOverlays() {
  for (var i in yandexObjectsMapper) {
    map.removeOverlay(yandexObjectsMapper[i]);
    delete yandexObjectsMapper[i]
  }
}
// Управляющий элемент "список меток"
function PlacemarksNavigator (marks) {
  // Действия при добавлении элемента на карту
  this.onAddToMap = function (map, position) {
      this.container = YMaps.jQuery("<ul></ul>");
      this.map = map;
      this.position = position || new YMaps.ControlPosition(YMaps.ControlPosition.TOP_RIGHT, new YMaps.Size(10, 10));

      // CSS-свойства, определяющие внешний вид элемента
      this.container.css({
         position: "absolute",
         zIndex: YMaps.ZIndex.CONTROL,
         background: '#fff',
         listStyle: 'none',
         padding: '10px',
         margin: 0,
         overflow: 'auto',
         height: '350px'
      });

      // Формирует список меток
      this._generateList();

      // Располагает элемент управления в верхнем правом углу карты
      this.position.apply(this.container);

      // Добавляет элемент управления на карту
      this.container.appendTo(this.map.getContainer());
  };

  // Обработчик удаления элемента управления с карты
  this.onRemoveFromMap = function () {
     if (this.container.parent()) {
         this.container.remove();
         this.container = null;
     }
     this.map = null;
  };
  // Формирует выпадающий список меток
  this._generateList = function () {
     var _this = this;

     // Вызывает функцию-обработчик для каждого объекта
     marks.forEach(function (obj) {
         // Создает ссылку на объект
         var li = YMaps.jQuery("<li>" + obj.name + "</li>"),
         a = li.find("a");

         // Создает обработчик щелчка мыши по ссылке
         li.bind("click", function () {
             _this.map.panTo(obj.getGeoPoint(), {
                flying: 1,
                callback: function () {
                    obj.openBalloon();
                }
             });
             return false;
         });

         // Создает слушатели событий открытия и закрытия балуна объекта
         YMaps.Events.observe(obj, obj.Events.BalloonOpen, function () {
             a.css("text-decoration", "none");
         });

         YMaps.Events.observe(obj, obj.Events.BalloonClose, function () {
             a.css("text-decoration", "");
         });

         // Добавляет ссылку на объект в общий список
         li.appendTo(_this.container);
     });
  };
}
function GeoTag() {

// Получение информации о местоположении пользователя
if (YMaps.location) {
    center = new YMaps.GeoPoint(YMaps.location.longitude, YMaps.location.latitude);

    if (YMaps.location.zoom) {
        zoom = YMaps.location.zoom;
    } else {
        zoom = 10;
    }

    map.openBalloon(center, "Место вашего предположительного местоположения:<br/>"
        + (YMaps.location.country || "")
        + (YMaps.location.region ? ", " + YMaps.location.region : "")
        + (YMaps.location.city ? ", " + YMaps.location.city : "")
    )
}else {
    center = new YMaps.GeoPoint(55.7522, 37.6156);
}

// Установка для карты ее центра и масштаба
map.setCenter(center, zoom);
}

function buildPlacemark(id, geo_point, options, extras, draggable) {
  var pm = new YMaps.Placemark(geo_point, options);
  if (extras) {
    if (extras.iconContent) pm.setIconContent(extras.iconContent);
    if (extras.name) pm.name = extras.name;
    if (extras.description) pm.description = extras.description;
  }
  yandexObjectsMapper[id] = pm;
  if (options.draggable) {
      YMaps.Events.observe(pm, pm.Events.DragEnd, function () {
        var map = this.getMap();
        if(draggable.url){
            $.post(draggable.url, { lat: this.getCoordPoint().getY(), long: this.getCoordPoint().getX(), zoom: map.getZoom() },
            function(data){});
        } else {
           $('#'+draggable.item+'_latitude').val(this.getCoordPoint().getY());
           $('#'+draggable.item+'_longitude').val(this.getCoordPoint().getX());
           $('#'+draggable.item+'_zoom').val(map.getZoom());
        }
    });
  }
  return pm;
}


function destroyAllOverlays() {
  for (var i in yandexObjectsMapper) {
    map.removeOverlay(yandexObjectsMapper[i]);
    delete yandexObjectsMapper[i]
  }
}
// Управляющий элемент "список меток"
function PlacemarksNavigator (marks) {
  // Действия при добавлении элемента на карту
  this.onAddToMap = function (map, position) {
      this.container = YMaps.jQuery("<ul></ul>");
      this.map = map;
      this.position = position || new YMaps.ControlPosition(YMaps.ControlPosition.TOP_RIGHT, new YMaps.Size(10, 10));

      // CSS-свойства, определяющие внешний вид элемента
      this.container.css({
         position: "absolute",
         zIndex: YMaps.ZIndex.CONTROL,
         background: '#fff',
         listStyle: 'none',
         padding: '10px',
         margin: 0,
         overflow: 'auto',
         height: '350px'
      });

      // Формирует список меток
      this._generateList();

      // Располагает элемент управления в верхнем правом углу карты
      this.position.apply(this.container);

      // Добавляет элемент управления на карту
      this.container.appendTo(this.map.getContainer());
  };

  // Обработчик удаления элемента управления с карты
  this.onRemoveFromMap = function () {
     if (this.container.parent()) {
         this.container.remove();
         this.container = null;
     }
     this.map = null;
  };
  // Формирует выпадающий список меток
  this._generateList = function () {
     var _this = this;

     // Вызывает функцию-обработчик для каждого объекта
     marks.forEach(function (obj) {
         // Создает ссылку на объект
         var li = YMaps.jQuery("<li>" + obj.name + "</li>"),
         a = li.find("a");

         // Создает обработчик щелчка мыши по ссылке
         li.bind("click", function () {
             _this.map.panTo(obj.getGeoPoint(), {
                flying: 1,
                callback: function () {
                    obj.openBalloon();
                }
             });
             return false;
         });

         // Создает слушатели событий открытия и закрытия балуна объекта
         YMaps.Events.observe(obj, obj.Events.BalloonOpen, function () {
             a.css("text-decoration", "none");
         });

         YMaps.Events.observe(obj, obj.Events.BalloonClose, function () {
             a.css("text-decoration", "");
         });

         // Добавляет ссылку на объект в общий список
         li.appendTo(_this.container);
     });
  };
}
function GeoTag() {

// Получение информации о местоположении пользователя
if (YMaps.location) {
    center = new YMaps.GeoPoint(YMaps.location.longitude, YMaps.location.latitude);

    if (YMaps.location.zoom) {
        zoom = YMaps.location.zoom;
    } else {
        zoom = 10;
    }

    map.openBalloon(center, "Место вашего предположительного местоположения:<br/>"
        + (YMaps.location.country || "")
        + (YMaps.location.region ? ", " + YMaps.location.region : "")
        + (YMaps.location.city ? ", " + YMaps.location.city : "")
    )
}else {
    center = new YMaps.GeoPoint(55.7522, 37.6156);
}

// Установка для карты ее центра и масштаба
map.setCenter(center, zoom);
}