(function ($) {

    'use strict';
    
    $.exists = function(selector) {
        return ($(selector).length > 0);
    }
    
    $('.text-component a > img').parent('a').addClass('has-img');
    $('.text-component__inner .twitter-tweet').parent('.media-wrapper').addClass('twitter-embed');

    ms_header_menu();
    ms_page_transition();
    ms_stickyheader();
    ms_not_found();
    ms_theme_mode();
    ms_menu_default_mobile();
    ms_excerpt_plyr();
    ms_excerpt_gallery();
    ms_search_widget();
    ms_woo_quantity();
    ms_woo_category_loop();
    ms_woo_product_image();
    ms_video_background();
    ms_footer_effect();

 

    function ms_video_background() {

        if ($.exists('[data-vbg]')) {
            $('[data-vbg]').youtube_background();
        }

    }

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

    function ms_woo_product_image() {  

        $('[data-fancybox]').on('click', function(e) {
            e.preventDefault();
            
        });
        $('[data-fancybox]').magnificPopup({
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

    function ms_excerpt_plyr() {
        var player = new Plyr('.ms-player'),
            v_player = new Plyr('.ms-video-player');

            $('.wp-block-video').each(function() {

                var videoPlayer = new Plyr($(this).find('video'), {
                    tooltips: {
                        controls: true,
                        seek: true
                    }
                });
          
            });
            $('.wp-block-audio').each(function() {

                var audioPlayer = new Plyr($(this).find('audio'), {
                    tooltips: {
                        controls: true,
                        seek: true
                    }
                });
          
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
                $(this).siblings('.sub-menu').slideUp(300);
            } else {
                $('.menu-item-has-children > a').removeClass('active');
                $(this).addClass('active');
                $('.sub-menu').slideUp(200);
                $(this).siblings('.sub-menu').slideDown(300);
            }
          });

          $(document).on('click', '.is_mobile .sub-menu > .menu-item-has-children > a', function(e) {
            e.preventDefault();
            if ($(this).hasClass('active')) {
                $(this).removeClass('active');
                $(this).siblings('.sub-menu').slideUp(300);
            } else {
                $('.sub-menu > .menu-item-has-children > a').removeClass("active");
                $(this).addClass('active');
                $(this).siblings('.sub-menu').slideUp(200);
                $(this).siblings('.sub-menu').slideDown(300);
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
 
    // Portfolio Buttons
    function ms_load_more_btn($scope) {

        var pageNum = parseInt(infinity_load.startPage) + 1,
            max = parseInt(infinity_load.maxPages),
            el = $scope.find('.portfolio_wrap'),
            id = el.attr('id'),
            container = el.find('.ms-masonry-gallery'),
            container_g = el.find('.portfolio-feed'),
            contgrid = el.find('.grid-content');
    
            // Filter
            el.on( 'click', '.filter-nav__item:not(.active)', function(e) {
                pageNum = parseInt(infinity_load.startPage) + 1;
                e.preventDefault();
    
                var $p_item = container.find('.grid-item-p'),
                    $pg_item = container_g.find('.grid-item-p'),
                    button = el.find('.ajax-area'),
                    filterValue = $(this).attr('data-filter'),
                    url = window.location.href,
                    url = url + '?category=' + filterValue,
                    preloader = el.find('.load_filter').addClass('show');
    
                button.hide(300).delay(300).queue(function(){$(this).remove();});
                el.find('.filter-nav__item').removeClass('active');
                $(this).addClass('active');
                el.find('.filtr-btn li .subnav__link').attr('aria-current', 'none');
                $(this).find('.subnav__link').attr('aria-current', 'page');
                el.find('.filtr-btn li').css({'pointer-events' : 'none'});
                $p_item.css({'pointer-events' : 'none'});

                if ($.exists(contgrid)) {
                    gsap.to( $p_item ,{opacity:.3, ease: "power2.inOut", duration:.5 });
                } else {
                    gsap.to( $pg_item ,{opacity:.3, ease: "power2.inOut", duration:.5 });
                }
                
                $.ajax({
                    type: 'GET',
                    url: url,
                    dataType: 'html',
                    success: function(data) {
                        var max = parseInt(infinity_load.maxPages),
                            item = $(data),
                            items = item.find('#' + id +' .grid-item-p'),
                            button = item.find('#' + id +' .ajax-area');
    
                        setTimeout(function(){
                            container.imagesLoaded( function() {
                                $p_item.css({'pointer-events' : 'auto'});
                                preloader.removeClass('show');
                                // If Grid layout = masonry
                                if ($.exists(contgrid)) {
                                    container.imagesLoaded( function() {
                                        container.isotope({
                                            itemSelector: '.grid-item-p',
                                            percentPosition: true,
                                            masonry: {
                                                columnWidth: '.grid-sizer'
                                            }
                                        });
                                    });
                                    if(items.length > 0) {
                                        container.append(items).isotope( 'appended', items );
                                    }
                                    container.isotope('reloadItems').isotope('remove', $p_item);
                                // If Grid layout = simple grid
                                } else {
                                    container_g.imagesLoaded( function() {
                                        container_g.find('.grid-item-p').remove();
                                        container_g.append(items);
                                    });
                                }
                                el.append(button);
                                el.find('.filtr-btn span').removeClass('loaded');
                                el.find('.filtr-btn li').css({'pointer-events' : 'auto'});
                            });
                        }, 2000);
                    }
                });
    
            });
    
            // Load Button
            el.on('click', '.btn-load-more', function(event){

                var nextLink = infinity_load.nextLink;
                nextLink = nextLink.replace(/\/page\/[0-9]?/,'/page/'+ pageNum);
    
                event.preventDefault();
                var posts_container = el.find('.ms-masonry-gallery'),
                    button = $(this),
                    filterValue =  el.find('.filtr-btn li.active').attr('data-filter');
                if (filterValue === undefined || filterValue === '') {
                    filterValue = '';
                }
                
                    $(this).toggleClass('loading');
                    $('.md-content-loader').addClass('active');
                var max = el.find('.ajax-area').attr('data-max');
    
                    button.css({'pointer-events' : 'none'});
                    
                    pageNum++;
                    $.ajax({
                        type: 'POST',
                        url: nextLink + '?category=' + filterValue,
                        dataType: 'html',
                        success: function(data) {
                            
                            var item = $(data),
                                val = item.find('#' + id +' .grid-item-p');
  
                                if ($.exists(contgrid)) {
                                    var $container = el.find('.ms-masonry-gallery').isotope();
                                } else {
                                    var $container = el.find('.portfolio-feed');                                  
                                }
                                
                                nextLink = nextLink.replace(/\/page\/[0-9]?/,'/page/'+ pageNum);
    
                                if(val.length > 0) {
                                    
                                    setTimeout(function(){
                                        $('.md-content-loader').removeClass('active');
                                        button.find('.ajax-area');
                                        button.toggleClass('loading');
                                        button.css({'pointer-events' : 'auto'});
                                        container.imagesLoaded( function() {
                                            if ($.exists(contgrid)) {
                                                $container.append(val).isotope( 'appended', val );
                                            } else {
                                                $container.append(val);
                                            }
                                        });
                                        
                                        if(pageNum <= max) {
                                        } else {
                                            button.addClass('no-works');
                                            button.css({'pointer-events' : 'none'});
                                        }      
                                    }, 1500);
                                } 
    
                        }
                    });
            });

    }

    // Portfolio Buttons ( List )
    function ms_load_more_btn_list($scope) {

        if ($.exists('.portfolio-feed.ms-p--l')) {
            var pageNum = parseInt(infinity_load.startPage) + 1,
            el = $scope.find('.portfolio-feed.ms-p--l'),
            parent_id = el.parent().attr('id'),
            el = $scope.find('#' + parent_id);            

            // Filter
            el.on( 'click', '.filter-nav__item:not(.active)', function(e) {
                pageNum = parseInt(infinity_load.startPage) + 1;
                e.preventDefault();

                var container = el.find('.grid-item-p__list'),
                    text_item = container.find('.ms-p-list__item'),
                    button = el.find('.ajax-area--list'),
                    filterValue = $(this).attr('data-filter'),
                    preloader = el.find('.load_filter').addClass('show'),
                    url = window.location.href; 
                    if (url.indexOf("#") > 0) {
                        var clean_url = url.substring(0, url.indexOf("#"));
                        window.history.replaceState({}, document.title, clean_url);
                    }
                    var t_url = url + '?category=' + filterValue;
                    
                button.hide(300).delay(300).queue(function(){$(this).remove();});
                el.find('.filter-nav__item').removeClass('active');
                $(this).addClass('active');
                el.find('.filtr-btn li .subnav__link').attr('aria-current', 'none');
                $(this).find('.subnav__link').attr('aria-current', 'page');
                el.find('.filtr-btn li').css({'pointer-events' : 'none'});
                $(text_item).css({'pointer-events' : 'none'});

                $.ajax({
                    type: 'GET',
                    url: t_url,
                    dataType: 'html',
                    success: function(data) {
                        
                        var max = parseInt(infinity_load.maxPages),
                            item = $(data),
                            text_items = item.find('#' + parent_id +' .ms-p-list__item'),
                            button = item.find('#' + parent_id +' .ajax-area--list');
                        setTimeout(function(){
                            container.imagesLoaded( function() {
                                el.find('.ms-p-list__item').remove();
                                $(text_item).css({'pointer-events' : 'auto'});
                                preloader.removeClass('show');
                                $(container).find('.ms-p-list').append(text_items);
                                el.append(button);
                                el.find('.filtr-btn span').removeClass('loaded');
                                el.find('.filtr-btn li').css({'pointer-events' : 'auto'});
                            });
                        }, 2000);
                    }
                });
    
            });

            // Load Button
            el.on('click', '.btn-load-more', function(event){
                event.preventDefault();

                var nextLink = infinity_load.nextLink,
                    nextLink = nextLink.replace(/\/page\/[0-9]?/,'/page/'+ pageNum),
                    id = el.attr('id'),
                    button = $(this),
                    filterValue =  el.find('.filtr-btn li.active').attr('data-filter');
                if (filterValue === undefined || filterValue === '') {
                    filterValue = '';
                }

                var max = el.find('.ajax-area--list').attr('data-max');
    
                    button.css({'pointer-events' : 'none'});
                    
                    pageNum++;
                    $.ajax({
                        type: 'POST',
                        url: nextLink + '?category=' + filterValue,
                        dataType: 'html',
                        success: function(data) {
                            var item = $(data),
                                text_items = item.find('#' + id +' .ms-p-list__item'),
                                container = el.find('.ms-p-list');
                                button.toggleClass('loading');
                                
                                if(text_items.length > 0) {
                                    setTimeout(function(){
                                        $('.md-content-loader').removeClass('active');
                                        button.find('.ajax-area--list');
                                        button.css({'pointer-events' : 'auto'});
                                        container.append(text_items);
                                        if(pageNum <= max) {
                                        } else {
                                            button.addClass('no-works');
                                            button.css({'pointer-events' : 'none'});
                                        }
                                    }, 1500);
                                } 
    
                        }
                    });
            });
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
    
    // Page 404
    function ms_not_found() {
        if ($.exists('.ms-404-page')) {
            gsap.to("#headStripe", {
                y: 0.5,
                rotation: 1,
                yoyo: true,
                repeat: -1,
                ease: "sine.inOut",
                duration: 1
            });
            gsap.to("#spaceman", {
                y: 0.5,
                rotation: 1,
                yoyo: true,
                repeat: -1,
                ease: "sine.inOut",
                duration: 1
            });
            gsap.to("#craterSmall", {
                x: -3,
                yoyo: true,
                repeat: -1,
                duration: 1,
                ease: "sine.inOut"
            });
            gsap.to("#craterBig", {
                x: 3,
                yoyo: true,
                repeat: -1,
                duration: 1,
                ease: "sine.inOut"
            });
            gsap.to("#planet", {
                rotation: -2,
                yoyo: true,
                repeat: -1,
                duration: 1,
                ease: "sine.inOut",
                transformOrigin: "50% 50%"
            });
    
            gsap.to("#starsBig g", {
                rotation: "random(-30,30)",
                transformOrigin: "50% 50%",
                yoyo: true,
                repeat: -1,
                ease: "sine.inOut"
            });
            gsap.fromTo(
                "#starsSmall g",
                { scale: 0, transformOrigin: "50% 50%" },
                { scale: 1, transformOrigin: "50% 50%", yoyo: true, repeat: -1, stagger: 0.1 }
            );
            gsap.to("#circlesSmall circle", {
                y: -4,
                yoyo: true,
                duration: 1,
                ease: "sine.inOut",
                repeat: -1
            });
            gsap.to("#circlesBig circle", {
                y: -2,
                yoyo: true,
                duration: 1,
                ease: "sine.inOut",
                repeat: -1
            });
    
            gsap.set("#glassShine", { x: -68 });
    
            gsap.to("#glassShine", {
                x: 80,
                duration: 2,
                rotation: -30,
                ease: "expo.inOut",
                transformOrigin: "50% 50%",
                repeat: -1,
                repeatDelay: 8,
                delay: .1
            });
        } 
    }

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

    function ms_woo_category_loop() {
        
        if ($.exists('.product-category')) {
            $('.product-category').wrapAll('<div class="ms-woocommerce-product-category"></div>');
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

// Portfolio filter-navigation
(function() {
    var FilterNav = function(element) {
        this.element = element;
        this.wrapper = this.element.getElementsByClassName('js-filter-nav__wrapper')[0];
        this.nav = this.element.getElementsByClassName('js-filter-nav__nav')[0];
        this.list = this.nav.getElementsByClassName('js-filter-nav__list')[0];
        this.control = this.element.getElementsByClassName('js-filter-nav__control')[0];
        this.modalClose = this.element.getElementsByClassName('js-filter-nav__close-btn')[0];
        this.placeholder = this.element.getElementsByClassName('js-filter-nav__placeholder')[0];
        this.marker = this.element.getElementsByClassName('js-filter-nav__marker');
        this.layout = 'expanded';
        initFilterNav(this);
    };

    function initFilterNav(element) {
        checkLayout(element); // init layout
        if(element.layout == 'expanded') placeMarker(element);
        element.element.addEventListener('update-layout', function(event){ // on resize - modify layout
        checkLayout(element);
        });

        // update selected item
        element.wrapper.addEventListener('click', function(event){
        var newItem = event.target.closest('.js-filter-nav__btn');
        if(newItem) {
            updateCurrentItem(element, newItem);
            return;
        }
        // close modal list - mobile version only
        if(Util.hasClass(event.target, 'js-filter-nav__wrapper') || event.target.closest('.js-filter-nav__close-btn')) toggleModalList(element, false);
        });

        // open modal list - mobile version only
        element.control.addEventListener('click', function(event){
        toggleModalList(element, true);
        });
        
        // listen for key events
        window.addEventListener('keyup', function(event){
        // listen for esc key
        if( (event.keyCode && event.keyCode == 27) || (event.key && event.key.toLowerCase() == 'escape' )) {
            // close navigation on mobile if open
            if(element.control.getAttribute('aria-expanded') == 'true' && isVisible(element.control)) {
            toggleModalList(element, false);
            }
        }
        // listen for tab key
        if( (event.keyCode && event.keyCode == 9) || (event.key && event.key.toLowerCase() == 'tab' )) {
            // close navigation on mobile if open when nav loses focus
            if(element.control.getAttribute('aria-expanded') == 'true' && isVisible(element.control) && !document.activeElement.closest('.js-filter-nav__wrapper')) toggleModalList(element, false);
        }
        });
    };

    function updateCurrentItem(element, btn) {
        if(btn.getAttribute('aria-current') == 'true') {
        toggleModalList(element, false);
        return;
        }
        var activeBtn = element.wrapper.querySelector('[aria-current]');
        if(activeBtn) activeBtn.removeAttribute('aria-current');
        btn.setAttribute('aria-current', 'true');
        // update trigger label on selection (visible on mobile only)
        element.placeholder.textContent = btn.textContent;
        toggleModalList(element, false);
        if(element.layout == 'expanded') placeMarker(element);
    };

    function toggleModalList(element, bool) {
        element.control.setAttribute('aria-expanded', bool);
        Util.toggleClass(element.wrapper, 'filter-nav__wrapper--is-visible', bool);
        if(bool) {
        element.nav.querySelectorAll('[href], button:not([disabled])')[0].focus();
        } else if(isVisible(element.control)) {
        element.control.focus();
        }
    };

    function isVisible(element) {
        return (element.offsetWidth || element.offsetHeight || element.getClientRects().length);
    };

    function checkLayout(element) {
        if(element.layout == 'expanded' && switchToCollapsed(element)) { // check if there's enough space 
        element.layout = 'collapsed';
        Util.removeClass(element.element, 'filter-nav--expanded');
        Util.addClass(element.element, 'filter-nav--collapsed');
        Util.removeClass(element.modalClose, 'is-hidden');
        Util.removeClass(element.control, 'is-hidden');
        } else if(element.layout == 'collapsed' && switchToExpanded(element)) {
        element.layout = 'expanded';
        Util.addClass(element.element, 'filter-nav--expanded');
        Util.removeClass(element.element, 'filter-nav--collapsed');
        Util.addClass(element.modalClose, 'is-hidden');
        Util.addClass(element.control, 'is-hidden');
        }
        // place background element
        if(element.layout == 'expanded') placeMarker(element);
    };

    function switchToCollapsed(element) {
        return element.nav.scrollWidth > element.nav.offsetWidth;
    };

    function switchToExpanded(element) {
        element.element.style.visibility = 'hidden';
        Util.addClass(element.element, 'filter-nav--expanded');
        Util.removeClass(element.element, 'filter-nav--collapsed');
        var switchLayout = element.nav.scrollWidth <= element.nav.offsetWidth;
        Util.removeClass(element.element, 'filter-nav--expanded');
        Util.addClass(element.element, 'filter-nav--collapsed');
        element.element.style.visibility = 'visible';
        return switchLayout;
    };

    function placeMarker(element) {
        var activeElement = element.wrapper.querySelector('.js-filter-nav__btn[aria-current="true"]');
        if(element.marker.length == 0 || !activeElement ) return;
        element.marker[0].style.width = activeElement.offsetWidth+'px';
        element.marker[0].style.transform = 'translateX('+(activeElement.getBoundingClientRect().left - element.list.getBoundingClientRect().left)+'px)';
    };

    var filterNav = document.getElementsByClassName('js-filter-nav');
    if(filterNav.length > 0) {
        var filterNavArray = [];
        for(var i = 0; i < filterNav.length; i++) {
        filterNavArray.push(new FilterNav(filterNav[i]));
        }

        var resizingId = false,
        customEvent = new CustomEvent('update-layout');

        window.addEventListener('resize', function() {
        clearTimeout(resizingId);
        resizingId = setTimeout(doneResizing, 100);
        });

        // wait for font to be loaded
        document.fonts.onloadingdone = function (fontFaceSetEvent) {
        doneResizing();
        };

        function doneResizing() {
        for( var i = 0; i < filterNavArray.length; i++) {
            (function(i){filterNavArray[i].element.dispatchEvent(customEvent)})(i);
        };
        };
    }

}());

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

}());