(function ($) {

    'use strict';
    
    $.exists = function(selector) {
        return ($(selector).length > 0);
    }
    
    $('.text-component a > img').parent('a').addClass('has-img');
    $('.text-component__inner .twitter-tweet').parent('.media-wrapper').addClass('twitter-embed');

    swiperActivation();
    ms_header_menu();
    ms_page_transition();
    ms_stickyheader();  
    ms_theme_mode();
    ms_menu_default_mobile(); 
    ms_excerpt_gallery();
    ms_search_widget();
    ms_woo_quantity();  
    ms_footer_effect();

    function ms_footer_effect() {
        if ($('body').attr('data-footer-effect') == 'on') {
            var m_body = $('.ms-footer').height();
            $('.ms-main').css('margin-bottom', m_body);
            $(window).on("resize", function() {
                var m_body = $('.ms-footer').height();
                $('.ms-main').css('margin-bottom', m_body);
            });

        }
    }
    
    $(function() {
        $('.stars').find('a').on('click', function() {
            $(this).nextAll().removeClass('action');
        });
        $('.stars').find('a').mouseover(function() {

            $('.stars').find('a').each(function() {
                if ( $('.stars').find('a').hasClass('active')) {

                } else {
                    $(this).mouseover(function() {
                        $(this).addClass('action');
                        $(this).nextAll().removeClass('action');
                        $(this).prevAll().addClass('action');
                    });
                }
            });

        });

        $('.stars').find('a').mouseout(function() {
            
            $('.stars').find('a').each(function() {
                if ( $('.stars').find('a').hasClass('active')) {
                    $('.active').prevAll().addClass('action');
                    $('.active').removeClass('action').nextAll().removeClass('action');
                } else {
                    $('.stars').find('a').removeClass('action');
                }
            });
        });

    });

    function ms_search_widget() {

        $('.header__search-icon').on('click', function() {
            $('.header__search-modal').toggleClass('modal--is-visible');
        });
        
        $(document).on('click', '.modal--is-visible', function(e) {
            if (e.target == this) {
                $('.header__search-modal').toggleClass('modal--is-visible');
            }
        });

        $('.header__search--close-btn').on('click', function() {
            $('.header__search-modal').toggleClass('modal--is-visible');
        });

    }

   

    function ms_excerpt_gallery() {
        const swiper = new Swiper('.ms-post-media__gallery', {
            loop: true,
            speed: 600,
            navigation: {
                nextEl: '.ms-sp-btn__next',
                prevEl: '.ms-sp-btn__prev',
            },
        });
    }
   
    // Header menu
    function ms_header_menu() {
        if ($.exists('.js-main-header__nav-trigger')) {
            var mainHeader = document.getElementsByClassName('js-main-header')[0];
            if( mainHeader ) {
                var trigger = mainHeader.getElementsByClassName('js-main-header__nav-trigger')[0],
                    nav = mainHeader.getElementsByClassName('js-main-header__nav')[0];
                    //detect click on nav trigger
                    trigger.addEventListener("click", function(event) {
                        event.preventDefault();
                        var ariaExpanded = !Util.hasClass(nav, 'main-header__nav--is-visible');
                        //show nav and update button aria value
                        Util.toggleClass(nav, 'main-header__nav--is-visible', ariaExpanded);
                        trigger.setAttribute('aria-expanded', ariaExpanded);
                        if(ariaExpanded) { //opening menu -> move focus to first element inside nav
                            nav.querySelectorAll('[href], input:not([disabled]), button:not([disabled])')[0].focus();
                        }
                    });
            }
        }
        if ( $(window).width() > 1023 ){
           
            // Default Menu Style
            if ($.exists('.menu-default')) {
                var m_item = $('.navbar-nav').find(' > li.menu-item > a');

                $(m_item).each(function() {
                    $(this).html('<span>' + this.textContent + '</span>');
                    $(this).attr("title", this.textContent);
                });

                var menu_type = $("body").attr('data-menu');
                if (menu_type == 'fixed') {
                    var header = $(".main-header__layout").addClass('top');
                    $(window).scroll(function() {    
                        var scroll = $(window).scrollTop();
                    
                        if (scroll > 300) {
                            header.removeClass('top').addClass("action");
                        } else {
                            header.addClass('top').removeClass("action");
                        }
                    });
                }

            }

            $(window).scroll(function(){
                if ($(this).scrollTop() > 50) {
                   $('.main-header').addClass('show-bg');
                } else {
                   $('.main-header').removeClass('show-bg');
                }
            
            });

        }

    }
    
    // Mobile Menu
    function ms_menu_default_mobile() {

        if ($(window).width() < 1024) {
            $('.main-header__nav ').addClass('is_mobile');
        }
    
        var isAbove1024 = $(window).width() > 1024;
        $(window).on('resize', function(event){
            if( $(window).width() < 1077 && isAbove1024){
                isAbove1024 = false;
                $('.sub-menu').css('display', 'none');
                $('.main-header__nav ').addClass('is_mobile');
            }else if($(window).width() > 1077 && !isAbove1024){
                isAbove1024 = true;
                $('.sub-menu').css('display', 'block');
                $('.main-header__nav ').removeClass('is_mobile');
            }
        });

        $(document).on('click', '.is_mobile .navbar-nav > .menu-item-has-children > a', function(e) {
            e.preventDefault();
            if ($(this).hasClass('active')) {
                $(this).removeClass('active');
               $(this).siblings('.sub-menu').slideUp(100);
            } else {
                $('.menu-item-has-children > a').removeClass('active');
                $(this).addClass('active');
                $('.sub-menu').slideUp(200);
                $(this).siblings('.sub-menu').slideDown(100);
            }
          });

         
    }

    // Sticky Header
    function ms_stickyheader() {
    
        if ($.exists('body[data-menu="sticky"]')) {
      
          var mainHeader = $('.main-header__layout'),
              belowNavHeroContent = $('.sub-nav-hero'),
              scrolling = false,
              previousTop = 0,
              scrollDelta = 5,
              scrollOffset = 100;
      
          $(window).on('scroll', function(){
          if( !scrolling ) {
            scrolling = true;
              (!window.requestAnimationFrame)
              ? setTimeout(autoHideHeader, 300)
              : requestAnimationFrame(autoHideHeader);
          }
          });
          function autoHideHeader() {
              var currentTop = $(window).scrollTop();
              ( belowNavHeroContent.length > 0 ) 
              ? checkStickyNavigation(currentTop) : checkSimpleNavigation(currentTop);
              previousTop = currentTop;
              scrolling = false;
          }
          function checkSimpleNavigation(currentTop) {
              if (previousTop - currentTop > scrollDelta) {
                  mainHeader.removeClass('is-hide');
              } else if( currentTop - previousTop > scrollDelta && currentTop > scrollOffset) {
                  mainHeader.addClass('is-hide');
              }
          }
      
          $(window).scroll(function(){
          if ($(this).scrollTop() > 50) {
             $('.main-header').addClass('show-bg');
          } else {
             $('.main-header').removeClass('show-bg');
          }
      
          });
      
        }
      
    }
    
    // Page Transition
    function ms_page_transition() {

        if ($.exists('#loaded')) {

        window.onpageshow = function (event) {
            if (event.persisted) {
                window.location.reload();
            }
        };

        window.onbeforeunload = function(){
            $('#loaded').css('display', 'block');
            gsap.to("#loaded",{ opacity:1, ease: "power4.inOut", duration:.3 });
        };

        function ms_page_loaded() {
                $('#loaded').css('display', 'none');
                $('body').attr('onunload','');
            }
            gsap.fromTo("#loaded",{opacity: 1}, {opacity: 0, ease: Power1.easeOut, onComplete:ms_page_loaded, duration: 1 });
            
        }

    }
 

    // Google Map
    function ms_initMap($scope) {    
        var googleMap = $scope.find('.ms-gmap--wrapper'),
            map_lat = googleMap.data('map-lat'),
            map_lng = googleMap.data('map-lng'),
            map_zoom = googleMap.data('map-zoom'),
            map_gesture_handling = googleMap.data('map-gesture-handling'),
            map_zoom_control = googleMap.data('map-zoom-control') ? true : false,
            map_zoom_control_position = googleMap.data('map-zoom-control-position'),
            map_default_ui = googleMap.data('map-default-ui') ? false : true,
            map_type = googleMap.data('map-type'),
            map_type_control = googleMap.data('map-type-control') ? true : false,
            map_type_control_style = googleMap.data('map-type-control-style'),
            map_type_control_position = googleMap.data('map-type-control-position'),
            map_streetview_control = googleMap.data('map-streetview-control') ? true : false,
            map_streetview_position = googleMap.data('map-streetview-position'),
            map_info_window_width = googleMap.data('map-info-window-width'),
            map_locations = googleMap.data('map-locations'),
            map_styles = googleMap.data('map-style') || '',
            infowindow,
            map;
    
            function initMap() {
    
                var myLatLng = {
                    lat: parseFloat(map_lat),
                    lng: parseFloat(map_lng)
                };
    
                if (typeof google === 'undefined') {
                    return;
                }
    
                var map = new google.maps.Map(googleMap[0], {
                    center: myLatLng,
                    zoom: map_zoom,
                    disableDefaultUI: map_default_ui,
                    zoomControl: map_zoom_control,
                    zoomControlOptions: {
                        position: google.maps.ControlPosition[map_zoom_control_position]
                    },
                    mapTypeId: map_type,
                    mapTypeControl: map_type_control,
                    mapTypeControlOptions: {
                        style: google.maps.MapTypeControlStyle[map_type_control_style],
                        position: google.maps.ControlPosition[map_type_control_position]
                    },
                    streetViewControl: map_streetview_control,
                    streetViewControlOptions: {
                        position: google.maps.ControlPosition[map_streetview_position]
                    },
                    styles: map_styles,
                    gestureHandling: map_gesture_handling,
                });
    
                $.each(map_locations, function (index, googleMapement, content) {
    
                    var content = '\
                    <div class="ms-gm--wrap">\
                    <h6>' + googleMapement.title + '</h6>\
                    <div>' + googleMapement.text + '</div>\
                    </div>';
    
                    var icon = '';
    
                    if (googleMapement.pin_icon !== '') {
                        if (googleMapement.pin_icon_custom) {
                            icon = googleMapement.pin_icon_custom;
                        } else {
                            icon = '';
                        }
                    }
    
                    var marker = new google.maps.Marker({
                        map: map,
                        position: new google.maps.LatLng(parseFloat(googleMapement.lat), parseFloat(googleMapement.lng)),
                        animation: google.maps.Animation.DROP,
                        icon: icon,
                    });
    
                    if (googleMapement.title !== '' && googleMapement.text !== '') {
                        addInfoWindow(marker, content);
                    }
    
                    google.maps.event.addListener(marker, 'click', toggleBounce);
    
                    function toggleBounce() {
                        if (marker.getAnimation() != null) {
                            marker.setAnimation(null);
                        } else {
                            marker.setAnimation(google.maps.Animation.BOUNCE);
                        }
                    }
    
                });
            }
    
            function addInfoWindow(marker, content) {
                google.maps.event.addListener(marker, 'click', function () {
                    if (!infowindow) {
                        infowindow = new google.maps.InfoWindow({
                            maxWidth: map_info_window_width
                        });
                    }
                    infowindow.setContent(content);
                    infowindow.open(map, marker);
                });
            }
    
            initMap();
    }
    
    // Isotope
    function ms_isotope_card_grid($scope) { 
    
        var grid = $scope.find('.grid-content');
        // init Isotope
        grid.imagesLoaded(function () { grid.isotope(); });
    }
    
    // Masonry Gallery
    function ms_masonry_gallery($scope) {
     
        var grid = $scope.find('.ms-masonry-gallery');
    
        grid.imagesLoaded(function () { grid.isotope(); });
    
        var el_2 = $scope.find('.blockgallery.h_s2').find('.mfp-img img');

        $(el_2).on('mouseenter', function () {
            $(el_2).css('opacity', '0.5');
        });

        $(el_2).on('mouseleave', function () {
            $(el_2).css('opacity', '1');
        });
    
    }

    // Parallax Hero
    function ms_parallax_hero($scope) {
        var el = $scope.find('.ms-parallax'),
            video = el.find('.jarallax-img').attr('data-jarallax-video');
        el.jarallax({ videoSrc: video });
    }

    // Parallax Hero Text BG
    function ms_parallax_hero_text($scope) {
        var item = $scope.find('.ms-hero--parallax');
        $(item).on('mouseenter', function () {
            var item_inner = $(this).children('.ms-hero--bg_text').find('h2');
            $(this).on('mousemove', function( e ) {
                var offset = $(this).offset();
                const x = e.pageX - offset.left;
                $(item_inner).css( '--x', x / 3 + 'px' );
            });
        });
    }

    // Swiper Slider Options
    function ms_full_slider($scope) {

        var el = $scope.find('.ms-slider'),
            effect = el.attr('data-effect'),
            direction = el.attr('data-direction'),
            slides = el.attr('data-spv'),
            slides_t = el.attr('data-spv-t'),
            slides_m = el.attr('data-spv-m'),
            speed = el.attr('data-speed'),
            space = el.attr('data-space'),
            space_t = el.attr('data-space-t'),
            space_m = el.attr('data-space-m'),
            loop = ( 'on' === el.attr('data-loop') ) ? true : false,
            autoplay = ( 'on' === el.attr('data-autoplay') ) ? true : false,
            centered = ( 'on' === el.attr('data-centered') ) ? true : false,
            wheel = ( 'on' === el.attr('data-mousewheel') ) ? true : false,
            st = ( 'on' === el.attr('data-simulatetouch') ) ? true : false,
            gc = ( 'on' === el.attr('data-grabcursor') ) ? true : false,
            pbo = ( 'vertical' === el.attr('data-direction') ) ? true : false;

            var swiper = new Swiper(el.get(0), {
            slidesPerView: slides,
            parallax: true,
            spaceBetween: eval(space),
            loop: loop,
            loopFillGroupWithBlank: true,
            autoplay: autoplay,
            centeredSlides: centered,
            effect: effect,
            direction: direction,
            speed: eval(speed),
            mousewheel: wheel,
            grabCursor: gc,
            simulateTouch: st,
            scrollbar: 'true',
            navigation: {
                nextEl: '.ms-nav--next',
                prevEl: '.ms-nav--prev',
            },
            pagination: {
                el: '.swiper-pagination',
                type: 'progressbar',
                progressbarOpposite: pbo,
            },
            breakpoints: {
                320: {
                    slidesPerView: slides_m,
                    spaceBetween: eval(space_m)
                },
                500: {
                    slidesPerView: slides_t,
                    spaceBetween: eval(space_t)
                },
                1024: {
                    slidesPerView: slides,
                    spaceBetween: eval(space)
                }
            },
        });
    
    var counter = $('.ms-slider--count'),
        total = $('.ms-slider--count__total'),
        totalSlides = $('.swiper-slide:not(.swiper-slide-duplicate)').length,
        currentCount = '01';
    counter.append( currentCount );

    if ( totalSlides < '10' ) {
        totalSlides = '0' + totalSlides;
    }

    total.append(totalSlides );

    swiper.on('transitionStart', function () {
        var index = this.realIndex + 1,
            $current = $(".swiper-slide").eq(index);
            if ( index < '10' ) {
                index = '0' + index;
            }
        counter.html(index);
    });

    if ($.exists('.swiper-wrapper.ms-ticker')) {
        // nothing
    } else {
        swiper.on('slideChangeTransitionEnd', function () {
            swiper.slideToLoop(swiper.realIndex, 0, false);
        });
    }


    }
    // Swiper Slider Options
    function ms_full_slider($scope) {

        var el = $scope.find('.ms-slider'),
            effect = el.attr('data-effect'),
            direction = el.attr('data-direction'),
            slides = el.attr('data-spv'),
            slides_t = el.attr('data-spv-t'),
            slides_m = el.attr('data-spv-m'),
            speed = el.attr('data-speed'),
            space = el.attr('data-space'),
            space_t = el.attr('data-space-t'),
            space_m = el.attr('data-space-m'),
            loop = ( 'on' === el.attr('data-loop') ) ? true : false,
            autoplay = ( 'on' === el.attr('data-autoplay') ) ? true : false,
            centered = ( 'on' === el.attr('data-centered') ) ? true : false,
            wheel = ( 'on' === el.attr('data-mousewheel') ) ? true : false,
            st = ( 'on' === el.attr('data-simulatetouch') ) ? true : false,
            gc = ( 'on' === el.attr('data-grabcursor') ) ? true : false,
            pbo = ( 'vertical' === el.attr('data-direction') ) ? true : false;

            var swiper = new Swiper(el.get(0), {
            slidesPerView: slides,
            parallax: true,
            spaceBetween: eval(space),
            loop: loop,
            loopFillGroupWithBlank: true,
            autoplay: autoplay,
            centeredSlides: centered,
            effect: effect,
            direction: direction,
            speed: eval(speed),
            mousewheel: wheel,
            grabCursor: gc,
            simulateTouch: st,
            scrollbar: 'true',
            navigation: {
                nextEl: '.ms-nav--next',
                prevEl: '.ms-nav--prev',
            },
            pagination: {
                el: '.swiper-pagination',
                type: 'progressbar',
                progressbarOpposite: pbo,
            },
            breakpoints: {
                320: {
                    slidesPerView: slides_m,
                    spaceBetween: eval(space_m)
                },
                500: {
                    slidesPerView: slides_t,
                    spaceBetween: eval(space_t)
                },
                1024: {
                    slidesPerView: slides,
                    spaceBetween: eval(space)
                }
            },
        });
    
    var counter = $('.ms-slider--count'),
        total = $('.ms-slider--count__total'),
        totalSlides = $('.swiper-slide:not(.swiper-slide-duplicate)').length,
        currentCount = '01';
    counter.append( currentCount );

    if ( totalSlides < '10' ) {
        totalSlides = '0' + totalSlides;
    }

    total.append(totalSlides );

    swiper.on('transitionStart', function () {
        var index = this.realIndex + 1,
            $current = $(".swiper-slide").eq(index);
            if ( index < '10' ) {
                index = '0' + index;
            }
        counter.html(index);
    });

    if ($.exists('.swiper-wrapper.ms-ticker')) {
        // nothing
    } else {
        swiper.on('slideChangeTransitionEnd', function () {
            swiper.slideToLoop(swiper.realIndex, 0, false);
        });
    }


    }

     // Swiper Slider Options
    function swiperActivation($scope){
        var swiper = new Swiper(".swiper-container-h", {
            direction: "horizontal",
            effect: "slide",
            autoplay: true,
            parallax: true,
            speed: 1600,
            rtl: true,
            loop: true,
            loopFillGroupWithBlank: !0,
  
            mousewheel: {
              eventsTarged: ".swiper-slide",
              sensitivity: 1
            },
            keyboard: {
              enabled: true,
              onlyInViewport: true
            },
            scrollbar: {
              el: ".swiper-scrollbar",
              hide: false,
              draggable: true
            },
            navigation: {
              nextEl: ".swiper-button-next",
              prevEl: ".swiper-button-prev",
            },
            pagination: {
                el: ".swiper-pagination",
                type: "progressbar"
              }
          });
        var swiper = new Swiper(".swiper-container-h1", {
            direction: "horizontal",
            effect: "slide",
            autoplay: false,
            parallax: true,
            speed: 1600,
            rtl: true,
            loop: true,
            loopFillGroupWithBlank: !0,
            keyboard: {
              enabled: true,
              onlyInViewport: true
            },
            scrollbar: {
              el: ".swiper-scrollbar",
              hide: false,
              draggable: true
            },
            navigation: {
              nextEl: ".swiper-button-next",
              prevEl: ".swiper-button-prev",
            },
            pagination: {
                el: ".swiper-pagination",
                type: "bullets",
                clickable:"true"
              }
          });
    }
    
    // Carousel Showcase
    function ms_carousel_showcase($scope) {

        function ms_carousel_bg() {
            var active_bg = el.find('.swiper-slide-active .ms-p-img > img').attr('src');
            $('.ms-carousel--bg').css('background-image', 'url(' + active_bg + ')');
        }

        var el = $scope.find('.ms-carousel-showcase'),
        swiper_container = '.' + el.attr('class'),
        swiper = new Swiper(swiper_container, {
            slidesPerView: 'auto',
            centeredSlides: true,
            spaceBetween: '10%',
            initialSlide: 0,
            autoHeight: false,
            centeredSlidesBounds: true,
            loop: true,
            speed: 1000,
            mousewheel: true,
            pagination: {
              el: ".swiper-pagination",
              clickable: true,
            },
            breakpoints: {
                320: {
                  slidesPerView: 1,
                  spaceBetween: '10%'
                },
                1024: {
                  slidesPerView: 'auto',
                  spaceBetween: '10%'
                }
            },
        });

    }

    // Video Button
    function ms_video_button($scope) {
    
        var el = $scope.find('.ms-vb').find('.ms-vb--src'),
            autoplay = el.attr('data-autoplay'),
            type = el.attr('data-video'),
            loop = el.attr('data-loop'),
            controls = el.attr('data-controls'),
            muted = el.attr('data-muted');
        if ( type === 'youtube' ) {
            var start = el.attr('data-start'),
                end = el.attr('data-end');
        }
    
        el.magnificPopup({
            type: 'iframe',
            iframe: {
                patterns: {
                    youtube: {
                        index: 'youtube.com/', 
                        id: function(url) {        
                            var m = url.match(/[\\?\\&]v=([^\\?\\&]+)/);
                            if ( !m || !m[1] ) return null;
                            return m[1];
                        },
                        src: '//www.youtube.com/embed/%id%?autoplay=' + autoplay + '&controls=' + controls + '&mute=' + muted + '&start=' + start + '&end=' + end
                    },
                    vimeo: {
                        index: 'vimeo.com/', 
                        id: function(url) {        
                            var m = url.match(/(https?:\/\/)?(www.)?(player.)?vimeo.com\/([a-z]*\/)*([0-9]{6,11})[?]?.*/);
                            if ( !m || !m[5] ) return null;
                            return m[5];
                        },
                        src: '//player.vimeo.com/video/%id%?autoplay=' + autoplay + '&loop=' + loop + '&controls=' + controls + '&muted=' +  muted
                    }
                },
                markup: '<div class="mfp-iframe-scaler">'+
                    '<div class="mfp-close"></div>'+
                    '<iframe class="mfp-iframe" frameborder="0" allowfullscreen></iframe>'+
                    '<div class="mfp-title">Some caption</div>'+
                    '</div>'
            },
            callbacks: {
                markupParse: function(template, values, item) {
                    values.title = item.el.attr('data-caption');
                }
            },
        });
    
    }
    
    // Justified Gallery
    function ms_lightbox($scope) {
    
        var el = $scope.find('.blockgallery'),
            justified = $scope.find('.justified-gallery'),
            m = justified.data('margins'),
            h = justified.data('row-height');
    
            justified.justifiedGallery({
                rowHeight : h,
                margins : m,
                captions : false,
                border: 0,
                lastRow : 'nojustify',
            });

            el.magnificPopup({
                delegate: '.mfp-img',
                mainClass: 'mfp-fade',
                tClose: 'Fechar (Esc)',
                tLoading: '',
                type: 'image',
                image: {
                   titleSrc: function(item) {
                      return item.el.attr("title");;
                   }
                },
                gallery: {
                    enabled:true,
                    preload: [0,2],
                },
    
                mainClass: 'mfp-zoom-in',
                removalDelay: 300, //delay removal by X to allow out-animation
                callbacks: {
                    beforeOpen: function() {
                        $('#portfolio a').each(function(){
                            $(this).attr('alt', $(this).find('img').attr('alt'));
                        }); 
                    },
                    open: function() {
                        //overwrite default prev + next function. Add timeout for css3 crossfade animation
                        $.magnificPopup.instance.next = function() {
                            var self = this;
                            self.wrap.removeClass('mfp-image-loaded');
                            setTimeout(function() { $.magnificPopup.proto.next.call(self); }, 120);
                        }
                        $.magnificPopup.instance.prev = function() {
                            var self = this;
                            self.wrap.removeClass('mfp-image-loaded');
                            setTimeout(function() { $.magnificPopup.proto.prev.call(self); }, 120);
                        }
                    },
                    imageLoadComplete: function() { 
                        var self = this;
                        setTimeout(function() { self.wrap.addClass('mfp-image-loaded'); }, 16);
                    }
                }
    
            });
    }
    
    // Run on initial load.
    msResponsiveEmbeds();

    // Run on resize.
    window.onresize = msResponsiveEmbeds;

    // Responsive Embeds
    function msResponsiveEmbeds() {
        var proportion, parentWidth;
    
        // Loop iframe elements.
        document.querySelectorAll( 'iframe' ).forEach( function( iframe ) {
            // Only continue if the iframe has a width & height defined.
            if ( iframe.width && iframe.height ) {
                // Calculate the proportion/ratio based on the width & height.
                proportion = parseFloat( iframe.width ) / parseFloat( iframe.height );
                // Get the parent element's width.
                parentWidth = parseFloat( window.getComputedStyle( iframe.parentElement, null ).width.replace( 'px', '' ) );
                // Set the max-width & height.
                iframe.style.maxWidth = '100%';
                iframe.style.maxHeight = Math.round( parentWidth / proportion ).toString() + 'px';
            }
        } );
    }
    
  

    // Theme Mode
    function ms_theme_mode() {
        if ($.exists('.ms_theme_mode')) {
            var td = $("#theme-dark"),
                tl = $("#theme-light"),
                s = $("#switcher");
    
            $(document).ready(function() {
                var savedTheme = localStorage.getItem('theme-mode');
                if (savedTheme) {
                    $('body').attr('data-theme', savedTheme);
                    if (savedTheme === 'dark') {
                        $(td).addClass("toggler--is-active");
                        $(tl).removeClass("toggler--is-active");
                        $(s).prop('checked', true);
                    } else {
                        $(tl).addClass("toggler--is-active");
                        $(td).removeClass("toggler--is-active");
                        $(s).prop('checked', false);
                    }
                }
            });
    
            $(td).on("click", function(){
                $(tl).removeClass("toggler--is-active");
                $(s).prop('checked', false);
                $(this).addClass('toggler--is-active');
                $('body').attr('data-theme', 'dark');
                localStorage.setItem('theme-mode', 'dark');
            });
    
            $(tl).on("click", function(){
                $(td).removeClass("toggler--is-active");
                $(s).prop('checked', true);
                $(this).addClass('toggler--is-active');
                $('body').attr('data-theme', 'light');
                localStorage.setItem('theme-mode', 'light');
            });
    
            $(s).on("click", function(){
                $(td).toggleClass("toggler--is-active");
                $(tl).toggleClass("toggler--is-active");
                var newTheme = $('body').attr('data-theme') === 'light' ? 'dark' : 'light';
                $('body').attr('data-theme', newTheme);
                localStorage.setItem('theme-mode', newTheme);
            });
        }
    }

    function ms_woo_quantity() {

        if ($.exists('.ms-quantity')) {
            $('body').on('click', '.button-plus, .button-minus', function(e) {
                const isNegative = $(e.target).closest('.button-minus').is('.button-minus');
                const input = $(e.target).closest('.ms-quantity').find('input');
                if (input.is('input')) {
                  input[0][isNegative ? 'stepDown' : 'stepUp']();
                  $('button[name="update_cart"]').prop('disabled', false);
                }
              });

        }

    }

 

})(jQuery);

// Utill
( function( window, factory ) {
    // universal module definition
    /* jshint strict: false */ /*globals define, module, require */
    if ( typeof define === 'function' && define.amd ) {
      // AMD
      define( [
          'isotope-layout/js/layout-mode'
        ],
        factory );
    } else if ( typeof exports === 'object' ) {
      // CommonJS
      module.exports = factory(
        require('isotope-layout/js/layout-mode')
      );
    } else {
      // browser global
      factory(
        window.Isotope.LayoutMode
      );
    }
  
    }( window, function factory( LayoutMode ) {
    'use strict';
  
    var CellsByRow = LayoutMode.create( 'cellsByRow' );
    var proto = CellsByRow.prototype;
  
    proto._resetLayout = function() {
      // reset properties
      this.itemIndex = 0;
      // measurements
      this.getColumnWidth();
      this.getRowHeight();
      // set cols
      this.cols = Math.floor( this.isotope.size.innerWidth / this.columnWidth );
      this.cols = Math.max( this.cols, 1 );
    };
  
    proto._getItemLayoutPosition = function( item ) {
      item.getSize();
      var col = this.itemIndex % this.cols;
      var row = Math.floor( this.itemIndex / this.cols );
      // center item within cell
      var x = ( col + 0.5 ) * this.columnWidth - item.size.outerWidth / 2;
      var y = ( row + 0.5 ) * this.rowHeight - item.size.outerHeight / 2;
      this.itemIndex++;
      return { x: x, y: y };
    };
  
    proto._getContainerSize = function() {
      return {
        height: Math.ceil( this.itemIndex / this.cols ) * this.rowHeight
      };
    };
  
    return CellsByRow;
  
    }));
  
    // Utility function
    function Util () {};

// class manipulation functions
Util.hasClass = function(el, className) {
    if (el.classList) return el.classList.contains(className);
    else return !!el.className.match(new RegExp('(\\s|^)' + className + '(\\s|$)'));
};

Util.addClass = function(el, className) {
    var classList = className.split(' ');
    if (el.classList) el.classList.add(classList[0]);
    else if (!Util.hasClass(el, classList[0])) el.className += " " + classList[0];
    if (classList.length > 1) Util.addClass(el, classList.slice(1).join(' '));
};

Util.removeClass = function(el, className) {
    var classList = className.split(' ');
    if (el.classList) el.classList.remove(classList[0]);  
    else if(Util.hasClass(el, classList[0])) {
        var reg = new RegExp('(\\s|^)' + classList[0] + '(\\s|$)');
        el.className=el.className.replace(reg, ' ');
    }
    if (classList.length > 1) Util.removeClass(el, classList.slice(1).join(' '));
    };

Util.toggleClass = function(el, className, bool) {
    if(bool) Util.addClass(el, className);
    else Util.removeClass(el, className);
    };

Util.setAttributes = function(el, attrs) {
    for(var key in attrs) {
        el.setAttribute(key, attrs[key]);
    }
};

    /* 
    DOM manipulation
    */
Util.getChildrenByClassName = function(el, className) {
    var children = el.children,
        childrenByClass = [];
    for (var i = 0; i < el.children.length; i++) {
        if (Util.hasClass(el.children[i], className)) childrenByClass.push(el.children[i]);
    }
    return childrenByClass;
};

    Util.is = function(elem, selector) {
    if(selector.nodeType){
        return elem === selector;
    }

    var qa = (typeof(selector) === 'string' ? document.querySelectorAll(selector) : selector),
        length = qa.length,
        returnArr = [];

    while(length--){
        if(qa[length] === elem){
        return true;
        }
    }

    return false;
    };

    /* 
    Animate height of an element
    */
    Util.setHeight = function(start, to, element, duration, cb) {
    var change = to - start,
        currentTime = null;

    var animateHeight = function(timestamp){  
        if (!currentTime) currentTime = timestamp;         
        var progress = timestamp - currentTime;
        var val = parseInt((progress/duration)*change + start);
        element.style.height = val+"px";
        if(progress < duration) {
            window.requestAnimationFrame(animateHeight);
        } else {
        cb();
        }
    };

    //set the height of the element before starting animation -> fix bug on Safari
    element.style.height = start+"px";
    window.requestAnimationFrame(animateHeight);
    };

     jarallax(document.querySelectorAll('.jarallax-img'), {
         speed: 0.7
     });

     jarallax(document.querySelectorAll('.footer-container'), {
         speed: 0.7
     });

    // isotop area

    $(document).ready(function(){

          
        var isotope = $(".main-isotop");

        if(isotope.length){
            var iso = new Isotope( '.filter', {
                itemSelector: '.element-item',
                layoutMode: 'fitRows'
              });
              
              // filter functions
              var filterFns = {
                // show if name ends with -ium
                ium: function( itemElem ) {
                  var name = itemElem.querySelector('.name').textContent;
                  return name.match( /ium$/ );
                }
              };
              
              // bind filter button click
              var filtersElem = document.querySelector('.filters-button-group');
              filtersElem.addEventListener( 'click', function( event ) {
                // only work with buttons
                if ( !matchesSelector( event.target, 'button' ) ) {
                  return;
                }
                var filterValue = event.target.getAttribute('data-filter');
                // use matching filter function
                filterValue = filterFns[ filterValue ] || filterValue;
                iso.arrange({ filter: filterValue });
              });
              
              // change is-checked class on buttons
              var buttonGroups = document.querySelectorAll('.button-group');
              for ( var i=0, len = buttonGroups.length; i < len; i++ ) {
                var buttonGroup = buttonGroups[i];
                radioButtonGroup( buttonGroup );
              }
              function radioButtonGroup( buttonGroup ) {
                buttonGroup.addEventListener( 'click', function( event ) {
                  // only work with buttons
                  if ( !matchesSelector( event.target, 'button' ) ) {
                    return;
                  }
                  buttonGroup.querySelector('.is-checked').classList.remove('is-checked');
                  event.target.classList.add('is-checked');
                });
              }
        }

        if ($('.grid-masonary').length) {

            // image loaded portfolio init
            $('.grid-masonary').imagesLoaded(function() {
                $('.portfolio-filter').on('click', 'button', function() {
                    var filterValue = $(this).attr('data-filter');
                    $grid.isotope({
                        filter: filterValue
                    });
                });
                var $grid = $('.grid-masonary').isotope({
                    itemSelector: '.grid-item-p',
                    percentPosition: true,
                    masonry: {
                        columnWidth: '.grid-item-p',
                    }
                });
            });
        }
                
        // portfolio Filter
        $('.portfolio-filter button').on('click', function(event) {
            $(this).siblings('.is-checked').removeClass('is-checked');
            $(this).addClass('is-checked');
            event.preventDefault();
        });
        
        
    });




/* 
    Smooth Scroll
*/
//Animation curves
Math.easeInOutQuad = function (t, b, c, d) {
    t /= d/2;
    if (t < 1) return c/2*t*t + b;
    t--;
    return -c/2 * (t*(t-2) - 1) + b;
};
Util.scrollTo = function(final, duration, cb) {
  var start = window.scrollY || document.documentElement.scrollTop,
      currentTime = null;
      
  var animateScroll = function(timestamp){
    if (!currentTime) currentTime = timestamp;        
    var progress = timestamp - currentTime;
    if(progress > duration) progress = duration;
    var val = Math.easeInOutQuad(progress, start, final-start, duration);
    window.scrollTo(0, val);
    if(progress < duration) {
        window.requestAnimationFrame(animateScroll);
    } else {
      cb && cb();
    }
  };

  window.requestAnimationFrame(animateScroll);
};

// Back to Top
(function() {
  var backTop = document.getElementsByClassName('js-back-to-top')[0];
  if( backTop ) {
    var scrollDuration = parseInt(backTop.getAttribute('data-duration')) || 0, //scroll to top duration
      scrollOffset = parseInt(backTop.getAttribute('data-offset')) || 10, //show back-to-top if scrolling > scrollOffset
      scrolling = false;
    
    //detect click on back-to-top link
    backTop.addEventListener('click', function(event) {
      event.preventDefault();
      (!window.requestAnimationFrame) ? window.scrollTo(0, 0) : Util.scrollTo(0, scrollDuration);
    });

  }

  var filter_price = $('.filter-price');
	if (filter_price.length) {
		var lowerSlider = document.querySelector('#lower');
		var upperSlider = document.querySelector('#upper');

		document.querySelector('#two').value = upperSlider.value;
		document.querySelector('#one').value = lowerSlider.value;

		var lowerVal = parseInt(lowerSlider.value);
		var upperVal = parseInt(upperSlider.value);

		upperSlider.oninput = function () {
			lowerVal = parseInt(lowerSlider.value);
			upperVal = parseInt(upperSlider.value);

			if (upperVal < lowerVal + 4) {
				lowerSlider.value = upperVal - 4;
				if (lowerVal == lowerSlider.min) {
					upperSlider.value = 4;
				}
			}
			document.querySelector('#two').value = this.value
		};

		lowerSlider.oninput = function () {
			lowerVal = parseInt(lowerSlider.value);
			upperVal = parseInt(upperSlider.value);
			if (lowerVal > upperVal - 4) {
				upperSlider.value = lowerVal + 4;
				if (upperVal == upperSlider.max) {
					lowerSlider.value = parseInt(upperSlider.max) - 4;
				}
			}
			document.querySelector('#one').value = this.value
		};
	}

}());
