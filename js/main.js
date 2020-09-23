var mySwiper = new Swiper(".swiper-container", {
  // Optional parameters
  loop: true,
  // Navigation arrows
  navigation: {
    nextEl: ".slider-button--next",
    prevEl: ".slider-button--prev",
  },
  // Подключение клавиатуры
  keyboard: {
    enabled: true,
    onlyInViewport: false,
  },
});

// Добавление карты
ymaps.ready(function () {
  var myMap = new ymaps.Map(
      "map",
      {
        center: [7.838196, 98.298813],
        zoom: 15,
      },
      {
        searchControlProvider: "yandex#search",
      }
    ),
    // Создаём макет содержимого.
    MyIconContentLayout = ymaps.templateLayoutFactory.createClass(
      '<div style="color: #FFFFFF; font-weight: bold;">$[properties.iconContent]</div>'
    ),
    myPlacemark = new ymaps.Placemark(
      myMap.getCenter(),
      {
        hintContent: "Собственный значок метки",
        balloonContent: "Это красивая метка",
      },
      {
        // Опции.
        // Необходимо указать данный тип макета.
        iconLayout: "default#image",
        // Своё изображение иконки метки.
        iconImageHref: "img/point.png",
        // Размеры метки.
        iconImageSize: [42, 42],
        // Смещение левого верхнего угла иконки относительно
        // её "ножки" (точки привязки).
        iconImageOffset: [-5, -38],
      }
    ),
    myPlacemarkWithContent = new ymaps.Placemark(
      [55.661574, 37.573856],
      {
        hintContent: "Собственный значок метки с контентом",
        balloonContent: "А эта — новогодняя",
        iconContent: "12",
      },
      {
        // Опции.
        // Необходимо указать данный тип макета.
        iconLayout: "default#imageWithContent",
        // Своё изображение иконки метки.
        iconImageHref: "img/point.png",
        // Размеры метки.
        iconImageSize: [48, 48],
        // Смещение левого верхнего угла иконки относительно
        // её "ножки" (точки привязки).
        iconImageOffset: [-24, -24],
        // Смещение слоя с содержимым относительно слоя с картинкой.
        iconContentOffset: [15, 15],
        // Макет содержимого.
        iconContentLayout: MyIconContentLayout,
      }
    );

  myMap.geoObjects.add(myPlacemark).add(myPlacemarkWithContent);
});

// Создаем экземпляр класса геометрии круга (указываем координаты и радиус в метрах).
var circleGeometry = new ymaps.geometry.Circle([30, 50], 10),
  // Создаем экземпляр класса геообъекта и передаем нашу геометрию в конструктор.
  circleGeoObject = new ymaps.GeoObject({
    geometry: circleGeometry,
  });
// Изменяем радиус геометрии через свойство geometry геообъекта.
circleGeoObject.geometry.setRadius(5);
// Или напрямую.
circleGeometry.setRadius(5);
// Также доступ к circleGeometry можно получить через circleGeoObject.geometry.
